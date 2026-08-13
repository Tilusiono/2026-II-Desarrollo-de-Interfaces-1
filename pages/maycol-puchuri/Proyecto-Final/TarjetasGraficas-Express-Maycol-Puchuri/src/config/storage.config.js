import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const srcPath = path.dirname(path.dirname(currentFile));

export const dataPath = path.join(srcPath, "data");
export const sqliteDirectory = path.join(dataPath, "sqlite");
export const sqlitePath = path.join(sqliteDirectory, "tarjetas_graficas.sqlite");

fs.mkdirSync(sqliteDirectory, { recursive: true });
