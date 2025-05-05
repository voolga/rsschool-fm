import path from "path";
import { createReadStream } from "fs";
import { createHash } from "crypto";
import { pipeline } from "stream/promises";

export const calcHash = async (currentDir, filePath) => {
  const completedPath = path.resolve(currentDir, filePath);
  const hashStream = createHash("sha256");

  await pipeline(createReadStream(completedPath), hashStream);

  const result = hashStream.digest("hex");
  console.log(result);
};
