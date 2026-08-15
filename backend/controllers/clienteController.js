const pool = require("../config/database");

// 1. Obtener todos los clientes
const obtenerClientes = async (req, res) => {
  try {
    const [clientes] = await pool.query(`
      SELECT idCliente, nombreCliente, apellidoCliente, telefono, email 
      FROM cliente 
      ORDER BY idCliente
    `);
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener clientes", error: error.message });
  }
};

// 2. Obtener cliente por ID
const obtenerClientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [cliente] = await pool.query("SELECT * FROM cliente WHERE idCliente = ?", [id]);
    
    if (cliente.length === 0) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
    res.json(cliente[0]);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar cliente", error: error.message });
  }
};

// 3. Crear cliente
const crearCliente = async (req, res) => {
  try {
    const { nombreCliente, apellidoCliente, telefono, email } = req.body;
    const [resultado] = await pool.query(
      "INSERT INTO cliente (nombreCliente, apellidoCliente, telefono, email) VALUES (?, ?, ?, ?)",
      [nombreCliente, apellidoCliente, telefono, email]
    );
    res.status(201).json({
      id: resultado.insertId,
      nombreCliente,
      apellidoCliente,
      telefono,
      email
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear cliente", error: error.message });
  }
};

// 4. Actualizar cliente
const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreCliente, apellidoCliente, telefono, email } = req.body;
    
    const [resultado] = await pool.query(
      "UPDATE cliente SET nombreCliente = ?, apellidoCliente = ?, telefono = ?, email = ? WHERE idCliente = ?",
      [nombreCliente, apellidoCliente, telefono, email, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
    res.json({ mensaje: "Cliente actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar", error: error.message });
  }
};

// 5. Eliminar cliente
const eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const [resultado] = await pool.query("DELETE FROM cliente WHERE idCliente = ?", [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
    res.json({ mensaje: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar", error: error.message });
  }
};

module.exports = {
  obtenerClientes,
  obtenerClientePorId,
  crearCliente,
  actualizarCliente,
  eliminarCliente
};
