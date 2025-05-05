import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

export const compressFile = async (currentDir, source, destination) => {
  const sourcePath = path.resolve(currentDir, source);
  const destPath = path.resolve(currentDir, destination);

  await pipeline(
    createReadStream(sourcePath),
    createBrotliCompress(),
    createWriteStream(destPath)
  );

  console.log(`--${path.basename(source)} was compressed to ${destination}`);
};

export const decompressFile = async (currentDir, source, destination) => {
  const sourcePath = path.resolve(currentDir, source);
  const destPath = path.resolve(currentDir, destination);

  await pipeline(
    createReadStream(sourcePath),
    createBrotliDecompress(),
    createWriteStream(destPath)
  );

  console.log(`--${path.basename(source)} was decompressed to ${destination}`);
};
