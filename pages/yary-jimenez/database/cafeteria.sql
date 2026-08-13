CREATE DATABASE IF NOT EXISTS cafeteria_db;
USE cafeteria_db;

-- 2. Tabla de Categorías (Cafés calientes, Bebidas frías, Postres, etc.)
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- 3. Tabla de Productos (Menú de la cafetería)
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    imagen_url VARCHAR(255),
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
);

-- 4. Tabla de Clientes/Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT 'cliente' -- 'cliente' o 'admin'
);

-- 5. Tabla de Pedidos (Encabezado de la compra)
CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    estado VARCHAR(30) DEFAULT 'Pendiente', -- 'Pendiente', 'En preparación', 'Entregado'
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- 6. Detalle del Pedido (Productos incluidos en cada compra)
CREATE TABLE IF NOT EXISTS detalle_pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    producto_id INT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- ===================================================
-- DATOS DE PRUEBA (Para tener contenido de ejemplo)
-- ===================================================

-- Insertar Categorías
INSERT INTO categorias (nombre) VALUES 
('Cafés Calientes'), 
('Bebidas Frías'), 
('Postres y Calientes');

-- Insertar Productos
INSERT INTO productos (nombre, descripcion, precio, categoria_id) VALUES 
('Espresso Doble', 'Café concentrado e intenso', 8.50, 1),
('Cappuccino Tradicional', 'Espresso con leche vaporizada y abundante espuma', 11.00, 1),
('Iced Latte', 'Café espresso con leche fría y hielo', 12.50, 2),
('Frappuccino de Caramel', 'Batido helado de café con caramelo y crema batida', 14.00, 2),
('Cheesecake de Arándanos', 'Porción de pastel de queso con mermelada artesanal', 13.50, 3);