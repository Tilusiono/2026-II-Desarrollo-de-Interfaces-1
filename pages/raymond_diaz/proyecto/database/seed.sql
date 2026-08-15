INSERT OR IGNORE INTO categorias (id, nombre, descripcion) VALUES
  (1, 'Laptops', 'Computadoras portátiles para estudio, trabajo y gaming'),
  (2, 'Monitores', 'Pantallas para productividad, diseño y videojuegos'),
  (3, 'Teclados', 'Teclados mecánicos, de membrana e inalámbricos'),
  (4, 'Mouses', 'Dispositivos apuntadores para oficina y gaming'),
  (5, 'Almacenamiento', 'Unidades SSD, discos duros y memorias externas'),
  (6, 'Componentes', 'Procesadores, memoria RAM, placas y tarjetas gráficas');

INSERT OR IGNORE INTO proveedores (id, ruc, razon_social, contacto, telefono, correo) VALUES
  (1, '20123456789', 'Tecnología Andina S.A.C.', 'Carlos Ruiz', '987654341', 'ventas@tecnoandina.pe'),
  (2, '20567891234', 'Perú Components E.I.R.L.', 'Raúl Mena', '987654345', 'pedidos@perucomponents.pe'),
  (3, '20654321987', 'Digital Supply Perú S.A.C.', 'Patricia Vela', '987654348', 'comercial@digitalsupply.pe');

INSERT OR IGNORE INTO usuarios (id, documento, nombres, apellidos, correo, telefono, direccion, rol) VALUES
  (1, '74851236', 'Ana', 'Díaz Torres', 'ana.diaz@example.com', '987654321', 'Av. Arequipa 123, Lima', 'cliente'),
  (2, '70554433', 'Carlos', 'Ruiz Vega', 'carlos.ruiz@example.com', '987654322', 'Calle Los Olivos 456, Lima', 'cliente'),
  (3, '71234567', 'Raymond', 'Díaz Herrera', 'raymond.diaz@tienda.pe', '987654323', 'Lima, Perú', 'administrador');

INSERT OR IGNORE INTO productos (id, codigo, nombre, marca, descripcion, precio, stock, categoria_id, proveedor_id, activo) VALUES
  (1, 'LAP-HP-14', 'Laptop HP 14', 'HP', 'Intel Core i5, 8 GB RAM y SSD de 512 GB', 2499.00, 14, 1, 1, 1),
  (2, 'MON-LG-24', 'Monitor UltraGear 24 pulgadas', 'LG', 'Panel IPS Full HD de 144 Hz', 799.00, 10, 2, 3, 1),
  (3, 'TEC-LOG-MX', 'Teclado MX Keys', 'Logitech', 'Teclado inalámbrico retroiluminado', 399.00, 25, 3, 2, 1),
  (4, 'MOU-LOG-G502', 'Mouse G502 Hero', 'Logitech', 'Sensor de 25 600 DPI y once botones', 189.00, 40, 4, 2, 1),
  (5, 'SSD-SAM-1TB', 'SSD 980 Pro 1 TB', 'Samsung', 'Unidad NVMe PCIe 4.0 de alto rendimiento', 449.00, 18, 5, 3, 1),
  (6, 'RAM-KIN-16', 'Memoria Fury Beast 16 GB', 'Kingston', 'DDR4 3200 MHz, kit de dos módulos', 219.00, 8, 6, 2, 1);

INSERT OR IGNORE INTO ventas (id, usuario_id, fecha, estado, metodo_pago, total) VALUES
  (1, 1, '2026-08-01 10:30:00', 'pagada', 'tarjeta', 2688.00);

INSERT OR IGNORE INTO detalle_ventas (id, venta_id, producto_id, cantidad, precio_unitario) VALUES
  (1, 1, 1, 1, 2499.00),
  (2, 1, 4, 1, 189.00);

INSERT OR IGNORE INTO garantias (id, detalle_venta_id, meses, fecha_inicio, fecha_fin, estado) VALUES
  (1, 1, 12, '2026-08-01', '2027-08-01', 'vigente');

INSERT OR IGNORE INTO movimientos_inventario
  (id, producto_id, tipo, cantidad, stock_anterior, stock_nuevo, motivo)
VALUES
  (1, 1, 'entrada', 15, 0, 15, 'Carga inicial del almacén'),
  (2, 1, 'salida', 1, 15, 14, 'Venta número 1'),
  (3, 4, 'salida', 1, 41, 40, 'Venta número 1');
