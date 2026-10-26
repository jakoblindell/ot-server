import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { deflateSync } from 'node:zlib';
import { config } from './config';

// Outfit pictures (south, standing) from the client's Tibia.dat/Tibia.spr,
// coloured like in the game, cropped to the figure.

type Thing = { width: number; height: number; layers: number; patternX: number; sprites: Uint16Array };

let assets: Promise<{ outfits: Map<number, Thing>; items: Map<number, Thing>; spr: Buffer }> | undefined;
const cache = new Map<string, Buffer>();
const CACHE_LIMIT = 2000;

// Attribute flags of the 7.80-8.54 dat format that carry data, with its size
const ATTRIBUTE_SIZES: Record<number, number> = { 0: 2, 9: 2, 10: 2, 22: 4, 25: 4, 26: 2, 29: 2, 30: 2 };

async function loadAssets() {
	const [dat, spr] = await Promise.all([
		readFile(path.join(config.gameAssets, 'Tibia.dat')),
		readFile(path.join(config.gameAssets, 'Tibia.spr'))
	]);
	const itemCount = dat.readUInt16LE(4);
	const outfitCount = dat.readUInt16LE(6);
	const outfits = new Map<number, Thing>();
	const items = new Map<number, Thing>();
	let pos = 12;
	for (let id = 100; id <= itemCount + outfitCount; id++) {
		for (;;) {
			const flag = dat[pos++];
			if (flag === 0xff) break;
			pos += ATTRIBUTE_SIZES[flag] ?? 0;
		}
		const width = dat[pos];
		const height = dat[pos + 1];
		pos += 2;
		if (width > 1 || height > 1) pos++;
		const [layers, patternX, patternY, patternZ, frames] = dat.subarray(pos, pos + 5);
		pos += 5;
		const count = width * height * layers * patternX * patternY * patternZ * frames;
		const sprites = new Uint16Array(count);
		for (let i = 0; i < count; i++) sprites[i] = dat.readUInt16LE(pos + i * 2);
		pos += count * 2;
		if (id > itemCount) outfits.set(id - itemCount, { width, height, layers, patternX, sprites });
		else items.set(id, { width, height, layers, patternX, sprites });
	}
	return { outfits, items, spr };
}

/** The game's outfit palette (port of otclient's Outfit::getColor) */
export function outfitColor(color: number): [number, number, number] {
	const steps = 19;
	if (color >= steps * 7) color = 0;
	let hue = 0;
	let saturation = 0;
	let value = 0;
	if (color % steps) {
		hue = (color % steps) / 18;
		[saturation, value] = [
			[0.25, 1],
			[0.25, 0.75],
			[0.5, 0.75],
			[0.667, 0.75],
			[1, 1],
			[1, 0.75],
			[1, 0.5]
		][Math.floor(color / steps)];
	} else {
		value = 1 - color / steps / 7;
	}
	if (value === 0) return [0, 0, 0];
	if (saturation === 0) {
		const grey = Math.floor(value * 255);
		return [grey, grey, grey];
	}
	const low = value * (1 - saturation);
	let red: number, green: number, blue: number;
	if (hue < 1 / 6) [red, blue, green] = [value, low, low + (value - low) * 6 * hue];
	else if (hue < 2 / 6) [green, blue, red] = [value, low, value - (value - low) * (6 * hue - 1)];
	else if (hue < 3 / 6) [green, red, blue] = [value, low, low + (value - low) * (6 * hue - 2)];
	else if (hue < 4 / 6) [blue, red, green] = [value, low, value - (value - low) * (6 * hue - 3)];
	else if (hue < 5 / 6) [blue, green, red] = [value, low, low + (value - low) * (6 * hue - 4)];
	else [red, green, blue] = [value, low, value - (value - low) * (6 * hue - 5)];
	return [Math.floor(red * 255), Math.floor(green * 255), Math.floor(blue * 255)];
}

/** One 32x32 sprite as RGBA */
function sprite(spr: Buffer, id: number): Uint8Array {
	const pixels = new Uint8Array(32 * 32 * 4);
	const count = spr.readUInt16LE(4);
	if (id < 1 || id > count) return pixels;
	const offset = spr.readUInt32LE(6 + (id - 1) * 4);
	if (!offset) return pixels;
	const size = spr.readUInt16LE(offset + 3);
	let pos = offset + 5;
	const end = pos + size;
	let pixel = 0;
	while (pos < end) {
		pixel += spr.readUInt16LE(pos);
		const colored = spr.readUInt16LE(pos + 2);
		pos += 4;
		for (let i = 0; i < colored; i++, pixel++, pos += 3) {
			pixels.set([spr[pos], spr[pos + 1], spr[pos + 2], 255], pixel * 4);
		}
	}
	return pixels;
}

