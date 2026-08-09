class Servicio {
  #id;
  #codigo;
  #nombre;
  #categoriaId;
  #capacidadMax;

  constructor(
    id,
    codigo,
    nombre,
    categoriaId,
    capacidadMax,
    precio,
    duracionMinutos,
    descripcion,
    activo,
    fechaVencimiento,
    horaRegistro,
    fechaHoraRegistro,
    imagen,
    imagenMimeType
  ) {
    this.#id = Number(id);
    this.#codigo = codigo;
    this.#nombre = nombre;
    this.#categoriaId = categoriaId;
    this.#capacidadMax = Number(capacidadMax);
    this.precio = Number(precio);
    this.duracionMinutos = duracionMinutos === null || duracionMinutos === undefined ? null : Number(duracionMinutos);
    this.descripcion = descripcion ?? null;
    this.activo = Boolean(activo);
    this.fechaVencimiento = fechaVencimiento ?? null;
    this.horaRegistro = horaRegistro;
    this.fechaHoraRegistro = fechaHoraRegistro;
    this.imagen = imagen ?? null;
    this.imagenMimeType = imagenMimeType ?? null;
  }

  // Getters y Setters para las propiedades privadas
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

  get categoriaId() {
    return this.#categoriaId;
  }

  set categoriaId(categoriaId) {
    this.#categoriaId = categoriaId;
  }

  get capacidadMax() {
    return this.#capacidadMax;
  }

  set capacidadMax(capacidadMax) {
    this.#capacidadMax = Number(capacidadMax);
  }
}

export default Servicio;