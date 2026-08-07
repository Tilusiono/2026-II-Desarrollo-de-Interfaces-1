# Hito 3 — POST: crear Producto

## Objetivo

Implementar únicamente `POST /api/productos` siguiendo el flujo DTO → Controller → Service → Model → Repository → SQLite.

## 1. Crear src/models/Producto.js

```js
class Producto {
  #id;
  #codigo;
  #nombre;
  #categoria;
  #stock;

  constructor(
    id,
    codigo,
    nombre,
    categoria,
    stock,
    precio,
    peso,
    descripcion,
    activo,
    fechaVencimiento,
    horaRegistro,
    fechaHoraRegistro,
    imagen,
    imagenMimeType,
  ) {
    this.#id = Number(id);
    this.#codigo = codigo;
    this.#nombre = nombre;
    this.#categoria = categoria;
    this.#stock = Number(stock);
    this.precio = Number(precio);
    this.peso = peso === null || peso === undefined ? null : Number(peso);
    this.descripcion = descripcion ?? null;
    this.activo = Boolean(activo);
    this.fechaVencimiento = fechaVencimiento ?? null;
    this.horaRegistro = horaRegistro;
    this.fechaHoraRegistro = fechaHoraRegistro;
    this.imagen = imagen ?? null;
    this.imagenMimeType = imagenMimeType ?? null;
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    this.#id = Number(id);
  }

  get codigo() {
    return this.#codigo;
  }

  set codigo(codigo) {
    this.#codigo = codigo;
  }

  get nombre() {
    return this.#nombre;
  }

  set nombre(nombre) {
    this.#nombre = nombre;
  }

  get categoria() {
    return this.#categoria;
  }

  set categoria(categoria) {
    this.#categoria = categoria;
  }

  get stock() {
    return this.#stock;
  }

  set stock(stock) {
    this.#stock = Number(stock);
  }
}

export default Producto;
```

## 2. Crear src/dtos/ProductoDto.js

```js
export class ProductoRequestDto {
  constructor(requestBody = {}) {
    this.codigo = requestBody.codigo;
    this.nombre = requestBody.nombre;
    this.categoria = requestBody.categoria;
    this.stock = requestBody.stock;
    this.precio = requestBody.precio;
    this.peso = requestBody.peso;
    this.descripcion = requestBody.descripcion;
    this.activo = requestBody.activo;
    this.fechaVencimiento = requestBody.fechaVencimiento;
    this.horaRegistro = requestBody.horaRegistro;
    this.fechaHoraRegistro = requestBody.fechaHoraRegistro;
    this.imagenBase64 = requestBody.imagenBase64;
  }
}

export class ProductoConsultaDto {
  constructor(queryParams = {}) {
    this.texto = queryParams.texto;
    this.categoria = queryParams.categoria;
    this.activo = queryParams.activo;
    this.precioMin = queryParams.precioMin;
    this.precioMax = queryParams.precioMax;
  }
}

export class ProductoResponseDto {
  constructor(productoModel) {
    this.id = productoModel.id;
    this.codigo = productoModel.codigo;
    this.nombre = productoModel.nombre;
    this.categoria = productoModel.categoria;
    this.stock = productoModel.stock;
    this.precio = productoModel.precio;
    this.peso = productoModel.peso;
    this.descripcion = productoModel.descripcion;
    this.activo = productoModel.activo;
    this.fechaVencimiento = productoModel.fechaVencimiento;
    this.horaRegistro = productoModel.horaRegistro;
    this.fechaHoraRegistro = productoModel.fechaHoraRegistro;
    this.imagenMimeType = productoModel.imagenMimeType;
    this.imagenBase64 = productoModel.imagen
      ? `data:${productoModel.imagenMimeType};base64,${Buffer.from(
          productoModel.imagen,
        ).toString("base64")}`
      : null;
  }
}
```

## 3. Crear validadores y middleware

### src/validators/comunes.validator.js

