# Hito 10 — Frontend Bootstrap definitivo

## Objetivo

Integrar en una sola interfaz los métodos que ya comprobaste por HTTP y desde sus pantallas individuales. Usa Bootstrap 5.3.8 y Bootstrap Icons desde NPM, con DTO, API, UI, confirmación y módulo principal separados.

## 0. Eliminar el index.html pequeño de configuración

El archivo `public/index.html` solo servía para comprobar Bootstrap en el hito 1. Ahora debes eliminarlo para permitir que la ruta `/` de `app.js` redirija a `/productos`.

```powershell
Remove-Item public/index.html
```

No elimines todavía `public/hitos`: sus páginas permiten volver a probar cada método de forma aislada. Puedes retirarlas después de aprobar el hito 11.

## 1. Verificar dependencias

```powershell
npm i bootstrap-icons
npm i bootstrap@5.3.8
```

## 2. Crear carpetas faltantes

```powershell
New-Item -ItemType Directory -Force public/components, public/css, public/pages
New-Item -ItemType Directory -Force public/js/shared, public/js/productos
```

## 3. Reemplazar app.js por la versión final

```js
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import productosRoutes from "./src/routes/productos.routes.js";
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
  response.redirect("/productos");
});

app.get("/productos", (request, response) => {
  response.sendFile(path.join(pagesPath, "productos.html"));
});

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

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
```

## 4. Crear los archivos del frontend

Cada archivo tiene su propio bloque copiable.

## public/components/header.html

```html
<header class="page-header py-4">
  <div class="container d-flex align-items-center gap-3">
    <span class="page-icon"><i data-header-icon></i></span>
    <div>
      <span class="eyebrow" data-header-eyebrow></span>
      <h1 class="h2 mb-1" data-header-title></h1>
      <p class="mb-0 opacity-75" data-header-description></p>
    </div>
  </div>
</header>
```

## public/components/nav.html

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-marca shadow-sm">
  <div class="container">
    <a class="navbar-brand" href="/productos">
      <i class="bi bi-box-seam-fill me-2"></i>Productos Express
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#menuPrincipal"
      aria-label="Abrir navegación"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="menuPrincipal">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" href="/productos">
            <i class="bi bi-box-seam me-1"></i>Productos
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

## public/components/footer.html

```html
<footer class="container py-4 text-center small">
  Productos Express · Node.js, Express, Bootstrap y SQLite
</footer>
```

## public/js/shared/layout.js

```js
const COMPONENTES = {
  nav: "/components/nav.html",
  header: "/components/header.html",
  footer: "/components/footer.html",
};

document.addEventListener("DOMContentLoaded", cargarComponentes);

async function cargarComponentes() {
  const contenedores = document.querySelectorAll("[data-component]");

  await Promise.all(
    [...contenedores].map(async (contenedor) => {
      const nombre = contenedor.dataset.component;
      const ruta = COMPONENTES[nombre];
      if (!ruta) return;

      const respuestaHttp = await fetch(ruta);
      contenedor.innerHTML = await respuestaHttp.text();
      if (nombre === "header") completarHeader(contenedor);
    }),
  );

  activarEnlaceActual();
}

function completarHeader(header) {
  const configuracionHeader = header.dataset;
  header.querySelector("[data-header-title]").textContent =
    configuracionHeader.title ?? "";
  header.querySelector("[data-header-eyebrow]").textContent =
    configuracionHeader.eyebrow ?? "Administración de inventario";
  header.querySelector("[data-header-description]").textContent =
    configuracionHeader.description ?? "";
  header.querySelector("[data-header-icon]").className =
    `bi ${configuracionHeader.icon ?? "bi-box-seam"}`;
}

function activarEnlaceActual() {
  const ruta = window.location.pathname;
  document
    .querySelectorAll("[data-component='nav'] .nav-link")
    .forEach((enlace) => {
      const activa = enlace.getAttribute("href") === ruta;
      enlace.classList.toggle("active", activa);
      if (activa) enlace.setAttribute("aria-current", "page");
    });
}
```

## public/js/shared/mensajes.js

