# Proyecto `Productos-Express` desde cero

Guía completa para crear una aplicación web que administre únicamente la entidad `Producto`.

El proyecto incluye:

- Node.js y Express.
- SQLite local mediante `node:sqlite`.
- Programación orientada a objetos.
- Model, DTO, Repository, Service, Controller y Routes.
- Frontend con HTML, CSS y JavaScript modular.
- Operaciones `GET`, `POST`, `PUT`, `PATCH`, `DELETE` y `QUERY`.
- Promesas mediante `async/await` y callbacks en eventos.
- Pruebas automatizadas con `node:test`.
- Todos los tipos de datos relevantes de SQLite.

> Requisito: Node.js 22.13 o superior. Se recomienda Node.js 24 LTS.

---

## 1. Tipos de datos de la entidad Producto

| Campo | Tipo declarado en SQLite | Tipo real de almacenamiento | Permite `NULL` |
|---|---|---|---|
| `id` | `INTEGER` | `INTEGER` | No |
| `codigo` | `VARCHAR(20)` | `TEXT` | No |
| `nombre` | `TEXT` | `TEXT` | No |
| `categoria` | `CHAR(3)` | `TEXT` | No |
| `stock` | `INTEGER` | `INTEGER` | No |
| `precio` | `DECIMAL(10,2)` | `INTEGER` o `REAL` | No |
| `peso` | `REAL` | `REAL` | Sí |
| `descripcion` | `TEXT` | `TEXT` | Sí |
| `activo` | `BOOLEAN` | `INTEGER` (`0` o `1`) | No |
| `fechaVencimiento` | `DATE` | `TEXT` | Sí |
| `horaRegistro` | `TIME` | `TEXT` | No |
| `fechaRegistro` | `DATETIME` | `TEXT` | No |
| `imagen` | `BLOB` | `BLOB` | Sí |
| `imagenMimeType` | `VARCHAR(100)` | `TEXT` | Sí |

SQLite trabaja internamente con cinco clases de almacenamiento: `NULL`, `INTEGER`, `REAL`, `TEXT` y `BLOB`. Los nombres `VARCHAR`, `CHAR`, `DECIMAL`, `BOOLEAN`, `DATE`, `TIME` y `DATETIME` se declaran para representar correctamente el propósito de cada campo.

---

## 2. Crear el proyecto

Abre PowerShell y ejecuta:

```powershell
mkdir Productos-Express
cd Productos-Express
npm.cmd init -y
npm.cmd install express
npm.cmd install --save-dev nodemon
```

Se utiliza `npm.cmd` para evitar el error de PowerShell relacionado con `npm.ps1` y la política de ejecución.

---

## 3. Crear las carpetas

Ejecuta dentro de `Productos-Express`:

```powershell
mkdir data
mkdir src
mkdir src\controllers
mkdir src\dtos
mkdir src\errors
mkdir src\middlewares
mkdir src\models
mkdir src\repositories
mkdir src\routes
mkdir src\services
mkdir public
mkdir public\css
mkdir public\js
mkdir public\js\productos
mkdir test
```

La estructura final será:

```text
Productos-Express/
├── app.js
├── server.js
├── package.json
├── .gitignore
├── data/
│   └── productos.sqlite              ← se crea automáticamente
├── src/
│   ├── controllers/
│   │   └── productos.controller.js
│   ├── dtos/
│   │   └── ProductoDto.js
│   ├── errors/
│   │   └── AppError.js
│   ├── middlewares/
│   │   ├── error.middleware.js
│   │   ├── notFound.middleware.js
│   │   └── producto.middleware.js
│   ├── models/
│   │   └── Producto.js
│   ├── repositories/
│   │   └── ProductoRepository.js
│   ├── routes/
│   │   └── productos.routes.js
│   └── services/
│       └── productos.service.js
├── public/
│   ├── index.html
│   ├── css/
│   │   └── estilos.css
│   └── js/
│       └── productos/
│           ├── producto.dto.js
│           ├── productos.api.js
│           ├── productos.ui.js
│           └── productos.js
└── test/
    └── productos.test.js
```

---

## 4. Configurar `package.json`

Abre `package.json`, elimina su contenido y pega todo este código:

```json
{
  "name": "productos-express",
  "version": "1.0.0",
  "description": "CRUD educativo de productos con Express, DTO, POO y SQLite",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "node --test --test-concurrency=1"
  },
  "engines": {
    "node": ">=22.13.0"
  },
  "dependencies": {
    "express": "^5.1.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.10"
  }
}
```

Después ejecuta nuevamente:

```powershell
npm.cmd install
```

---

## 5. Crear `.gitignore`

Crea `.gitignore` en la raíz y pega:

```gitignore
node_modules/
data/*.sqlite
data/*.sqlite-shm
data/*.sqlite-wal
.env
```

---

## 6. Crear el error personalizado

Crea `src/errors/AppError.js` y pega:

```js
export class AppError extends Error {
  constructor(mensaje, estadoHttp = 400) {
    super(mensaje);
    this.name = "AppError";
    this.estadoHttp = estadoHttp;
  }
}
```

---

## 7. Crear el Model Producto

Crea `src/models/Producto.js` y pega:

```js
export class Producto {
  #id;
  #codigo;
  #nombre;
  #stock;
  #precio;

  constructor(
    id,
    codigo,
    nombre,
    stock,
    precio,
    categoria,
    peso,
    descripcion,
    activo,
    fechaVencimiento,
    horaRegistro,
    fechaRegistro,
    imagen,
    imagenMimeType,
  ) {
    this.#id = Number(id);
    this.#codigo = codigo;
    this.#nombre = nombre;
    this.#stock = Number(stock);
    this.#precio = Number(precio);

    this.categoria = categoria;
    this.peso = peso === null || peso === undefined ? null : Number(peso);
    this.descripcion = descripcion ?? null;
    this.activo =
      activo === true || activo === 1 || activo === "1" || activo === "true";
    this.fechaVencimiento = fechaVencimiento ?? null;
    this.horaRegistro = horaRegistro;
    this.fechaRegistro = fechaRegistro;
    this.imagen = imagen ?? null;
    this.imagenMimeType = imagenMimeType ?? null;
  }

  get id() {
    return this.#id;
  }

  get codigo() {
    return this.#codigo;
  }

  get nombre() {
    return this.#nombre;
  }

  get stock() {
    return this.#stock;
  }

  get precio() {
    return this.#precio;
  }
}
```

La clase tiene cinco atributos privados y nueve públicos. Los getters permiten que el Response DTO lea los valores privados sin agregar un método `toJSON()`.

---

## 8. Crear los DTO del backend

Crea `src/dtos/ProductoDto.js` y pega:

