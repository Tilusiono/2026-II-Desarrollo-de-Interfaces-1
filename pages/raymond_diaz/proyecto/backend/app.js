import express from "express";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { closeDatabase, databasePath, getDatabase } from "./src/config/database.js";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import { loggerMiddleware } from "./src/middlewares/logger.middleware.js";
import { normalizacionMiddleware } from "./src/middlewares/normalizacion.middleware.js";
import { notFoundMiddleware } from "./src/middlewares/notFound.middleware.js";
import { protegerEscritura, securityHeaders } from "./src/middlewares/security.middleware.js";
import catalogosRoutes from "./src/routes/catalogos.routes.js";
import estadisticasRoutes from "./src/routes/estadisticas.routes.js";
import productosRoutes from "./src/routes/productos.routes.js";
import usuariosRoutes from "./src/routes/usuarios.routes.js";

const backendDirectory = path.dirname(fileURLToPath(import.meta.url));
const frontendDirectory = path.resolve(backendDirectory, "../frontend");

export const app = express();
app.disable("x-powered-by");
app.use(securityHeaders);
app.use(loggerMiddleware);
app.use(express.json({ limit: "256kb" }));
app.use(express.urlencoded({ extended: false, limit: "256kb" }));
app.use(normalizacionMiddleware);
app.use("/api", protegerEscritura);

app.get("/api", (_request, response) => {
  const result = getDatabase().prepare("SELECT 1 AS conectado").get();
  response.json({
    ok: true,
    nombre: "API Tienda de Computadoras",
    version: "1.0.0",
    baseDatos: result.conectado === 1 ? "SQLite conectada" : "Sin conexión",
    archivo: path.basename(databasePath),
  });
});
app.use("/api/productos", productosRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/catalogos", catalogosRoutes);
app.use("/api/estadisticas", estadisticasRoutes);

app.use("/bootstrap", express.static(path.join(backendDirectory, "node_modules/bootstrap/dist"), { maxAge: "1d" }));
app.use("/bootstrap-icons", express.static(path.join(backendDirectory, "node_modules/bootstrap-icons/font"), { maxAge: "1d" }));
app.use(express.static(frontendDirectory));
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const isMain = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (isMain) {
  const port = Number(process.env.PORT) || 4214;
  const server = app.listen(port, () => {
    console.log(`Tienda de Computadoras disponible en http://localhost:${port}`);
    console.log(`Base de datos: ${databasePath}`);
  });
  const shutdown = () => server.close(() => {
    closeDatabase();
    process.exit(0);
  });
  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
}