```js
export function mostrarMensaje(elemento, texto, tipo = "ok") {
  const clase =
    tipo === "error" ? "danger" : tipo === "info" ? "info" : "success";
  elemento.textContent = texto;
  elemento.className = `alert alert-${clase} mt-3 mb-0`;
  elemento.classList.remove("d-none");
}

export function ocultarMensaje(elemento) {
  elemento.classList.add("d-none");
}
```

## public/js/shared/reactivo.js

```js
// Recibe un callback y evita lanzar una búsqueda por cada tecla presionada.
export function debounce(callback, espera = 300) {
  let temporizador;

  return (...argumentos) => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => callback(...argumentos), espera);
  };
}
```

## public/js/productos/producto.dto.js

```js
export class ProductoRequestDto {
  constructor({
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
    imagenBase64,
  } = {}) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.categoria = categoria;
    this.stock = stock;
    this.precio = precio;
    this.peso = peso;
    this.descripcion = descripcion;
    this.activo = activo;
    this.fechaVencimiento = fechaVencimiento;
    this.horaRegistro = horaRegistro;
    this.fechaHoraRegistro = fechaHoraRegistro;
    this.imagenBase64 = imagenBase64;
  }
}

export class ProductoConsultaDto {
  constructor({ texto, categoria, activo, precioMin, precioMax } = {}) {
    this.texto = texto;
    this.categoria = categoria;
    this.activo = activo;
    this.precioMin = precioMin;
    this.precioMax = precioMax;
  }
}

export class ProductoResponseDto {
  constructor(producto) {
    this.id = producto.id;
    this.codigo = producto.codigo;
    this.nombre = producto.nombre;
    this.categoria = producto.categoria;
    this.stock = producto.stock;
    this.precio = producto.precio;
    this.peso = producto.peso;
    this.descripcion = producto.descripcion;
    this.activo = producto.activo;
    this.fechaVencimiento = producto.fechaVencimiento;
    this.horaRegistro = producto.horaRegistro;
    this.fechaHoraRegistro = producto.fechaHoraRegistro;
    this.imagenMimeType = producto.imagenMimeType;
    this.imagenBase64 = producto.imagenBase64;
  }
}
```

## public/js/productos/productos.api.js

```js
import { ProductoResponseDto } from "./producto.dto.js";

const RUTA_PRODUCTOS = "/api/productos";

function crearParametros(productoConsultaDto) {
  const parametros = new URLSearchParams();

  for (const campo in productoConsultaDto) {
    const valor = productoConsultaDto[campo];
    if (valor !== "" && valor !== undefined && valor !== null) {
      parametros.set(campo, valor);
    }
  }

  return parametros;
}

async function enviarPeticion(ruta, metodo = "GET", productoRequestDto) {
  const opciones = { method: metodo };

  if (productoRequestDto) {
    opciones.headers = { "Content-Type": "application/json" };
    opciones.body = JSON.stringify(productoRequestDto);
  }

  const respuestaHttp = await fetch(ruta, opciones);
  const respuesta = await respuestaHttp.json();

  if (!respuestaHttp.ok) {
    throw new Error(respuesta.errores?.join(". ") || respuesta.mensaje);
  }

  return respuesta;
}

function crearProductosResponseDto(respuesta) {
  respuesta.productosResponseDto = respuesta.productosResponseDto.map(
    (producto) => new ProductoResponseDto(producto),
  );
  return respuesta;
}

function crearProductoResponseDto(respuesta) {
  respuesta.productoResponseDto = new ProductoResponseDto(
    respuesta.productoResponseDto,
  );
  return respuesta;
}

export const productosApi = {
  async listar() {
    const respuesta = await enviarPeticion(RUTA_PRODUCTOS);
    return crearProductosResponseDto(respuesta);
  },

  async buscar(productoConsultaDto) {
    const parametros = crearParametros(productoConsultaDto);
    const respuesta = await enviarPeticion(
      `${RUTA_PRODUCTOS}/buscar?${parametros}`,
    );
    return crearProductosResponseDto(respuesta);
  },

  async consultar(productoConsultaDto) {
    const parametros = crearParametros(productoConsultaDto);
    const respuesta = await enviarPeticion(
      `${RUTA_PRODUCTOS}/consulta?${parametros}`,
      "QUERY",
    );
    return crearProductosResponseDto(respuesta);
  },

  async obtener(id) {
    const respuesta = await enviarPeticion(`${RUTA_PRODUCTOS}/${Number(id)}`);
    return new ProductoResponseDto(respuesta.productoResponseDto);
  },

  async crear(productoRequestDto) {
    const respuesta = await enviarPeticion(
      RUTA_PRODUCTOS,
      "POST",
      productoRequestDto,
    );
    return crearProductoResponseDto(respuesta);
  },

  async reemplazar(id, productoRequestDto) {
    const respuesta = await enviarPeticion(
      `${RUTA_PRODUCTOS}/${Number(id)}`,
      "PUT",
      productoRequestDto,
    );
    return crearProductoResponseDto(respuesta);
  },

  async actualizar(id, productoRequestDto) {
    const respuesta = await enviarPeticion(
      `${RUTA_PRODUCTOS}/${Number(id)}`,
      "PATCH",
      productoRequestDto,
    );
    return crearProductoResponseDto(respuesta);
  },

  async eliminar(id) {
    const respuesta = await enviarPeticion(
      `${RUTA_PRODUCTOS}/${Number(id)}`,
      "DELETE",
    );
    return crearProductoResponseDto(respuesta);
  },
};
```

