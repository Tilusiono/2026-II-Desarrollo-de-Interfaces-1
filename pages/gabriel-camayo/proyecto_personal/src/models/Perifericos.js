class Perifericos{
  #id;
  #codigo;
  #tipo;
  #marca;
  #stock;

  constructor(
    id,
    codigo,
    tipo,
    marca,
    modelo,
    tipoConexion,
    color,
    precio,
    stock,
    horaRegistro,
    fechaHoraRegistro
  ) {
    this.#id = Number(id);
    this.#codigo = codigo;
    this.#tipo = tipo;
    this.#marca = marca;
    this.modelo = modelo;
    this.tipoConexion = tipoConexion ?? null;
    this.color = color ?? null;
    this.precio = Number(precio);
    this.#stock = Number(stock);
    this.horaRegistro = horaRegistro;
    this.fechaHoraRegistro = fechaHoraRegistro;
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

  get tipo() {
    return this.#tipo;
  }

  set tipo(tipo) {
    this.#tipo = tipo;
  }

  get marca() {
    return this.#marca;
  }

  set marca(marca) {
    this.#marca = marca;
  }

  get stock() {
    return this.#stock;
  }

  set stock(stock) {
    this.#stock = Number(stock);
  }
}

export default Perifericos;