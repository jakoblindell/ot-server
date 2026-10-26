import net from 'node:net';
import { config } from './config';

// The game server's status: the XML "info" request on the login port (the
// same one server lists use). Cached, since the server answers one request
// per address every few seconds.
export type ServerStatus = {
	online: boolean;
	playersOnline: number;
	playersMax: number;
	playersPeak: number;
	uptimeSeconds: number;
	clientVersion: string;
	rates: { experience: number; skill: number; loot: number; magic: number };
};

const CACHE_MS = 30_000;
let cached: { at: number; status: ServerStatus } | undefined;
let pending: Promise<ServerStatus> | undefined;

const offline: ServerStatus = {
	online: false,
	playersOnline: 0,
	playersMax: 0,
	playersPeak: 0,
	uptimeSeconds: 0,
	clientVersion: '',
	rates: { experience: 0, skill: 0, loot: 0, magic: 0 }
};

export async function getServerStatus(): Promise<ServerStatus> {
	if (cached && Date.now() - cached.at < CACHE_MS) return cached.status;
	pending ??= requestStatus()
		.catch(() => offline)
		.then((status) => {
			cached = { at: Date.now(), status };
			pending = undefined;
			return status;
		});
	return pending;
}

function attribute(xml: string, element: string, name: string) {
	const tag = xml.match(new RegExp(`<${element}\\b[^>]*>`))?.[0] ?? '';
	return tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? '';
}

function requestStatus(): Promise<ServerStatus> {
	return new Promise((resolve, reject) => {
		const socket = net.connect(config.statusPort, config.gameHost);
		const chunks: Buffer[] = [];
		socket.setTimeout(3000, () => socket.destroy(new Error('status timeout')));
		socket.on('connect', () => socket.write(Buffer.from([0x06, 0x00, 0xff, 0xff, ...Buffer.from('info')])));
		socket.on('data', (chunk) => chunks.push(chunk));
		socket.on('error', reject);
		socket.on('close', () => {
			const xml = Buffer.concat(chunks).toString('latin1');
			if (!xml.includes('<tsqp')) return reject(new Error('no status'));
			resolve({
				online: true,
				playersOnline: Number(attribute(xml, 'players', 'online')) || 0,
				playersMax: Number(attribute(xml, 'players', 'max')) || 0,
				playersPeak: Number(attribute(xml, 'players', 'peak')) || 0,
				uptimeSeconds: Number(attribute(xml, 'serverinfo', 'uptime')) || 0,
				clientVersion: attribute(xml, 'serverinfo', 'client'),
				rates: {
					experience: Number(attribute(xml, 'rates', 'experience')) || 0,
					skill: Number(attribute(xml, 'rates', 'skill')) || 0,
					loot: Number(attribute(xml, 'rates', 'loot')) || 0,
					magic: Number(attribute(xml, 'rates', 'magic')) || 0
				}
			});
		});
	});
}

/** The rates, defaulting to 1 when the server cannot be asked */
export async function getStatusRates() {
	const status = await getServerStatus();
	return {
		experience: status.rates.experience || 1,
		skill: status.rates.skill || 1,
		loot: status.rates.loot || 1,
		magic: status.rates.magic || 1
	};
}
