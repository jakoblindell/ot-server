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

#include <array>

#include "configmanager.h"
#include "connection.h"
#include "outputmessage.h"
#include "protocol.h"
#include "scheduler.h"
#include "server.h"
#include "tools.h"
#include "ban.h"

extern ConfigManager g_config;
extern Ban g_bans;

namespace {

const char* WEBSOCKET_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
constexpr size_t WEBSOCKET_MAX_FRAME_SIZE = NETWORKMESSAGE_MAXSIZE * 4;

std::string base64Encode(const std::string& input)
{
	static const char* table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	std::string output;
	uint32_t value = 0;
	int bits = -6;
	for (uint8_t c : input) {
		value = (value << 8) + c;
		bits += 8;
		while (bits >= 0) {
			output.push_back(table[(value >> bits) & 0x3F]);
			bits -= 6;
		}
	}
	if (bits > -6) {
		output.push_back(table[((value << 8) >> (bits + 8)) & 0x3F]);
	}
	while (output.size() % 4) {
		output.push_back('=');
	}
	return output;
}

std::string webSocketAccept(const std::string& key)
{
	const std::string hex = transformToSHA1(key + WEBSOCKET_GUID);
	std::string digest;
	for (size_t i = 0; i + 1 < hex.size(); i += 2) {
		digest.push_back(static_cast<char>(std::stoul(hex.substr(i, 2), nullptr, 16)));
	}
	return base64Encode(digest);
}

std::string trim(const std::string& str)
{
	const size_t first = str.find_first_not_of(" \t");
	if (first == std::string::npos) {
		return std::string();
	}
	return str.substr(first, str.find_last_not_of(" \t\r") - first + 1);
}

}

bool Connection::isTrustedProxy(uint32_t ip)
{
	if (!g_config.getBoolean(ConfigManager::TRUST_FORWARDED_FOR)) {
		return false;
	}

	// ip is in network byte order
	const uint32_t host = ntohl(ip);
	return (host >> 24) == 127 || (host >> 24) == 10 || (host >> 20) == 0xAC1 || (host >> 16) == 0xC0A8;
}

Connection_ptr ConnectionManager::createConnection(boost::asio::io_service& io_service, ConstServicePort_ptr servicePort)
{
	std::lock_guard<std::mutex> lockClass(connectionManagerLock);

	auto connection = std::make_shared<Connection>(io_service, servicePort);
	connections.insert(connection);
	return connection;
}

void ConnectionManager::releaseConnection(const Connection_ptr& connection)
{
	std::lock_guard<std::mutex> lockClass(connectionManagerLock);

	connections.erase(connection);
}

void ConnectionManager::closeAll()
{
	std::lock_guard<std::mutex> lockClass(connectionManagerLock);

	for (const auto& connection : connections) {
		try {
			boost::system::error_code error;
			connection->socket.shutdown(boost::asio::ip::tcp::socket::shutdown_both, error);
			connection->socket.close(error);
		} catch (boost::system::system_error&) {
		}
	}
	connections.clear();
}

// Connection

void Connection::close(bool force)
{
	//any thread
	ConnectionManager::getInstance().releaseConnection(shared_from_this());

	std::lock_guard<std::recursive_mutex> lockClass(connectionLock);
	if (connectionState != CONNECTION_STATE_OPEN) {
		return;
	}
	connectionState = CONNECTION_STATE_CLOSED;

	if (protocol) {
		g_dispatcher.addTask(
			createTask(std::bind(&Protocol::release, protocol)));
	}

	if (messageQueue.empty() || force) {
		closeSocket();
	} else {
		//will be closed by the destructor or onWriteOperation
	}
}

void Connection::closeSocket()
{
	if (socket.is_open()) {
		try {
			readTimer.cancel();
			writeTimer.cancel();
			boost::system::error_code error;
			socket.shutdown(boost::asio::ip::tcp::socket::shutdown_both, error);
			socket.close(error);
		} catch (boost::system::system_error& e) {
			std::cout << "[Network error - Connection::closeSocket] " << e.what() << std::endl;
		}
	}
}