function crc32(data: Uint8Array) {
	let crc = ~0;
	for (const byte of data) {
		crc ^= byte;
		for (let k = 0; k < 8; k++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
	}
	return ~crc >>> 0;
}

function png(width: number, height: number, rgba: Uint8Array) {
	const chunk = (type: string, data: Buffer) => {
		const body = Buffer.concat([Buffer.from(type, 'latin1'), data]);
		const length = Buffer.alloc(4);
		length.writeUInt32BE(data.length);
		const crc = Buffer.alloc(4);
		crc.writeUInt32BE(crc32(body));
		return Buffer.concat([length, body, crc]);
	};
	const header = Buffer.alloc(13);
	header.writeUInt32BE(width, 0);
	header.writeUInt32BE(height, 4);
	header.set([8, 6, 0, 0, 0], 8); // 8-bit RGBA
	const raw = Buffer.alloc((width * 4 + 1) * height);
	for (let y = 0; y < height; y++) {
		raw[y * (width * 4 + 1)] = 0;
		raw.set(rgba.subarray(y * width * 4, (y + 1) * width * 4), y * (width * 4 + 1) + 1);
	}
	return Buffer.concat([
		Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
		chunk('IHDR', header),
		chunk('IDAT', deflateSync(raw)),
		chunk('IEND', Buffer.alloc(0))
	]);
}

/** PNG of an outfit with the given colours, or null for an unknown looktype */
export async function outfitPng(looktype: number, colors: [number, number, number, number]): Promise<Buffer | null> {
	const key = [looktype, ...colors].join('-');
	const hit = cache.get(key);
	if (hit) return hit;

	assets ??= loadAssets();
	const { outfits, spr } = await assets;
	const thing = outfits.get(looktype);
	if (!thing) return null;

	const { width, height, layers } = thing;
	const size = { w: width * 32, h: height * 32 };
	const layer = (index: number) => {
		const out = new Uint8Array(size.w * size.h * 4);
		const direction = Math.min(2, thing.patternX - 1); // south
		for (let h = 0; h < height; h++) {
			for (let w = 0; w < width; w++) {
				const spriteIndex = ((direction * layers + index) * height + h) * width + w;
				const pixels = sprite(spr, thing.sprites[spriteIndex]);
				const left = (width - w - 1) * 32;
				const top = (height - h - 1) * 32;
				for (let y = 0; y < 32; y++) {
					for (let x = 0; x < 32; x++) {
						const from = (y * 32 + x) * 4;
						if (!pixels[from + 3]) continue;
						out.set(pixels.subarray(from, from + 4), ((top + y) * size.w + left + x) * 4);
					}
				}
			}
		}
		return out;
	};

	const base = layer(0);
	if (layers > 1) {
		const mask = layer(1);
		const [head, body, legs, feet] = colors.map(outfitColor);
		for (let i = 0; i < base.length; i += 4) {
			if (!mask[i + 3]) continue;
			const key = (mask[i] << 16) | (mask[i + 1] << 8) | mask[i + 2];
			const tint = key === 0xffff00 ? head : key === 0xff0000 ? body : key === 0x00ff00 ? legs : key === 0x0000ff ? feet : null;
			if (!tint) continue;
			for (let c = 0; c < 3; c++) base[i + c] = Math.floor((base[i + c] * tint[c]) / 255);
		}
	}

	const image = cropped(base, size.w, size.h);
	if (!image) return null;
	if (cache.size >= CACHE_LIMIT) cache.delete(cache.keys().next().value!);
	cache.set(key, image);
	return image;
}

/** PNG of the opaque part of an image, centred in a square with a small margin */
function cropped(rgba: Uint8Array, width: number, height: number) {
	let [left, top, right, bottom] = [width, height, -1, -1];
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			if (!rgba[(y * width + x) * 4 + 3]) continue;
			left = Math.min(left, x);
			right = Math.max(right, x);
			top = Math.min(top, y);
			bottom = Math.max(bottom, y);
		}
	}
	if (right < 0) return null;
	const side = Math.max(right - left, bottom - top) + 1 + 4;
	const square = new Uint8Array(side * side * 4);
	const offsetX = Math.floor((side - (right - left + 1)) / 2);
	const offsetY = Math.floor((side - (bottom - top + 1)) / 2);
	for (let y = top; y <= bottom; y++) {
		const from = (y * width + left) * 4;
		square.set(rgba.subarray(from, from + (right - left + 1) * 4), ((offsetY + y - top) * side + offsetX) * 4);
	}
	return png(side, side, square);
}

/** PNG of an item (its first look), or null for an unknown id */
export async function itemPng(id: number): Promise<Buffer | null> {
	const key = `item-${id}`;
	const hit = cache.get(key);
	if (hit) return hit;
	assets ??= loadAssets();
	const { items, spr } = await assets;
	const thing = items.get(id);
	if (!thing) return null;
	const width = thing.width * 32;
	const height = thing.height * 32;
	const out = new Uint8Array(width * height * 4);
	for (let layer = 0; layer < thing.layers; layer++) {
		for (let h = 0; h < thing.height; h++) {
			for (let w = 0; w < thing.width; w++) {
				const pixels = sprite(spr, thing.sprites[(layer * thing.height + h) * thing.width + w]);
				const left = (thing.width - w - 1) * 32;
				const top = (thing.height - h - 1) * 32;
				for (let y = 0; y < 32; y++) {
					for (let x = 0; x < 32; x++) {
						const from = (y * 32 + x) * 4;
						if (!pixels[from + 3]) continue;
						out.set(pixels.subarray(from, from + 4), ((top + y) * width + left + x) * 4);
					}
				}
			}
		}
	}
	const image = cropped(out, width, height);
	if (!image) return null;
	if (cache.size >= CACHE_LIMIT) cache.delete(cache.keys().next().value!);
	cache.set(key, image);
	return image;
}
