class Automoviles {
  #id;
  #codigo;
  #marca;
  #modelo;
  #anio;

  constructor(
    id,
    codigo,
    marca,
    modelo,
    anio,
    color,
    categoria,
    precio,
    kilometraje,
    descripcion,
    activo,
    horaRegistro,
    fechaHoraRegistro,
    imagen,
    imagenMimeType,
  ) {
    this.#id = Number(id);
    this.#codigo = codigo;
    this.#marca = marca;
    this.#modelo = modelo;
    this.#anio = Number(anio);

    this.color = color ?? null;
    this.categoria = categoria;
    this.precio = Number(precio);
    this.kilometraje =
      kilometraje === null || kilometraje === undefined
        ? 0
        : Number(kilometraje);
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

  get marca() {
    return this.#marca;
  }

  set marca(marca) {
    this.#marca = marca;
  }

  get modelo() {
    return this.#modelo;
  }

  set modelo(modelo) {
    this.#modelo = modelo;
  }

  get anio() {
    return this.#anio;
  }

  set anio(anio) {
    this.#anio = Number(anio);
  }
}

export default Automoviles;
 