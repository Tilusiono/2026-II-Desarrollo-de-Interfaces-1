-- ==========================================
-- DML - ELITE MARKET
-- ==========================================

---------------------------------------------------
-- INSERTAR CATEGORÍAS
---------------------------------------------------

INSERT INTO categorias(nombre_categoria)
VALUES
('Abarrotes'),
('Bebidas'),
('Limpieza');

---------------------------------------------------
-- INSERTAR PRODUCTOS
---------------------------------------------------

INSERT INTO productos
(
nombre,
descripcion,
precio,
stock,
marca,
fecha_vencimiento,
codigo_barras,
id_categoria
)
VALUES
(
'Arroz Costeño',
'Arroz Premium de 5 Kg',
24.90,
50,
'Costeño',
'2027-05-10',
'7501234567891',
1
);

INSERT INTO productos
(
nombre,
descripcion,
precio,
stock,
marca,
fecha_vencimiento,
codigo_barras,
id_categoria
)
VALUES
(
'Coca Cola 3L',
'Gaseosa familiar',
12.50,
30,
'Coca Cola',
'2027-01-15',
'7501234567892',
2
);

INSERT INTO productos
(
nombre,
descripcion,
precio,
stock,
marca,
fecha_vencimiento,
codigo_barras,
id_categoria
)
VALUES
(
'Lejía Sapolio',
'Desinfectante para pisos',
8.90,
18,
'Sapolio',
'2028-03-20',
'7501234567893',
3
);

---------------------------------------------------
-- SELECT
---------------------------------------------------

SELECT
id_producto,
nombre,
precio,
stock,
marca
FROM productos
WHERE stock > 0
ORDER BY nombre ASC;

---------------------------------------------------
-- UPDATE
---------------------------------------------------

UPDATE productos
SET stock = 45
WHERE id_producto = 1;

---------------------------------------------------
-- DELETE
---------------------------------------------------

DELETE FROM productos
WHERE id_producto = 3;