```js
export class ProductoRequestDto {
  constructor(body = {}) {
    this.codigo = body.codigo;
    this.nombre = body.nombre;
    this.categoria = body.categoria;
    this.stock = body.stock;
    this.precio = body.precio;
    this.peso = body.peso;
    this.descripcion = body.descripcion;
    this.activo = body.activo;
    this.fechaVencimiento = body.fechaVencimiento;
    this.horaRegistro = body.horaRegistro;
    this.imagenBase64 = body.imagenBase64;
  }
}

export class ProductoConsultaDto {
  constructor(datos = {}) {
    this.texto = datos.texto?.trim() ?? "";
    this.categoria = datos.categoria?.trim() ?? "";
    this.precioMin =
      datos.precioMin === "" || datos.precioMin === undefined
        ? undefined
        : Number(datos.precioMin);
    this.precioMax =
      datos.precioMax === "" || datos.precioMax === undefined
        ? undefined
        : Number(datos.precioMax);

    if (datos.activo === "" || datos.activo === undefined) {
      this.activo = undefined;
    } else {
      this.activo =
        datos.activo === true ||
        datos.activo === 1 ||
        datos.activo === "1" ||
        datos.activo === "true";
    }
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
    this.fechaRegistro = productoModel.fechaRegistro;
    this.imagenMimeType = productoModel.imagenMimeType;
    this.imagenBase64 = productoModel.imagen
      ? `data:${productoModel.imagenMimeType};base64,${Buffer.from(
          productoModel.imagen,
        ).toString("base64")}`
      : null;
  }
}
```

---

## 9. Crear el Repository y la tabla SQLite

Crea `src/repositories/ProductoRepository.js` y pega:

