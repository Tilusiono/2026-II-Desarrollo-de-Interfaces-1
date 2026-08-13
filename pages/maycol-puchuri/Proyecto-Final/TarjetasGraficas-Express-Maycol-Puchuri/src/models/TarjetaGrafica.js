class TarjetaGrafica {
  #id;
  #codigo;
  #modelo;
  #fabricante;
  #memoriaGb;

  constructor(
    id,
    codigo,
    modelo,
    fabricante,
    memoriaGb,
    precio,
    frecuenciaMhz,
    descripcion,
    registro,
    fechaLanzamiento,
    horaRegistro,
    fechaHoraRegistro,
    imagen,
    imagenMimeType,
  ) {
    this.#id = Number(id);
    this.#codigo = codigo;
    this.#modelo = modelo;
    this.#fabricante = fabricante;
    this.#memoriaGb = Number(memoriaGb);
    this.precio = Number(precio);
    this.frecuenciaMhz =
      frecuenciaMhz === null || frecuenciaMhz === undefined
        ? null
        : Number(frecuenciaMhz);
    this.descripcion = descripcion ?? null;
    this.registro = Boolean(registro);
    this.fechaLanzamiento = fechaLanzamiento ?? null;
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

  get modelo() {
    return this.#modelo;
  }

  set modelo(modelo) {
    this.#modelo = modelo;
  }

  get fabricante() {
    return this.#fabricante;
  }

  set fabricante(fabricante) {
    this.#fabricante = fabricante;
  }

  get memoriaGb() {
    return this.#memoriaGb;
  }

  set memoriaGb(memoriaGb) {
    this.#memoriaGb = Number(memoriaGb);
  }
}

export default TarjetaGrafica;
