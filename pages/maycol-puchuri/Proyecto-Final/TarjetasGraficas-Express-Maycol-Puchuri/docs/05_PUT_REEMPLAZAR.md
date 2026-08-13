# Hito 5 — PUT: reemplazar Producto

## Objetivo

Agregar `PUT /api/productos/:id`. PUT exige el objeto completo y reemplaza todos sus campos.

## 1. Agregar el método al Repository

Pega dentro de `ProductoRepository`, antes de la llave final:

```js
  async reemplazar(id, productoModel) {
    const resultado = this.db
      .prepare(
        `
        UPDATE productos
        SET codigo = ?,
            nombre = ?,
            categoria = ?,
            stock = ?,
            precio = ?,
            peso = ?,
            descripcion = ?,
            activo = ?,
            fechaVencimiento = ?,
            horaRegistro = ?,
            fechaHoraRegistro = ?,
            imagen = ?,
            imagenMimeType = ?
        WHERE id = ?
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
        Number(id),
      );

    return resultado.changes ? this.buscarPorId(id) : null;
  }
```

## 2. Agregar el método al Service

Pega dentro de `ProductosService`:

```js
  async reemplazar(id, productoRequestDto) {
    const productoExistenteModel =
      await this.productoRepository.buscarPorId(id);
    if (!productoExistenteModel)
      throw new AppError("Producto no encontrado", 404);
    await this.validarCodigo(productoRequestDto.codigo, id);

    const imagenDatos = this.convertirImagen(productoRequestDto.imagenBase64);
    const productoModel = new Producto(
      id,
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

    const productoActualizadoModel = await this.productoRepository.reemplazar(
      id,
      productoModel,
    );
    return new ProductoResponseDto(productoActualizadoModel);
  }
```

## 3. Agregar el método al Controller

Pega dentro de `ProductosController`:

```js
  async reemplazar(id, productoRequestDto, response) {
    const productoResponseDto = await this.productosService.reemplazar(
      id,
      productoRequestDto,
    );
    response.json({
      mensaje: "Producto reemplazado",
      productoResponseDto,
    });
  }
```

## 4. Agregar la ruta

Pega después del POST y antes de exportar el router:

```js
router.put(
  "/:id",
  validarId,
  validarProductoCompleto,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const productoRequestDto = new ProductoRequestDto(request.body);
    return controller.reemplazar(id, productoRequestDto, response);
  }),
);
```

## 5. Probar PUT

```http
PUT http://localhost:4214/api/productos/1
Content-Type: application/json

