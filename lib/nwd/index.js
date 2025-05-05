import path from "path";
import { readdir } from "fs/promises";

export const up = async (currentDir) => {
  const newDir = path.dirname(currentDir);

  return newDir;
};

export const cd = async (currentDir, targetPath) => {
  const newPath = path.isAbsolute(targetPath)
    ? targetPath
    : path.resolve(currentDir, targetPath);

  return newPath;
};

export const ls = async (currentDir) => {
  const files = await readdir(currentDir, { withFileTypes: true });

  const entries = files.map((file) => ({
    Name: file.name,
    Type: file.isDirectory() ? "Directory" : "File",
  }));
  const sortedEntries = entries.sort(
    (a, b) => a.Type.localeCompare(b.Type) || a.Name.localeCompare(b.Name)
  );
  console.table(sortedEntries);
};
