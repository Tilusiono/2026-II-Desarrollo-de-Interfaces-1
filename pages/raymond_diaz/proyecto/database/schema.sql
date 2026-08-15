PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS categorias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL UNIQUE COLLATE NOCASE,
  descripcion TEXT,
  activo INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1))
) STRICT;

CREATE TABLE IF NOT EXISTS proveedores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ruc TEXT NOT NULL UNIQUE CHECK (length(ruc) = 11),
  razon_social TEXT NOT NULL COLLATE NOCASE,
  contacto TEXT,
  telefono TEXT,
  correo TEXT,
  activo INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1))
) STRICT;

CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  documento TEXT NOT NULL UNIQUE CHECK (length(documento) BETWEEN 8 AND 12),
  nombres TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  correo TEXT NOT NULL UNIQUE COLLATE NOCASE,
  telefono TEXT,
  direccion TEXT,
  rol TEXT NOT NULL DEFAULT 'cliente' CHECK (rol IN ('cliente', 'vendedor', 'administrador')),
  activo INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
  creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  eliminado_en TEXT
) STRICT;

CREATE TABLE IF NOT EXISTS productos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo TEXT NOT NULL UNIQUE COLLATE NOCASE,
  nombre TEXT NOT NULL,
  marca TEXT NOT NULL,
  descripcion TEXT,
  precio REAL NOT NULL CHECK (precio >= 0),
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  categoria_id INTEGER NOT NULL,
  proveedor_id INTEGER,
  activo INTEGER NOT NULL DEFAULT 1 CHECK (activo IN (0, 1)),
  fecha_ingreso TEXT NOT NULL DEFAULT (date('now')),
  creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  eliminado_en TEXT,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY (proveedor_id) REFERENCES proveedores(id) ON UPDATE CASCADE ON DELETE SET NULL
) STRICT;

CREATE TABLE IF NOT EXISTS ventas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER NOT NULL,
  fecha TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  estado TEXT NOT NULL DEFAULT 'pagada' CHECK (estado IN ('pendiente', 'pagada', 'anulada')),
  metodo_pago TEXT NOT NULL CHECK (metodo_pago IN ('efectivo', 'tarjeta', 'yape', 'plin', 'transferencia')),
  total REAL NOT NULL DEFAULT 0 CHECK (total >= 0),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON UPDATE CASCADE ON DELETE RESTRICT
) STRICT;

CREATE TABLE IF NOT EXISTS detalle_ventas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  venta_id INTEGER NOT NULL,
  producto_id INTEGER NOT NULL,
  cantidad INTEGER NOT NULL CHECK (cantidad > 0),
  precio_unitario REAL NOT NULL CHECK (precio_unitario >= 0),
  subtotal REAL GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,
  UNIQUE (venta_id, producto_id),
  FOREIGN KEY (venta_id) REFERENCES ventas(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON UPDATE CASCADE ON DELETE RESTRICT
) STRICT;

CREATE TABLE IF NOT EXISTS garantias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  detalle_venta_id INTEGER NOT NULL UNIQUE,
  meses INTEGER NOT NULL DEFAULT 12 CHECK (meses BETWEEN 1 AND 60),
  fecha_inicio TEXT NOT NULL,
  fecha_fin TEXT NOT NULL,
  estado TEXT NOT NULL DEFAULT 'vigente' CHECK (estado IN ('vigente', 'vencida', 'utilizada')),
  FOREIGN KEY (detalle_venta_id) REFERENCES detalle_ventas(id) ON UPDATE CASCADE ON DELETE CASCADE
) STRICT;

CREATE TABLE IF NOT EXISTS movimientos_inventario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  producto_id INTEGER NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('entrada', 'salida', 'ajuste')),
  cantidad INTEGER NOT NULL CHECK (cantidad > 0),
  stock_anterior INTEGER NOT NULL CHECK (stock_anterior >= 0),
  stock_nuevo INTEGER NOT NULL CHECK (stock_nuevo >= 0),
  motivo TEXT NOT NULL,
  creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON UPDATE CASCADE ON DELETE RESTRICT
) STRICT;

CREATE INDEX IF NOT EXISTS idx_productos_nombre_marca ON productos(nombre, marca);
CREATE INDEX IF NOT EXISTS idx_productos_categoria_activo ON productos(categoria_id, activo);
CREATE INDEX IF NOT EXISTS idx_productos_stock ON productos(stock);
CREATE INDEX IF NOT EXISTS idx_usuarios_nombre ON usuarios(apellidos, nombres);
CREATE INDEX IF NOT EXISTS idx_usuarios_activo_rol ON usuarios(activo, rol);
CREATE INDEX IF NOT EXISTS idx_ventas_usuario_fecha ON ventas(usuario_id, fecha DESC);
CREATE INDEX IF NOT EXISTS idx_detalle_producto ON detalle_ventas(producto_id);
CREATE INDEX IF NOT EXISTS idx_movimientos_producto_fecha ON movimientos_inventario(producto_id, creado_en DESC);
