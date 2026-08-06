# Hito 7 — GET: buscar Productos

## Objetivo

Agregar `GET /api/productos/buscar` con filtros opcionales.

## 1. Verificar src/utils/texto.js

Este archivo se creó en el hito POST:

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

## 2. Actualizar imports del Repository

Agrega:

```js
import { objetoContieneTexto } from "../utils/texto.js";
```

## 3. Agregar query al Repository

```js
  async query(productoConsultaDto) {
    const productos = await this.listar();
    const texto = productoConsultaDto.texto ?? "";
    const categoria = productoConsultaDto.categoria ?? "";
    const activo = productoConsultaDto.activo ?? "";
    const precioMin = productoConsultaDto.precioMin ?? "";
    const precioMax = productoConsultaDto.precioMax ?? "";

    return productos.filter((productoModel) => {
      const camposBuscables = {
        id: productoModel.id,
        codigo: productoModel.codigo,
        nombre: productoModel.nombre,
        categoria: productoModel.categoria,
        descripcion: productoModel.descripcion,
      };

      return (
        objetoContieneTexto(camposBuscables, texto) &&
        (!categoria || productoModel.categoria === categoria) &&
        (activo === "" || String(productoModel.activo) === String(activo)) &&
        (precioMin === "" || productoModel.precio >= Number(precioMin)) &&
        (precioMax === "" || productoModel.precio <= Number(precioMax))
      );
    });
  }
```

## 4. Agregar buscar al Service

```js
  async buscar(productoConsultaDto) {
    const productosModel =
      await this.productoRepository.query(productoConsultaDto);
    return productosModel.map(
      (productoModel) => new ProductoResponseDto(productoModel),
    );
  }
```

## 5. Agregar buscar al Controller

```js
  async buscar(productoConsultaDto, response) {
    const productosResponseDto =
      await this.productosService.buscar(productoConsultaDto);
    response.json({
      total: productosResponseDto.length,
      productoConsultaDto,
      productosResponseDto,
    });
  }
```

## 6. Actualizar import de DTO en Routes

```js
import {
  ProductoConsultaDto,
  ProductoRequestDto,
} from "../dtos/ProductoDto.js";
```

## 7. Agregar la ruta antes de /:id

Debe ir antes de `router.get("/:id", ...)` para que Express no interprete `buscar` como un ID.

```js
router.get(
  "/buscar",
  asyncHandler((request, response) => {
    const productoConsultaDto = new ProductoConsultaDto(request.query);
    return controller.buscar(productoConsultaDto, response);
  }),
);
```

## 8. Probar búsqueda

```http
GET http://localhost:4214/api/productos/buscar?texto=laptop&categoria=TEC&activo=false&precioMin=1000&precioMax=3000
```

Debe responder `200` y devolver solo los productos que cumplen todos los filtros enviados.

## 9. Crear el frontend de validación GET /buscar

