class Servicio {
  #id;
  #codigo;
  #nombre;
  #categoria;

  constructor(
    id,
    codigo,
    nombre,
    categoria,
    precio,
    descripcion,
    activo,
    horaRegistro,
    fechaHoraRegistro,
    imagen,
    imagenMimeType,
  ) {
    this.#id = Number(id);
    this.#codigo = codigo;
    this.#nombre = nombre;
    this.#categoria = categoria;
    this.precio = Number(precio);
    this.descripcion = descripcion ?? null;
    this.activo = Boolean(activo);
    this.horaRegistro = horaRegistro;
    this.fechaHoraRegistro = fechaHoraRegistro;
    this.imagen = imagen ?? null;
    this.imagenMimeType = imagenMimeType ?? null;
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

  get categoria() {
    return this.#categoria;
  }

  set categoria(categoria) {
    this.#categoria = categoria;
  }
}

export default Servicio;