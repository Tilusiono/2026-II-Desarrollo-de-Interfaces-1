import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import tarjetasGraficasRoutes from "./src/routes/tarjetasGraficas.routes.js";
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

app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist")),
);

app.use(
  "/bootstrap-icons",
  express.static(path.join(__dirname, "node_modules/bootstrap-icons")),
);

const publicPath = path.join(__dirname, "public");
const pagesPath = path.join(publicPath, "pages");

app.use(express.static(publicPath));

app.get("/", (request, response) => {
  response.redirect("/tarjetas-graficas");
});

app.get("/tarjetas-graficas", (request, response) => {
  response.sendFile(path.join(pagesPath, "tarjetas-graficas.html"));
});

app.get("/api", (request, response) => {
  response.json({
    nombre: "Tarjetas Gráficas Express API",
    almacenamiento: "sqlite",
    recursos: ["tarjetas-graficas"],
  });
});

app.use("/api/tarjetas-graficas", tarjetasGraficasRoutes);

app.use(rutaNoEncontrada);
app.use(manejarErrores);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
