import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const srcPath = path.dirname(path.dirname(currentFile));

export const dataPath = path.join(srcPath, "data");
export const sqlitePath = path.join(dataPath, "sqlite", "Tienda.sqlite");
