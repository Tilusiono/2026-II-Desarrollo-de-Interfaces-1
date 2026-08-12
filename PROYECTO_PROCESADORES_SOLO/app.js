import express from "express";
import path from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { loadEnvFile } from "node:process";

import procesadoresRoutes from "./src/routes/procesadores.routes.js";
import { loggerMiddleware } from "./src/middlewares/logger.middleware.js";
import { normalizarBody } from "./src/middlewares/normalizacion.middleware.js";
import { cabecerasSeguras } from "./src/middlewares/security.middleware.js";
import { rutaNoEncontrada } from "./src/middlewares/notFound.middleware.js";
import { manejarErrores } from "./src/middlewares/error.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, ".env");
if (existsSync(envPath)) loadEnvFile(envPath);

const app = express();
const PORT = process.env.PORT ?? 4214;

app.disable("x-powered-by");
app.use(cabecerasSeguras);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(normalizarBody);
app.use(loggerMiddleware);

app.use("/bootstrap", express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
app.use("/bootstrap-icons", express.static(path.join(__dirname, "node_modules/bootstrap-icons")));

const publicPath = path.join(__dirname, "public");
const pagesPath = path.join(publicPath, "pages");
app.use(express.static(publicPath));

app.get("/", (request, response) => response.redirect("/procesadores"));
app.get("/procesadores", (request, response) =>
  response.sendFile(path.join(pagesPath, "procesadores.html")),
);
app.get("/api", (request, response) => {
  response.json({
    nombre: "Procesadores API",
    version: "2.0.0",
    almacenamiento: "SQLite",
    patron: "Repository + Service + Controller",
    seguridad: "Operaciones de escritura protegidas con x-api-key",
    concurrencia: "WAL + busy_timeout + transacciones BEGIN IMMEDIATE",
    multihilo: "/api/procesadores/estadisticas usa Worker Threads",
    recursos: ["procesadores", "auditoria_procesadores"],
  });
});

app.use("/api/procesadores", procesadoresRoutes);
app.use(rutaNoEncontrada);
app.use(manejarErrores);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