Connection::~Connection()
{
	closeSocket();
}

void Connection::accept(Protocol_ptr protocol)
{
	this->protocol = protocol;
	g_dispatcher.addTask(createTask(std::bind(&Protocol::onConnect, protocol)));

	accept();
}

void Connection::accept()
{
	std::lock_guard<std::recursive_mutex> lockClass(connectionLock);
	try {
		readTimer.expires_from_now(boost::posix_time::seconds(CONNECTION_READ_TIMEOUT));
		readTimer.async_wait(std::bind(&Connection::handleTimeout, std::weak_ptr<Connection>(shared_from_this()), std::placeholders::_1));

		// Read size of the first packet
		readBytes(msg.getBuffer(), NetworkMessage::HEADER_LENGTH,
		          std::bind(&Connection::parseHeader, shared_from_this(), std::placeholders::_1));
	} catch (boost::system::system_error& e) {
		std::cout << "[Network error - Connection::accept] " << e.what() << std::endl;
		close(FORCE_CLOSE);
	}
}

void Connection::parseHeader(const boost::system::error_code& error)
{
	std::lock_guard<std::recursive_mutex> lockClass(connectionLock);
	readTimer.cancel();

	if (error) {
		close(FORCE_CLOSE);
		return;
	} else if (connectionState != CONNECTION_STATE_OPEN) {
		return;
	}

	if (!receivedFirst && !isWebSocket && msg.getBuffer()[0] == 'G' && msg.getBuffer()[1] == 'E') {
		// "GE(T ...)": a WebSocket upgrade request instead of a packet length
		try {
			readTimer.expires_from_now(boost::posix_time::seconds(CONNECTION_READ_TIMEOUT));
			readTimer.async_wait(std::bind(&Connection::handleTimeout, std::weak_ptr<Connection>(shared_from_this()),
			                                    std::placeholders::_1));
			boost::asio::async_read_until(socket, wsInput, "\r\n\r\n",
			                              std::bind(&Connection::parseWebSocketHandshake, shared_from_this(), std::placeholders::_1));
		} catch (boost::system::system_error& e) {
			std::cout << "[Network error - Connection::parseHeader] " << e.what() << std::endl;
			close(FORCE_CLOSE);
		}
		return;
	}

	uint32_t timePassed = std::max<uint32_t>(1, (time(nullptr) - timeConnected) + 1);
	if ((++packetsSent / timePassed) > static_cast<uint32_t>(g_config.getNumber(ConfigManager::MAX_PACKETS_PER_SECOND))) {
		std::cout << convertIPToString(getIP()) << " disconnected for exceeding packet per second limit." << std::endl;
		close();
		return;
	}

	if (timePassed > 2) {
		timeConnected = time(nullptr);
		packetsSent = 0;
	}

	uint16_t size = msg.getLengthHeader();
	if (size == 0 || size >= NETWORKMESSAGE_MAXSIZE - 16) {
		close(FORCE_CLOSE);
		return;
	}

	try {
		readTimer.expires_from_now(boost::posix_time::seconds(CONNECTION_READ_TIMEOUT));
		readTimer.async_wait(std::bind(&Connection::handleTimeout, std::weak_ptr<Connection>(shared_from_this()),
		                                    std::placeholders::_1));

		// Read packet content
		msg.setLength(size + NetworkMessage::HEADER_LENGTH);
		readBytes(msg.getBodyBuffer(), size,
		          std::bind(&Connection::parsePacket, shared_from_this(), std::placeholders::_1));
	} catch (boost::system::system_error& e) {
		std::cout << "[Network error - Connection::parseHeader] " << e.what() << std::endl;
		close(FORCE_CLOSE);
	}
}

