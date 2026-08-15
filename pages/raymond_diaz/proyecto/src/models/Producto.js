class Producto {
  #id;
  #codigo;
  #nombre;
  #categoria;
  #stock;

  constructor(
    id,
    codigo,
    nombre,
    categoria,
    stock,
    precio,
    peso,
    descripcion,
    activo,
    fechaVencimiento,
    horaRegistro,
    fechaHoraRegistro,
    imagen,
    imagenMimeType,
  ) {
    this.#id = Number(id);
    this.#codigo = codigo;
    this.#nombre = nombre;
    this.#categoria = categoria;
    this.#stock = Number(stock);
    this.precio = Number(precio);
    this.peso = peso === null || peso === undefined ? null : Number(peso);
    this.descripcion = descripcion ?? null;
    this.activo = Boolean(activo);
    this.fechaVencimiento = fechaVencimiento ?? null;
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

  get stock() {
    return this.#stock;
  }

  set stock(stock) {
    this.#stock = Number(stock);
  }
}

export default Producto;
