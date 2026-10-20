// Load test: COUNT simulated 7.92 players that log into the game world, walk
// around and talk. Prints a status line every 10 seconds.
//
//   node swarm.js --count 1000 [--host 127.0.0.1] [--port 7172] [--rate 20]
//                 [--first-account 9000000] [--probes 10] [--duration 600]
//                 [--key ../../key.pem] [--ws wss://host:443] [--source-ips 200]
//                 [--slow-ms 500]
//
// Accounts come from seed.py. Bots connect over TCP from 127.0.0.10 and up
// (--source-ips addresses) so the server's per-address connection limits
// behave as with real players; --ws connects through a WebSocket URL instead.
// Probe bots stand still and send a ping request every 5 seconds; the server
// answers from its game loop, so the round trip shows how far behind the game
// loop is. Round
// trips of --slow-ms or more are also printed with a timestamp.
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const net = require("net");
const path = require("path");

function parseArgs() {
	const args = {
		count: 100, host: "127.0.0.1", port: 7172, rate: 20, firstAccount: 9000000,
		probes: 10, duration: 600, key: path.join(__dirname, "..", "..", "key.pem"),
		ws: null, sourceIps: 200, slowMs: 500,
	};
	const argv = process.argv.slice(2);
	for (let i = 0; i < argv.length; i += 2) {
		const name = argv[i].replace(/^--/, "").replace(/-([a-z])/g, (_, c) => c.toUpperCase());
		if (!(name in args)) {
			throw new Error(`unknown option ${argv[i]}`);
		}
		args[name] = typeof args[name] === "number" ? Number(argv[i + 1]) : argv[i + 1];
	}
	return args;
}

const args = parseArgs();
const publicKey = crypto.createPublicKey(fs.readFileSync(args.key));

// --- XTEA (little-endian 32-bit words, 32 rounds) ---

const DELTA = 0x9E3779B9;

function xteaEncrypt(buf, k) {
	for (let i = 0; i < buf.length; i += 8) {
		let v0 = buf.readUInt32LE(i), v1 = buf.readUInt32LE(i + 4), sum = 0;
		for (let r = 0; r < 32; r++) {
			v0 = (v0 + ((((v1 << 4) ^ (v1 >>> 5)) + v1) ^ (sum + k[sum & 3]))) >>> 0;
			sum = (sum + DELTA) >>> 0;
			v1 = (v1 + ((((v0 << 4) ^ (v0 >>> 5)) + v0) ^ (sum + k[(sum >>> 11) & 3]))) >>> 0;
		}
		buf.writeUInt32LE(v0, i);
		buf.writeUInt32LE(v1, i + 4);
	}
}

function xteaDecrypt(buf, k) {
	for (let i = 0; i < buf.length; i += 8) {
		let v0 = buf.readUInt32LE(i), v1 = buf.readUInt32LE(i + 4), sum = (DELTA * 32) >>> 0;
		for (let r = 0; r < 32; r++) {
			v1 = (v1 - ((((v0 << 4) ^ (v0 >>> 5)) + v0) ^ (sum + k[(sum >>> 11) & 3]))) >>> 0;
			sum = (sum - DELTA) >>> 0;
			v0 = (v0 - ((((v1 << 4) ^ (v1 >>> 5)) + v1) ^ (sum + k[sum & 3]))) >>> 0;
		}
		buf.writeUInt32LE(v0, i);
		buf.writeUInt32LE(v1, i + 4);
	}
}

function string(text) {
	const b = Buffer.alloc(2 + text.length);
	b.writeUInt16LE(text.length, 0);
	b.write(text, 2, "latin1");
	return b;
}

// --- statistics ---

const stats = { connecting: 0, online: 0, loginFailed: 0, disconnected: 0, rtts: [], errors: {} };

function countError(reason) {
	stats.errors[reason] = (stats.errors[reason] || 0) + 1;
}

function percentile(sorted, p) {
	if (!sorted.length) {
		return NaN;
	}
	return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))];
}

// --- bot ---

class Bot {
	constructor(index) {
		this.index = index;
		this.account = args.firstAccount + index;
		this.name = `Bot ${String(index + 1).padStart(4, "0")}`;
		this.probe = index < args.probes;
		this.key = [0, 0, 0, 0].map(() => crypto.randomBytes(4).readUInt32LE(0));
		this.input = Buffer.alloc(0);
		this.loggedIn = false;
		this.timers = [];
		this.pingSentAt = 0;
	}

	start() {
		stats.connecting++;
		if (args.ws) {
			this.ws = new WebSocket(args.ws, "binary");
			this.ws.binaryType = "arraybuffer";
			this.ws.onopen = () => this.sendLogin();
			this.ws.onmessage = (event) => this.onData(Buffer.from(event.data));
			this.ws.onerror = () => countError("websocket error");
			this.ws.onclose = () => this.onClose();
		} else {
			const localAddress = `127.0.0.${10 + (this.index % args.sourceIps)}`;
			this.socket = net.connect({ host: args.host, port: args.port, localAddress }, () => this.sendLogin());
			this.socket.setNoDelay(true);
			this.socket.on("data", (data) => this.onData(data));
			this.socket.on("error", (error) => countError(error.code || error.message));
			this.socket.on("close", () => this.onClose());
		}
	}

	write(buffer) {
		if (this.ws) {
			if (this.ws.readyState === 1) {
				this.ws.send(buffer);
			}
		} else if (!this.socket.destroyed) {
			this.socket.write(buffer);
		}
	}

