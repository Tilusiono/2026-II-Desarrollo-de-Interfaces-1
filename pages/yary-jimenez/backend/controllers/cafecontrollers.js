const pool = require('../config/database');

// Obtener todos los productos/cafés
const getCafes = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.id, p.nombre, p.descripcion, p.precio, p.imagen_url, c.nombre AS categoria 
      FROM productos p 
      LEFT JOIN categorias c ON p.categoria_id = c.id
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los cafés:', error);
    res.status(500).json({ mensaje: 'Error al consultar la base de datos' });
  }
};

// Crear un nuevo producto/café
const createCafe = async (req, res) => {
  const { nombre, descripcion, precio, categoria_id, imagen_url } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({ mensaje: 'El nombre y el precio son obligatorios' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, categoria_id, imagen_url) VALUES (?, ?, ?, ?, ?)',
      [nombre, descripcion, precio, categoria_id, imagen_url]
    );
    res.status(201).json({ id: result.insertId, mensaje: 'Producto creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el café:', error);
    res.status(500).json({ mensaje: 'Error al guardar el producto' });
  }
};

module.exports = {
  getCafes,
  createCafe
};