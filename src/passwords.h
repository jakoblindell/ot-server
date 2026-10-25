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

#ifndef FS_PASSWORDS_H_3C1E8B0A7D2F4E6A9B5C0D1E2F3A4B5C
#define FS_PASSWORDS_H_3C1E8B0A7D2F4E6A9B5C0D1E2F3A4B5C

// Account passwords are stored as salted, iterated SHA-256:
//   pbkdf2_sha256$<iterations>$<salt, hex>$<derived key, hex>
// (the website writes the same format). Older accounts still have an
// unsalted SHA-1 hex digest; those keep working and are replaced on the next
// login.
//
// Checking a password is slow on purpose (tens of milliseconds), so it never
// runs on the dispatcher or network thread: login checks are queued with
// addPasswordCheck and run on their own threads.

std::string hashPassword(const std::string& password);
bool checkPassword(const std::string& password, const std::string& stored);
bool isCurrentPasswordHash(const std::string& stored);

// Runs a login check on a password thread. Returns false when too many checks
// are already waiting (the caller turns the login away).
bool addPasswordCheck(std::function<void()> check);

#endif