void Connection::parsePacket(const boost::system::error_code& error)
{
	std::lock_guard<std::recursive_mutex> lockClass(connectionLock);
	readTimer.cancel();

	if (error) {
		close(FORCE_CLOSE);
		return;
	}
	else if (connectionState != CONNECTION_STATE_OPEN) {
		return;
	}

	if (!receivedFirst) {
		// First message received
		receivedFirst = true;

		if (!protocol) {
			// Game protocol has already been created at this point
			protocol = service_port->make_protocol(msg, shared_from_this());
			if (!protocol) {
				close(FORCE_CLOSE);
				return;
			}
		}
		else {
			msg.skipBytes(1);    // Skip protocol ID
		}

		protocol->onRecvFirstMessage(msg);
	}
	else {
		protocol->onRecvMessage(msg);    // Send the packet to the current protocol
	}

	try {
		readTimer.expires_from_now(boost::posix_time::seconds(CONNECTION_READ_TIMEOUT));
		readTimer.async_wait(std::bind(&Connection::handleTimeout, std::weak_ptr<Connection>(shared_from_this()),
			std::placeholders::_1));

		// Wait to the next packet
		readBytes(msg.getBuffer(), NetworkMessage::HEADER_LENGTH,
			std::bind(&Connection::parseHeader, shared_from_this(), std::placeholders::_1));
	}
	catch (boost::system::system_error& e) {
		std::cout << "[Network error - Connection::parsePacket] " << e.what() << std::endl;
		close(FORCE_CLOSE);
	}
}



void Connection::send(const OutputMessage_ptr& msg)
{
	std::lock_guard<std::recursive_mutex> lockClass(connectionLock);
	if (connectionState != CONNECTION_STATE_OPEN) {
		return;
	}

	bool noPendingWrite = messageQueue.empty();
	messageQueue.emplace_back(msg);
	if (noPendingWrite) {
		internalSend(msg);
	}
}

void Connection::internalSend(const OutputMessage_ptr& msg)
{
	protocol->onSendMessage(msg);
	try {
		writeTimer.expires_from_now(boost::posix_time::seconds(CONNECTION_WRITE_TIMEOUT));
		writeTimer.async_wait(std::bind(&Connection::handleTimeout, std::weak_ptr<Connection>(shared_from_this()),
		                                     std::placeholders::_1));

		if (isWebSocket) {
			// Unmasked binary frame; packets never reach 64 KiB
			const size_t length = msg->getLength();
			size_t headerLength = 2;
			wsFrameHeader[0] = 0x82;
			if (length < 126) {
				wsFrameHeader[1] = static_cast<uint8_t>(length);
			} else {
				wsFrameHeader[1] = 126;
				wsFrameHeader[2] = static_cast<uint8_t>(length >> 8);
				wsFrameHeader[3] = static_cast<uint8_t>(length);
				headerLength = 4;
			}
			std::array<boost::asio::const_buffer, 2> buffers = {
				boost::asio::buffer(wsFrameHeader, headerLength),
				boost::asio::buffer(msg->getOutputBuffer(), length)
			};
			boost::asio::async_write(socket, buffers,
			                         std::bind(&Connection::onWriteOperation, shared_from_this(), std::placeholders::_1));
		} else {
			boost::asio::async_write(socket,
			                         boost::asio::buffer(msg->getOutputBuffer(), msg->getLength()),
			                         std::bind(&Connection::onWriteOperation, shared_from_this(), std::placeholders::_1));
		}
	} catch (boost::system::system_error& e) {
		std::cout << "[Network error - Connection::internalSend] " << e.what() << std::endl;
		close(FORCE_CLOSE);
	}
}

uint32_t Connection::getIP()
{
	std::lock_guard<std::recursive_mutex> lockClass(connectionLock);

	if (forwardedIP != 0) {
		return forwardedIP;
	}

	// IP-address is expressed in network byte order
	boost::system::error_code error;
	const boost::asio::ip::tcp::endpoint endpoint = socket.remote_endpoint(error);
	if (error) {
		return 0;
	}

	return htonl(endpoint.address().to_v4().to_ulong());
}

void Connection::onWriteOperation(const boost::system::error_code& error)
{
	std::lock_guard<std::recursive_mutex> lockClass(connectionLock);
	writeTimer.cancel();
	messageQueue.pop_front();

	if (error) {
		messageQueue.clear();
		close(FORCE_CLOSE);
		return;
	}

	if (!messageQueue.empty()) {
		internalSend(messageQueue.front());
	} else if (connectionState == CONNECTION_STATE_CLOSED) {
		closeSocket();
	}
}

