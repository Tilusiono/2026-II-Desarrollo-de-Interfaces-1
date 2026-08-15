import express from "express";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { loggerMiddleware } from "./src/middlewares/logger.middleware.js";
import { normalizarBody } from "./src/middlewares/normalizacion.middleware.js";
import { rutaNoEncontrada } from "./src/middlewares/notFound.middleware.js";
import { manejarErrores } from "./src/middlewares/error.middleware.js";
import productosRoutes from "./src/routes/productos.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const app = express();
const PORT = Number(process.env.PORT) || 4214;

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(normalizarBody);
app.use(loggerMiddleware);

app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist")),
);
app.use(
  "/bootstrap-icons",
  express.static(path.join(__dirname, "node_modules/bootstrap-icons")),
);
app.use(express.static(path.join(__dirname, "public")));

app.get("/api", (request, response) => {
  response.json({
    nombre: "Productos Express API",
    almacenamiento: "sqlite",
    recursos: ["productos"],
  });
});
app.use("/api/productos", productosRoutes);

app.use(rutaNoEncontrada);
app.use(manejarErrores);

export function iniciarServidor(puerto = PORT) {
  return app.listen(puerto, () => {
    console.log(`Servidor ejecutándose en http://localhost:${puerto}`);
  });
}

const esArchivoPrincipal =
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (esArchivoPrincipal) iniciarServidor();
