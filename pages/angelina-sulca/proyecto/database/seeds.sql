-- ============================================
-- DATOS DE PRUEBA - SchoolSupply
-- ============================================

-- Insertar productos (ya existen)
INSERT OR IGNORE INTO productos (nombre, marca, color, calidad, precio_unitario, precio_docena, stock, categoria, en_oferta) VALUES
('Cuaderno A4', 'Norma', 'Azul', 'Premium', 9.00, 96.00, 100, 'Papelería', 1),
('Cuaderno A4', 'Norma', 'Rojo', 'Premium', 9.00, 96.00, 80, 'Papelería', 1),
('Cuaderno A5', 'Scribe', 'Verde', 'Estándar', 6.00, 60.00, 120, 'Papelería', 1),
('Cuaderno Espiral', 'Norma', 'Negro', 'Premium', 12.00, 120.00, 60, 'Papelería', 1),
('Lapicero Retráctil', 'Bic', 'Azul', 'Estándar', 3.00, 30.00, 200, 'Útiles', 1),
('Lapicero Retráctil', 'Bic', 'Rojo', 'Estándar', 3.00, 30.00, 150, 'Útiles', 0),
('Lapicero Retráctil', 'Bic', 'Negro', 'Estándar', 3.00, 30.00, 120, 'Útiles', 0),
('Lápiz N°2', 'Faber-Castell', 'Amarillo', 'Premium', 2.50, 25.00, 300, 'Útiles', 1),
('Tijeras', 'Maped', 'Plateado', 'Estándar', 5.00, 54.00, 80, 'Útiles', 1),
('Tijeras', 'Faber-Castell', 'Azul', 'Estándar', 6.00, 60.00, 50, 'Útiles', 0),
('Borrador Blanco', 'Pelikan', 'Blanco', 'Estándar', 2.00, 20.00, 200, 'Útiles', 1),
('Regla 30cm', 'Maped', 'Transparente', 'Estándar', 4.00, 42.00, 100, 'Útiles', 0),
('Colores x12', 'Artez', '12 colores', 'Premium', 18.00, 190.00, 60, 'Útiles', 1),
('Cartuchera', 'Lápiz Loco', 'Multicolor', 'Estándar', 15.00, 160.00, 40, 'Útiles', 0),
('Mochila Escolar', 'Everlast', 'Negro', 'Premium', 55.00, 600.00, 50, 'Útiles', 1),
('Pelota de Fútbol', 'Adidas', 'Blanco', 'Premium', 45.00, 480.00, 30, 'Juguetería', 1),
('Pelota de Vóley', 'Mikasa', 'Amarillo', 'Premium', 55.00, 600.00, 20, 'Juguetería', 0),
('Juego de Lápices', 'Faber-Castell', 'Multicolor', 'Premium', 25.00, 250.00, 40, 'Arte', 1);

-- Insertar clientes
INSERT OR IGNORE INTO clientes (nombre, correo, telefono, direccion, tipo_cliente) VALUES
('Ana Pérez', 'ana.perez@email.com', '987654321', 'Av. Siempre Viva 123', 'Unitario'),
('Colegio San José', 'colegio@email.com', '987654322', 'Av. Principal 456', 'Por Docena');

-- 🔥 Insertar sedes (locales)
INSERT OR IGNORE INTO sedes (codigo, nombre, direccion, distrito, telefono, encargado, capacidad, horario_apertura, horario_cierre) VALUES
('S001', 'Sede Central - San Isidro', 'Av. Javier Prado Este 1234', 'San Isidro', '01-555-1001', 'Carlos Gómez', 50, '08:00', '20:00'),
('S002', 'Sede Miraflores', 'Calle Los Rosales 456', 'Miraflores', '01-555-1002', 'María Rodríguez', 40, '08:30', '19:30'),
('S003', 'Sede Pueblo Libre', 'Av. Universitaria 789', 'Pueblo Libre', '01-555-1003', 'Pedro Sánchez', 35, '09:00', '19:00'),
('S004', 'Sede Cercado de Lima', 'Jr. Huancavelica 321', 'Cercado de Lima', '01-555-1004', 'Lucía Fernández', 30, '08:00', '18:00'),
('S005', 'Sede San Juan de Lurigancho', 'Av. El Sol 654', 'San Juan de Lurigancho', '01-555-1005', 'Jorge Ramírez', 45, '08:00', '20:00');