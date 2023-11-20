const process = require("process");
import fs from "fs";

export function renameFile(oldPath, newName) {
  const newPath = getFilePath(newName);
  fs.renameSync(oldPath, newPath);
}

export function getFilePath(fileName) {
  return process.cwd() + `screenshots/${fileName}/ -- e2e.png`;
}
