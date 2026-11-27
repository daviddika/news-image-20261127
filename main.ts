// main.ts — news-image-20261127 entry validator + publisher.
// Validates entry.png next to this file (PNG magic, size, dimensions, IEND)
// and copies it to $MAKEFUN_OUTPUT_DIR/entry.png (default: /output/entry.png).
// Node 22, standard library only, no network, deterministic.
import { readFileSync, writeFileSync, mkdirSync, chmodSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_BYTES = 1024 * 1024; // 1 MiB
const MAX_DIM = 1024;
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const IEND = Buffer.from([0x49, 0x45, 0x4e, 0x44]);

const here = dirname(fileURLToPath(import.meta.url));
const srcPath = join(here, 'entry.png');
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR || '/output');
const outPath = join(outDir, 'entry.png');

const buf = readFileSync(srcPath);
if (buf.length === 0) throw new Error('entry.png is empty');
if (buf.length > MAX_BYTES) throw new Error(`entry.png is ${buf.length} bytes, over the 1 MiB limit`);
if (!buf.subarray(0, 8).equals(PNG_MAGIC)) throw new Error('entry.png is not a PNG (bad magic bytes)');
// The first chunk must be IHDR (13 bytes of header data) so the dimensions
// below are read from a real header, not from a stray byte sequence.
if (buf.length < 33 || buf.readUInt32BE(8) !== 13 || !buf.subarray(12, 16).equals(Buffer.from('IHDR'))) {
  throw new Error('entry.png has no valid IHDR first chunk');
}
// The file must end with a complete IEND chunk: zero-length + "IEND" + CRC.
const tail = buf.subarray(buf.length - 12);
if (tail.readUInt32BE(0) !== 0 || !tail.subarray(4, 8).equals(IEND)) {
  throw new Error('entry.png is truncated (no IEND trailer)');
}
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
if (width === 0 || height === 0) throw new Error('entry.png has zero width or height');
if (width > MAX_DIM || height > MAX_DIM) {
  throw new Error(`entry.png is ${width}x${height}, over the ${MAX_DIM}x${MAX_DIM} limit`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, buf);
chmodSync(outPath, 0o644);
const written = statSync(outPath).size;
if (written !== buf.length) throw new Error('output size mismatch after copy');
console.log(`OK: entry.png ${width}x${height}, ${buf.length} bytes -> ${outPath}`);
