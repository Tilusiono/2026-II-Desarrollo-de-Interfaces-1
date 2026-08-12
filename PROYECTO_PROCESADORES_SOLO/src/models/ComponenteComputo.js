export default class ComponenteComputo {
  #id;
  #codigo;
  #descripcion;
  #registro;
  #fechaHoraRegistro;

  constructor(id, codigo, descripcion, registro, fechaHoraRegistro) {
    this.#id = Number(id);
    this.#codigo = codigo;
    this.#descripcion = descripcion ?? null;
    this.#registro = Boolean(registro);
    this.#fechaHoraRegistro = fechaHoraRegistro;
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

  get descripcion() {
    return this.#descripcion;
  }

  set descripcion(descripcion) {
    this.#descripcion = descripcion ?? null;
  }

  get registro() {
    return this.#registro;
  }

  set registro(registro) {
    this.#registro = Boolean(registro);
  }

  get fechaHoraRegistro() {
    return this.#fechaHoraRegistro;
  }

  set fechaHoraRegistro(fechaHoraRegistro) {
    this.#fechaHoraRegistro = fechaHoraRegistro;
  }

  obtenerResumen() {
    return `${this.codigo} - ${this.descripcion ?? "Sin descripción"}`;
  }
}
