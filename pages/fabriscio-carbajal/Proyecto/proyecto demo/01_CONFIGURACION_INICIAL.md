# Hito 1 — Configuración inicial

## Objetivo

Crear el proyecto, instalar las dependencias y comprobar Express, Bootstrap 5.3.8 y Bootstrap Icons antes de programar `Producto`.

## 1. Crear el proyecto

Ejecuta en PowerShell:

```powershell
mkdir Productos-Express
cd Productos-Express
npm init -y
npm i express
npm i bootstrap-icons
npm i bootstrap@5.3.8
npm i -D prettier
```

Si PowerShell bloquea `npm.ps1`, usa los mismos comandos con `npm.cmd`.

## 2. Configurar package.json

Ejecuta:

```powershell
npm pkg set type=module
npm pkg set main=app.js
npm pkg set scripts.start="node app.js"
npm pkg set scripts.dev="node --watch app.js"
npm pkg set scripts.test="node --test"
npm pkg set engines.node=">=22.13"
```

## 3. Crear carpetas

```powershell
New-Item -ItemType Directory -Force public, public/components, public/css, public/js, public/pages
New-Item -ItemType Directory -Force src/config, src/controllers, src/data/sqlite, src/dtos, src/errors
New-Item -ItemType Directory -Force src/middlewares, src/models, src/repositories, src/routes
New-Item -ItemType Directory -Force src/services, src/utils, src/validators, test
```

La carpeta `src/data/sqlite` debe existir antes de abrir la base de datos. Esto evita el error **Cannot open database because the directory does not exist**.

## 4. Crear archivos compartidos

### src/errors/AppError.js

```js
export class AppError extends Error {
  constructor(mensaje, statusCode = 500, detalles = null) {
    super(mensaje);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.detalles = detalles;
  }
}
```

### src/utils/asyncHandler.js

```js
// Recibe un callback async y captura automáticamente una promesa rechazada.
// Aquí se practican callbacks + promesas en una sola utilidad.
export const asyncHandler = (callback) => (request, response, next) => {
  Promise.resolve(callback(request, response, next)).catch(next);
};
```

### src/middlewares/logger.middleware.js

```js
export function loggerMiddleware(request, response, next) {
  const inicio = Date.now();

  response.on("finish", () => {
    const duracion = Date.now() - inicio;
    console.log(
      `${request.method} ${request.originalUrl} ${response.statusCode} - ${duracion} ms`,
    );
  });

  next();
}
```

### src/middlewares/normalizacion.middleware.js

```js
// Usa Object.entries, map, callbacks y desestructuración para limpiar strings.
export function normalizarBody(request, response, next) {
  if (
    request.body &&
    typeof request.body === "object" &&
    !Array.isArray(request.body)
  ) {
    request.body = Object.fromEntries(
      Object.entries(request.body).map(([campo, valor]) => [
        campo,
        typeof valor === "string" ? valor.trim() : valor,
      ]),
    );
  }

  next();
}
```

### src/middlewares/notFound.middleware.js

```js
export function rutaNoEncontrada(request, response) {
  response.status(404).json({
    mensaje: "Ruta no encontrada",
    metodo: request.method,
    ruta: request.originalUrl,
  });
}
```

### src/middlewares/error.middleware.js

```js
export function manejarErrores(error, request, response, next) {
  console.error(error);
  const statusCode = error.statusCode ?? 500;
  response.status(statusCode).json({
    mensaje: error.message ?? "Error interno del servidor",
    detalles: error.detalles ?? undefined,
  });
}
```

## 5. Crear app.js

```js
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
    nombre: "Productos Express API",
    almacenamiento: "sqlite",
    recursos: ["productos"],
  });
});

app.use(rutaNoEncontrada);
app.use(manejarErrores);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
```

## 6. Crear el index.html temporal

Crea `public/index.html` y copia todo este código:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Prueba inicial</title>
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" />
    <link
      rel="stylesheet"
      href="/bootstrap-icons/font/bootstrap-icons.css"
    />
  </head>
  <body class="bg-light">
    <nav class="navbar navbar-dark bg-primary">
      <div class="container">
        <span class="navbar-brand mb-0 h1">
          <i class="bi bi-box-seam-fill me-2"></i>Productos Express
        </span>
      </div>
    </nav>

    <main class="container py-5">
      <div class="card border-0 shadow-sm mx-auto" style="max-width: 42rem">
        <div class="card-body p-4 p-md-5 text-center">
          <i class="bi bi-bootstrap-fill text-primary display-3"></i>
          <h1 class="h3 mt-3">Configuración correcta</h1>
          <p class="text-secondary">
            Express está publicando Bootstrap 5.3.8 y Bootstrap Icons desde
            las dependencias instaladas con NPM.
          </p>
          <button
            class="btn btn-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#detalle-prueba"
          >
            <i class="bi bi-check-circle me-1"></i>Probar JavaScript
          </button>
          <div id="detalle-prueba" class="collapse mt-3">
            <div class="alert alert-success mb-0">
              Bootstrap CSS, JavaScript e iconos funcionan correctamente.
            </div>
          </div>
        </div>
      </div>
    </main>

    <script src="/bootstrap/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
```

Este archivo es únicamente una prueba inicial. Se eliminará en el hito 10 cuando `/` redirija al frontend CRUD definitivo.

## 7. Probar el hito

Inicia el servidor:

```powershell
npm run dev
```

En otra terminal:

```powershell
Invoke-RestMethod -Method GET -Uri "http://localhost:4214/api"
```

Resultado esperado: estado `200` y el nombre `Productos Express API`.

Abre también:

```text
http://localhost:4214/
```

Comprueba lo siguiente:

1. La tarjeta tiene estilos Bootstrap.
2. Se muestran los iconos de caja y Bootstrap.
3. Al presionar **Probar JavaScript**, aparece la alerta verde.
4. En la consola del navegador no aparecen errores `404` para Bootstrap.

## Checklist

- [ ] Node cumple la versión mínima.
- [ ] Las dependencias se instalaron.
- [ ] Existe `src/data/sqlite`.
- [ ] `npm run dev` inicia sin errores.
- [ ] `GET /api` responde correctamente.
- [ ] `public/index.html` se abre desde Express.
- [ ] Bootstrap 5.3.8 aplica estilos.
- [ ] Bootstrap Icons muestra los iconos.
- [ ] El componente Collapse funciona.
