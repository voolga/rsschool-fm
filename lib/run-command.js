import { ls, up, cd } from "./nwd/index.js";
import {
  cat,
  add,
  rm,
  rn,
  cp,
  mv,
  mkdir,
} from "./basic-file-operations/index.js";
import { handleOsCommand } from "./os/index.js";
import { calcHash } from "./hash/index.js";
const expectedArgsQty = {
  up: 0,
  cd: 1,
  ls: 0,
  cat: 1,
  add: 1,
  rn: 2,
  cp: 2,
  mv: 2,
  rm: 1,
  mkdir: 1,
  os: 1,
  hash: 1,
  compress: 2,
  decompress: 2,
};

export const runCommand = async (input, currentDir, updateDir) => {
  const parts = input.trim().split(" ");
  const command = parts[0];
  const args = parts.slice(1);

  const isArgsValid =
    expectedArgsQty[command] !== undefined &&
    args.length === expectedArgsQty[command];

  if (!isArgsValid) {
    console.log("Invalid input");

    return;
  }

  try {
    switch (command) {
      case "up":
        updateDir(await up(currentDir));
        break;
      case "cd":
        const newDir = await cd(currentDir, args[0]);
        updateDir(newDir);
        break;
      case "ls":
        await ls(currentDir);
        break;
      case "cat":
        await cat(currentDir, args[0]);
        break;
      case "add":
        await add(currentDir, args[0]);
        break;
      case "rm":
        await rm(currentDir, args[0]);
        break;
      case "rn":
        await rn(currentDir, args[0], args[1]);
        break;
      case "cp":
        await cp(currentDir, args[0], args[1]);
        break;
      case "mv":
        await mv(currentDir, args[0], args[1]);
        break;
      case "mkdir":
        await mkdir(currentDir, args[0]);
        break;
      case "os":
        handleOsCommand(args[0]);
        break;
      case "hash":
        await calcHash(currentDir, args[0]);
        break;
      default:
        console.log("Invalid input");
    }
  } catch (e) {
    console.log("Operation failed", e.message);
  }
};
