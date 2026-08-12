PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;
PRAGMA busy_timeout = 5000;

CREATE TABLE IF NOT EXISTS procesadores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo VARCHAR(20) NOT NULL UNIQUE,
  modelo TEXT NOT NULL,
  arquitectura CHAR(3) NOT NULL,
  nucleos INTEGER NOT NULL DEFAULT 0 CHECK (nucleos >= 0),
  precio DECIMAL(10, 2) NOT NULL CHECK (precio >= 0),
  frecuenciaGhz REAL CHECK (frecuenciaGhz IS NULL OR frecuenciaGhz >= 0),
  descripcion TEXT,
  registro BOOLEAN NOT NULL DEFAULT 1 CHECK (registro IN (0, 1)),
  fechaLanzamiento DATE,
  horaRegistro TIME NOT NULL,
  fechaHoraRegistro DATETIME NOT NULL,
  imagen BLOB,
  imagenMimeType VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS auditoria_procesadores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  procesador_id INTEGER,
  codigo VARCHAR(20) NOT NULL,
  accion VARCHAR(12) NOT NULL CHECK (accion IN ('INSERT', 'UPDATE', 'DELETE')),
  fecha_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (procesador_id) REFERENCES procesadores(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_procesadores_modelo ON procesadores(modelo);
CREATE INDEX IF NOT EXISTS idx_procesadores_arquitectura ON procesadores(arquitectura);
CREATE INDEX IF NOT EXISTS idx_procesadores_registro ON procesadores(registro);
CREATE INDEX IF NOT EXISTS idx_procesadores_precio ON procesadores(precio);
CREATE INDEX IF NOT EXISTS idx_auditoria_procesador
  ON auditoria_procesadores(procesador_id, fecha_hora);
