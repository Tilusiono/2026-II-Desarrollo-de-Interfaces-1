export function validarId(request, response, next) {
  const id = Number(request.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return response
      .status(400)
      .json({ mensaje: "El ID debe ser un entero positivo" });
  }
  request.params.id = id;
  next();
}
