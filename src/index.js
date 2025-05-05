import readline from "readline";
import { runCommand } from "../lib/run-command.js";

const args = process.argv.slice(2);
const output = args[0].split("=")[1] || "User";

const currentDir = { dir: process.cwd() };

console.log(`Welcome to the File Manager, ${output}!`);
console.log("You are currently in", currentDir.dir);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => handleUserInput(input, currentDir.dir));

rl.on("close", () => {
  console.log(`Thank you for using File Manager, ${output}, goodbye!`);
});

const handleUserInput = async (input) => {
  const formattedInput = input.trim();

  if (formattedInput.toLowerCase() === ".exit") {
    rl.close();
    return;
  }

  await runCommand(formattedInput, currentDir.dir, (newDir) => {
    currentDir.dir = newDir;
  });

  console.log("You are currently in", currentDir.dir);
};
