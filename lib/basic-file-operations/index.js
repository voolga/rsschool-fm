import path from "path";
import fs from "fs";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { stat, unlink } from "fs/promises";

export const cat = async (currentDir, filePath) => {
  const pathToFile = path.resolve(currentDir, filePath);

  // await pipeline(
  //   createReadStream(pathToFile),
  //   process.stdout
  // );

  fs.readFile(pathToFile, "utf8", (err, data) => {
    if (err) {
      console.error("--Error reading file:", err);
      return;
    }
    console.log(`--File ${filePath} content--\n`, data);
  });
};

export const add = async (currentDir, fileName) => {
  const pathToFile = path.resolve(currentDir, fileName);

  fs.writeFile(pathToFile, "", (err) => {
    if (err) {
      console.error("--Error creating file:", err);
      return;
    }

    console.log(`--File ${fileName} created`);
  });
};

export const mkdir = async (currentDir, dirName) => {
  const pathToDir = path.resolve(currentDir, dirName);

  fs.mkdir(pathToDir, (err) => {
    if (err) {
      console.error("--Error creating directory:", err);
      return;
    }
    console.log(`--Directory ${dirName} created`);
  });
};

export const rn = async (currentDir, oldName, newName) => {
  const pathToFile = path.resolve(currentDir, oldName);
  const newPathToFile = path.resolve(currentDir, newName);

  fs.rename(pathToFile, newPathToFile, (err) => {
    if (err) {
      console.error("--Error renaming file:", err);
      return;
    }
    console.log(`--File ${oldName} renamed to ${newName}`);
  });
};

export const rm = async (currentDir, fileName) => {
  const pathToFile = path.resolve(currentDir, fileName);

  fs.unlink(pathToFile, (err) => {
    if (err) {
      console.error("--Error deleting file:", err);
      return;
    }
    console.log(`--File ${fileName} deleted`);
  });
};

export const cp = async (currentDir, source, targetDir) => {
  const sourcePath = path.resolve(currentDir, source);
  const destinationPath = path.resolve(currentDir, targetDir);
  const destPath = path.join(destinationPath, path.basename(source));

  const sourceStats = await stat(sourcePath);
  if (!sourceStats.isFile()) throw new Error("Source is not a file");

  const targetStats = await stat(destinationPath);
  if (!targetStats.isDirectory()) throw new Error("Target is not a directory");

  await pipeline(createReadStream(sourcePath), createWriteStream(destPath));

  console.log(
    `--File ${path.basename(source)} copied to ${targetDir} directory`
  );
};

export const mv = async (currentDir, source, targetDir) => {
  const sourcePath = path.resolve(currentDir, source);
  const destinationPath = path.resolve(currentDir, targetDir);
  const destPath = path.join(destinationPath, path.basename(source));

  const sourceStats = await stat(sourcePath);
  if (!sourceStats.isFile()) throw new Error("Source is not a file");

  const targetStats = await stat(destinationPath);
  if (!targetStats.isDirectory()) throw new Error("Target is not a directory");

  await pipeline(createReadStream(sourcePath), createWriteStream(destPath));

  await unlink(sourcePath);

  console.log(`--File ${source} moved to ${targetDir} directory`);
};