	sendLogin() {
		const block = Buffer.alloc(128);
		crypto.randomFillSync(block);
		let offset = 0;
		block[offset++] = 0;
		for (const word of this.key) {
			block.writeUInt32LE(word, offset);
			offset += 4;
		}
		block[offset++] = 0; // gamemaster flag
		block.writeUInt32LE(this.account, offset);
		offset += 4;
		for (const part of [string(this.name), string("bot")]) {
			part.copy(block, offset);
			offset += part.length;
		}
		const encrypted = crypto.publicEncrypt({ key: publicKey, padding: crypto.constants.RSA_NO_PADDING }, block);

		const header = Buffer.alloc(5);
		header[0] = 0x0A; // game protocol
		header.writeUInt16LE(2, 1); // operating system: classic Windows client
		header.writeUInt16LE(792, 3);
		const body = Buffer.concat([header, encrypted]);
		const packet = Buffer.alloc(2 + body.length);
		packet.writeUInt16LE(body.length, 0);
		body.copy(packet, 2);
		this.write(packet);
	}

	sendMessage(payload) {
		const inner = Buffer.alloc(Math.ceil((payload.length + 2) / 8) * 8);
		inner.writeUInt16LE(payload.length, 0);
		payload.copy(inner, 2);
		xteaEncrypt(inner, this.key);
		const packet = Buffer.alloc(2 + inner.length);
		packet.writeUInt16LE(inner.length, 0);
		inner.copy(packet, 2);
		this.write(packet);
	}

	onData(data) {
		this.input = this.input.length ? Buffer.concat([this.input, data]) : data;
		while (this.input.length >= 2) {
			const size = this.input.readUInt16LE(0);
			if (this.input.length < 2 + size) {
				break;
			}
			const body = this.input.subarray(2, 2 + size);
			this.input = this.input.subarray(2 + size);
			// Only the first packet (login result) and probe bots' packets are decoded
			if (!this.loggedIn || this.probe) {
				this.onPacket(Buffer.from(body));
			}
		}
	}

	onPacket(body) {
		if (body.length % 8 !== 0) {
			return;
		}
		xteaDecrypt(body, this.key);
		const length = body.readUInt16LE(0);
		const payload = body.subarray(2, 2 + length);

		if (!this.loggedIn) {
			stats.connecting--;
			if (payload[0] === 0x0A) {
				this.loggedIn = true;
				stats.online++;
				this.startActing();
			} else {
				stats.loginFailed++;
				const text = payload[0] === 0x14 ? payload.subarray(3, 3 + payload.readUInt16LE(1)).toString("latin1") : `opcode 0x${payload[0].toString(16)}`;
				countError(`login: ${text.split("\n")[0]}`);
				this.stop();
			}
			return;
		}

		if (this.pingSentAt && payload.length === 1 && payload[0] === 0x1E) {
			const rtt = Date.now() - this.pingSentAt;
			stats.rtts.push(rtt);
			if (rtt >= args.slowMs) {
				console.log(`slow ${new Date().toISOString()} ${this.name} rtt_ms=${rtt}`);
			}
			this.pingSentAt = 0;
		}
	}

	startActing() {
		const every = (min, max, action) => {
			const schedule = () => {
				this.timers.push(setTimeout(() => {
					action();
					schedule();
				}, min + Math.random() * (max - min)));
			};
			schedule();
		};

		every(20000, 20000, () => this.sendMessage(Buffer.from([0x1E])));
		if (!this.probe) {
			every(1000, 3000, () => this.sendMessage(Buffer.from([0x65 + Math.floor(Math.random() * 4)])));
			every(30000, 90000, () => this.sendMessage(Buffer.concat([Buffer.from([0x96, 0x01]), string("hi")])));
		} else {
			// Probes stand still and stay quiet, so a ping reply arrives as a
			// packet of its own (seed.py places them away from other bots)
			every(5000, 5000, () => {
				this.pingSentAt = Date.now();
				this.sendMessage(Buffer.from([0x1D]));
			});
		}
	}

	onClose() {
		if (this.loggedIn) {
			stats.online--;
			stats.disconnected++;
		} else if (!this.stopped) {
			stats.connecting--;
			countError("closed before login");
		}
		this.loggedIn = false;
		this.stop();
	}

	stop() {
		this.stopped = true;
		this.timers.forEach(clearTimeout);
		this.timers = [];
		if (this.ws) {
			this.ws.close();
		} else if (this.socket) {
			this.socket.destroy();
		}
	}
}

// --- main ---

const bots = [];
const startedAt = Date.now();
let started = 0;

const launcher = setInterval(() => {
	for (let i = 0; i < args.rate / 10 && started < args.count; i++) {
		const bot = new Bot(started++);
		bots.push(bot);
		bot.start();
	}
	if (started >= args.count) {
		clearInterval(launcher);
	}
}, 100);

const reporter = setInterval(() => {
	const rtts = stats.rtts.splice(0).sort((a, b) => a - b);
	const elapsed = Math.round((Date.now() - startedAt) / 1000);
	console.log(
		`t=${elapsed}s started=${started} online=${stats.online} connecting=${stats.connecting} ` +
		`failed=${stats.loginFailed} dropped=${stats.disconnected} ` +
		`rtt_ms p50=${percentile(rtts, 0.5)} p95=${percentile(rtts, 0.95)} max=${rtts.length ? rtts[rtts.length - 1] : NaN} (n=${rtts.length})` +
		(Object.keys(stats.errors).length ? ` errors=${JSON.stringify(stats.errors)}` : "")
	);
}, 10000);

setTimeout(() => {
	clearInterval(launcher);
	clearInterval(reporter);
	bots.forEach((bot) => bot.stop());
	setTimeout(() => process.exit(0), 1000);
}, args.duration * 1000);
