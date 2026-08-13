# Hito 11 — Prueba final del proyecto

## Objetivo

Ejecutar el recorrido completo desde una base vacía y confirmar que todos los hitos permanecen funcionando juntos.

## 1. Crear requests.http

```http
@baseUrl = http://localhost:4214/api

### 1. GET: comprobar API
GET {{baseUrl}}

### 2. GET: listar productos antes de crear
GET {{baseUrl}}/productos

### 3. POST: crear producto
POST {{baseUrl}}/productos
Content-Type: application/json

{
  "codigo": "PROD-001",
  "nombre": "Laptop Lenovo",
  "categoria": "TEC",
  "stock": 8,
  "precio": 2499.90,
  "peso": 1.75,
  "descripcion": "Laptop para desarrollo",
  "activo": true,
  "fechaVencimiento": null,
  "horaRegistro": "10:30",
  "fechaHoraRegistro": "2026-08-03T10:30",
  "imagenBase64": "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
}

### 4. GET: obtener producto por ID
GET {{baseUrl}}/productos/1

### 5. PUT: reemplazar producto completo
PUT {{baseUrl}}/productos/1
Content-Type: application/json

{
  "codigo": "PROD-001",
  "nombre": "Laptop Lenovo actualizada",
  "categoria": "TEC",
  "stock": 10,
  "precio": 2399.90,
  "peso": 1.70,
  "descripcion": "Producto reemplazado completamente",
  "activo": true,
  "fechaVencimiento": null,
  "horaRegistro": "11:00",
  "fechaHoraRegistro": "2026-08-03T11:00",
  "imagenBase64": null
}

### 6. PATCH: actualizar solamente stock y estado
PATCH {{baseUrl}}/productos/1
Content-Type: application/json

{
  "stock": 12,
  "activo": false
}

### 7. GET: buscar productos
GET {{baseUrl}}/productos/buscar?texto=Laptop&categoria=TEC

### 8. QUERY: consultar productos con filtros
QUERY {{baseUrl}}/productos/consulta?categoria=TEC&activo=false&precioMax=2500

### 9. DELETE: eliminar producto
DELETE {{baseUrl}}/productos/1

### 10. GET: comprobar que fue eliminado
GET {{baseUrl}}/productos/1
```

Instala en VS Code la extensión REST Client si deseas ejecutar cada bloque mediante **Send Request**. Ejecuta las solicitudes una por una y en el orden del archivo.

## 2. Crear test/productos.test.js

