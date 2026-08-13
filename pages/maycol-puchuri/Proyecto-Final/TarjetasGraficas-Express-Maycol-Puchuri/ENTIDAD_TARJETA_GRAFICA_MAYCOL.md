# Entidad propia de Maycol: TarjetaGrafica

La entidad fue cambiada sin alterar la secuencia del profesor.

## Cinco variables privadas

- `#id`
- `#codigo`
- `#modelo`
- `#fabricante`
- `#memoriaGb`

## Variables públicas y tipos usados

- `precio` → DECIMAL
- `frecuenciaMhz` → REAL
- `descripcion` → TEXT y permite NULL
- `registro` → BOOLEAN
- `fechaLanzamiento` → DATE
- `horaRegistro` → TIME
- `fechaHoraRegistro` → DATETIME
- `imagen` → BLOB
- `imagenMimeType` → VARCHAR

La tabla SQLite es `tarjetas_graficas`. Se mantienen POST, GET, PUT, PATCH, GET buscar, QUERY y DELETE.
