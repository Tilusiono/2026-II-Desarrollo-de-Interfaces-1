import ComponenteComputo from "./ComponenteComputo.js";

class Procesador extends ComponenteComputo {
  #modelo;
  #arquitectura;
  #nucleos;
  #precio;
  #frecuenciaGhz;

  constructor(
    id,
    codigo,
    modelo,
    arquitectura,
    nucleos,
    precio,
    frecuenciaGhz,
    descripcion,
    registro,
    fechaLanzamiento,
    horaRegistro,
    fechaHoraRegistro,
    imagen,
    imagenMimeType,
  ) {
    super(id, codigo, descripcion, registro, fechaHoraRegistro);
    this.#modelo = modelo;
    this.#arquitectura = arquitectura;
    this.#nucleos = Number(nucleos);
    this.#precio = Number(precio);
    this.#frecuenciaGhz =
      frecuenciaGhz === null || frecuenciaGhz === undefined
        ? null
        : Number(frecuenciaGhz);
    this.fechaLanzamiento = fechaLanzamiento ?? null;
    this.horaRegistro = horaRegistro;
    this.imagen = imagen ?? null;
    this.imagenMimeType = imagenMimeType ?? null;
  }

  get modelo() {
    return this.#modelo;
  }

  set modelo(modelo) {
    this.#modelo = modelo;
  }

  get arquitectura() {
    return this.#arquitectura;
  }

  set arquitectura(arquitectura) {
    this.#arquitectura = arquitectura;
  }

  get nucleos() {
    return this.#nucleos;
  }

  set nucleos(nucleos) {
    this.#nucleos = Number(nucleos);
  }

  get precio() {
    return this.#precio;
  }

  set precio(precio) {
    this.#precio = Number(precio);
  }

  get frecuenciaGhz() {
    return this.#frecuenciaGhz;
  }

  set frecuenciaGhz(frecuenciaGhz) {
    this.#frecuenciaGhz =
      frecuenciaGhz === null || frecuenciaGhz === undefined
        ? null
        : Number(frecuenciaGhz);
  }

  obtenerResumen() {
    return `${super.obtenerResumen()} | ${this.modelo} | ${this.nucleos} núcleos`;
  }
}

export default Procesador;
