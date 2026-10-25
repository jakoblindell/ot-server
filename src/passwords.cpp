/**
 * Tibia GIMUD Server - a free and open-source MMORPG server emulator
 * Copyright (C) 2019 Sabrehaven and Mark Samman <mark.samman@gmail.com>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

#include "otpch.h"

#include "passwords.h"
#include "tools.h"

#include <condition_variable>
#include <deque>

#include <cryptopp/hex.h>
#include <cryptopp/misc.h>
#include <cryptopp/osrng.h>
#include <cryptopp/pwdbased.h>
#include <cryptopp/sha.h>

namespace {

constexpr const char* HASH_PREFIX = "pbkdf2_sha256";
constexpr uint32_t HASH_ITERATIONS = 50000;
constexpr size_t SALT_SIZE = 16;
constexpr size_t KEY_SIZE = 32;

constexpr size_t PASSWORD_THREADS = 2;
constexpr size_t MAX_WAITING_CHECKS = 200;

std::string toHex(const uint8_t* data, size_t size)
{
	std::string out;
	CryptoPP::HexEncoder encoder(new CryptoPP::StringSink(out), false);
	encoder.Put(data, size);
	encoder.MessageEnd();
	return out;
}

std::string fromHex(const std::string& hex)
{
	std::string out;
	CryptoPP::StringSource(hex, true, new CryptoPP::HexDecoder(new CryptoPP::StringSink(out)));
	return out;
}

std::string deriveKey(const std::string& password, const std::string& salt, uint32_t iterations)
{
	uint8_t key[KEY_SIZE];
	CryptoPP::PKCS5_PBKDF2_HMAC<CryptoPP::SHA256> pbkdf2;
	pbkdf2.DeriveKey(key, KEY_SIZE, 0, reinterpret_cast<const uint8_t*>(password.data()), password.size(),
	                 reinterpret_cast<const uint8_t*>(salt.data()), salt.size(), iterations);
	return std::string(reinterpret_cast<const char*>(key), KEY_SIZE);
}

bool equalStrings(const std::string& a, const std::string& b)
{
	return a.size() == b.size() &&
	       CryptoPP::VerifyBufsEqual(reinterpret_cast<const uint8_t*>(a.data()), reinterpret_cast<const uint8_t*>(b.data()), a.size());
}

std::mutex checksLock;
std::condition_variable checksSignal;
std::deque<std::function<void()>> waitingChecks;
bool threadsStarted = false;

void runChecks()
{
	while (true) {
		std::function<void()> check;
		{
			std::unique_lock<std::mutex> lock(checksLock);
			checksSignal.wait(lock, []() { return !waitingChecks.empty(); });
			check = std::move(waitingChecks.front());
			waitingChecks.pop_front();
		}
		check();
	}
}

}

std::string hashPassword(const std::string& password)
{
	uint8_t salt[SALT_SIZE];
	CryptoPP::AutoSeededRandomPool random;
	random.GenerateBlock(salt, SALT_SIZE);
	const std::string key = deriveKey(password, std::string(reinterpret_cast<const char*>(salt), SALT_SIZE), HASH_ITERATIONS);
	return std::string(HASH_PREFIX) + '$' + std::to_string(HASH_ITERATIONS) + '$' + toHex(salt, SALT_SIZE) + '$' +
	       toHex(reinterpret_cast<const uint8_t*>(key.data()), key.size());
}

bool checkPassword(const std::string& password, const std::string& stored)
{
	const StringVec parts = explodeString(stored, "$");
	if (parts.size() == 4 && parts[0] == HASH_PREFIX) {
		const uint32_t iterations = std::strtoul(parts[1].c_str(), nullptr, 10);
		const std::string salt = fromHex(parts[2]);
		const std::string expected = fromHex(parts[3]);
		if (iterations == 0 || iterations > 10000000 || salt.empty() || expected.empty()) {
			return false;
		}
		return equalStrings(deriveKey(password, salt, iterations), expected);
	}

	// unsalted SHA-1 (accounts from before)
	return stored.size() == 40 && equalStrings(transformToSHA1(password), asLowerCaseString(stored));
}

bool isCurrentPasswordHash(const std::string& stored)
{
	return stored.compare(0, strlen(HASH_PREFIX) + 1, std::string(HASH_PREFIX) + '$') == 0;
}

bool addPasswordCheck(std::function<void()> check)
{
	std::lock_guard<std::mutex> lock(checksLock);
	if (waitingChecks.size() >= MAX_WAITING_CHECKS) {
		return false;
	}
	if (!threadsStarted) {
		threadsStarted = true;
		for (size_t i = 0; i < PASSWORD_THREADS; ++i) {
			std::thread(runChecks).detach();
		}
	}
	waitingChecks.emplace_back(std::move(check));
	checksSignal.notify_one();
	return true;
}
