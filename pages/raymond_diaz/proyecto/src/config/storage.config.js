import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const srcPath = path.dirname(path.dirname(currentFile));

export const dataPath = path.join(srcPath, "data");
export const sqlitePath = process.env.SQLITE_PATH
  ? path.resolve(process.env.SQLITE_PATH)
  : path.join(dataPath, "sqlite", "productos.sqlite");
