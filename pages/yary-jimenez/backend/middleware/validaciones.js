const validarCafe = (req, res, next) => {
  const { nombre, precio } = req.body;

  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ mensaje: 'El nombre del café es obligatorio' });
  }

  if (!precio || isNaN(precio) || precio <= 0) {
    return res.status(400).json({ mensaje: 'El precio debe ser un número mayor a 0' });
  }

  next(); // Si todo está correcto, pasa al controlador
};

module.exports = {
  validarCafe
};