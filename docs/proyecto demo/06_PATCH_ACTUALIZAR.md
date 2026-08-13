# Hito 6 — PATCH: actualizar parcialmente

## Objetivo

Agregar `PATCH /api/productos/:id`. Solo cambia los campos enviados y conserva los demás.

## 1. Agregar el método al Service

```js
  async actualizar(id, productoRequestDto) {
    const productoActualModel = await this.productoRepository.buscarPorId(id);
    if (!productoActualModel) throw new AppError("Producto no encontrado", 404);

    const codigo = productoRequestDto.codigo ?? productoActualModel.codigo;
    await this.validarCodigo(codigo, id);

    let imagen = productoActualModel.imagen;
    let imagenMimeType = productoActualModel.imagenMimeType;
    if (productoRequestDto.imagenBase64 !== undefined) {
      const imagenDatos = this.convertirImagen(productoRequestDto.imagenBase64);
      imagen = imagenDatos.imagen;
      imagenMimeType = imagenDatos.imagenMimeType;
    }

    const conservarSiNoSeEnvia = (nuevoValor, valorActual) =>
      nuevoValor === undefined ? valorActual : nuevoValor;

    const productoModel = new Producto(
      id,
      codigo,
      productoRequestDto.nombre ?? productoActualModel.nombre,
      productoRequestDto.categoria ?? productoActualModel.categoria,
      productoRequestDto.stock ?? productoActualModel.stock,
      productoRequestDto.precio ?? productoActualModel.precio,
      conservarSiNoSeEnvia(productoRequestDto.peso, productoActualModel.peso),
      conservarSiNoSeEnvia(
        productoRequestDto.descripcion,
        productoActualModel.descripcion,
      ),
      productoRequestDto.activo ?? productoActualModel.activo,
      conservarSiNoSeEnvia(
        productoRequestDto.fechaVencimiento,
        productoActualModel.fechaVencimiento,
      ),
      productoRequestDto.horaRegistro ?? productoActualModel.horaRegistro,
      productoRequestDto.fechaHoraRegistro ??
        productoActualModel.fechaHoraRegistro,
      imagen,
      imagenMimeType,
    );

    const productoActualizadoModel = await this.productoRepository.reemplazar(
      id,
      productoModel,
    );
    return new ProductoResponseDto(productoActualizadoModel);
  }
```

Observa que se compara con `undefined`. De este modo, no enviar un campo conserva su valor, pero enviar `null` permite limpiar campos opcionales.

## 2. Agregar el método al Controller

```js
  async actualizar(id, productoRequestDto, response) {
    const productoResponseDto = await this.productosService.actualizar(
      id,
      productoRequestDto,
    );
    response.json({
      mensaje: "Producto actualizado",
      productoResponseDto,
    });
  }
```

## 3. Verificar el import del middleware

En Routes debe quedar:

```js
import {
  validarProductoCompleto,
  validarProductoParcial,
} from "../middlewares/validacion.middleware.js";
```

## 4. Agregar la ruta PATCH

```js
router.patch(
  "/:id",
  validarId,
  validarProductoParcial,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const productoRequestDto = new ProductoRequestDto(request.body);
    return controller.actualizar(id, productoRequestDto, response);
  }),
);
```

## 5. Probar PATCH

```http
PATCH http://localhost:4214/api/productos/1
Content-Type: application/json

{
  "stock": 7,
  "activo": false,
  "descripcion": null
}
```

Debe responder `200`. Verifica después con GET que:

- `stock` sea `7`.
- `activo` sea `false`.
- `descripcion` sea `null`.
- `nombre`, `precio` y los demás campos conserven su valor.

## 6. Crear el frontend de validación PATCH

