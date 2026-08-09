class Categoria {
  #id;
  #nombre;

  constructor(
    id,
    nombre,
    descripcion,
    activo,
    horaRegistro,
    fechaHoraRegistro
  ) {
    this.#id = id; // Código corto CHAR(3), ej: 'JUE', 'VIP', 'BAR'
    this.#nombre = nombre;
    this.descripcion = descripcion ?? null;
    this.activo = Boolean(activo);
    this.horaRegistro = horaRegistro;
    this.fechaHoraRegistro = fechaHoraRegistro;
  }

  // Getters y Setters
  get id() {
    return this.#id;
  }

  set id(id) {
    this.#id = id;
  }

  get nombre() {
    return this.#nombre;
  }

  set nombre(nombre) {
    this.#nombre = nombre;
  }
}

export default Categoria;