## public/js/productos/confirmacion.js

```js
const elemento = document.querySelector("#modal-eliminar");
const contexto = document.querySelector("#modal-eliminar-contexto");
const boton = document.querySelector("#btn-confirmar-eliminar");
const modal = new window.bootstrap.Modal(elemento);

export function confirmarEliminacion(nombre) {
  contexto.textContent = `Se eliminará el producto “${nombre}”.`;
  modal.show();

  return new Promise((resolve) => {
    const confirmar = () => cerrar(true);
    const cancelar = () => cerrar(false);

    function cerrar(resultado) {
      boton.removeEventListener("click", confirmar);
      elemento.removeEventListener("hidden.bs.modal", cancelar);

      if (resultado) modal.hide();
      resolve(resultado);
    }

    boton.addEventListener("click", confirmar, { once: true });
    elemento.addEventListener("hidden.bs.modal", cancelar, { once: true });
  });
}
```

## public/js/productos/productos.ui.js

```js
export const elementos = {
  formulario: document.querySelector("#form-producto"),
  tabla: document.querySelector("#tabla-productos tbody"),
  titulo: document.querySelector("#titulo-form"),
  guardar: document.querySelector("#btn-guardar"),
  cancelar: document.querySelector("#btn-cancelar"),
  buscar: document.querySelector("#buscar"),
  categoria: document.querySelector("#filtro-categoria"),
  activo: document.querySelector("#filtro-activo"),
  precioMin: document.querySelector("#precio-min"),
  precioMax: document.querySelector("#precio-max"),
  total: document.querySelector("#total-resultados"),
  mensaje: document.querySelector("#mensaje"),
  cargando: document.querySelector("#cargando"),
  plantilla: document.querySelector("#plantilla-producto"),
};

export function renderizarProductos(productos) {
  elementos.total.textContent = `${productos.length} resultado(s)`;

  if (!productos.length) {
    mostrarFilaVacia("No se encontraron productos.");
    return;
  }

  elementos.tabla.replaceChildren();
  for (const producto of productos) {
    elementos.tabla.appendChild(crearFilaProducto(producto));
  }
}

export function cargarFormulario(producto) {
  const campos = elementos.formulario.elements;
  campos.id.value = producto.id;
  campos.codigo.value = producto.codigo;
  campos.nombre.value = producto.nombre;
  campos.categoria.value = producto.categoria;
  campos.stock.value = producto.stock;
  campos.precio.value = producto.precio;
  campos.peso.value = producto.peso ?? "";
  campos.descripcion.value = producto.descripcion ?? "";
  campos.activo.checked = producto.activo;
  campos.fechaVencimiento.value = producto.fechaVencimiento ?? "";
  campos.horaRegistro.value = producto.horaRegistro;
  campos.fechaHoraRegistro.value = producto.fechaHoraRegistro
    ? String(producto.fechaHoraRegistro).slice(0, 16)
    : "";

  elementos.titulo.textContent = "Editar producto";
  cambiarBotonGuardar("bi-check-circle", "Actualizar con PUT");
  elementos.cancelar.classList.remove("d-none");
  elementos.formulario.scrollIntoView({ behavior: "smooth" });
}

export function limpiarFormulario() {
  elementos.formulario.reset();
  elementos.formulario.elements.id.value = "";
  elementos.formulario.elements.activo.checked = true;
  elementos.formulario.classList.remove("was-validated");
  elementos.titulo.textContent = "Registrar nuevo producto";
  cambiarBotonGuardar("bi-plus-circle", "Registrar con POST");
  elementos.cancelar.classList.add("d-none");
}

export function mostrarCarga(activa) {
  elementos.cargando.classList.toggle("d-none", !activa);
}

function crearFilaProducto(producto) {
  const fragmento = elementos.plantilla.content.cloneNode(true);
  fragmento.querySelector(".producto-id").textContent = `#${producto.id}`;
  fragmento.querySelector(".producto-nombre").textContent = producto.nombre;
  fragmento.querySelector(".producto-codigo").textContent = producto.codigo;
  fragmento.querySelector(".producto-categoria").textContent =
    producto.categoria;
  fragmento.querySelector(".producto-stock").textContent = producto.stock;
  fragmento.querySelector(".producto-precio").textContent =
    `S/ ${Number(producto.precio).toFixed(2)}`;

  const imagen = fragmento.querySelector(".producto-imagen");
  if (producto.imagenBase64) {
    imagen.src = producto.imagenBase64;
    imagen.alt = producto.nombre;
  } else {
    imagen.remove();
  }

  configurarEstado(fragmento, producto.activo);
  fragmento.querySelectorAll("[data-accion]").forEach((boton) => {
    boton.dataset.id = producto.id;
  });
  return fragmento;
}