```js
export function esTexto(valor) {
  return typeof valor === "string" && valor.trim() !== "";
}

export function esEnteroNoNegativo(valor) {
  return Number.isInteger(Number(valor)) && Number(valor) >= 0;
}

export function esNumeroNoNegativo(valor) {
  return Number.isFinite(Number(valor)) && Number(valor) >= 0;
}

export function esFecha(valor) {
  return !Number.isNaN(Date.parse(valor));
}

export function esHora(valor) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(String(valor));
}
```

### src/validators/producto.validator.js

```js
import {
  esEnteroNoNegativo,
  esFecha,
  esHora,
  esNumeroNoNegativo,
  esTexto,
} from "./comunes.validator.js";

const CATEGORIAS = ["TEC", "HOG", "OFI", "ALI"];

function esImagenBase64(valor) {
  return /^data:image\/[a-zA-Z0-9.+-]+;base64,[a-zA-Z0-9+/=]+$/.test(
    String(valor),
  );
}

function validarCamposProducto(producto) {
  const errores = [];

  if (
    producto.codigo !== undefined &&
    producto.codigo !== "" &&
    !esTexto(producto.codigo)
  )
    errores.push("codigo debe ser texto");
  if (
    producto.nombre !== undefined &&
    producto.nombre !== "" &&
    !esTexto(producto.nombre)
  )
    errores.push("nombre debe ser texto");
  if (
    producto.categoria !== undefined &&
    !CATEGORIAS.includes(producto.categoria)
  )
    errores.push("categoria no es válida");
  if (producto.stock !== undefined && !esEnteroNoNegativo(producto.stock))
    errores.push("stock debe ser un entero no negativo");
  if (producto.precio !== undefined && !esNumeroNoNegativo(producto.precio))
    errores.push("precio debe ser un número no negativo");
  if (
    producto.peso !== undefined &&
    producto.peso !== null &&
    !esNumeroNoNegativo(producto.peso)
  )
    errores.push("peso debe ser un número no negativo o null");
  if (
    producto.descripcion !== undefined &&
    producto.descripcion !== null &&
    typeof producto.descripcion !== "string"
  )
    errores.push("descripcion debe ser texto o null");
  if (producto.activo !== undefined && typeof producto.activo !== "boolean")
    errores.push("activo debe ser booleano");
  if (
    producto.fechaVencimiento !== undefined &&
    producto.fechaVencimiento !== null &&
    !esFecha(producto.fechaVencimiento)
  )
    errores.push("fechaVencimiento no es válida");
  if (producto.horaRegistro !== undefined && !esHora(producto.horaRegistro))
    errores.push("horaRegistro debe usar HH:mm");
  if (
    producto.fechaHoraRegistro !== undefined &&
    !esFecha(producto.fechaHoraRegistro)
  )
    errores.push("fechaHoraRegistro no es válida");
  if (
    producto.imagenBase64 !== undefined &&
    producto.imagenBase64 !== null &&
    producto.imagenBase64 !== "" &&
    !esImagenBase64(producto.imagenBase64)
  )
    errores.push("imagenBase64 debe ser una imagen Base64 válida o null");

  return errores;
}

export function validarProductoCompleto(producto) {
  const errores = validarCamposProducto(producto);

  if (!esTexto(producto.codigo)) errores.push("codigo es obligatorio");
  if (!esTexto(producto.nombre)) errores.push("nombre es obligatorio");
  if (producto.categoria === undefined)
    errores.push("categoria es obligatoria");
  if (producto.stock === undefined) errores.push("stock es obligatorio");
  if (producto.precio === undefined) errores.push("precio es obligatorio");
  if (producto.activo === undefined) errores.push("activo es obligatorio");
  if (producto.horaRegistro === undefined)
    errores.push("horaRegistro es obligatorio");
  if (producto.fechaHoraRegistro === undefined)
    errores.push("fechaHoraRegistro es obligatoria");

  return errores;
}

export function validarProductoParcial(producto) {
  if (Object.keys(producto).length === 0)
    return ["Debe enviar al menos un campo"];
  return validarCamposProducto(producto);
}
```