```js
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { Producto } from "../models/Producto.js";

export class ProductoRepository {
  constructor(
    archivo = process.env.PRODUCTOS_DB_PATH ??
      resolve("data", "productos.sqlite"),
  ) {
    if (archivo !== ":memory:") {
      mkdirSync(dirname(archivo), { recursive: true });
    }

    this.db = new DatabaseSync(archivo);
    this.db.exec("PRAGMA foreign_keys = ON");

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo VARCHAR(20) NOT NULL UNIQUE,
        nombre TEXT NOT NULL,
        categoria CHAR(3) NOT NULL,
        stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
        precio DECIMAL(10, 2) NOT NULL CHECK (precio >= 0),
        peso REAL,
        descripcion TEXT,
        activo BOOLEAN NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
        fechaVencimiento DATE,
        horaRegistro TIME NOT NULL,
        fechaRegistro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        imagen BLOB,
        imagenMimeType VARCHAR(100)
      )
    `);
  }

  crearProductoModel(fila) {
    if (!fila) {
      return null;
    }

    return new Producto(
      fila.id,
      fila.codigo,
      fila.nombre,
      fila.stock,
      fila.precio,
      fila.categoria,
      fila.peso,
      fila.descripcion,
      fila.activo,
      fila.fechaVencimiento,
      fila.horaRegistro,
      fila.fechaRegistro,
      fila.imagen ? Buffer.from(fila.imagen) : null,
      fila.imagenMimeType,
    );
  }

  async listar() {
    const filas = this.db
      .prepare("SELECT * FROM productos ORDER BY id DESC")
      .all();

    return filas.map((fila) => this.crearProductoModel(fila));
  }

  async buscarPorId(id) {
    const fila = this.db
      .prepare("SELECT * FROM productos WHERE id = ?")
      .get(Number(id));

    return this.crearProductoModel(fila);
  }

  async buscarPorCodigo(codigo) {
    const fila = this.db
      .prepare("SELECT * FROM productos WHERE codigo = ? COLLATE NOCASE")
      .get(codigo);

    return this.crearProductoModel(fila);
  }

  async consultar(productoConsultaDto) {
    let sql = "SELECT * FROM productos WHERE 1 = 1";
    const parametros = [];

    if (productoConsultaDto.texto) {
      sql += `
        AND (
          codigo LIKE ? COLLATE NOCASE
          OR nombre LIKE ? COLLATE NOCASE
          OR descripcion LIKE ? COLLATE NOCASE
        )
      `;
      const texto = `%${productoConsultaDto.texto}%`;
      parametros.push(texto, texto, texto);
    }

    if (productoConsultaDto.categoria) {
      sql += " AND categoria = ? COLLATE NOCASE";
      parametros.push(productoConsultaDto.categoria);
    }

    if (productoConsultaDto.activo !== undefined) {
      sql += " AND activo = ?";
      parametros.push(Number(productoConsultaDto.activo));
    }

    if (productoConsultaDto.precioMin !== undefined) {
      sql += " AND precio >= ?";
      parametros.push(productoConsultaDto.precioMin);
    }

    if (productoConsultaDto.precioMax !== undefined) {
      sql += " AND precio <= ?";
      parametros.push(productoConsultaDto.precioMax);
    }

    sql += " ORDER BY id DESC";

    const filas = this.db.prepare(sql).all(...parametros);
    return filas.map((fila) => this.crearProductoModel(fila));
  }

  async crear(productoModel) {
    const resultado = this.db
      .prepare(`
        INSERT INTO productos (
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
          fechaRegistro,
          imagen,
          imagenMimeType
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
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
        productoModel.fechaRegistro,
        productoModel.imagen,
        productoModel.imagenMimeType,
      );

    return this.buscarPorId(Number(resultado.lastInsertRowid));
  }

  async reemplazar(id, productoModel) {
    const resultado = this.db
      .prepare(`
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
            fechaRegistro = ?,
            imagen = ?,
            imagenMimeType = ?
        WHERE id = ?
      `)
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
        productoModel.fechaRegistro,
        productoModel.imagen,
        productoModel.imagenMimeType,
        Number(id),
      );

    return resultado.changes ? this.buscarPorId(id) : null;
  }

  async eliminar(id) {
    const productoModel = await this.buscarPorId(id);

    if (!productoModel) {
      return null;
    }

    this.db.prepare("DELETE FROM productos WHERE id = ?").run(Number(id));
    return productoModel;
  }
}
```

La tabla se crea automáticamente la primera vez que se inicia el servidor. No necesitas crear manualmente `productos.sqlite`.

---

## 10. Crear el Service

Crea `src/services/productos.service.js` y pega:

```js
import { AppError } from "../errors/AppError.js";
import { Producto } from "../models/Producto.js";
import { ProductoResponseDto } from "../dtos/ProductoDto.js";
import { ProductoRepository } from "../repositories/ProductoRepository.js";

export class ProductosService {
  constructor(productoRepository = new ProductoRepository()) {
    this.productoRepository = productoRepository;
  }

  async listar() {
    const productosModel = await this.productoRepository.listar();
    return productosModel.map(
      (productoModel) => new ProductoResponseDto(productoModel),
    );
  }

  async buscar(productoConsultaDto) {
    const productosModel =
      await this.productoRepository.consultar(productoConsultaDto);

    return productosModel.map(
      (productoModel) => new ProductoResponseDto(productoModel),
    );
  }

  async obtener(id) {
    const productoModel = await this.productoRepository.buscarPorId(id);

    if (!productoModel) {
      throw new AppError("Producto no encontrado", 404);
    }

    return new ProductoResponseDto(productoModel);
  }

  async crear(productoRequestDto) {
    await this.validarProducto(productoRequestDto);

    const imagenDatos = this.convertirImagenABuffer(
      productoRequestDto.imagenBase64,
    );

    const productoModel = this.crearProductoModel(
      0,
      productoRequestDto,
      new Date().toISOString(),
      imagenDatos.imagen,
      imagenDatos.imagenMimeType,
    );

    const productoCreadoModel =
      await this.productoRepository.crear(productoModel);

    return new ProductoResponseDto(productoCreadoModel);
  }

  async reemplazar(id, productoRequestDto) {
    const productoActualDto = await this.obtener(id);
    await this.validarProducto(productoRequestDto, id);

    const imagenDatos = this.convertirImagenABuffer(
      productoRequestDto.imagenBase64,
    );

    const productoModel = this.crearProductoModel(
      id,
      productoRequestDto,
      productoActualDto.fechaRegistro,
      imagenDatos.imagen,
      imagenDatos.imagenMimeType,
    );

    const productoActualizadoModel =
      await this.productoRepository.reemplazar(id, productoModel);

    return new ProductoResponseDto(productoActualizadoModel);
  }

  async actualizar(id, productoRequestDto) {
    const productoActualModel =
      await this.productoRepository.buscarPorId(id);

    if (!productoActualModel) {
      throw new AppError("Producto no encontrado", 404);
    }

    const datosCombinados = {
      codigo:
        productoRequestDto.codigo === undefined
          ? productoActualModel.codigo
          : productoRequestDto.codigo,
      nombre:
        productoRequestDto.nombre === undefined
          ? productoActualModel.nombre
          : productoRequestDto.nombre,
      categoria:
        productoRequestDto.categoria === undefined
          ? productoActualModel.categoria
          : productoRequestDto.categoria,
      stock:
        productoRequestDto.stock === undefined
          ? productoActualModel.stock
          : productoRequestDto.stock,
      precio:
        productoRequestDto.precio === undefined
          ? productoActualModel.precio
          : productoRequestDto.precio,
      peso:
        productoRequestDto.peso === undefined
          ? productoActualModel.peso
          : productoRequestDto.peso,
      descripcion:
        productoRequestDto.descripcion === undefined
          ? productoActualModel.descripcion
          : productoRequestDto.descripcion,
      activo:
        productoRequestDto.activo === undefined
          ? productoActualModel.activo
          : productoRequestDto.activo,
      fechaVencimiento:
        productoRequestDto.fechaVencimiento === undefined
          ? productoActualModel.fechaVencimiento
          : productoRequestDto.fechaVencimiento,
      horaRegistro:
        productoRequestDto.horaRegistro === undefined
          ? productoActualModel.horaRegistro
          : productoRequestDto.horaRegistro,
      imagenBase64: productoRequestDto.imagenBase64,
    };

    await this.validarProducto(datosCombinados, id);

    let imagen = productoActualModel.imagen;
    let imagenMimeType = productoActualModel.imagenMimeType;

    if (productoRequestDto.imagenBase64 !== undefined) {
      const imagenDatos = this.convertirImagenABuffer(
        productoRequestDto.imagenBase64,
      );
      imagen = imagenDatos.imagen;
      imagenMimeType = imagenDatos.imagenMimeType;
    }

    const productoModel = this.crearProductoModel(
      id,
      datosCombinados,
      productoActualModel.fechaRegistro,
      imagen,
      imagenMimeType,
    );

    const productoActualizadoModel =
      await this.productoRepository.reemplazar(id, productoModel);

    return new ProductoResponseDto(productoActualizadoModel);
  }

  async eliminar(id) {
    const productoEliminadoModel =
      await this.productoRepository.eliminar(id);

    if (!productoEliminadoModel) {
      throw new AppError("Producto no encontrado", 404);
    }

    return new ProductoResponseDto(productoEliminadoModel);
  }

  crearProductoModel(
    id,
    datos,
    fechaRegistro,
    imagen,
    imagenMimeType,
  ) {
    return new Producto(
      id,
      datos.codigo.trim(),
      datos.nombre.trim(),
      Number(datos.stock),
      Number(datos.precio),
      datos.categoria.trim().toUpperCase(),
      datos.peso === "" || datos.peso === null
        ? null
        : Number(datos.peso),
      datos.descripcion === "" ? null : (datos.descripcion ?? null),
      this.normalizarBooleano(datos.activo),
      datos.fechaVencimiento === ""
        ? null
        : (datos.fechaVencimiento ?? null),
      datos.horaRegistro,
      fechaRegistro,
      imagen,
      imagenMimeType,
    );
  }

  async validarProducto(datos, idOmitido) {
    const camposTexto = ["codigo", "nombre", "categoria", "horaRegistro"];

    for (const campo of camposTexto) {
      if (typeof datos[campo] !== "string" || !datos[campo].trim()) {
        throw new AppError(`El campo ${campo} es obligatorio`, 400);
      }
    }

    if (datos.codigo.trim().length > 20) {
      throw new AppError("El código admite como máximo 20 caracteres", 400);
    }

    if (datos.categoria.trim().length !== 3) {
      throw new AppError("La categoría debe tener exactamente 3 caracteres", 400);
    }

    if (!Number.isInteger(Number(datos.stock)) || Number(datos.stock) < 0) {
      throw new AppError("El stock debe ser un entero mayor o igual que cero", 400);
    }

    if (!Number.isFinite(Number(datos.precio)) || Number(datos.precio) < 0) {
      throw new AppError("El precio debe ser mayor o igual que cero", 400);
    }

    if (
      datos.peso !== "" &&
      datos.peso !== null &&
      datos.peso !== undefined &&
      (!Number.isFinite(Number(datos.peso)) || Number(datos.peso) < 0)
    ) {
      throw new AppError("El peso debe ser mayor o igual que cero", 400);
    }

    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(datos.horaRegistro)) {
      throw new AppError("La hora debe usar el formato HH:mm", 400);
    }

    if (
      datos.fechaVencimiento &&
      !/^\d{4}-\d{2}-\d{2}$/.test(datos.fechaVencimiento)
    ) {
      throw new AppError("La fecha debe usar el formato YYYY-MM-DD", 400);
    }

    const productoExistenteModel =
      await this.productoRepository.buscarPorCodigo(datos.codigo.trim());

    if (
      productoExistenteModel &&
      Number(productoExistenteModel.id) !== Number(idOmitido)
    ) {
      throw new AppError("El código del producto ya existe", 409);
    }
  }

  normalizarBooleano(valor) {
    return valor === true || valor === 1 || valor === "1" || valor === "true";
  }

  convertirImagenABuffer(imagenBase64) {
    if (imagenBase64 === undefined || imagenBase64 === null || imagenBase64 === "") {
      return { imagen: null, imagenMimeType: null };
    }

    if (typeof imagenBase64 !== "string") {
      throw new AppError("La imagen debe enviarse en formato Base64", 400);
    }

    const coincidencia = imagenBase64.match(
      /^data:(image\/[a-zA-Z0-9.+-]+);base64,([a-zA-Z0-9+/=]+)$/,
    );

    if (!coincidencia) {
      throw new AppError("El formato Base64 de la imagen no es válido", 400);
    }

    const imagen = Buffer.from(coincidencia[2], "base64");

    if (imagen.length > 5 * 1024 * 1024) {
      throw new AppError("La imagen no puede superar los 5 MB", 413);
    }

    return {
      imagen,
      imagenMimeType: coincidencia[1],
    };
  }
}

export const productosService = new ProductosService();
```

En `PATCH`, un campo no enviado conserva su valor. En cambio, enviar `null` en `descripcion`, `fechaVencimiento` o `imagenBase64` permite borrar ese dato opcional.

---

## 11. Crear el Controller

Crea `src/controllers/productos.controller.js` y pega:

```js
import {
  ProductoConsultaDto,
  ProductoRequestDto,
} from "../dtos/ProductoDto.js";
import { productosService } from "../services/productos.service.js";

export const productosController = {
  async listar(request, response, next) {
    try {
      const productosResponseDto = await productosService.listar();
      response.status(200).json(productosResponseDto);
    } catch (error) {
      next(error);
    }
  },

  async buscar(request, response, next) {
    try {
      const productoConsultaDto = new ProductoConsultaDto(request.query);
      const productosResponseDto =
        await productosService.buscar(productoConsultaDto);
      response.status(200).json(productosResponseDto);
    } catch (error) {
      next(error);
    }
  },

  async consultar(request, response, next) {
    try {
      const productoConsultaDto = new ProductoConsultaDto(request.body);
      const productosResponseDto =
        await productosService.buscar(productoConsultaDto);
      response.status(200).json(productosResponseDto);
    } catch (error) {
      next(error);
    }
  },

  async obtener(request, response, next) {
    try {
      const productoResponseDto =
        await productosService.obtener(request.params.id);
      response.status(200).json(productoResponseDto);
    } catch (error) {
      next(error);
    }
  },

  async crear(request, response, next) {
    try {
      const productoRequestDto = new ProductoRequestDto(request.body);
      const productoResponseDto =
        await productosService.crear(productoRequestDto);
      response.status(201).json(productoResponseDto);
    } catch (error) {
      next(error);
    }
  },

  async reemplazar(request, response, next) {
    try {
      const productoRequestDto = new ProductoRequestDto(request.body);
      const productoResponseDto = await productosService.reemplazar(
        request.params.id,
        productoRequestDto,
      );
      response.status(200).json(productoResponseDto);
    } catch (error) {
      next(error);
    }
  },

  async actualizar(request, response, next) {
    try {
      const productoRequestDto = new ProductoRequestDto(request.body);
      const productoResponseDto = await productosService.actualizar(
        request.params.id,
        productoRequestDto,
      );
      response.status(200).json(productoResponseDto);
    } catch (error) {
      next(error);
    }
  },

  async eliminar(request, response, next) {
    try {
      const productoResponseDto =
        await productosService.eliminar(request.params.id);
      response.status(200).json({
        mensaje: "Producto eliminado correctamente",
        producto: productoResponseDto,
      });
    } catch (error) {
      next(error);
    }
  },
};
```

---

## 12. Crear el middleware de validación

Crea `src/middlewares/producto.middleware.js` y pega:

```js
import { AppError } from "../errors/AppError.js";

const camposProducto = [
  "codigo",
  "nombre",
  "categoria",
  "stock",
  "precio",
  "peso",
  "descripcion",
  "activo",
  "fechaVencimiento",
  "horaRegistro",
  "imagenBase64",
];

export function validarProductoCompleto(request, response, next) {
  try {
    const camposObligatorios = [
      "codigo",
      "nombre",
      "categoria",
      "stock",
      "precio",
      "activo",
      "horaRegistro",
    ];

    const faltantes = camposObligatorios.filter(
      (campo) => request.body[campo] === undefined,
    );

    if (faltantes.length) {
      throw new AppError(
        `Faltan campos obligatorios: ${faltantes.join(", ")}`,
        400,
      );
    }

    next();
  } catch (error) {
    next(error);
  }
}

export function validarProductoParcial(request, response, next) {
  try {
    const camposRecibidos = Object.keys(request.body);

    if (!camposRecibidos.length) {
      throw new AppError("Debes enviar por lo menos un campo", 400);
    }

    const camposDesconocidos = camposRecibidos.filter(
      (campo) => !camposProducto.includes(campo),
    );

    if (camposDesconocidos.length) {
      throw new AppError(
        `Campos no permitidos: ${camposDesconocidos.join(", ")}`,
        400,
      );
    }

    next();
  } catch (error) {
    next(error);
  }
}
```

---

## 13. Crear el middleware para rutas inexistentes

Crea `src/middlewares/notFound.middleware.js` y pega:

```js
export function rutaNoEncontrada(request, response) {
  response.status(404).json({
    mensaje: "Ruta no encontrada",
    metodo: request.method,
    ruta: request.originalUrl,
  });
}
```

---

## 14. Crear el middleware de errores

Crea `src/middlewares/error.middleware.js` y pega:

```js
import { AppError } from "../errors/AppError.js";

export function manejarErrores(error, request, response, next) {
  if (response.headersSent) {
    return next(error);
  }

  if (error instanceof AppError) {
    return response.status(error.estadoHttp).json({
      mensaje: error.message,
    });
  }

  if (error instanceof SyntaxError && error.status === 400) {
    return response.status(400).json({
      mensaje: "El cuerpo JSON no es válido",
    });
  }

  if (error.message?.includes("UNIQUE constraint failed")) {
    return response.status(409).json({
      mensaje: "El código del producto ya existe",
    });
  }

  console.error(error);

  return response.status(500).json({
    mensaje: "Ocurrió un error interno en el servidor",
  });
}
```

---

## 15. Crear las rutas

Crea `src/routes/productos.routes.js` y pega:

```js
import { Router } from "express";
import { productosController } from "../controllers/productos.controller.js";
import {
  validarProductoCompleto,
  validarProductoParcial,
} from "../middlewares/producto.middleware.js";

const router = Router();

router.get("/", productosController.listar);
router.get("/buscar", productosController.buscar);
router.post("/query", productosController.consultar);
router.get("/:id", productosController.obtener);
router.post("/", validarProductoCompleto, productosController.crear);
router.put("/:id", validarProductoCompleto, productosController.reemplazar);
router.patch("/:id", validarProductoParcial, productosController.actualizar);
router.delete("/:id", productosController.eliminar);

export default router;
```

`/buscar` debe aparecer antes de `/:id`; de lo contrario, Express podría interpretar la palabra `buscar` como un identificador.

---

## 16. Configurar Express

Crea `app.js` en la raíz y pega:

```js
import express from "express";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import productosRoutes from "./src/routes/productos.routes.js";
import { rutaNoEncontrada } from "./src/middlewares/notFound.middleware.js";
import { manejarErrores } from "./src/middlewares/error.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json({ limit: "7mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));

app.use("/api/productos", productosRoutes);

app.use(rutaNoEncontrada);
app.use(manejarErrores);

export default app;
```

El límite de `7mb` permite recibir una imagen de hasta `5mb` convertida a Base64.

---

## 17. Crear el archivo que inicia el servidor

Crea `server.js` en la raíz y pega:

```js
import app from "./app.js";

const PORT = process.env.PORT ?? 4214;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
```

---

## 18. Crear los DTO del frontend

Crea `public/js/productos/producto.dto.js` y pega:

```js
export class ProductoRequestDto {
  constructor(datos = {}) {
    this.codigo = datos.codigo;
    this.nombre = datos.nombre;
    this.categoria = datos.categoria;
    this.stock = Number(datos.stock);
    this.precio = Number(datos.precio);
    this.peso =
      datos.peso === "" || datos.peso === null ? null : Number(datos.peso);
    this.descripcion = datos.descripcion || null;
    this.activo = Boolean(datos.activo);
    this.fechaVencimiento = datos.fechaVencimiento || null;
    this.horaRegistro = datos.horaRegistro;
    this.imagenBase64 = datos.imagenBase64 ?? null;
  }
}

export class ProductoConsultaDto {
  constructor(datos = {}) {
    this.texto = datos.texto?.trim() ?? "";
    this.categoria = datos.categoria ?? "";
    this.activo = datos.activo ?? "";
    this.precioMin = datos.precioMin ?? "";
    this.precioMax = datos.precioMax ?? "";
  }
}

export class ProductoResponseDto {
  constructor(datos = {}) {
    this.id = Number(datos.id);
    this.codigo = datos.codigo;
    this.nombre = datos.nombre;
    this.categoria = datos.categoria;
    this.stock = Number(datos.stock);
    this.precio = Number(datos.precio);
    this.peso = datos.peso === null ? null : Number(datos.peso);
    this.descripcion = datos.descripcion;
    this.activo = Boolean(datos.activo);
    this.fechaVencimiento = datos.fechaVencimiento;
    this.horaRegistro = datos.horaRegistro;
    this.fechaRegistro = datos.fechaRegistro;
    this.imagenBase64 = datos.imagenBase64;
    this.imagenMimeType = datos.imagenMimeType;
  }
}
```

---

## 19. Crear el módulo de acceso a la API

Crea `public/js/productos/productos.api.js` y pega:

```js
import { ProductoResponseDto } from "./producto.dto.js";

async function enviarPeticion(ruta, opciones = {}) {
  const configuracion = { ...opciones };

  if (configuracion.body) {
    configuracion.headers = {
      "Content-Type": "application/json",
      ...configuracion.headers,
    };
  }

  const respuestaHttp = await fetch(ruta, configuracion);
  const texto = await respuestaHttp.text();
  const datos = texto ? JSON.parse(texto) : null;

  if (!respuestaHttp.ok) {
    throw new Error(datos?.mensaje ?? "No fue posible completar la solicitud");
  }

  return datos;
}

function crearProductoResponseDto(datos) {
  return new ProductoResponseDto(datos);
}

function crearProductosResponseDto(lista) {
  return lista.map((datos) => crearProductoResponseDto(datos));
}

export const productosApi = {
  async listar() {
    const datos = await enviarPeticion("/api/productos");
    return crearProductosResponseDto(datos);
  },

  async buscar(texto) {
    const parametros = new URLSearchParams({ texto });
    const datos = await enviarPeticion(
      `/api/productos/buscar?${parametros.toString()}`,
    );
    return crearProductosResponseDto(datos);
  },

  async consultar(productoConsultaDto) {
    const datos = await enviarPeticion("/api/productos/query", {
      method: "POST",
      body: JSON.stringify(productoConsultaDto),
    });
    return crearProductosResponseDto(datos);
  },

  async obtener(id) {
    const datos = await enviarPeticion(`/api/productos/${id}`);
    return crearProductoResponseDto(datos);
  },

  async crear(productoRequestDto) {
    const datos = await enviarPeticion("/api/productos", {
      method: "POST",
      body: JSON.stringify(productoRequestDto),
    });
    return crearProductoResponseDto(datos);
  },

  async reemplazar(id, productoRequestDto) {
    const datos = await enviarPeticion(`/api/productos/${id}`, {
      method: "PUT",
      body: JSON.stringify(productoRequestDto),
    });
    return crearProductoResponseDto(datos);
  },

  async actualizar(id, campos) {
    const datos = await enviarPeticion(`/api/productos/${id}`, {
      method: "PATCH",
      body: JSON.stringify(campos),
    });
    return crearProductoResponseDto(datos);
  },

  async eliminar(id) {
    return enviarPeticion(`/api/productos/${id}`, {
      method: "DELETE",
    });
  },
};
```

---

## 20. Crear el módulo de interfaz

Crea `public/js/productos/productos.ui.js` y pega:

```js
function escaparHtml(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatearPrecio(precio) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(precio);
}

export function mostrarProductos(productos, cuerpoTabla) {
  if (!productos.length) {
    cuerpoTabla.innerHTML = `
      <tr>
        <td colspan="9" class="estado-vacio">No se encontraron productos.</td>
      </tr>
    `;
    return;
  }

  cuerpoTabla.innerHTML = productos
    .map(
      (producto) => `
        <tr>
          <td>
            ${
              producto.imagenBase64
                ? `<img class="producto-imagen" src="${escaparHtml(
                    producto.imagenBase64,
                  )}" alt="${escaparHtml(producto.nombre)}">`
                : '<span class="sin-imagen">Sin imagen</span>'
            }
          </td>
          <td>${escaparHtml(producto.codigo)}</td>
          <td>
            <strong>${escaparHtml(producto.nombre)}</strong>
            <small>${escaparHtml(producto.descripcion ?? "Sin descripción")}</small>
          </td>
          <td>${escaparHtml(producto.categoria)}</td>
          <td>${producto.stock}</td>
          <td>${formatearPrecio(producto.precio)}</td>
          <td>${producto.peso === null ? "—" : `${producto.peso} kg`}</td>
          <td>
            <span class="estado ${producto.activo ? "activo" : "inactivo"}">
              ${producto.activo ? "Activo" : "Inactivo"}
            </span>
          </td>
          <td class="acciones">
            <button data-accion="editar" data-id="${producto.id}">Editar</button>
            <button data-accion="estado" data-id="${producto.id}">
              ${producto.activo ? "Desactivar" : "Activar"}
            </button>
            <button class="peligro" data-accion="eliminar" data-id="${producto.id}">
              Eliminar
            </button>
          </td>
        </tr>
      `,
    )
    .join("");
}

export function mostrarMensaje(elemento, mensaje, tipo = "correcto") {
  elemento.textContent = mensaje;
  elemento.className = `mensaje visible ${tipo}`;

  window.setTimeout(() => {
    elemento.className = "mensaje";
  }, 3500);
}
```

---

## 21. Crear la lógica principal del frontend

Crea `public/js/productos/productos.js` y pega:

```js
import {
  ProductoConsultaDto,
  ProductoRequestDto,
} from "./producto.dto.js";
import { productosApi } from "./productos.api.js";
import { mostrarMensaje, mostrarProductos } from "./productos.ui.js";

const formularioProducto = document.querySelector("#formularioProducto");
const formularioFiltros = document.querySelector("#formularioFiltros");
const cuerpoTabla = document.querySelector("#cuerpoTablaProductos");
const mensaje = document.querySelector("#mensaje");
const tituloFormulario = document.querySelector("#tituloFormulario");
const botonCancelar = document.querySelector("#botonCancelar");
const botonLimpiarFiltros = document.querySelector("#botonLimpiarFiltros");
const campoBusquedaRapida = document.querySelector("#busquedaRapida");

let productoEnEdicion = null;
let temporizadorBusqueda;

function obtenerHoraActual() {
  const ahora = new Date();
  return `${String(ahora.getHours()).padStart(2, "0")}:${String(
    ahora.getMinutes(),
  ).padStart(2, "0")}`;
}

function colocarValoresIniciales() {
  formularioProducto.elements.horaRegistro.value = obtenerHoraActual();
  formularioProducto.elements.activo.checked = true;
}

function leerImagenComoBase64(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();

    lector.addEventListener("load", () => resolve(lector.result));
    lector.addEventListener("error", () =>
      reject(new Error("No fue posible leer la imagen")),
    );

    lector.readAsDataURL(archivo);
  });
}

async function obtenerImagenFormulario() {
  const archivo = formularioProducto.elements.imagen.files[0];

  if (!archivo) {
    return productoEnEdicion?.imagenBase64 ?? null;
  }

  if (!archivo.type.startsWith("image/")) {
    throw new Error("El archivo seleccionado debe ser una imagen");
  }

  if (archivo.size > 5 * 1024 * 1024) {
    throw new Error("La imagen no puede superar los 5 MB");
  }

  return leerImagenComoBase64(archivo);
}

async function crearRequestDtoDesdeFormulario() {
  const datos = new FormData(formularioProducto);
  const imagenBase64 = await obtenerImagenFormulario();

  return new ProductoRequestDto({
    codigo: datos.get("codigo"),
    nombre: datos.get("nombre"),
    categoria: datos.get("categoria"),
    stock: datos.get("stock"),
    precio: datos.get("precio"),
    peso: datos.get("peso"),
    descripcion: datos.get("descripcion"),
    activo: formularioProducto.elements.activo.checked,
    fechaVencimiento: datos.get("fechaVencimiento"),
    horaRegistro: datos.get("horaRegistro"),
    imagenBase64,
  });
}

async function cargarProductos() {
  try {
    const productosResponseDto = await productosApi.listar();
    mostrarProductos(productosResponseDto, cuerpoTabla);
  } catch (error) {
    mostrarMensaje(mensaje, error.message, "error");
  }
}

async function guardarProducto(evento) {
  evento.preventDefault();

  try {
    const productoRequestDto = await crearRequestDtoDesdeFormulario();

    if (productoEnEdicion) {
      await productosApi.reemplazar(productoEnEdicion.id, productoRequestDto);
      mostrarMensaje(mensaje, "Producto actualizado correctamente");
    } else {
      await productosApi.crear(productoRequestDto);
      mostrarMensaje(mensaje, "Producto creado correctamente");
    }

    limpiarFormulario();
    await cargarProductos();
  } catch (error) {
    mostrarMensaje(mensaje, error.message, "error");
  }
}

async function editarProducto(id) {
  try {
    productoEnEdicion = await productosApi.obtener(id);

    formularioProducto.elements.codigo.value = productoEnEdicion.codigo;
    formularioProducto.elements.nombre.value = productoEnEdicion.nombre;
    formularioProducto.elements.categoria.value = productoEnEdicion.categoria;
    formularioProducto.elements.stock.value = productoEnEdicion.stock;
    formularioProducto.elements.precio.value = productoEnEdicion.precio;
    formularioProducto.elements.peso.value = productoEnEdicion.peso ?? "";
    formularioProducto.elements.descripcion.value =
      productoEnEdicion.descripcion ?? "";
    formularioProducto.elements.activo.checked = productoEnEdicion.activo;
    formularioProducto.elements.fechaVencimiento.value =
      productoEnEdicion.fechaVencimiento ?? "";
    formularioProducto.elements.horaRegistro.value =
      productoEnEdicion.horaRegistro;

    tituloFormulario.textContent = "Editar producto";
    botonCancelar.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    mostrarMensaje(mensaje, error.message, "error");
  }
}

async function cambiarEstadoProducto(id) {
  try {
    const productoResponseDto = await productosApi.obtener(id);
    await productosApi.actualizar(id, {
      activo: !productoResponseDto.activo,
    });
    mostrarMensaje(mensaje, "Estado actualizado correctamente");
    await cargarProductos();
  } catch (error) {
    mostrarMensaje(mensaje, error.message, "error");
  }
}

async function eliminarProducto(id) {
  const confirmado = window.confirm("¿Deseas eliminar este producto?");

  if (!confirmado) {
    return;
  }

  try {
    await productosApi.eliminar(id);
    mostrarMensaje(mensaje, "Producto eliminado correctamente");
    await cargarProductos();
  } catch (error) {
    mostrarMensaje(mensaje, error.message, "error");
  }
}

async function manejarAccionTabla(evento) {
  const boton = evento.target.closest("button[data-accion]");

  if (!boton) {
    return;
  }

  const id = Number(boton.dataset.id);
  const accion = boton.dataset.accion;

  if (accion === "editar") {
    await editarProducto(id);
  } else if (accion === "estado") {
    await cambiarEstadoProducto(id);
  } else if (accion === "eliminar") {
    await eliminarProducto(id);
  }
}

async function consultarProductos(evento) {
  evento.preventDefault();

  try {
    const datos = new FormData(formularioFiltros);
    const productoConsultaDto = new ProductoConsultaDto({
      texto: datos.get("texto"),
      categoria: datos.get("categoria"),
      activo: datos.get("activo"),
      precioMin: datos.get("precioMin"),
      precioMax: datos.get("precioMax"),
    });

    const productosResponseDto =
      await productosApi.consultar(productoConsultaDto);
    mostrarProductos(productosResponseDto, cuerpoTabla);
  } catch (error) {
    mostrarMensaje(mensaje, error.message, "error");
  }
}

function buscarRapido() {
  window.clearTimeout(temporizadorBusqueda);

  temporizadorBusqueda = window.setTimeout(async () => {
    try {
      const productosResponseDto = await productosApi.buscar(
        campoBusquedaRapida.value,
      );
      mostrarProductos(productosResponseDto, cuerpoTabla);
    } catch (error) {
      mostrarMensaje(mensaje, error.message, "error");
    }
  }, 300);
}

function limpiarFormulario() {
  formularioProducto.reset();
  productoEnEdicion = null;
  tituloFormulario.textContent = "Nuevo producto";
  botonCancelar.hidden = true;
  colocarValoresIniciales();
}

formularioProducto.addEventListener("submit", guardarProducto);
formularioFiltros.addEventListener("submit", consultarProductos);
cuerpoTabla.addEventListener("click", manejarAccionTabla);
campoBusquedaRapida.addEventListener("input", buscarRapido);
botonCancelar.addEventListener("click", limpiarFormulario);
botonLimpiarFiltros.addEventListener("click", () => {
  formularioFiltros.reset();
  campoBusquedaRapida.value = "";
  cargarProductos();
});

colocarValoresIniciales();
cargarProductos();
```

Los callbacks aparecen en `addEventListener`, `setTimeout` y `FileReader`. Las Promesas aparecen en `fetch`, `leerImagenComoBase64()` y todas las funciones `async`.

---

## 22. Crear la página HTML

Crea `public/index.html` y pega:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de productos</title>
    <link rel="stylesheet" href="/css/estilos.css">
  </head>
  <body>
    <header class="cabecera">
      <div>
        <span class="eyebrow">Productos Express</span>
        <h1>Gestión de productos</h1>
        <p>CRUD con Express, DTO, POO y SQLite.</p>
      </div>
    </header>

    <main class="contenedor">
      <div id="mensaje" class="mensaje" role="status"></div>

      <section class="tarjeta">
        <div class="titulo-seccion">
          <div>
            <span class="eyebrow">Formulario</span>
            <h2 id="tituloFormulario">Nuevo producto</h2>
          </div>
        </div>

        <form id="formularioProducto" class="formulario">
          <label>
            Código
            <input name="codigo" maxlength="20" required placeholder="PROD-001">
          </label>

          <label>
            Nombre
            <input name="nombre" required placeholder="Laptop Lenovo">
          </label>

          <label>
            Categoría
            <select name="categoria" required>
              <option value="">Seleccionar</option>
              <option value="TEC">Tecnología</option>
              <option value="HOG">Hogar</option>
              <option value="OFI">Oficina</option>
              <option value="ALI">Alimentos</option>
            </select>
          </label>

          <label>
            Stock
            <input name="stock" type="number" min="0" step="1" required value="0">
          </label>

          <label>
            Precio
            <input name="precio" type="number" min="0" step="0.01" required placeholder="2499.90">
          </label>

          <label>
            Peso en kg (opcional)
            <input name="peso" type="number" min="0" step="0.001" placeholder="1.750">
          </label>

          <label>
            Fecha de vencimiento (opcional)
            <input name="fechaVencimiento" type="date">
          </label>

          <label>
            Hora de registro
            <input name="horaRegistro" type="time" required>
          </label>

          <label class="campo-ancho">
            Descripción (opcional)
            <textarea name="descripcion" rows="3" placeholder="Características del producto"></textarea>
          </label>

          <label class="campo-ancho">
            Imagen (opcional, máximo 5 MB)
            <input name="imagen" type="file" accept="image/*">
          </label>

          <label class="interruptor campo-ancho">
            <input name="activo" type="checkbox" checked>
            Producto activo
          </label>

          <div class="botones campo-ancho">
            <button type="submit" class="primario">Guardar producto</button>
            <button id="botonCancelar" type="button" hidden>Cancelar edición</button>
          </div>
        </form>
      </section>

      <section class="tarjeta">
        <div class="titulo-seccion">
          <div>
            <span class="eyebrow">Consultas</span>
            <h2>Buscar productos</h2>
          </div>
        </div>

        <label class="busqueda-rapida">
          Búsqueda rápida mediante GET
          <input id="busquedaRapida" placeholder="Código, nombre o descripción">
        </label>

        <form id="formularioFiltros" class="filtros">
          <input name="texto" placeholder="Texto">

          <select name="categoria">
            <option value="">Todas las categorías</option>
            <option value="TEC">Tecnología</option>
            <option value="HOG">Hogar</option>
            <option value="OFI">Oficina</option>
            <option value="ALI">Alimentos</option>
          </select>

          <select name="activo">
            <option value="">Todos los estados</option>
            <option value="true">Activos</option>
            <option value="false">Inactivos</option>
          </select>

          <input name="precioMin" type="number" min="0" step="0.01" placeholder="Precio mínimo">
          <input name="precioMax" type="number" min="0" step="0.01" placeholder="Precio máximo">

          <button type="submit" class="primario">Consultar con QUERY</button>
          <button id="botonLimpiarFiltros" type="button">Limpiar</button>
        </form>
      </section>

      <section class="tarjeta tabla-tarjeta">
        <div class="titulo-seccion">
          <div>
            <span class="eyebrow">Inventario</span>
            <h2>Listado de productos</h2>
          </div>
        </div>

        <div class="tabla-contenedor">
          <table>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Código</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Peso</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="cuerpoTablaProductos"></tbody>
          </table>
        </div>
      </section>
    </main>

    <script type="module" src="/js/productos/productos.js"></script>
  </body>
</html>
```

---

## 23. Crear los estilos

Crea `public/css/estilos.css` y pega:

```css
:root {
  color-scheme: light;
  font-family: Manrope, Inter, "Segoe UI", sans-serif;
  color: #1e2030;
  background: #f4f5fa;
  --morado: #5c009c;
  --morado-oscuro: #450375;
  --borde: #e2e4ec;
  --texto-suave: #676b7d;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
}

button,
input,
select,
textarea {
  font: inherit;
}

.cabecera {
  padding: 48px max(24px, calc((100% - 1240px) / 2));
  color: white;
  background: linear-gradient(135deg, var(--morado-oscuro), var(--morado));
}

.cabecera h1 {
  margin: 8px 0;
  font-size: clamp(32px, 5vw, 52px);
}

.cabecera p {
  margin: 0;
  color: #eadcf3;
}

.eyebrow {
  color: #bfa3d2;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.contenedor {
  width: min(1240px, calc(100% - 32px));
  margin: 32px auto 64px;
}

.tarjeta {
  margin-bottom: 24px;
  padding: 28px;
  border: 1px solid var(--borde);
  border-radius: 20px;
  background: white;
  box-shadow: 0 16px 44px rgb(31 35 48 / 7%);
}

.titulo-seccion {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}

.titulo-seccion h2 {
  margin: 5px 0 0;
}

.formulario {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

label {
  display: grid;
  gap: 8px;
  color: #46495a;
  font-size: 14px;
  font-weight: 700;
}

input,
select,
textarea {
  width: 100%;
  padding: 11px 13px;
  border: 1px solid #cfd2de;
  border-radius: 10px;
  color: #1e2030;
  background: white;
  outline: none;
}

input:focus,
select:focus,
textarea:focus {
  border-color: var(--morado);
  box-shadow: 0 0 0 3px rgb(92 0 156 / 12%);
}

.campo-ancho {
  grid-column: 1 / -1;
}

.interruptor {
  display: flex;
  align-items: center;
  gap: 10px;
}

.interruptor input {
  width: 18px;
  height: 18px;
}

.botones,
.filtros {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

button {
  padding: 10px 14px;
  border: 1px solid #d2d4de;
  border-radius: 10px;
  color: #363949;
  background: #fff;
  cursor: pointer;
}

button:hover {
  background: #f3f1f6;
}

button.primario {
  border-color: var(--morado);
  color: white;
  background: var(--morado);
}

button.primario:hover {
  background: var(--morado-oscuro);
}

button.peligro {
  color: #b42318;
}

.busqueda-rapida {
  margin-bottom: 16px;
}

.filtros > * {
  flex: 1 1 150px;
}

.tabla-contenedor {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
}

th,
td {
  padding: 14px 12px;
  border-bottom: 1px solid var(--borde);
  text-align: left;
  vertical-align: middle;
}

th {
  color: var(--texto-suave);
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

td small {
  display: block;
  max-width: 240px;
  margin-top: 4px;
  overflow: hidden;
  color: var(--texto-suave);
  text-overflow: ellipsis;
}

.producto-imagen {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  object-fit: cover;
}

.sin-imagen {
  display: grid;
  width: 56px;
  height: 56px;
  place-items: center;
  border-radius: 12px;
  color: var(--texto-suave);
  background: #f1f2f6;
  font-size: 10px;
  text-align: center;
}

.estado {
  display: inline-flex;
  padding: 5px 9px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
}

.estado.activo {
  color: #137333;
  background: #e6f4ea;
}

.estado.inactivo {
  color: #8f1d18;
  background: #fce8e6;
}

.acciones {
  display: flex;
  gap: 7px;
}

.acciones button {
  padding: 7px 9px;
  font-size: 12px;
}

.estado-vacio {
  padding: 40px;
  color: var(--texto-suave);
  text-align: center;
}

.mensaje {
  position: fixed;
  z-index: 10;
  top: 20px;
  right: 20px;
  max-width: min(420px, calc(100% - 40px));
  padding: 14px 18px;
  border-radius: 12px;
  color: white;
  background: #137333;
  box-shadow: 0 16px 40px rgb(0 0 0 / 20%);
  opacity: 0;
  pointer-events: none;
  transform: translateY(-12px);
  transition: 180ms ease;
}

.mensaje.visible {
  opacity: 1;
  transform: translateY(0);
}

.mensaje.error {
  background: #b42318;
}

@media (max-width: 800px) {
  .formulario {
    grid-template-columns: 1fr;
  }

  .campo-ancho {
    grid-column: auto;
  }

  .tarjeta {
    padding: 20px;
  }
}
```

---

## 24. Crear la prueba automatizada

Crea `test/productos.test.js` y pega:

```js
import assert from "node:assert/strict";
import { after, before, test } from "node:test";

process.env.PRODUCTOS_DB_PATH = ":memory:";

const { default: app } = await import("../app.js");

let servidor;
let urlBase;

before(async () => {
  await new Promise((resolve) => {
    servidor = app.listen(0, "127.0.0.1", resolve);
  });

  const direccion = servidor.address();
  urlBase = `http://127.0.0.1:${direccion.port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    servidor.close((error) => (error ? reject(error) : resolve()));
  });
});

async function solicitar(ruta, opciones = {}) {
  const respuesta = await fetch(`${urlBase}${ruta}`, opciones);
  const datos = await respuesta.json();
  return { estado: respuesta.status, datos };
}

test("CRUD completo de Producto", async () => {
  const nuevoProducto = {
    codigo: "PROD-001",
    nombre: "Laptop de prueba",
    categoria: "TEC",
    stock: 8,
    precio: 2499.9,
    peso: 1.75,
    descripcion: "Producto creado durante la prueba",
    activo: true,
    fechaVencimiento: null,
    horaRegistro: "10:30",
    imagenBase64:
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
  };

  const creacion = await solicitar("/api/productos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoProducto),
  });

  assert.equal(creacion.estado, 201);
  assert.equal(creacion.datos.codigo, "PROD-001");
  assert.match(creacion.datos.imagenBase64, /^data:image\/gif;base64,/);
  const id = creacion.datos.id;

  const listado = await solicitar("/api/productos");
  assert.equal(listado.estado, 200);
  assert.equal(listado.datos.length, 1);

  const obtencion = await solicitar(`/api/productos/${id}`);
  assert.equal(obtencion.estado, 200);
  assert.equal(obtencion.datos.nombre, "Laptop de prueba");

  const busqueda = await solicitar("/api/productos/buscar?texto=Laptop");
  assert.equal(busqueda.estado, 200);
  assert.equal(busqueda.datos.length, 1);

  const consulta = await solicitar("/api/productos/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      categoria: "TEC",
      activo: true,
      precioMax: 3000,
    }),
  });

  assert.equal(consulta.estado, 200);
  assert.equal(consulta.datos.length, 1);

  const reemplazo = await solicitar(`/api/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...nuevoProducto,
      nombre: "Laptop actualizada",
      stock: 10,
      precio: 2399.9,
    }),
  });

  assert.equal(reemplazo.estado, 200);
  assert.equal(reemplazo.datos.nombre, "Laptop actualizada");
  assert.equal(reemplazo.datos.stock, 10);

  const actualizacionParcial = await solicitar(`/api/productos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      stock: 12,
      descripcion: null,
    }),
  });

  assert.equal(actualizacionParcial.estado, 200);
  assert.equal(actualizacionParcial.datos.stock, 12);
  assert.equal(actualizacionParcial.datos.descripcion, null);

  const eliminacion = await solicitar(`/api/productos/${id}`, {
    method: "DELETE",
  });

  assert.equal(eliminacion.estado, 200);
  assert.equal(eliminacion.datos.producto.id, id);

  const noEncontrado = await solicitar(`/api/productos/${id}`);
  assert.equal(noEncontrado.estado, 404);
});
```

---

## 25. Ejecutar las pruebas

En PowerShell:

```powershell
npm.cmd test
```

El resultado esperado debe indicar una prueba aprobada y cero pruebas fallidas.

---

## 26. Iniciar el proyecto

Para desarrollo:

```powershell
npm.cmd run dev
```

Para ejecución normal:

```powershell
npm.cmd start
```

Abre en el navegador:

```text
http://localhost:4214
```

Al iniciar el proyecto se creará automáticamente:

```text
data/productos.sqlite
```

---

## 27. Probar la API manualmente

### Listar productos con GET

```http
GET http://localhost:4214/api/productos
```

### Obtener un producto con GET

```http
GET http://localhost:4214/api/productos/1
```

### Buscar con GET y query params

```http
GET http://localhost:4214/api/productos/buscar?texto=laptop&activo=true
```

### Crear con POST

```http
POST http://localhost:4214/api/productos
Content-Type: application/json
```

```json
{
  "codigo": "PROD-001",
  "nombre": "Laptop Lenovo",
  "categoria": "TEC",
  "stock": 10,
  "precio": 2499.9,
  "peso": 1.75,
  "descripcion": "Laptop para trabajo y estudio",
  "activo": true,
  "fechaVencimiento": null,
  "horaRegistro": "09:30",
  "imagenBase64": null
}
```

### Consultar con QUERY

La operación `QUERY` se representa mediante un `POST` a `/query`, porque HTTP no tiene un verbo estándar llamado `QUERY`.

```http
POST http://localhost:4214/api/productos/query
Content-Type: application/json
```

```json
{
  "texto": "laptop",
  "categoria": "TEC",
  "activo": true,
  "precioMin": 1000,
  "precioMax": 3000
}
```

### Reemplazar con PUT

En `PUT` se envían nuevamente todos los campos obligatorios:

```http
PUT http://localhost:4214/api/productos/1
Content-Type: application/json
```

```json
{
  "codigo": "PROD-001",
  "nombre": "Laptop Lenovo actualizada",
  "categoria": "TEC",
  "stock": 15,
  "precio": 2399.9,
  "peso": 1.75,
  "descripcion": "Descripción actualizada",
  "activo": true,
  "fechaVencimiento": null,
  "horaRegistro": "10:15",
  "imagenBase64": null
}
```

### Actualizar parcialmente con PATCH

```http
PATCH http://localhost:4214/api/productos/1
Content-Type: application/json
```

```json
{
  "stock": 20,
  "precio": 2299.9,
  "activo": false
}
```

### Eliminar con DELETE

```http
DELETE http://localhost:4214/api/productos/1
```

---

## 28. Flujo completo del proyecto

```text
Formulario HTML
→ ProductoRequestDto del frontend
→ productos.api.js y fetch
→ productos.routes.js
→ productos.controller.js
→ ProductoRequestDto del backend
→ productos.service.js
→ ProductoRepository.js
→ SQLite
→ Producto Model
→ ProductoResponseDto del backend
→ JSON
→ ProductoResponseDto del frontend
→ productos.ui.js
→ Tabla HTML
```

---

## 29. Lista final de verificación

- [ ] Node.js 22.13 o superior instalado.
- [ ] Dependencias instaladas con `npm.cmd install`.
- [ ] `package.json` tiene `"type": "module"`.
- [ ] Model `Producto` creado.
- [ ] DTO de request, consulta y response creados en el backend.
- [ ] Repository crea la tabla SQLite.
- [ ] Service contiene la lógica de negocio.
- [ ] Controller recibe solicitudes y devuelve respuestas.
- [ ] Middlewares de validación, error y ruta inexistente creados.
- [ ] Rutas registradas en `/api/productos`.
- [ ] Frontend dividido en DTO, API, UI y eventos.
- [ ] Imagen almacenada como `BLOB`.
- [ ] Campos opcionales admiten `NULL`.
- [ ] `GET` probado.
- [ ] `POST` probado.
- [ ] `PUT` probado.
- [ ] `PATCH` probado.
- [ ] `DELETE` probado.
- [ ] `QUERY` probado.
- [ ] Prueba automatizada aprobada.
- [ ] Interfaz disponible en `http://localhost:4214`.

Al completar estos pasos tendrás un proyecto independiente de la entidad `Producto`, creado desde cero y con todas sus capas listas para explicar en clase.