function configurarEstado(fragmento, activo) {
  const estado = fragmento.querySelector(".producto-estado");
  estado.textContent = activo ? "Activo" : "Inactivo";
  estado.classList.add(activo ? "status-success" : "status-muted");
}

function mostrarFilaVacia(texto) {
  const fila = document.createElement("tr");
  const celda = document.createElement("td");
  celda.colSpan = 8;
  celda.className = "empty-state";
  celda.textContent = texto;
  fila.appendChild(celda);
  elementos.tabla.replaceChildren(fila);
}

function cambiarBotonGuardar(icono, texto) {
  const elementoIcono = document.createElement("i");
  elementoIcono.className = `bi ${icono} me-1`;
  elementos.guardar.replaceChildren(elementoIcono, texto);
}
```

## public/js/productos/productos.js

```js
import { mostrarMensaje, ocultarMensaje } from "../shared/mensajes.js";
import { debounce } from "../shared/reactivo.js";
import { ProductoConsultaDto, ProductoRequestDto } from "./producto.dto.js";
import { confirmarEliminacion } from "./confirmacion.js";
import { productosApi } from "./productos.api.js";
import {
  cargarFormulario,
  elementos,
  limpiarFormulario,
  mostrarCarga,
  renderizarProductos,
} from "./productos.ui.js";

let productos = [];
let imagenActualBase64 = null;

elementos.formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  elementos.formulario.classList.add("was-validated");

  if (!elementos.formulario.checkValidity()) return;

  try {
    await guardar();
  } catch (error) {
    mostrarError(error);
  }
});

elementos.cancelar.addEventListener("click", cancelarEdicion);
elementos.buscar.addEventListener("input", debounce(cargar));
elementos.categoria.addEventListener("change", cargar);
elementos.activo.addEventListener("change", cargar);
elementos.precioMin.addEventListener("input", debounce(cargar));
elementos.precioMax.addEventListener("input", debounce(cargar));
elementos.tabla.addEventListener("click", manejarAccion);