void Connection::handleTimeout(ConnectionWeak_ptr connectionWeak, const boost::system::error_code& error)
{
	if (error == boost::asio::error::operation_aborted) {
		//The timer has been manually cancelled
		return;
	}

	if (auto connection = connectionWeak.lock()) {
		connection->close(FORCE_CLOSE);
	}
}

void Connection::readBytes(uint8_t* buffer, size_t size, ReadHandler handler)
{
	if (!isWebSocket) {
		boost::asio::async_read(socket, boost::asio::buffer(buffer, size),
		                        [handler](const boost::system::error_code& error, size_t) { handler(error); });
		return;
	}

	wsReadBuffer = buffer;
	wsReadSize = size;
	wsReadHandler = std::move(handler);
	readWebSocketFrames();
}

void Connection::readWebSocketFrames()
{
	if (!parseWebSocketFrames()) {
		close(FORCE_CLOSE);
		return;
	}

	if (wsPayload.size() - wsPayloadPos >= wsReadSize) {
		std::copy_n(wsPayload.begin() + wsPayloadPos, wsReadSize, wsReadBuffer);
		wsPayloadPos += wsReadSize;
		if (wsPayloadPos == wsPayload.size()) {
			wsPayload.clear();
			wsPayloadPos = 0;
		}

		ReadHandler handler = std::move(wsReadHandler);
		wsReadHandler = nullptr;
		boost::asio::post(socket.get_executor(), [handler]() { handler(boost::system::error_code()); });
		return;
	}

	auto self = shared_from_this();
	socket.async_read_some(wsInput.prepare(8192), [self](const boost::system::error_code& error, size_t bytes) {
		std::lock_guard<std::recursive_mutex> lockClass(self->connectionLock);
		if (error) {
			ReadHandler handler = std::move(self->wsReadHandler);
			self->wsReadHandler = nullptr;
			if (handler) {
				handler(error);
			}
			return;
		}

		self->wsInput.commit(bytes);
		self->readWebSocketFrames();
	});
}

bool Connection::parseWebSocketFrames()
{
	// Decodes every complete frame in wsInput into wsPayload. Returns false on a
	// close frame or a protocol violation.
	while (true) {
		const size_t available = wsInput.size();
		if (available < 2) {
			return true;
		}

		const uint8_t* data = static_cast<const uint8_t*>(wsInput.data().data());
		const uint8_t opcode = data[0] & 0x0F;
		const bool masked = (data[1] & 0x80) != 0;
		uint64_t length = data[1] & 0x7F;
		size_t offset = 2;

		if (length == 126) {
			if (available < 4) {
				return true;
			}
			length = (static_cast<uint64_t>(data[2]) << 8) | data[3];
			offset = 4;
		} else if (length == 127) {
			if (available < 10) {
				return true;
			}
			length = 0;
			for (int i = 0; i < 8; ++i) {
				length = (length << 8) | data[2 + i];
			}
			offset = 10;
		}

		if (!masked || length > WEBSOCKET_MAX_FRAME_SIZE) {
			return false;
		}

		if (available < offset + 4 + length) {
			return true;
		}

		const uint8_t* mask = data + offset;
		const uint8_t* payload = mask + 4;
		switch (opcode) {
			case 0x0: // continuation
			case 0x2: // binary
				if (wsPayloadPos > 0) {
					wsPayload.erase(wsPayload.begin(), wsPayload.begin() + wsPayloadPos);
					wsPayloadPos = 0;
				}
				for (uint64_t i = 0; i < length; ++i) {
					wsPayload.push_back(payload[i] ^ mask[i % 4]);
				}
				if (wsPayload.size() > WEBSOCKET_MAX_FRAME_SIZE) {
					return false;
				}
				break;

			case 0x8: // close
				return false;

			default: // ping, pong and text frames are not used by the client
				break;
		}

		wsInput.consume(offset + 4 + length);
	}
}

