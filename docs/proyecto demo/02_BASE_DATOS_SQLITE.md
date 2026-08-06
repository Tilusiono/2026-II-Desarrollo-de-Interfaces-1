# Hito 2 — Modelo y base de datos SQLite

## Objetivo

Crear la base local y la tabla `productos` con todos los tipos solicitados. Aún no se expone ningún método HTTP de Producto.

## 1. Crear src/config/storage.config.js

```js
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const srcPath = path.dirname(path.dirname(currentFile));

export const dataPath = path.join(srcPath, "data");
export const sqlitePath = path.join(dataPath, "sqlite", "productos.sqlite");
```

## 2. Crear src/repositories/ProductoRepository.js

Por ahora el repository solo abre SQLite y crea la tabla.

```js
import { createRequire } from "node:module";
import { sqlitePath } from "../config/storage.config.js";

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
}
```

## 3. Tipos incluidos

| Campos | Tipo declarado |
|---|---|
| `id`, `stock` | INTEGER |
| `precio` | DECIMAL(10,2) |
| `peso` | REAL |
| `nombre`, `descripcion` | TEXT / NULL |
| `codigo`, `imagenMimeType` | VARCHAR |
| `categoria` | CHAR |
| `activo` | BOOLEAN |
| `fechaVencimiento` | DATE / NULL |
| `horaRegistro` | TIME |
| `fechaHoraRegistro` | DATETIME |
| `imagen` | BLOB / NULL |

## 4. Probar la creación

Ejecuta desde la raíz:

```powershell
node -e "import('./src/repositories/ProductoRepository.js').then(({ProductoRepository}) => { const repo = new ProductoRepository(); console.log(repo.db.prepare('PRAGMA table_info(productos)').all()); })"
```

Debes ver los campos de la tabla y debe aparecer:

```text
src/data/sqlite/productos.sqlite
```

## Checklist

- [ ] La ruta termina en `src/data/sqlite/productos.sqlite`.
- [ ] El archivo SQLite fue creado.
- [ ] `PRAGMA table_info(productos)` devuelve las columnas.
- [ ] No aparece el error de directorio inexistente.
