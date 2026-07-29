-- ==========================================
-- BASE DE DATOS: ELITE MARKET
-- DDL - CREACIÓN DE TABLAS
-- ==========================================

DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS categorias;

-- ============================
-- TABLA CATEGORIAS
-- ============================

CREATE TABLE IF NOT EXISTS categorias (
    id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_categoria TEXT NOT NULL
);

-- ============================
-- TABLA PRODUCTOS
-- ============================

CREATE TABLE IF NOT EXISTS productos (

    id_producto INTEGER PRIMARY KEY AUTOINCREMENT,

    nombre TEXT NOT NULL,

    descripcion TEXT,

    precio REAL NOT NULL,

    stock INTEGER NOT NULL,

    marca TEXT,

    fecha_vencimiento TEXT,

    codigo_barras TEXT UNIQUE,

    id_categoria INTEGER,

    FOREIGN KEY(id_categoria)
        REFERENCES categorias(id_categoria)

);