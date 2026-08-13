# Hito 4 — GET: listar y obtener

## Objetivo

Agregar `GET /api/productos` y `GET /api/productos/:id` sin modificar el POST que ya funciona.

## 1. Crear src/middlewares/id.middleware.js

```js
export function validarId(request, response, next) {
  const id = Number(request.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return response
      .status(400)
      .json({ mensaje: "El ID debe ser un entero positivo" });
  }
  request.params.id = id;
  next();
}
```

## 2. Agregar métodos al Service

Pega estos métodos dentro de `ProductosService`, después del constructor:

```js
  async listar() {
    const productosModel = await this.productoRepository.listar();
    return productosModel.map(
      (productoModel) => new ProductoResponseDto(productoModel),
    );
  }

  async obtener(id) {
    const productoModel = await this.productoRepository.buscarPorId(id);
    if (!productoModel) throw new AppError("Producto no encontrado", 404);
    return new ProductoResponseDto(productoModel);
  }
```

## 3. Agregar métodos al Controller

Pega dentro de `ProductosController`:

```js
  async listar(response) {
    const productosResponseDto = await this.productosService.listar();
    response.json({
      total: productosResponseDto.length,
      productosResponseDto,
    });
  }

  async obtener(id, response) {
    const productoResponseDto = await this.productosService.obtener(id);
    response.json({ productoResponseDto });
  }
```

## 4. Reemplazar src/routes/productos.routes.js

```js
import { Router } from "express";
import { productosController as controller } from "../controllers/productos.controller.js";
import { validarId } from "../middlewares/id.middleware.js";
import { validarProductoCompleto } from "../middlewares/validacion.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ProductoRequestDto } from "../dtos/ProductoDto.js";

const router = Router();

router.get("/", asyncHandler((request, response) => controller.listar(response)));
router.get(
  "/:id",
  validarId,
  asyncHandler((request, response) =>
    controller.obtener(Number(request.params.id), response),
  ),
);
router.post(
  "/",
  validarProductoCompleto,
  asyncHandler((request, response) => {
    const productoRequestDto = new ProductoRequestDto(request.body);
    return controller.crear(productoRequestDto, response);
  }),
);

export default router;
```

## 5. Probar listado

```http
GET http://localhost:4214/api/productos
```

Debe responder `200`, `total: 1` y un arreglo `productosResponseDto`.

## 6. Probar obtener por ID

```http
GET http://localhost:4214/api/productos/1
```

Debe responder `200` con `productoResponseDto.id: 1`.

## 7. Probar un ID inexistente

```http
GET http://localhost:4214/api/productos/999
```

Debe responder `404` con `Producto no encontrado`.

## 8. Crear el frontend de validación GET

Crea `public/hitos/04-get.html` y copia todo este código:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hito 4 - Probar GET</title>
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/bootstrap-icons/font/bootstrap-icons.css" />
  </head>
  <body class="bg-light">
    <nav class="navbar navbar-dark bg-primary">
      <div class="container">
        <span class="navbar-brand">
          <i class="bi bi-download me-2"></i>Hito 4 · GET
        </span>
      </div>
    </nav>

    <main class="container py-4">
      <div id="mensaje" class="alert d-none" role="alert"></div>

      <section class="card border-0 shadow-sm mb-4">
        <div class="card-body p-4">
          <h1 class="h4">Probar las dos rutas GET</h1>
          <div class="row g-3 align-items-end">
            <div class="col-md-4">
              <button id="btn-listar" class="btn btn-primary w-100">
                <i class="bi bi-list-ul me-1"></i>GET: listar todos
              </button>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="producto-id">ID del producto</label>
              <input id="producto-id" type="number" min="1" value="1" class="form-control" />
            </div>
            <div class="col-md-4">
              <button id="btn-obtener" class="btn btn-outline-primary w-100">
                <i class="bi bi-search me-1"></i>GET: obtener por ID
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h2 class="h5 mb-0">Resultado</h2>
            <span id="total" class="badge text-bg-secondary">0 producto(s)</span>
          </div>
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>ID</th><th>Código</th><th>Nombre</th><th>Categoría</th>
                  <th>Stock</th><th>Precio</th><th>Estado</th>
                </tr>
              </thead>
              <tbody id="tabla-productos">
                <tr><td colspan="7" class="text-center text-secondary py-4">Ejecuta una consulta GET.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>

    <script>
      const mensaje = document.querySelector("#mensaje");
      const tabla = document.querySelector("#tabla-productos");
      const total = document.querySelector("#total");

      document.querySelector("#btn-listar").addEventListener("click", async () => {
        await ejecutarGet("/api/productos", (respuesta) => respuesta.productosResponseDto);
      });

      document.querySelector("#btn-obtener").addEventListener("click", async () => {
        const id = Number(document.querySelector("#producto-id").value);
        await ejecutarGet(`/api/productos/${id}`, (respuesta) => [respuesta.productoResponseDto]);
      });

      async function ejecutarGet(ruta, extraerProductos) {
        try {
          const respuestaHttp = await fetch(ruta);
          const respuesta = await respuestaHttp.json();
          if (!respuestaHttp.ok) {
            throw new Error(`HTTP ${respuestaHttp.status} · ${respuesta.mensaje}`);
          }

          const productos = extraerProductos(respuesta);
          renderizar(productos);
          mostrarMensaje(`HTTP ${respuestaHttp.status} · GET correcto`, true);
        } catch (error) {
          renderizar([]);
          mostrarMensaje(error.message, false);
        }
      }

      function renderizar(productos) {
        total.textContent = `${productos.length} producto(s)`;
        if (!productos.length) {
          tabla.innerHTML = '<tr><td colspan="7" class="text-center text-secondary py-4">Sin resultados.</td></tr>';
          return;
        }

        tabla.innerHTML = productos.map((producto) => `
          <tr>
            <td>${producto.id}</td>
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>${producto.stock}</td>
            <td>S/ ${Number(producto.precio).toFixed(2)}</td>
            <td><span class="badge text-bg-${producto.activo ? "success" : "secondary"}">${producto.activo ? "Activo" : "Inactivo"}</span></td>
          </tr>
        `).join("");
      }

      function mostrarMensaje(texto, correcto) {
        mensaje.className = `alert alert-${correcto ? "success" : "danger"}`;
        mensaje.textContent = texto;
      }
    </script>
    <script src="/bootstrap/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
```

## 9. Probar GET desde el frontend

Abre:

```text
http://localhost:4214/hitos/04-get.html
```

1. Presiona **GET: listar todos** y comprueba que la tabla muestre los productos creados.
2. Escribe un ID existente y presiona **GET: obtener por ID**.
3. Escribe `9999` y repite la consulta; debe aparecer `HTTP 404`.
4. No avances hasta que las tres comprobaciones funcionen.

## Checklist

- [ ] GET general devuelve una colección.
- [ ] GET por ID devuelve un objeto.
- [ ] ID inválido devuelve 400.
- [ ] ID inexistente devuelve 404.
- [ ] POST continúa respondiendo 201 para un código nuevo.
- [ ] La página `04-get.html` lista los productos.
- [ ] La consulta visual por ID funciona.
- [ ] El frontend muestra el error 404.
