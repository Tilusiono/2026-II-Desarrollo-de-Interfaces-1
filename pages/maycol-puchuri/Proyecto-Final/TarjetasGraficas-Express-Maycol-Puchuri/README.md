# Tarjetas Gráficas Express - Maycol

Proyecto académico de **Maycol** siguiendo la misma secuencia del profesor.

## Entidad propia

La clase principal es `TarjetaGrafica`. Mantiene cinco variables privadas y variables públicas, además de los tipos de datos trabajados en clase:

- `id`: INTEGER
- `codigo`: VARCHAR
- `modelo`: TEXT
- `fabricante`: CHAR
- `memoriaGb`: INTEGER
- `precio`: DECIMAL
- `frecuenciaMhz`: REAL
- `descripcion`: TEXT / NULL
- `registro`: BOOLEAN
- `fechaLanzamiento`: DATE
- `horaRegistro`: TIME
- `fechaHoraRegistro`: DATETIME
- `imagen`: BLOB
- `imagenMimeType`: VARCHAR

## Secuencia conservada

Model → Repository → Service → Controller → Routes → Frontend Bootstrap.

Incluye POST, GET, PUT, PATCH, GET buscar, QUERY y DELETE, junto con las pantallas por hito. Los documentos originales del profesor se conservan en `docs`.

## Ejecutar

En Windows, ejecutar `INICIAR_PROYECTO.bat`.

También puede iniciarse con:

```bash
npm start
```

Abrir: `http://localhost:4214/tarjetas-graficas`