Crea `public/hitos/06-patch.html` y copia todo este código:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hito 6 - Probar PATCH</title>
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/bootstrap-icons/font/bootstrap-icons.css" />
  </head>
  <body class="bg-light">
    <nav class="navbar navbar-dark bg-primary">
      <div class="container">
        <span class="navbar-brand"><i class="bi bi-sliders me-2"></i>Hito 6 · PATCH</span>
      </div>
    </nav>

    <main class="container py-4">
      <div id="mensaje" class="alert d-none" role="alert"></div>
      <div class="row g-4">
        <div class="col-lg-6">
          <section class="card border-0 shadow-sm h-100">
            <div class="card-body p-4">
              <h1 class="h4">Enviar solamente algunos campos</h1>
              <form id="form-patch" class="row g-3">
                <div class="col-12">
                  <label class="form-label" for="id">ID</label>
                  <input id="id" type="number" min="1" value="1" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label class="form-label" for="stock">Nuevo stock</label>
                  <input id="stock" type="number" min="0" class="form-control" placeholder="Vacío = conservar" />
                </div>
                <div class="col-md-6">
                  <label class="form-label" for="precio">Nuevo precio</label>
                  <input id="precio" type="number" min="0" step="0.01" class="form-control" placeholder="Vacío = conservar" />
                </div>
                <div class="col-12">
                  <label class="form-label" for="activo">Estado</label>
                  <select id="activo" class="form-select">
                    <option value="">No enviar: conservar</option>
                    <option value="true">Enviar true</option>
                    <option value="false">Enviar false</option>
                  </select>
                </div>
                <div class="col-12">
                  <div class="form-check mb-2">
                    <input id="enviar-descripcion" class="form-check-input" type="checkbox" />
                    <label class="form-check-label" for="enviar-descripcion">Incluir descripción en PATCH</label>
                  </div>
                  <textarea id="descripcion" class="form-control" rows="2" placeholder="Si se incluye vacía, se enviará null"></textarea>
                </div>
                <div class="col-12 d-flex gap-2">
                  <button class="btn btn-primary">
                    <i class="bi bi-send me-1"></i>Enviar PATCH
                  </button>
                  <button id="btn-consultar" type="button" class="btn btn-outline-primary">
                    <i class="bi bi-search me-1"></i>Consultar con GET
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>

        <div class="col-lg-6">
          <section class="card border-0 shadow-sm h-100">
            <div class="card-body p-4">
              <h2 class="h5">Body que se enviará</h2>
              <pre id="body" class="bg-dark text-light rounded p-3">{}</pre>
              <h2 class="h5 mt-4">Producto guardado</h2>
              <pre id="resultado" class="bg-dark text-light rounded p-3 mb-0">Ejecuta PATCH o GET.</pre>
            </div>
          </section>
        </div>
      </div>
    </main>

    <script>
      const mensaje = document.querySelector("#mensaje");
      const bodyVista = document.querySelector("#body");
      const resultado = document.querySelector("#resultado");

      document.querySelector("#form-patch").addEventListener("submit", async (evento) => {
        evento.preventDefault();
        const id = Number(document.querySelector("#id").value);
        const productoRequestDto = construirBody();
        bodyVista.textContent = JSON.stringify(productoRequestDto, null, 2);

        if (!Object.keys(productoRequestDto).length) {
          mostrar("Selecciona por lo menos un campo para PATCH.", false);
          return;
        }

        await ejecutar(async () => {
          const respuestaHttp = await fetch(`/api/productos/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productoRequestDto),
          });
          const respuesta = await respuestaHttp.json();
          if (!respuestaHttp.ok) throw new Error(`HTTP ${respuestaHttp.status} · ${respuesta.mensaje}`);
          resultado.textContent = JSON.stringify(respuesta.productoResponseDto, null, 2);
          mostrar(`HTTP ${respuestaHttp.status} · ${respuesta.mensaje}`, true);
        });
      });

      document.querySelector("#btn-consultar").addEventListener("click", consultar);

      function construirBody() {
        const productoRequestDto = {};
        const stock = document.querySelector("#stock").value;
        const precio = document.querySelector("#precio").value;
        const activo = document.querySelector("#activo").value;

        if (stock !== "") productoRequestDto.stock = Number(stock);
        if (precio !== "") productoRequestDto.precio = Number(precio);
        if (activo !== "") productoRequestDto.activo = activo === "true";
        if (document.querySelector("#enviar-descripcion").checked) {
          productoRequestDto.descripcion = document.querySelector("#descripcion").value.trim() || null;
        }
        return productoRequestDto;
      }

      async function consultar() {
        const id = Number(document.querySelector("#id").value);
        await ejecutar(async () => {
          const respuestaHttp = await fetch(`/api/productos/${id}`);
          const respuesta = await respuestaHttp.json();
          if (!respuestaHttp.ok) throw new Error(`HTTP ${respuestaHttp.status} · ${respuesta.mensaje}`);
          resultado.textContent = JSON.stringify(respuesta.productoResponseDto, null, 2);
          mostrar("HTTP 200 · Producto consultado", true);
        });
      }

      async function ejecutar(callback) {
        try { await callback(); } catch (error) { mostrar(error.message, false); }
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

## 7. Probar PATCH desde el frontend

Abre:

```text
http://localhost:4214/hitos/06-patch.html
```

1. Consulta el producto y anota su nombre y precio.
2. Escribe únicamente un nuevo stock y envía `PATCH`.
3. Repite `GET`: el stock cambia, mientras nombre y precio se conservan.
4. Selecciona **Incluir descripción**, déjala vacía y envía: la descripción debe quedar en `null`.
5. Intenta enviar el formulario sin seleccionar campos; el frontend debe impedirlo.

## Checklist

- [ ] PATCH vacío devuelve 400.
- [ ] PATCH parcial devuelve 200.
- [ ] Los campos no enviados se conservan.
- [ ] NULL limpia un campo opcional.
- [ ] La página `06-patch.html` muestra el body parcial.
- [ ] El GET posterior confirma que los demás campos se conservaron.
- [ ] El frontend impide enviar un PATCH vacío.