```js
import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";

import { ProductosController } from "../src/controllers/productos.controller.js";
import {
  ProductoConsultaDto,
  ProductoRequestDto,
} from "../src/dtos/ProductoDto.js";
import Producto from "../src/models/Producto.js";
import { ProductoRepository } from "../src/repositories/ProductoRepository.js";
import { ProductosService } from "../src/services/productos.service.js";
import {
  validarProductoCompleto,
  validarProductoParcial,
} from "../src/validators/producto.validator.js";

const repository = new ProductoRepository(":memory:");
const service = new ProductosService(repository);

beforeEach(async () => {
  await repository.vaciar();
});

function crearRequestDto(cambios = {}) {
  return new ProductoRequestDto({
    codigo: "PROD-001",
    nombre: "Laptop Lenovo",
    categoria: "TEC",
    stock: 8,
    precio: 2499.9,
    peso: 1.75,
    descripcion: "Laptop para desarrollo",
    activo: true,
    fechaVencimiento: null,
    horaRegistro: "10:30",
    fechaHoraRegistro: "2026-08-03T10:30",
    imagenBase64:
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
    ...cambios,
  });
}

test("Producto mantiene al menos cinco variables privadas y cinco públicas", () => {
  const productoModel = new Producto(
    1,
    "PROD-001",
    "Laptop",
    "TEC",
    8,
    2499.9,
    1.75,
    null,
    true,
    null,
    "10:30",
    "2026-08-03T10:30",
    null,
    null,
  );

  assert.equal(productoModel.id, 1);
  assert.equal(productoModel.codigo, "PROD-001");
  assert.equal(productoModel.nombre, "Laptop");
  assert.equal(productoModel.categoria, "TEC");
  assert.equal(productoModel.stock, 8);
  assert.equal(productoModel.precio, 2499.9);
  assert.equal(productoModel.descripcion, null);
});

test("Repository y Service ejecutan CRUD con DTO y Model", async () => {
  const creado = await service.crear(crearRequestDto());
  assert.equal(creado.id, 1);
  assert.match(creado.imagenBase64, /^data:image\/gif;base64,/);

  const listado = await service.listar();
  assert.equal(listado.length, 1);

  const filtrados = await service.buscar(
    new ProductoConsultaDto({ categoria: "TEC", activo: "true" }),
  );
  assert.equal(filtrados.length, 1);

  const reemplazado = await service.reemplazar(
    creado.id,
    crearRequestDto({ nombre: "Laptop actualizada", imagenBase64: null }),
  );
  assert.equal(reemplazado.nombre, "Laptop actualizada");
  assert.equal(reemplazado.imagenBase64, null);

  const actualizado = await service.actualizar(
    creado.id,
    new ProductoRequestDto({ stock: 12, descripcion: null }),
  );
  assert.equal(actualizado.stock, 12);
  assert.equal(actualizado.descripcion, null);

  const eliminado = await service.eliminar(creado.id);
  assert.equal(eliminado.id, creado.id);
  assert.equal((await service.listar()).length, 0);
});

test("Controller recibe DTO e id, no el request de Express", async () => {
  const controller = new ProductosController(service);
  const response = {
    statusCode: 200,
    body: null,
    status(codigo) {
      this.statusCode = codigo;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };

  await controller.crear(crearRequestDto(), response);
  assert.equal(response.statusCode, 201);
  assert.equal(response.body.productoResponseDto.codigo, "PROD-001");

  await controller.obtener(1, response);
  assert.equal(response.body.productoResponseDto.id, 1);
});

test("Validadores separan POST/PUT completo de PATCH parcial", () => {
  assert.deepEqual(validarProductoCompleto(crearRequestDto()), []);
  assert.deepEqual(validarProductoParcial({ activo: false }), []);
  assert.ok(validarProductoParcial({}).length > 0);
  assert.ok(validarProductoCompleto({}).length > 0);
});
```

## 3. Ejecutar pruebas

Detén temporalmente el servidor si el test usa el mismo archivo SQLite y ejecuta:

```powershell
npm test
```

## 4. Códigos esperados

| Operación | Código |
|---|---:|
| GET API | 200 |
| GET listar | 200 |
| POST crear | 201 |
| GET por ID | 200 |
| PUT reemplazar | 200 |
| PATCH parcial | 200 |
| GET buscar | 200 |
| QUERY consultar | 200 |
| GET sobre /consulta | 405 |
| DELETE | 200 |
| GET después de DELETE | 404 |

## Checklist final

- [ ] Todos los bloques JavaScript tienen sintaxis válida.
- [ ] `npm test` termina sin fallos.
- [ ] El recorrido HTTP completo coincide con la tabla.
- [ ] La imagen se guarda como BLOB y sale como Base64.
- [ ] El frontend Bootstrap funciona.
- [ ] La base conserva los cambios después de reiniciar Express.
- [ ] `/` ya no muestra el index temporal y redirige a `/productos`.
- [ ] Cada método también fue aprobado desde su página individual en `public/hitos`.

## Limpieza opcional después de aprobar todo

Cuando ya no necesites las pantallas individuales de aprendizaje, puedes eliminarlas:

```powershell
Remove-Item public/hitos -Recurse
```

Esta limpieza es opcional. No afecta el frontend CRUD definitivo de `/productos`.
