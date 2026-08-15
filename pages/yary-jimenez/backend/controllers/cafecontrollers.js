const pool = require('../config/database');

// GET /api/cafes -> Listar todos los clientes
const getCafes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    res.status(500).json({ mensaje: 'Error al consultar la base de datos' });
  }
};

// POST /api/cafes -> Crear un nuevo cliente
const createCafe = async (req, res) => {
  try {
    const { nombre, dni, telefono, correo, categoria, direccion } = req.body;

    // Validación básica
    if (!nombre ||!dni) {
      return res.status(400).json({ mensaje: 'El nombre y DNI son obligatorios' });
    }

    const sql = `INSERT INTO clientes (nombre, dni, telefono, correo, categoria, direccion, puntos) 
                 VALUES (?,?, 0)`;
    
    const [result] = await pool.query(sql, [nombre, dni, telefono, correo, categoria, direccion]);
    
    res.status(201).json({ 
      id: result.insertId, 
      mensaje: 'Cliente registrado exitosamente ☕' 
    });
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ mensaje: 'Error al guardar el cliente' });
  }
};

// EXTRA: PUT /api/cafes/:id -> Actualizar cliente
const updateCafe = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, dni, telefono, correo, categoria, direccion, puntos } = req.body;
    
    await pool.query(
      'UPDATE clientes SET nombre=?, dni=?, telefono=?, correo=?, categoria=?, direccion=?, puntos=? WHERE id=?',
      [nombre, dni, telefono, correo, categoria, direccion, puntos, id]
    );
    res.json({ mensaje: 'Cliente actualizado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar' });
  }
};

// EXTRA: DELETE /api/cafes/:id -> Eliminar cliente
const deleteCafe = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM clientes WHERE id=?', [id]);
    res.json({ mensaje: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar' });
  }
};

module.exports = { getCafes, createCafe, updateCafe, deleteCafe };