void Connection::parseWebSocketHandshake(const boost::system::error_code& error)
{
	std::lock_guard<std::recursive_mutex> lockClass(connectionLock);
	readTimer.cancel();

	if (error || connectionState != CONNECTION_STATE_OPEN) {
		close(FORCE_CLOSE);
		return;
	}

	const auto input = wsInput.data();
	const std::string request(boost::asio::buffers_begin(input), boost::asio::buffers_end(input));
	const size_t headerEnd = request.find("\r\n\r\n");
	wsInput.consume(headerEnd + 4);

	std::string key, protocols, forwardedFor;
	bool upgrade = false;
	std::istringstream lines(request.substr(0, headerEnd));
	std::string line;
	std::getline(lines, line); // "T / HTTP/1.1" ("GE" was read as the packet length)
	while (std::getline(lines, line)) {
		const size_t colon = line.find(':');
		if (colon == std::string::npos) {
			continue;
		}

		const std::string name = asLowerCaseString(trim(line.substr(0, colon)));
		const std::string value = trim(line.substr(colon + 1));
		if (name == "upgrade") {
			upgrade = asLowerCaseString(value) == "websocket";
		} else if (name == "sec-websocket-key") {
			key = value;
		} else if (name == "sec-websocket-protocol") {
			protocols = value;
		} else if (name == "x-forwarded-for") {
			forwardedFor = value;
		}
	}

	if (!upgrade || key.empty()) {
		close(FORCE_CLOSE);
		return;
	}

	boost::system::error_code endpointError;
	const auto endpoint = socket.remote_endpoint(endpointError);
	const uint32_t peerIP = endpointError ? 0 : htonl(endpoint.address().to_v4().to_ulong());
	if (!forwardedFor.empty() && isTrustedProxy(peerIP)) {
		boost::system::error_code parseError;
		const auto address = boost::asio::ip::make_address_v4(trim(forwardedFor.substr(0, forwardedFor.find(','))), parseError);
		if (!parseError) {
			forwardedIP = htonl(address.to_ulong());
			if (!g_bans.acceptConnection(forwardedIP)) {
				close(FORCE_CLOSE);
				return;
			}
		}
	}

	wsResponse = "HTTP/1.1 101 Switching Protocols\r\n"
	             "Upgrade: websocket\r\n"
	             "Connection: Upgrade\r\n"
	             "Sec-WebSocket-Accept: " + webSocketAccept(key) + "\r\n";
	if (protocols.find("binary") != std::string::npos) {
		wsResponse += "Sec-WebSocket-Protocol: binary\r\n";
	}
	wsResponse += "\r\n";
	isWebSocket = true;

	try {
		boost::asio::async_write(socket, boost::asio::buffer(wsResponse),
		                         std::bind(&Connection::onWebSocketHandshakeSent, shared_from_this(), std::placeholders::_1));
	} catch (boost::system::system_error& e) {
		std::cout << "[Network error - Connection::parseWebSocketHandshake] " << e.what() << std::endl;
		close(FORCE_CLOSE);
	}
}

void Connection::onWebSocketHandshakeSent(const boost::system::error_code& error)
{
	std::lock_guard<std::recursive_mutex> lockClass(connectionLock);
	if (error || connectionState != CONNECTION_STATE_OPEN) {
		close(FORCE_CLOSE);
		return;
	}

	readFirstHeader();
}

void Connection::readFirstHeader()
{
	try {
		readTimer.expires_from_now(boost::posix_time::seconds(CONNECTION_READ_TIMEOUT));
		readTimer.async_wait(std::bind(&Connection::handleTimeout, std::weak_ptr<Connection>(shared_from_this()),
		                                    std::placeholders::_1));
		readBytes(msg.getBuffer(), NetworkMessage::HEADER_LENGTH,
		          std::bind(&Connection::parseHeader, shared_from_this(), std::placeholders::_1));
	} catch (boost::system::system_error& e) {
		std::cout << "[Network error - Connection::readFirstHeader] " << e.what() << std::endl;
		close(FORCE_CLOSE);
	}
}