async function cargar() {
  mostrarCarga(true);
  ocultarMensaje(elementos.mensaje);

  try {
    const productoConsultaDto = new ProductoConsultaDto({
      texto: elementos.buscar.value,
      categoria: elementos.categoria.value,
      activo: elementos.activo.value,
      precioMin: elementos.precioMin.value,
      precioMax: elementos.precioMax.value,
    });
    const respuesta = await productosApi.consultar(productoConsultaDto);
    productos = respuesta.productosResponseDto;
    renderizarProductos(productos);
  } catch (error) {
    mostrarError(error);
  } finally {
    mostrarCarga(false);
  }
}

async function guardar() {
  const campos = elementos.formulario.elements;
  const id = campos.id.value;
  const archivo = campos.imagen.files[0];
  const imagenBase64 = archivo
    ? await convertirArchivoBase64(archivo)
    : id
      ? imagenActualBase64
      : null;

  const productoRequestDto = new ProductoRequestDto({
    codigo: campos.codigo.value.trim(),
    nombre: campos.nombre.value.trim(),
    categoria: campos.categoria.value,
    stock: Number(campos.stock.value),
    precio: Number(campos.precio.value),
    peso: campos.peso.value === "" ? null : Number(campos.peso.value),
    descripcion: campos.descripcion.value.trim() || null,
    activo: campos.activo.checked,
    fechaVencimiento: campos.fechaVencimiento.value || null,
    horaRegistro: campos.horaRegistro.value,
    fechaHoraRegistro: campos.fechaHoraRegistro.value,
    imagenBase64,
  });

  const respuesta = id
    ? await productosApi.reemplazar(Number(id), productoRequestDto)
    : await productosApi.crear(productoRequestDto);

  mostrarMensaje(elementos.mensaje, respuesta.mensaje);
  cancelarEdicion();
  await cargar();
}

async function manejarAccion(evento) {
  const boton = evento.target.closest("[data-accion]");
  if (!boton) return;

  const producto = productos.find(
    (item) => Number(item.id) === Number(boton.dataset.id),
  );
  if (!producto) return;

  if (boton.dataset.accion === "editar") {
    imagenActualBase64 = producto.imagenBase64;
    cargarFormulario(producto);
    return;
  }

  if (boton.dataset.accion === "estado") {
    await cambiarEstado(producto);
    return;
  }

  await eliminar(producto);
}

async function cambiarEstado(producto) {
  try {
    const productoRequestDto = new ProductoRequestDto({
      activo: !producto.activo,
    });
    const respuesta = await productosApi.actualizar(
      producto.id,
      productoRequestDto,
    );
    mostrarMensaje(elementos.mensaje, respuesta.mensaje);
    await cargar();
  } catch (error) {
    mostrarError(error);
  }
}

async function eliminar(producto) {
  const confirmado = await confirmarEliminacion(producto.nombre);
  if (!confirmado) return;

  try {
    const respuesta = await productosApi.eliminar(producto.id);
    mostrarMensaje(elementos.mensaje, respuesta.mensaje);
    await cargar();
  } catch (error) {
    mostrarError(error);
  }
}

function convertirArchivoBase64(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.addEventListener("load", () => resolve(lector.result), {
      once: true,
    });
    lector.addEventListener("error", () => reject(lector.error), {
      once: true,
    });
    lector.readAsDataURL(archivo);
  });
}

function cancelarEdicion() {
  imagenActualBase64 = null;
  limpiarFormulario();
}

function mostrarError(error) {
  mostrarMensaje(elementos.mensaje, error.message, "error");
}