Crea `public/hitos/07-get-buscar.html` y copia todo este código:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hito 7 - Probar GET buscar</title>
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/bootstrap-icons/font/bootstrap-icons.css" />
  </head>
  <body class="bg-light">
    <nav class="navbar navbar-dark bg-primary">
      <div class="container">
        <span class="navbar-brand"><i class="bi bi-search me-2"></i>Hito 7 · GET /buscar</span>
      </div>
    </nav>

    <main class="container py-4">
      <div id="mensaje" class="alert d-none" role="alert"></div>
      <section class="card border-0 shadow-sm mb-4">
        <div class="card-body p-4">
          <form id="form-buscar" class="row g-3 align-items-end">
            <div class="col-md-4">
              <label class="form-label" for="texto">Texto</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-search"></i></span>
                <input id="texto" class="form-control" placeholder="Código, nombre o descripción" />
              </div>
            </div>
            <div class="col-md-2">
              <label class="form-label" for="categoria">Categoría</label>
              <select id="categoria" class="form-select">
                <option value="">Todas</option><option value="TEC">Tecnología</option>
                <option value="HOG">Hogar</option><option value="OFI">Oficina</option>
                <option value="ALI">Alimentos</option>
              </select>
            </div>
            <div class="col-md-2">
              <label class="form-label" for="activo">Estado</label>
              <select id="activo" class="form-select">
                <option value="">Todos</option><option value="true">Activos</option><option value="false">Inactivos</option>
              </select>
            </div>
            <div class="col-md-2">
              <label class="form-label" for="precioMin">Precio mínimo</label>
              <input id="precioMin" type="number" min="0" class="form-control" />
            </div>
            <div class="col-md-2">
              <label class="form-label" for="precioMax">Precio máximo</label>
              <input id="precioMax" type="number" min="0" class="form-control" />
            </div>
            <div class="col-12">
              <button class="btn btn-primary">
                <i class="bi bi-funnel me-1"></i>Buscar con GET
              </button>
              <button id="btn-limpiar" type="button" class="btn btn-outline-secondary">
                <i class="bi bi-x-circle me-1"></i>Limpiar filtros
              </button>
            </div>
          </form>
          <code id="url" class="d-block mt-3"></code>
        </div>
      </section>

      <section class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <div class="d-flex justify-content-between mb-3">
            <h1 class="h5 mb-0">Resultados filtrados</h1>
            <span id="total" class="badge text-bg-primary">0</span>
          </div>
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead><tr><th>ID</th><th>Código</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Estado</th></tr></thead>
              <tbody id="tabla"><tr><td colspan="6" class="text-center py-4 text-secondary">Realiza una búsqueda.</td></tr></tbody>
            </table>
          </div>
        </div>
      </section>
    </main>

    <script>
      const formulario = document.querySelector("#form-buscar");
      const mensaje = document.querySelector("#mensaje");
      const tabla = document.querySelector("#tabla");

      formulario.addEventListener("submit", buscar);
      document.querySelector("#btn-limpiar").addEventListener("click", () => {
        formulario.reset();
        buscar(new Event("submit"));
      });

      async function buscar(evento) {
        evento.preventDefault();
        const productoConsultaDto = {
          texto: valor("texto"), categoria: valor("categoria"), activo: valor("activo"),
          precioMin: valor("precioMin"), precioMax: valor("precioMax"),
        };
        const parametros = new URLSearchParams();
        for (const [campo, valorActual] of Object.entries(productoConsultaDto)) {
          if (valorActual !== "") parametros.set(campo, valorActual);
        }
        const ruta = `/api/productos/buscar?${parametros}`;
        document.querySelector("#url").textContent = `GET ${ruta}`;

        try {
          const respuestaHttp = await fetch(ruta);
          const respuesta = await respuestaHttp.json();
          if (!respuestaHttp.ok) throw new Error(`HTTP ${respuestaHttp.status} · ${respuesta.mensaje}`);
          renderizar(respuesta.productosResponseDto);
          mostrar(`HTTP 200 · ${respuesta.total} resultado(s)`, true);
        } catch (error) {
          renderizar([]);
          mostrar(error.message, false);
        }
      }

      function renderizar(productos) {
        document.querySelector("#total").textContent = productos.length;
        tabla.innerHTML = productos.length
          ? productos.map((p) => `<tr><td>${p.id}</td><td>${p.codigo}</td><td>${p.nombre}</td><td>${p.categoria}</td><td>S/ ${Number(p.precio).toFixed(2)}</td><td>${p.activo ? "Activo" : "Inactivo"}</td></tr>`).join("")
          : '<tr><td colspan="6" class="text-center py-4 text-secondary">Sin resultados.</td></tr>';
      }
      function valor(id) { return document.querySelector(`#${id}`).value.trim(); }
      function mostrar(texto, correcto) {
        mensaje.className = `alert alert-${correcto ? "success" : "danger"}`;
        mensaje.textContent = texto;
      }
    </script>
    <script src="/bootstrap/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
```

## 10. Probar la búsqueda desde el frontend

Abre:

```text
http://localhost:4214/hitos/07-get-buscar.html
```

1. Sin filtros, la tabla debe mostrar todos los productos.
2. Busca parte de un nombre o código.
3. Combina categoría, estado y rango de precio.
4. Comprueba la URL mostrada: solo debe incluir filtros con valor.
5. Usa un filtro que no coincida y verifica que aparezca **Sin resultados** sin tratarlo como error.

## Checklist

- [ ] La ruta `/buscar` está antes de `/:id`.
- [ ] Routes crea `ProductoConsultaDto`.
- [ ] Service devuelve Response DTO.
- [ ] Los filtros vacíos no eliminan resultados.
- [ ] La página `07-get-buscar.html` construye los query parameters.
- [ ] Los filtros combinados actualizan la tabla.
- [ ] Una búsqueda sin coincidencias devuelve una colección vacía con HTTP 200.
