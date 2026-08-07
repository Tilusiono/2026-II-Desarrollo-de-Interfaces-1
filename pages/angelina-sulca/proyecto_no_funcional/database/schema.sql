-- ============================================
-- BASE DE DATOS: SchoolSupply
-- ============================================

-- 1. TABLA: productos (ya existe)
CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    marca TEXT NOT NULL,
    color TEXT,
    calidad TEXT,
    precio_unitario REAL NOT NULL,
    precio_docena REAL,
    stock INTEGER DEFAULT 0,
    activo BOOLEAN DEFAULT 1,
    categoria TEXT,
    descripcion TEXT,
    en_oferta BOOLEAN DEFAULT 0,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABLA: clientes (ya existe)
CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    correo TEXT UNIQUE,
    telefono TEXT,
    direccion TEXT,
    tipo_cliente TEXT DEFAULT 'Unitario' CHECK (tipo_cliente IN ('Unitario', 'Por Docena')),
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABLA: ventas (ya existe)
CREATE TABLE IF NOT EXISTS ventas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    subtotal REAL NOT NULL,
    descuento REAL DEFAULT 0,
    total REAL NOT NULL,
    metodo_pago TEXT CHECK (metodo_pago IN ('Efectivo', 'Tarjeta', 'Yape', 'Plin', 'Transferencia')),
    estado TEXT DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'Confirmada', 'Anulada', 'Entregada')),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

-- 4. TABLA: detalle_ventas (ya existe)
CREATE TABLE IF NOT EXISTS detalle_ventas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    venta_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    precio_unitario REAL NOT NULL,
    subtotal REAL NOT NULL,
    FOREIGN KEY (venta_id) REFERENCES ventas(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

-- 5. 🔥 NUEVA TABLA: sedes (locales)
CREATE TABLE IF NOT EXISTS sedes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo TEXT UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    direccion TEXT NOT NULL,
    distrito TEXT,
    telefono TEXT,
    encargado TEXT,
    capacidad INTEGER DEFAULT 0,
    horario_apertura TEXT,
    horario_cierre TEXT,
    activo BOOLEAN DEFAULT 1,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. 🔥 NUEVA TABLA: empleados (opcional, para relación con sede)
CREATE TABLE IF NOT EXISTS empleados (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    correo TEXT UNIQUE,
    telefono TEXT,
    cargo TEXT,
    sede_id INTEGER,
    activo BOOLEAN DEFAULT 1,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sede_id) REFERENCES sedes(id) ON DELETE SET NULL
);