{
  "codigo": "PROD-001",
  "nombre": "Laptop reemplazada",
  "categoria": "TEC",
  "stock": 20,
  "precio": 2299.50,
  "peso": 1.65,
  "descripcion": "Todos los campos fueron enviados con PUT",
  "activo": true,
  "fechaVencimiento": null,
  "horaRegistro": "10:00",
  "fechaHoraRegistro": "2026-08-03T10:00:00",
  "imagenBase64": null
}
```

Debe responder `200` y `Producto reemplazado`.

## 6. Probar que PUT exige todos los campos

Envía solamente `nombre`. Debe responder `400` porque PUT usa `validarProductoCompleto`.

## 7. Crear el frontend de validación PUT

Crea `public/hitos/05-put.html` y copia todo este código. Primero usa `GET` para cargar todos los datos; después el formulario envía el reemplazo completo mediante `PUT`.

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hito 5 - Probar PUT</title>
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/bootstrap-icons/font/bootstrap-icons.css" />
  </head>
  <body class="bg-light">
    <nav class="navbar navbar-dark bg-primary">
      <div class="container">
        <span class="navbar-brand"><i class="bi bi-pencil-square me-2"></i>Hito 5 · PUT</span>
      </div>
    </nav>

    <main class="container py-4">
      <div id="mensaje" class="alert d-none" role="alert"></div>
      <section class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <div class="row g-3 align-items-end mb-4">
            <div class="col-md-4">
              <label class="form-label" for="id">ID que se reemplazará</label>
              <input id="id" type="number" min="1" value="1" class="form-control" />
            </div>
            <div class="col-md-4">
              <button id="btn-cargar" type="button" class="btn btn-outline-primary w-100">
                <i class="bi bi-download me-1"></i>Cargar datos con GET
              </button>
            </div>
          </div>

          <form id="form-put" class="row g-3">
            <div class="col-md-4">
              <label class="form-label" for="codigo">Código</label>
              <input id="codigo" class="form-control" required />
            </div>
            <div class="col-md-5">
              <label class="form-label" for="nombre">Nombre</label>
              <input id="nombre" class="form-control" required />
            </div>
            <div class="col-md-3">
              <label class="form-label" for="categoria">Categoría</label>
              <select id="categoria" class="form-select" required>
                <option value="TEC">Tecnología</option><option value="HOG">Hogar</option>
                <option value="OFI">Oficina</option><option value="ALI">Alimentos</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label" for="stock">Stock</label>
              <input id="stock" type="number" min="0" class="form-control" required />
            </div>
            <div class="col-md-3">
              <label class="form-label" for="precio">Precio</label>
              <input id="precio" type="number" min="0" step="0.01" class="form-control" required />
            </div>
            <div class="col-md-3">
              <label class="form-label" for="peso">Peso</label>
              <input id="peso" type="number" min="0" step="0.01" class="form-control" />
            </div>
            <div class="col-md-3">
              <label class="form-label" for="fechaVencimiento">Vencimiento</label>
              <input id="fechaVencimiento" type="date" class="form-control" />
            </div>
            <div class="col-md-3">
              <label class="form-label" for="horaRegistro">Hora</label>
              <input id="horaRegistro" type="time" class="form-control" required />
            </div>
            <div class="col-md-4">
              <label class="form-label" for="fechaHoraRegistro">Fecha y hora</label>
              <input id="fechaHoraRegistro" type="datetime-local" class="form-control" required />
            </div>
            <div class="col-md-5">
              <label class="form-label" for="imagen">Reemplazar imagen</label>
              <input id="imagen" type="file" accept="image/*" class="form-control" />
            </div>
            <div class="col-md-3 d-flex align-items-end">
              <div class="form-check form-switch mb-2">
                <input id="activo" class="form-check-input" type="checkbox" />
                <label class="form-check-label" for="activo">Activo</label>
              </div>
            </div>
            <div class="col-12">
              <label class="form-label" for="descripcion">Descripción</label>
              <textarea id="descripcion" class="form-control" rows="2"></textarea>
            </div>
            <div class="col-12">
              <button class="btn btn-primary">
                <i class="bi bi-save me-1"></i>Reemplazar todos los campos con PUT
              </button>
            </div>
          </form>
          <pre id="resultado" class="bg-dark text-light rounded p-3 mt-4 mb-0 d-none"></pre>
        </div>
      </section>
    </main>

    <script>
      let imagenActualBase64 = null;
      const mensaje = document.querySelector("#mensaje");
      const resultado = document.querySelector("#resultado");

      document.querySelector("#btn-cargar").addEventListener("click", cargarProducto);
      document.querySelector("#form-put").addEventListener("submit", reemplazarProducto);

      async function cargarProducto() {
        const id = Number(document.querySelector("#id").value);
        await ejecutar(async () => {
          const respuestaHttp = await fetch(`/api/productos/${id}`);
          const respuesta = await respuestaHttp.json();
          if (!respuestaHttp.ok) throw new Error(`HTTP ${respuestaHttp.status} · ${respuesta.mensaje}`);

          const producto = respuesta.productoResponseDto;
          for (const campo of ["codigo", "nombre", "categoria", "stock", "precio", "horaRegistro"]) {
            document.querySelector(`#${campo}`).value = producto[campo];
          }
          document.querySelector("#peso").value = producto.peso ?? "";
          document.querySelector("#descripcion").value = producto.descripcion ?? "";
          document.querySelector("#fechaVencimiento").value = producto.fechaVencimiento ?? "";
          document.querySelector("#fechaHoraRegistro").value = String(producto.fechaHoraRegistro).slice(0, 16);
          document.querySelector("#activo").checked = producto.activo;
          imagenActualBase64 = producto.imagenBase64;
          mostrar(`HTTP 200 · Producto ${id} cargado. Modifica cualquier campo.`, true);
        });
      }

      async function reemplazarProducto(evento) {
        evento.preventDefault();
        const id = Number(document.querySelector("#id").value);

        await ejecutar(async () => {
          const archivo = document.querySelector("#imagen").files[0];
          const imagenBase64 = archivo ? await convertirBase64(archivo) : imagenActualBase64;
          const productoRequestDto = {
            codigo: valor("codigo"), nombre: valor("nombre"), categoria: valor("categoria"),
            stock: Number(valor("stock")), precio: Number(valor("precio")),
            peso: numeroONull("peso"), descripcion: valor("descripcion") || null,
            activo: document.querySelector("#activo").checked,
            fechaVencimiento: valor("fechaVencimiento") || null,
            horaRegistro: valor("horaRegistro"), fechaHoraRegistro: valor("fechaHoraRegistro"),
            imagenBase64,
          };

          const respuestaHttp = await fetch(`/api/productos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productoRequestDto),
          });
          const respuesta = await respuestaHttp.json();
          resultado.textContent = JSON.stringify(respuesta, null, 2);
          resultado.classList.remove("d-none");
          if (!respuestaHttp.ok) throw new Error(`HTTP ${respuestaHttp.status} · ${respuesta.mensaje}`);
          mostrar(`HTTP ${respuestaHttp.status} · ${respuesta.mensaje}`, true);
        });
      }

      function valor(id) { return document.querySelector(`#${id}`).value.trim(); }
      function numeroONull(id) { return valor(id) === "" ? null : Number(valor(id)); }
      function convertirBase64(archivo) {
        return new Promise((resolve, reject) => {
          const lector = new FileReader();
          lector.addEventListener("load", () => resolve(lector.result), { once: true });
          lector.addEventListener("error", () => reject(lector.error), { once: true });
          lector.readAsDataURL(archivo);
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

## 8. Probar PUT desde el frontend

Abre:

```text
http://localhost:4214/hitos/05-put.html
```

1. Escribe un ID existente y presiona **Cargar datos con GET**.
2. Cambia el nombre, stock u otro campo.
3. Presiona **Reemplazar todos los campos con PUT**.
4. Debe mostrarse `HTTP 200 · Producto reemplazado`.
5. Vuelve a cargar el mismo ID y verifica que los cambios se guardaron.

## Checklist

- [ ] PUT usa ID y body.
- [ ] El body completo se convierte en DTO.
- [ ] Repository ejecuta UPDATE.
- [ ] PUT completo responde 200.
- [ ] PUT incompleto responde 400.
- [ ] La página `05-put.html` carga un producto existente.
- [ ] El formulario envía todos los campos con PUT.
- [ ] Al volver a cargar, se observan los nuevos valores.
