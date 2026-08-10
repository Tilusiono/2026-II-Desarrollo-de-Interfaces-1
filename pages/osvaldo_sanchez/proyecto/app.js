import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loggerMiddleware } from "./src/middlewares/logger.middleware.js";
import { normalizarBody } from "./src/middlewares/normalizacion.middleware.js";
import { rutaNoEncontrada } from "./src/middlewares/notFound.middleware.js";
import { manejarErrores } from "./src/middlewares/error.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT ?? 4214;

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(normalizarBody);
app.use(loggerMiddleware);

app.use("/bootstrap", express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
app.use("/bootstrap-icons", express.static(path.join(__dirname, "node_modules/bootstrap-icons")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api", (request, response) => {
  response.json({
    nombre: "Tienda ",
    almacenamiento: "sqlite",
    recursos: ["productos, automoviles"],
  });
});

app.use(rutaNoEncontrada);
app.use(manejarErrores);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
