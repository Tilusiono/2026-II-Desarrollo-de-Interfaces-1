# Hito 8 — QUERY: consultar Productos

## Objetivo

Agregar el método educativo `QUERY /api/productos/consulta`. Usa los mismos filtros del GET buscar, pero exige que el verbo HTTP sea QUERY.

## 1. Crear src/middlewares/query.middleware.js

```js
import { AppError } from "../errors/AppError.js";

// Express no incluye QUERY entre sus métodos abreviados.
// Este middleware permite enseñarlo sin confundirlo con request.query.
export function validarMetodoQuery(request, response, next) {
  if (request.method !== "QUERY") {
    return next(
      new AppError("Esta ruta acepta únicamente el método HTTP QUERY", 405),
    );
  }

  next();
}
```

## 2. Agregar consultar al Controller

```js
  async consultar(productoConsultaDto, response) {
    const productosResponseDto =
      await this.productosService.buscar(productoConsultaDto);
    response.json({
      metodo: "QUERY",
      total: productosResponseDto.length,
      productoConsultaDto,
      productosResponseDto,
    });
  }
```

## 3. Importar el middleware en Routes

```js
import { validarMetodoQuery } from "../middlewares/query.middleware.js";
```

## 4. Agregar la ruta antes de /buscar y /:id

```js
router.use(
  "/consulta",
  validarMetodoQuery,
  asyncHandler((request, response) => {
    const productoConsultaDto = new ProductoConsultaDto(request.query);
    return controller.consultar(productoConsultaDto, response);
  }),
);
```

## 5. Probar QUERY

```http
QUERY http://localhost:4214/api/productos/consulta?categoria=TEC&precioMax=3000
```

Debe responder `200` e incluir `metodo: "QUERY"`.

## 6. Comprobar restricción

```http
GET http://localhost:4214/api/productos/consulta?categoria=TEC
```

Debe responder `405` porque esa ruta acepta únicamente QUERY.

## 7. Crear el frontend de validación QUERY

Crea `public/hitos/08-query.html` y copia todo este código:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hito 8 - Probar QUERY</title>
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/bootstrap-icons/font/bootstrap-icons.css" />
  </head>
  <body class="bg-light">
    <nav class="navbar navbar-dark bg-primary">
      <div class="container">
        <span class="navbar-brand"><i class="bi bi-database-down me-2"></i>Hito 8 · QUERY</span>
      </div>
    </nav>

    <main class="container py-4">
      <div class="alert alert-info">
        <i class="bi bi-info-circle me-1"></i>
        `QUERY` es un método HTTP personalizado. No es lo mismo que `request.query`.
      </div>
      <div id="mensaje" class="alert d-none" role="alert"></div>

      <section class="card border-0 shadow-sm mb-4">
        <div class="card-body p-4">
          <form id="form-query" class="row g-3 align-items-end">
            <div class="col-md-3">
              <label class="form-label" for="texto">Texto</label>
              <input id="texto" class="form-control" />
            </div>
            <div class="col-md-3">
              <label class="form-label" for="categoria">Categoría</label>
              <select id="categoria" class="form-select">
                <option value="">Todas</option><option value="TEC">Tecnología</option>
                <option value="HOG">Hogar</option><option value="OFI">Oficina</option><option value="ALI">Alimentos</option>
              </select>
            </div>
            <div class="col-md-2">
              <label class="form-label" for="activo">Estado</label>
              <select id="activo" class="form-select">
                <option value="">Todos</option><option value="true">Activos</option><option value="false">Inactivos</option>
              </select>
            </div>
            <div class="col-md-2">
              <label class="form-label" for="precioMin">Precio mín.</label>
              <input id="precioMin" type="number" min="0" class="form-control" />
            </div>
            <div class="col-md-2">
              <label class="form-label" for="precioMax">Precio máx.</label>
              <input id="precioMax" type="number" min="0" class="form-control" />
            </div>
            <div class="col-12 d-flex flex-wrap gap-2">
              <button class="btn btn-primary">
                <i class="bi bi-play-circle me-1"></i>Enviar método QUERY
              </button>
              <button id="btn-get-invalido" type="button" class="btn btn-outline-danger">
                <i class="bi bi-bug me-1"></i>Probar GET inválido
              </button>
            </div>
          </form>
          <code id="solicitud" class="d-block mt-3"></code>
        </div>
      </section>

      <section class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <h1 class="h5">Respuesta</h1>
          <pre id="resultado" class="bg-dark text-light rounded p-3 mb-0">Ejecuta una solicitud.</pre>
        </div>
      </section>
    </main>

    <script>
      const formulario = document.querySelector("#form-query");
      const mensaje = document.querySelector("#mensaje");
      const resultado = document.querySelector("#resultado");

      formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();
        await consultar("QUERY");
      });
      document.querySelector("#btn-get-invalido").addEventListener("click", async () => {
        await consultar("GET");
      });

      async function consultar(metodo) {
        const parametros = new URLSearchParams();
        for (const id of ["texto", "categoria", "activo", "precioMin", "precioMax"]) {
          const valor = document.querySelector(`#${id}`).value.trim();
          if (valor !== "") parametros.set(id, valor);
        }
        const ruta = `/api/productos/consulta?${parametros}`;
        document.querySelector("#solicitud").textContent = `${metodo} ${ruta}`;

        try {
          const respuestaHttp = await fetch(ruta, { method: metodo });
          const respuesta = await respuestaHttp.json();
          resultado.textContent = JSON.stringify(respuesta, null, 2);

          const resultadoEsperado = metodo === "QUERY"
            ? respuestaHttp.status === 200 && respuesta.metodo === "QUERY"
            : respuestaHttp.status === 405;
          mostrar(
            `HTTP ${respuestaHttp.status} · ${resultadoEsperado ? "Resultado esperado" : "Resultado inesperado"}`,
            resultadoEsperado,
          );
        } catch (error) {
          mostrar(error.message, false);
        }
      }

      function mostrar(texto, correcto) {
        mensaje.className = `alert alert-${correcto ? "success" : "danger"}`;
        mensaje.textContent = texto;
      }
    </script>
    <script src="/bootstrap/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
```

## 8. Probar QUERY desde el frontend

Abre:

```text
http://localhost:4214/hitos/08-query.html
```

1. Selecciona uno o más filtros y presiona **Enviar método QUERY**.
2. Debes obtener `HTTP 200`, `metodo: "QUERY"` y la colección filtrada.
3. Presiona **Probar GET inválido** sobre la misma ruta.
4. Debes obtener `HTTP 405`; la página lo mostrará en verde porque es el resultado esperado de esa prueba.

## Checklist

- [ ] QUERY responde 200.
- [ ] GET sobre /consulta responde 405.
- [ ] Se reutiliza Service.buscar.
- [ ] QUERY no se reemplazó por POST.
- [ ] La página `08-query.html` envía el método QUERY real.
- [ ] El frontend muestra `metodo: "QUERY"` en la respuesta.
- [ ] La prueba visual con GET confirma el 405.
