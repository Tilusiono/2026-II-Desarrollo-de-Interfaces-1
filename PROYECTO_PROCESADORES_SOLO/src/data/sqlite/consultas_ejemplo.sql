-- Consultas SQL para evidenciar el uso de SQLite
SELECT * FROM procesadores ORDER BY id DESC;

SELECT id, codigo, modelo, arquitectura, nucleos, precio
FROM procesadores
WHERE arquitectura = 'X64' AND registro = 1
ORDER BY precio DESC;

SELECT arquitectura, COUNT(*) AS cantidad, AVG(precio) AS precio_promedio
FROM procesadores
GROUP BY arquitectura
ORDER BY cantidad DESC;

SELECT p.codigo, p.modelo, a.accion, a.fecha_hora
FROM auditoria_procesadores a
LEFT JOIN procesadores p ON p.id = a.procesador_id
ORDER BY a.id DESC;

EXPLAIN QUERY PLAN
SELECT * FROM procesadores WHERE arquitectura = 'X64' AND precio >= 300;