cargar();
```

## public/pages/productos.html

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Gestión de productos</title>
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/bootstrap-icons/font/bootstrap-icons.css" />
    <link rel="stylesheet" href="/css/estilos.css" />
  </head>
  <body>
    <div data-component="nav"></div>
    <div
      data-component="header"
      data-title="Gestión de productos"
      data-description="Registra, consulta y actualiza los productos del inventario."
      data-icon="bi-box-seam"
    ></div>

    <main class="container py-4">
      <div id="mensaje" class="d-none mb-4" role="alert"></div>

      <section class="card panel-card mb-4">
        <div class="card-body p-4">
          <div class="section-heading">
            <div>
              <span class="eyebrow text-primary">Formulario</span>
              <h2 id="titulo-form" class="h4 mb-0">Registrar nuevo producto</h2>
            </div>
            <span class="badge rounded-pill text-bg-light">POST / PUT</span>
          </div>

          <form id="form-producto" class="row g-3 needs-validation" novalidate>
            <input type="hidden" name="id" />

            <div class="col-md-4">
              <label class="form-label" for="codigo">Código</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-upc"></i></span>
                <input
                  id="codigo"
                  name="codigo"
                  class="form-control"
                  placeholder="PROD-001"
                  maxlength="20"
                  required
                />
                <div class="invalid-feedback">Ingrese un código.</div>
              </div>
            </div>

            <div class="col-md-5">
              <label class="form-label" for="nombre">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                class="form-control"
                placeholder="Laptop Lenovo"
                minlength="2"
                required
              />
              <div class="invalid-feedback">Ingrese el nombre.</div>
            </div>

            <div class="col-md-3">
              <label class="form-label" for="categoria">Categoría</label>
              <select
                id="categoria"
                name="categoria"
                class="form-select"
                required
              >
                <option value="">Seleccione</option>
                <option value="TEC">Tecnología</option>
                <option value="HOG">Hogar</option>
                <option value="OFI">Oficina</option>
                <option value="ALI">Alimentos</option>
              </select>
              <div class="invalid-feedback">Seleccione una categoría.</div>
            </div>

            <div class="col-md-3">
              <label class="form-label" for="stock">Stock</label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                step="1"
                class="form-control"
                required
              />
              <div class="invalid-feedback">Ingrese un entero desde cero.</div>
            </div>

            <div class="col-md-3">
              <label class="form-label" for="precio">Precio</label>
              <div class="input-group">
                <span class="input-group-text">S/</span>
                <input
                  id="precio"
                  name="precio"
                  type="number"
                  min="0"
                  step="0.01"
                  class="form-control"
                  required
                />
                <div class="invalid-feedback">Ingrese un precio válido.</div>
              </div>
            </div>

            <div class="col-md-3">
              <label class="form-label" for="peso">Peso en kg</label>
              <input
                id="peso"
                name="peso"
                type="number"
                min="0"
                step="0.01"
                class="form-control"
                placeholder="Opcional"
              />
            </div>

            <div class="col-md-3">
              <label class="form-label" for="fechaVencimiento">
                Fecha de vencimiento
              </label>
              <input
                id="fechaVencimiento"
                name="fechaVencimiento"
                type="date"
                class="form-control"
              />
            </div>

            <div class="col-md-3">
              <label class="form-label" for="horaRegistro">
                Hora de registro
              </label>
              <input
                id="horaRegistro"
                name="horaRegistro"
                type="time"
                class="form-control"
                required
              />
              <div class="invalid-feedback">Seleccione una hora.</div>
            </div>

            <div class="col-md-4">
              <label class="form-label" for="fechaHoraRegistro">
                Fecha y hora de registro
              </label>
              <input
                id="fechaHoraRegistro"
                name="fechaHoraRegistro"
                type="datetime-local"
                class="form-control"
                required
              />
              <div class="invalid-feedback">Seleccione la fecha y hora.</div>
            </div>

            <div class="col-md-5">
              <label class="form-label" for="imagen">Imagen</label>
              <input
                id="imagen"
                name="imagen"
                type="file"
                accept="image/*"
                class="form-control"
              />
              <div class="form-text">Opcional. Se almacena como BLOB.</div>
            </div>

            <div class="col-md-3 d-flex align-items-end">
              <div class="form-check form-switch pb-2">
                <input
                  id="activo"
                  name="activo"
                  class="form-check-input"
                  type="checkbox"
                  checked
                />
                <label class="form-check-label" for="activo">
                  Producto activo
                </label>
              </div>
            </div>

            <div class="col-12">
              <label class="form-label" for="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                class="form-control"
                rows="3"
                placeholder="Opcional"
              ></textarea>
            </div>

            <div class="col-12 d-flex flex-wrap gap-2">
              <button id="btn-guardar" class="btn btn-primary">
                <i class="bi bi-plus-circle me-1"></i>Registrar con POST
              </button>
              <button
                id="btn-cancelar"
                type="button"
                class="btn btn-outline-secondary d-none"
              >
                <i class="bi bi-x-circle me-1"></i>Cancelar edición
              </button>
            </div>
          </form>
        </div>
      </section>

      <section class="card panel-card">
        <div class="card-body p-4">
          <div class="section-heading">
            <div>
              <span class="eyebrow text-primary">Consulta</span>
              <h2 class="h4 mb-0">Productos registrados</h2>
            </div>
            <div class="d-flex align-items-center gap-2">
              <span id="total-resultados" class="text-secondary small">
                0 resultado(s)
              </span>
              <span
                id="cargando"
                class="spinner-border spinner-border-sm text-primary d-none"
              ></span>
            </div>
          </div>

          <div class="row g-3 mb-4">
            <div class="col-md-4">
              <label class="form-label" for="buscar">Buscar</label>
              <div class="input-group">
                <span class="input-group-text"
                  ><i class="bi bi-search"></i
                ></span>
                <input
                  id="buscar"
                  class="form-control"
                  placeholder="Código, nombre o descripción..."
                />
              </div>
            </div>
            <div class="col-md-2">
              <label class="form-label" for="filtro-categoria">Categoría</label>
              <select id="filtro-categoria" class="form-select">
                <option value="">Todas</option>
                <option value="TEC">Tecnología</option>
                <option value="HOG">Hogar</option>
                <option value="OFI">Oficina</option>
                <option value="ALI">Alimentos</option>
              </select>
            </div>
            <div class="col-md-2">
              <label class="form-label" for="filtro-activo">Estado</label>
              <select id="filtro-activo" class="form-select">
                <option value="">Todos</option>
                <option value="true">Activos</option>
                <option value="false">Inactivos</option>
              </select>
            </div>
            <div class="col-md-2">
              <label class="form-label" for="precio-min">Precio mínimo</label>
              <input
                id="precio-min"
                type="number"
                min="0"
                class="form-control"
              />
            </div>
            <div class="col-md-2">
              <label class="form-label" for="precio-max">Precio máximo</label>
              <input
                id="precio-max"
                type="number"
                min="0"
                class="form-control"
              />
            </div>
          </div>

          <div class="table-responsive">
            <table id="tabla-productos" class="table table-hover align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Imagen</th>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Stock</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </section>

      <template id="plantilla-producto">
        <tr>
          <td><span class="id-chip producto-id"></span></td>
          <td>
            <img class="producto-imagen" width="48" height="48" />
          </td>
          <td>
            <strong class="producto-nombre"></strong>
            <small class="producto-codigo d-block text-secondary"></small>
          </td>
          <td class="producto-categoria"></td>
          <td class="producto-stock"></td>
          <td class="producto-precio"></td>
          <td><span class="producto-estado status"></span></td>
          <td>
            <div class="table-actions">
              <button
                class="btn btn-sm btn-outline-primary btn-icon"
                data-accion="editar"
                title="Editar con PUT"
              >
                <i class="bi bi-pencil"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-secondary btn-icon"
                data-accion="estado"
                title="Cambiar estado con PATCH"
              >
                <i class="bi bi-arrow-repeat"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-danger btn-icon"
                data-accion="eliminar"
                title="Eliminar"
              >
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      </template>
    </main>

    <div data-component="footer"></div>

    <div id="modal-eliminar" class="modal fade" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title fs-5">Eliminar producto</h2>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div class="modal-body">
            <p id="modal-eliminar-contexto" class="mb-0"></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button
              id="btn-confirmar-eliminar"
              type="button"
              class="btn btn-danger"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>

    <script src="/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="/js/shared/layout.js"></script>
    <script type="module" src="/js/productos/productos.js"></script>
  </body>
</html>
```

