class Categoria {
  #id;
  #codigo;
  #nombre;
  #tipo;
  #cantidadProductos;

  constructor(
    id,
    codigo,
    nombre,
    tipo,
    cantidadProductos,
    presupuesto,
    pesoPromedio,
    descripcion,
    activo,
    fechaLimite,
    horaRegistro,
    fechaHoraRegistro,
    imagen,
    imagenMimeType,
    observaciones
  ) {
    this.#id = Number(id);
    this.#codigo = codigo;
    this.#nombre = nombre;
    this.#tipo = tipo;
    this.#cantidadProductos = Number(cantidadProductos);
    this.presupuesto = Number(presupuesto);
    this.pesoPromedio = pesoPromedio === null || pesoPromedio === undefined ? null : Number(pesoPromedio);
    this.descripcion = descripcion ?? null;
    this.activo = Boolean(activo);
    this.fechaLimite = fechaLimite ?? null;
    this.horaRegistro = horaRegistro;
    this.fechaHoraRegistro = fechaHoraRegistro;
    this.imagen = imagen ?? null;
    this.imagenMimeType = imagenMimeType ?? null;
    this.observaciones = observaciones ?? null;
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    this.#id = Number(id);
  }

  get codigo() {
    return this.#codigo;
  }

  set codigo(codigo) {
    this.#codigo = codigo;
  }

  get nombre() {
    return this.#nombre;
  }

  set nombre(nombre) {
    this.#nombre = nombre;
  }

  get tipo() {
    return this.#tipo;
  }

  set tipo(tipo) {
    this.#tipo = tipo;
  }

  get cantidadProductos() {
    return this.#cantidadProductos;
  }

  set cantidadProductos(cantidadProductos) {
    this.#cantidadProductos = Number(cantidadProductos);
  }
}

export default Categoria;