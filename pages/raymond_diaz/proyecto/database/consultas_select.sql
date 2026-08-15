-- SELECT simple: muestra productos que no fueron eliminados.
SELECT id, codigo, nombre, marca, precio, stock
FROM productos
WHERE eliminado_en IS NULL
ORDER BY nombre COLLATE NOCASE;

-- SELECT con relaciones: JOIN de producto, categoría y proveedor.
SELECT
  p.codigo,
  p.nombre AS producto,
  c.nombre AS categoria,
  pr.razon_social AS proveedor,
  p.precio,
  p.stock
FROM productos AS p
JOIN categorias AS c ON c.id = p.categoria_id
LEFT JOIN proveedores AS pr ON pr.id = p.proveedor_id
WHERE p.eliminado_en IS NULL
  AND p.activo = 1
ORDER BY c.nombre, p.nombre;

-- SELECT agregado: valor del inventario por categoría.
SELECT
  c.nombre AS categoria,
  COUNT(p.id) AS productos,
  SUM(p.stock) AS unidades,
  ROUND(SUM(p.precio * p.stock), 2) AS valor_inventario
FROM categorias AS c
JOIN productos AS p ON p.categoria_id = c.id
WHERE p.eliminado_en IS NULL
GROUP BY c.id, c.nombre
ORDER BY valor_inventario DESC;

-- En el código Node se usan parámetros (?) en lugar de concatenar texto:
-- WHERE (p.nombre LIKE ? OR p.marca LIKE ? OR p.codigo LIKE ?)
-- Esto evita la inyección SQL y permite reutilizar la sentencia preparada.
