import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loggerMiddleware } from "./src/middlewares/logger.middleware.js";
import { normalizarBody } from "./src/middlewares/normalizacion.middleware.js";
import { rutaNoEncontrada } from "./src/middlewares/notFound.middleware.js";
import { manejarErrores } from "./src/middlewares/error.middleware.js";


// RUTAS

import AreasRoutes from "./src/routes/Area.routes.js";
import AsistenciaRoutes from "./src/routes/Asistencia.routes.js";
import EmpleadoRoutes from "./src/routes/Empleado.routes.js";
import PermisoRoutes from "./src/routes/Permiso.routes.js";
import SedeRoutes from "./src/routes/Sede.routes.js";
import VacacionesRoutes from "./src/routes/Vacaciones.routes.js";
import CargoRoutes from "./src/routes/Cargo.routes.js";
import tipoEmpleadoRoutes from "./src/routes/TipoEmpleado.routes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT ?? 3212;

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(normalizarBody);
app.use(loggerMiddleware);

app.use("/bootstrap", express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
app.use("/bootstrap-icons", express.static(path.join(__dirname, "node_modules/bootstrap-icons")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api", (request, response) => {
  response.json({
    nombre: "Gestion Express API",
    almacenamiento: "sqlite",
    recursos: ["Area, Asistencia, Empleado, Permiso, Sede, Vacante, Cargo"],
  });
});

// RUTAS

app.use("/api/areas", AreasRoutes);
app.use("/api/asistencias", AsistenciaRoutes);
app.use("/api/empleados", EmpleadoRoutes);
app.use("/api/permisos", PermisoRoutes);
app.use("/api/sedes", SedeRoutes);
app.use("/api/vacaciones", VacacionesRoutes);
app.use("/api/cargos", CargoRoutes);
app.use("/api/tipos-empleado", tipoEmpleadoRoutes);

app.use(rutaNoEncontrada);
app.use(manejarErrores);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});



