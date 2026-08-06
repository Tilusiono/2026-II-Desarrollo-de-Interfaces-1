# CRUD de Producto por hitos

Esta es la guía principal. Debes completar los hitos en orden. Cada hito es acumulativo: no borres el trabajo anterior salvo que la guía indique **reemplazar el archivo**.

## Lineamientos que se conservan

- Node.js 22.13 o superior y módulos ES.
- Un único punto de entrada: `app.js`.
- Express, SQLite local con `node:sqlite`, POO y arquitectura por capas.
- `Model → Repository → Service → Controller → Routes`.
- DTO en backend y frontend.
- Bootstrap 5.3.8 y Bootstrap Icons instalados mediante NPM.
- Entidad `Producto` con INTEGER, REAL, TEXT, VARCHAR, CHAR, DECIMAL, BOOLEAN, DATE, TIME, DATETIME, BLOB y NULL.
- Cada método HTTP se implementa y prueba antes de continuar.
- Cada método se valida dos veces: con una solicitud HTTP y con su propia pantalla Bootstrap.
- Las pantallas de cada hito son temporales y aíslan un solo método; en el hito 10 se reemplazan por el frontend CRUD modular definitivo.

## Orden de los hitos

| N.º | Hito | Resultado obligatorio |
|---:|---|---|
| 1 | [Configuración inicial](./01_CONFIGURACION_INICIAL.md) | `index.html`, Bootstrap e iconos funcionan |
| 2 | [Modelo y base de datos SQLite](./02_BASE_DATOS_SQLITE.md) | Existe la tabla `productos` |
| 3 | [POST — crear](./03_POST_CREAR.md) | HTTP 201 y formulario POST funcionando |
| 4 | [GET — listar y obtener](./04_GET_LISTAR_OBTENER.md) | Lista y consulta por ID desde el navegador |
| 5 | [PUT — reemplazar](./05_PUT_REEMPLAZAR.md) | Reemplaza todos los campos desde el formulario |
| 6 | [PATCH — actualizar parcialmente](./06_PATCH_ACTUALIZAR.md) | Cambia solo los campos enviados desde el formulario |
| 7 | [GET — buscar](./07_GET_BUSCAR.md) | Filtra desde un formulario de búsqueda |
| 8 | [QUERY — consultar](./08_QUERY_CONSULTAR.md) | El navegador envía QUERY y GET devuelve 405 |
| 9 | [DELETE — eliminar](./09_DELETE_ELIMINAR.md) | Elimina desde el navegador y luego devuelve 404 |
| 10 | [Frontend Bootstrap definitivo](./10_FRONTEND_BOOTSTRAP.md) | Se elimina el index temporal y funciona el CRUD modular |
| 11 | [Prueba final](./11_PRUEBA_FINAL.md) | Recorrido completo y tests aprobados |

## Páginas de validación en el navegador

| Hito | URL temporal |
|---|---|
| Configuración | `http://localhost:4214/` |
| POST | `http://localhost:4214/hitos/03-post.html` |
| GET | `http://localhost:4214/hitos/04-get.html` |
| PUT | `http://localhost:4214/hitos/05-put.html` |
| PATCH | `http://localhost:4214/hitos/06-patch.html` |
| GET buscar | `http://localhost:4214/hitos/07-get-buscar.html` |
| QUERY | `http://localhost:4214/hitos/08-query.html` |
| DELETE | `http://localhost:4214/hitos/09-delete.html` |
| CRUD definitivo | `http://localhost:4214/productos` |

## Regla para avanzar

Al terminar cada guía, marca su checklist. Si la respuesta o el código HTTP no coincide, corrige ese hito antes de abrir el siguiente.

En los hitos 3 al 9 debes aprobar ambas comprobaciones:

1. La prueba HTTP del bloque `http`.
2. La prueba visual indicada en **Frontend de validación**.