### src/middlewares/validacion.middleware.js

```js
import {
  validarProductoCompleto as revisarProductoCompleto,
  validarProductoParcial as revisarProductoParcial,
} from "../validators/producto.validator.js";

function continuarSiEsValido(errores, response, next) {
  if (errores.length > 0) {
    return response.status(400).json({ mensaje: "Datos no válidos", errores });
  }
  next();
}

export function validarProductoCompleto(request, response, next) {
  continuarSiEsValido(revisarProductoCompleto(request.body), response, next);
}

export function validarProductoParcial(request, response, next) {
  continuarSiEsValido(revisarProductoParcial(request.body), response, next);
}
```

### src/utils/texto.js

```js
export function normalizarTexto(valor = "") {
  return String(valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function objetoContieneTexto(objeto, texto) {
  const buscado = normalizarTexto(texto);
  if (!buscado) return true;

  return Object.values(objeto).some((valor) =>
    normalizarTexto(valor).includes(buscado),
  );
}
```

## 4. Reemplazar src/repositories/ProductoRepository.js

Este hito incorpora solamente las operaciones internas necesarias para crear y recuperar el registro creado.

```js
import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";
import Producto from "../models/Producto.js";

const require = createRequire(import.meta.url);

export class ProductoRepository {
  constructor(archivo = sqlitePath) {
    const { DatabaseSync } = require("node:sqlite");
    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo VARCHAR(20) NOT NULL UNIQUE,
        nombre TEXT NOT NULL,
        categoria CHAR(3) NOT NULL,
        stock INTEGER NOT NULL DEFAULT 0,
        precio DECIMAL(10, 2) NOT NULL,
        peso REAL,
        descripcion TEXT,
        activo BOOLEAN NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
        fechaVencimiento DATE,
        horaRegistro TIME NOT NULL,
        fechaHoraRegistro DATETIME NOT NULL,
        imagen BLOB,
        imagenMimeType VARCHAR(100)
      )
    `);
  }

  async listar() {
    const filas = this.db.prepare("SELECT * FROM productos ORDER BY id").all();

    return filas.map(
      (fila) =>
        new Producto(
          fila.id,
          fila.codigo,
          fila.nombre,
          fila.categoria,
          fila.stock,
          fila.precio,
          fila.peso,
          fila.descripcion,
          fila.activo,
          fila.fechaVencimiento,
          fila.horaRegistro,
          fila.fechaHoraRegistro,
          fila.imagen ? Buffer.from(fila.imagen) : null,
          fila.imagenMimeType,
        ),
    );
  }

  async buscarPorId(id) {
    const fila = this.db
      .prepare("SELECT * FROM productos WHERE id = ?")
      .get(Number(id));

    if (!fila) return null;

    return new Producto(
      fila.id,
      fila.codigo,
      fila.nombre,
      fila.categoria,
      fila.stock,
      fila.precio,
      fila.peso,
      fila.descripcion,
      fila.activo,
      fila.fechaVencimiento,
      fila.horaRegistro,
      fila.fechaHoraRegistro,
      fila.imagen ? Buffer.from(fila.imagen) : null,
      fila.imagenMimeType,
    );
  }

  async crear(productoModel) {
    const resultado = this.db
      .prepare(
        `
        INSERT INTO productos (
          codigo, nombre, categoria, stock, precio, peso, descripcion,
          activo, fechaVencimiento, horaRegistro, fechaHoraRegistro,
          imagen, imagenMimeType
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      )
      .run(
        productoModel.codigo,
        productoModel.nombre,
        productoModel.categoria,
        productoModel.stock,
        productoModel.precio,
        productoModel.peso,
        productoModel.descripcion,
        Number(productoModel.activo),
        productoModel.fechaVencimiento,
        productoModel.horaRegistro,
        productoModel.fechaHoraRegistro,
        productoModel.imagen,
        productoModel.imagenMimeType,
      );

    return this.buscarPorId(Number(resultado.lastInsertRowid));
  }
}
```

## 5. Crear src/services/productos.service.js

```js
import { AppError } from "../errors/AppError.js";
import Producto from "../models/Producto.js";
import { ProductoResponseDto } from "../dtos/ProductoDto.js";
import { ProductoRepository } from "../repositories/ProductoRepository.js";
import { normalizarTexto } from "../utils/texto.js";

export class ProductosService {
  constructor(productoRepository = new ProductoRepository()) {
    this.productoRepository = productoRepository;
  }

  async crear(productoRequestDto) {
    await this.validarCodigo(productoRequestDto.codigo);
    const imagenDatos = this.convertirImagen(productoRequestDto.imagenBase64);

    const productoModel = new Producto(
      0,
      productoRequestDto.codigo,
      productoRequestDto.nombre,
      productoRequestDto.categoria,
      productoRequestDto.stock,
      productoRequestDto.precio,
      productoRequestDto.peso,
      productoRequestDto.descripcion,
      productoRequestDto.activo,
      productoRequestDto.fechaVencimiento,
      productoRequestDto.horaRegistro,
      productoRequestDto.fechaHoraRegistro,
      imagenDatos.imagen,
      imagenDatos.imagenMimeType,
    );

    const productoCreadoModel =
      await this.productoRepository.crear(productoModel);
    return new ProductoResponseDto(productoCreadoModel);
  }

  async validarCodigo(codigo, idOmitido) {
    const productosModel = await this.productoRepository.listar();
    const productoRepetidoModel = productosModel.find(
      (productoModel) =>
        normalizarTexto(productoModel.codigo) === normalizarTexto(codigo) &&
        Number(productoModel.id) !== Number(idOmitido),
    );

    if (productoRepetidoModel) {
      throw new AppError("El código de producto ya existe", 409);
    }
  }

  convertirImagen(imagenBase64) {
    if (imagenBase64 === null || imagenBase64 === "") {
      return { imagen: null, imagenMimeType: null };
    }

    if (imagenBase64 === undefined) {
      return { imagen: null, imagenMimeType: null };
    }

    const coincidencia = String(imagenBase64).match(
      /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/,
    );
    if (!coincidencia) {
      throw new AppError("La imagen Base64 no es válida", 400);
    }

    return {
      imagen: Buffer.from(coincidencia[2], "base64"),
      imagenMimeType: coincidencia[1],
    };
  }
}

export const productosService = new ProductosService();
```

## 6. Crear src/controllers/productos.controller.js

```js
import { productosService } from "../services/productos.service.js";

export class ProductosController {
  constructor(productosServiceActual = productosService) {
    this.productosService = productosServiceActual;
  }

  async crear(productoRequestDto, response) {
    const productoResponseDto =
      await this.productosService.crear(productoRequestDto);
    response.status(201).json({
      mensaje: "Producto creado",
      productoResponseDto,
    });
  }
}

export const productosController = new ProductosController(productosService);
```

## 7. Crear src/routes/productos.routes.js

```js
import { Router } from "express";
import { productosController as controller } from "../controllers/productos.controller.js";
import { validarProductoCompleto } from "../middlewares/validacion.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ProductoRequestDto } from "../dtos/ProductoDto.js";

const router = Router();

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

## 8. Registrar las rutas en app.js

Agrega este import junto con los imports:

```js
import productosRoutes from "./src/routes/productos.routes.js";
```

Agrega esta línea **antes** de `app.use(rutaNoEncontrada)`:

```js
app.use("/api/productos", productosRoutes);
```

Reinicia el servidor si no estás usando `node --watch`.

## 9. Probar POST

```http
POST http://localhost:4214/api/productos
Content-Type: application/json

{
  "codigo": "PROD-001",
  "nombre": "Laptop de prueba",
  "categoria": "TEC",
  "stock": 10,
  "precio": 2499.90,
  "peso": 1.75,
  "descripcion": "Producto creado durante el hito POST",
  "activo": true,
  "fechaVencimiento": null,
  "horaRegistro": "09:30",
  "fechaHoraRegistro": "2026-08-03T09:30:00",
  "imagenBase64": null
}
```

Resultado obligatorio:

- Código HTTP `201`.
- Mensaje `Producto creado`.
- `productoResponseDto.id` igual a `1`.

## 10. Probar validación

Vuelve a enviar el mismo JSON. Debe responder `409` porque el código ya existe.

## 11. Crear el frontend de validación POST

Este frontend es deliberadamente pequeño: permite comprobar `POST` sin depender todavía de `GET`, `PUT`, `PATCH` o `DELETE`.

Crea las carpetas:

```powershell
New-Item -ItemType Directory -Force public/hitos
```

Crea `public/hitos/03-post.html` y copia todo este código:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hito 3 - Probar POST</title>
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/bootstrap-icons/font/bootstrap-icons.css" />
  </head>
  <body class="bg-light">
    <nav class="navbar navbar-dark bg-primary">
      <div class="container">
        <span class="navbar-brand">
          <i class="bi bi-plus-square me-2"></i>Hito 3 · POST
        </span>
      </div>
    </nav>

    <main class="container py-4">
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 class="h4 mb-1">Crear un producto</h1>
              <p class="text-secondary mb-0">POST /api/productos</p>
            </div>
            <span class="badge text-bg-primary">Frontend temporal</span>
          </div>

          <form id="form-post" class="row g-3">
            <div class="col-md-4">
              <label class="form-label" for="codigo">Código</label>
              <input id="codigo" class="form-control" value="PROD-WEB-001" required />
            </div>
            <div class="col-md-5">
              <label class="form-label" for="nombre">Nombre</label>
              <input id="nombre" class="form-control" value="Mouse inalámbrico" required />
            </div>
            <div class="col-md-3">
              <label class="form-label" for="categoria">Categoría</label>
              <select id="categoria" class="form-select" required>
                <option value="TEC">Tecnología</option>
                <option value="HOG">Hogar</option>
                <option value="OFI">Oficina</option>
                <option value="ALI">Alimentos</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label" for="stock">Stock</label>
              <input id="stock" type="number" min="0" class="form-control" value="25" required />
            </div>
            <div class="col-md-3">
              <label class="form-label" for="precio">Precio</label>
              <input id="precio" type="number" min="0" step="0.01" class="form-control" value="79.90" required />
            </div>
            <div class="col-md-3">
              <label class="form-label" for="peso">Peso en kg</label>
              <input id="peso" type="number" min="0" step="0.01" class="form-control" value="0.15" />
            </div>
            <div class="col-md-3">
              <label class="form-label" for="fechaVencimiento">Vencimiento</label>
              <input id="fechaVencimiento" type="date" class="form-control" />
            </div>
            <div class="col-md-3">
              <label class="form-label" for="horaRegistro">Hora</label>
              <input id="horaRegistro" type="time" class="form-control" value="09:30" required />
            </div>
            <div class="col-md-4">
              <label class="form-label" for="fechaHoraRegistro">Fecha y hora</label>
              <input id="fechaHoraRegistro" type="datetime-local" class="form-control" value="2026-08-03T09:30" required />
            </div>
            <div class="col-md-5">
              <label class="form-label" for="imagen">Imagen opcional</label>
              <input id="imagen" type="file" accept="image/*" class="form-control" />
            </div>
            <div class="col-md-3 d-flex align-items-end">
              <div class="form-check form-switch mb-2">
                <input id="activo" class="form-check-input" type="checkbox" checked />
                <label class="form-check-label" for="activo">Activo</label>
              </div>
            </div>
            <div class="col-12">
              <label class="form-label" for="descripcion">Descripción</label>
              <textarea id="descripcion" class="form-control" rows="2">Creado desde el frontend del hito POST</textarea>
            </div>
            <div class="col-12">
              <button class="btn btn-primary">
                <i class="bi bi-cloud-arrow-up me-1"></i>Enviar POST
              </button>
            </div>
          </form>

          <div id="mensaje" class="alert d-none mt-4" role="alert"></div>
          <pre id="resultado" class="bg-dark text-light rounded p-3 mt-3 mb-0 d-none"></pre>
        </div>
      </div>
    </main>

    <script>
      const formulario = document.querySelector("#form-post");
      const mensaje = document.querySelector("#mensaje");
      const resultado = document.querySelector("#resultado");

      formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        try {
          const archivo = document.querySelector("#imagen").files[0];
          const imagenBase64 = archivo ? await convertirBase64(archivo) : null;

          const productoRequestDto = {
            codigo: document.querySelector("#codigo").value.trim(),
            nombre: document.querySelector("#nombre").value.trim(),
            categoria: document.querySelector("#categoria").value,
            stock: Number(document.querySelector("#stock").value),
            precio: Number(document.querySelector("#precio").value),
            peso: valorNumeroONull("#peso"),
            descripcion: document.querySelector("#descripcion").value.trim() || null,
            activo: document.querySelector("#activo").checked,
            fechaVencimiento: document.querySelector("#fechaVencimiento").value || null,
            horaRegistro: document.querySelector("#horaRegistro").value,
            fechaHoraRegistro: document.querySelector("#fechaHoraRegistro").value,
            imagenBase64,
          };

          const respuestaHttp = await fetch("/api/productos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productoRequestDto),
          });
          const respuesta = await respuestaHttp.json();

          mostrarResultado(respuestaHttp.status, respuestaHttp.ok, respuesta);
        } catch (error) {
          mostrarResultado(0, false, { mensaje: error.message });
        }
      });

      function valorNumeroONull(selector) {
        const valor = document.querySelector(selector).value;
        return valor === "" ? null : Number(valor);
      }

      function convertirBase64(archivo) {
        return new Promise((resolve, reject) => {
          const lector = new FileReader();
          lector.addEventListener("load", () => resolve(lector.result), { once: true });
          lector.addEventListener("error", () => reject(lector.error), { once: true });
          lector.readAsDataURL(archivo);
        });
      }

      function mostrarResultado(status, correcto, datos) {
        mensaje.className = `alert alert-${correcto ? "success" : "danger"} mt-4`;
        mensaje.textContent = `HTTP ${status || "sin respuesta"} · ${datos.mensaje ?? "Solicitud procesada"}`;
        resultado.textContent = JSON.stringify(datos, null, 2);
        resultado.classList.remove("d-none");
      }
    </script>
    <script src="/bootstrap/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
```

## 12. Probar POST desde el frontend

Abre:

```text
http://localhost:4214/hitos/03-post.html
```

1. Cambia el código si ya utilizaste `PROD-WEB-001`.
2. Completa los campos obligatorios.
3. Presiona **Enviar POST**.
4. Debes ver una alerta verde con `HTTP 201`.
5. Anota el `id` devuelto; podrás usarlo en los siguientes hitos.
6. Vuelve a enviar el mismo código y comprueba la alerta roja `HTTP 409`.

## Checklist

- [ ] El body se convierte en `ProductoRequestDto` dentro de Routes.
- [ ] Controller no recibe `request`.
- [ ] Service crea el Model.
- [ ] Repository ejecuta INSERT.
- [ ] POST devuelve 201.
- [ ] El código duplicado devuelve 409.
- [ ] La página `03-post.html` carga Bootstrap e iconos.
- [ ] El formulario crea un producto y muestra HTTP 201.
- [ ] El frontend muestra el JSON de respuesta.
