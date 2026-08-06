# Hito 9 — DELETE: eliminar Producto

## Objetivo

Agregar `DELETE /api/productos/:id` y comprobar que el registro ya no existe.

## 1. Agregar eliminar al Repository

```js
  async eliminar(id) {
    const productoModel = await this.buscarPorId(id);
    if (!productoModel) return null;

    this.db.prepare("DELETE FROM productos WHERE id = ?").run(Number(id));
    return productoModel;
  }
```

## 2. Agregar eliminar al Service

```js
  async eliminar(id) {
    const productoEliminadoModel = await this.productoRepository.eliminar(id);
    if (!productoEliminadoModel)
      throw new AppError("Producto no encontrado", 404);
    return new ProductoResponseDto(productoEliminadoModel);
  }
```

## 3. Agregar eliminar al Controller

```js
  async eliminar(id, response) {
    const productoResponseDto = await this.productosService.eliminar(id);
    response.json({
      mensaje: "Producto eliminado",
      productoResponseDto,
    });
  }
```

## 4. Agregar la ruta

```js
router.delete(
  "/:id",
  validarId,
  asyncHandler((request, response) =>
    controller.eliminar(Number(request.params.id), response),
  ),
);
```

## 5. Probar DELETE

```http
DELETE http://localhost:4214/api/productos/1
```

Debe responder `200`, `Producto eliminado` y devolver el producto que se eliminó.

## 6. Confirmar la eliminación

```http
GET http://localhost:4214/api/productos/1
```

Debe responder `404`.

## 7. Crear el frontend de validación DELETE

Antes de probar desde esta pantalla, asegúrate de tener al menos un producto que puedas eliminar. Puedes crear uno desde `03-post.html`.

Crea `public/hitos/09-delete.html` y copia todo este código:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hito 9 - Probar DELETE</title>
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/bootstrap-icons/font/bootstrap-icons.css" />
  </head>
  <body class="bg-light">
    <nav class="navbar navbar-dark bg-danger">
      <div class="container">
        <span class="navbar-brand"><i class="bi bi-trash me-2"></i>Hito 9 · DELETE</span>
      </div>
    </nav>

    <main class="container py-4">
      <div id="mensaje" class="alert d-none" role="alert"></div>
      <section class="card border-0 shadow-sm mx-auto" style="max-width: 48rem">
        <div class="card-body p-4">
          <h1 class="h4">Eliminar un producto de forma controlada</h1>
          <div class="row g-3 align-items-end">
            <div class="col-md-6">
              <label class="form-label" for="id">ID</label>
              <input id="id" type="number" min="1" value="1" class="form-control" />
            </div>
            <div class="col-md-6">
              <button id="btn-cargar" class="btn btn-outline-primary w-100">
                <i class="bi bi-search me-1"></i>1. Consultar antes de eliminar
              </button>
            </div>
          </div>

          <div id="producto" class="border rounded p-3 mt-4 d-none">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <strong id="producto-nombre"></strong>
                <span id="producto-codigo" class="text-secondary d-block"></span>
              </div>
              <button id="btn-abrir-modal" class="btn btn-danger">
                <i class="bi bi-trash me-1"></i>2. Eliminar
              </button>
            </div>
          </div>

          <button id="btn-verificar" class="btn btn-outline-secondary mt-3 d-none">
            <i class="bi bi-shield-check me-1"></i>3. Verificar GET 404
          </button>
          <pre id="resultado" class="bg-dark text-light rounded p-3 mt-4 mb-0">Consulta un ID.</pre>
        </div>
      </section>
    </main>

    <div id="modal-eliminar" class="modal fade" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title fs-5">Confirmar eliminación</h2>
            <button class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <p class="mb-0">Esta acción eliminará el producto seleccionado de SQLite.</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
            <button id="btn-confirmar" class="btn btn-danger">
              <i class="bi bi-trash me-1"></i>Confirmar DELETE
            </button>
          </div>
        </div>
      </div>
    </div>

    <script src="/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script>
      const mensaje = document.querySelector("#mensaje");
      const resultado = document.querySelector("#resultado");
      const tarjetaProducto = document.querySelector("#producto");
      const btnVerificar = document.querySelector("#btn-verificar");
      const modal = new bootstrap.Modal(document.querySelector("#modal-eliminar"));

      document.querySelector("#btn-cargar").addEventListener("click", consultarAntes);
      document.querySelector("#btn-abrir-modal").addEventListener("click", () => modal.show());
      document.querySelector("#btn-confirmar").addEventListener("click", eliminar);
      btnVerificar.addEventListener("click", verificarEliminacion);

      async function consultarAntes() {
        const { respuestaHttp, respuesta } = await solicitar("GET");
        resultado.textContent = JSON.stringify(respuesta, null, 2);

        if (!respuestaHttp.ok) {
          tarjetaProducto.classList.add("d-none");
          mostrar(`HTTP ${respuestaHttp.status} · ${respuesta.mensaje}`, false);
          return;
        }

        document.querySelector("#producto-nombre").textContent = respuesta.productoResponseDto.nombre;
        document.querySelector("#producto-codigo").textContent = respuesta.productoResponseDto.codigo;
        tarjetaProducto.classList.remove("d-none");
        btnVerificar.classList.add("d-none");
        mostrar("HTTP 200 · Producto encontrado. Revisa antes de eliminar.", true);
      }

      async function eliminar() {
        const { respuestaHttp, respuesta } = await solicitar("DELETE");
        modal.hide();
        resultado.textContent = JSON.stringify(respuesta, null, 2);
        const correcto = respuestaHttp.status === 200;
        mostrar(`HTTP ${respuestaHttp.status} · ${respuesta.mensaje}`, correcto);
        if (correcto) {
          tarjetaProducto.classList.add("d-none");
          btnVerificar.classList.remove("d-none");
        }
      }

      async function verificarEliminacion() {
        const { respuestaHttp, respuesta } = await solicitar("GET");
        resultado.textContent = JSON.stringify(respuesta, null, 2);
        const correcto = respuestaHttp.status === 404;
        mostrar(`HTTP ${respuestaHttp.status} · ${correcto ? "El producto ya no existe" : "Resultado inesperado"}`, correcto);
      }

      async function solicitar(metodo) {
        const id = Number(document.querySelector("#id").value);
        const respuestaHttp = await fetch(`/api/productos/${id}`, { method: metodo });
        const respuesta = await respuestaHttp.json();
        return { respuestaHttp, respuesta };
      }

      function mostrar(texto, correcto) {
        mensaje.className = `alert alert-${correcto ? "success" : "danger"}`;
        mensaje.textContent = texto;
      }
    </script>
  </body>
</html>
```

## 8. Probar DELETE desde el frontend

Abre:

```text
http://localhost:4214/hitos/09-delete.html
```

1. Escribe el ID de un producto que puedas eliminar.
2. Presiona **Consultar antes de eliminar** y revisa el nombre y código.
3. Abre el modal, cancela una vez y comprueba que el producto siga existiendo.
4. Vuelve a abrirlo y confirma `DELETE`; debe responder `HTTP 200`.
5. Presiona **Verificar GET 404**; esta comprobación debe aparecer en verde.

## Checklist

- [ ] DELETE existente devuelve 200.
- [ ] DELETE devuelve el Response DTO eliminado.
- [ ] GET posterior devuelve 404.
- [ ] DELETE repetido devuelve 404.
- [ ] La página `09-delete.html` consulta antes de borrar.
- [ ] El modal Bootstrap permite cancelar.
- [ ] DELETE responde 200 desde el navegador.
- [ ] La verificación visual posterior obtiene 404.