## public/css/estilos.css

```css
:root {
  --bs-primary: #6f2be9;
  --bs-primary-rgb: 111, 43, 233;
  --marca-morado: #6f2be9;
  --marca-oscuro: #3f117f;
  --marca-amarillo: #ffb000;
  --fondo-suave: #f7f7fb;
  --texto-principal: #241d2f;
}

body {
  min-height: 100vh;
  color: var(--texto-principal);
  background: var(--fondo-suave);
  font-family: Manrope, "Segoe UI", sans-serif;
}

.bg-marca,
.page-header {
  color: #fff;
  background:
    radial-gradient(
      circle at 85% 20%,
      rgba(255, 176, 0, 0.22),
      transparent 24%
    ),
    linear-gradient(120deg, var(--marca-oscuro), var(--marca-morado));
}

.page-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  flex: 0 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.12);
  font-size: 1.4rem;
  backdrop-filter: blur(8px);
}

.eyebrow {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.navbar-brand {
  font-weight: 800;
}

.nav-link.active,
.nav-link:hover {
  color: #fff !important;
}

.panel-card {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1.5rem rgba(45, 27, 69, 0.08);
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-label {
  font-weight: 600;
}

.input-group-text {
  color: var(--marca-morado);
  background: #f7f3ff;
  border-color: #ded7e8;
}

.form-control,
.form-select {
  min-height: 2.75rem;
  border-color: #ded7e8;
}

.form-control:focus,
.form-select:focus {
  border-color: rgba(var(--bs-primary-rgb), 0.55);
  box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.12);
}

.btn-primary {
  border-color: var(--marca-morado);
  background: var(--marca-morado);
}

.btn-primary:hover {
  border-color: var(--marca-oscuro);
  background: var(--marca-oscuro);
}

.table-responsive {
  border: 1px solid #ece9f1;
  border-radius: 0.8rem;
}

.table thead th {
  padding: 0.9rem 0.75rem;
  color: #655c70;
  background: #faf9fc;
  font-size: 0.78rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  white-space: nowrap;
}

.table tbody td {
  padding: 0.85rem 0.75rem;
}

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.15rem;
  height: 2.15rem;
  padding: 0;
  border-radius: 0.6rem;
}

.table-actions {
  display: flex;
  gap: 0.4rem;
}

.id-chip {
  display: inline-flex;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  color: var(--marca-morado);
  background: rgba(var(--bs-primary-rgb), 0.08);
  font-size: 0.8rem;
  font-weight: 700;
}

.status {
  display: inline-flex;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 700;
}

.status-success {
  color: #0d6b45;
  background: #def5e9;
}

.status-muted {
  color: #5f6368;
  background: #eceff1;
}

.empty-state {
  padding: 2.5rem !important;
  color: #81768d !important;
  text-align: center;
}

.producto-imagen {
  border-radius: 0.7rem;
  object-fit: cover;
}

footer {
  color: #6c757d;
}

@media (max-width: 767.98px) {
  .section-heading {
    align-items: flex-start;
    flex-direction: column;
  }
}
```

## 5. Probar el frontend

```powershell
npm run dev
```

Abre:

```text
http://localhost:4214/productos
```

Prueba en este orden:

1. Registrar un producto.
2. Confirmar que aparece en la tabla.
3. Editarlo completamente.
4. Cambiar parcialmente su estado o stock.
5. Buscarlo y filtrar.
6. Eliminarlo.
7. Recargar y comprobar la persistencia SQLite.

## Checklist

- [ ] Bootstrap se carga desde /bootstrap.
- [ ] Bootstrap Icons se carga desde /bootstrap-icons.
- [ ] El formulario usa ProductoRequestDto frontend.
- [ ] fetch está aislado en productos.api.js.
- [ ] La UI está aislada en productos.ui.js.
- [ ] El CRUD funciona sin recargar manualmente después de cada acción.
