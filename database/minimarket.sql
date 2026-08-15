CREATE DATABASE minimarket;

USE minimarket;

CREATE TABLE categoria (
    idCategoria INT AUTO_INCREMENT PRIMARY KEY,
    nombreCategoria VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255)
);

CREATE TABLE producto (
    idProducto INT AUTO_INCREMENT PRIMARY KEY,
    nombreProducto VARCHAR(150) NOT NULL,
    descripcion VARCHAR(255),
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    idCategoria INT NOT NULL,
    FOREIGN KEY (idCategoria)
        REFERENCES categoria(idCategoria)
);

CREATE TABLE cliente (
    idCliente INT AUTO_INCREMENT PRIMARY KEY,
    nombreCliente VARCHAR(100) NOT NULL,
    apellidoCliente VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE empleado (
    idEmpleado INT AUTO_INCREMENT PRIMARY KEY,
    nombreEmpleado VARCHAR(100) NOT NULL,
    apellidoEmpleado VARCHAR(100) NOT NULL,
    cargo VARCHAR(100) NOT NULL
);

CREATE TABLE venta (
    idVenta INT AUTO_INCREMENT PRIMARY KEY,
    fechaVenta DATETIME DEFAULT CURRENT_TIMESTAMP,
    idCliente INT NOT NULL,
    idEmpleado INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (idCliente)
        REFERENCES cliente(idCliente),
    FOREIGN KEY (idEmpleado)
        REFERENCES empleado(idEmpleado)
);

CREATE TABLE detalle_venta (
    idDetalle INT AUTO_INCREMENT PRIMARY KEY,
    idVenta INT NOT NULL,
    idProducto INT NOT NULL,
    cantidad INT NOT NULL,
    precioUnitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (idVenta)
        REFERENCES venta(idVenta),
    FOREIGN KEY (idProducto)
        REFERENCES producto(idProducto)
);