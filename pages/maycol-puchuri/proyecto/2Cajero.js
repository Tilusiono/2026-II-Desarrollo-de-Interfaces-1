// CLASE 2: Cajero
// ==========================================
class Cajero {
  #id;
  #nombre;
  #cajaAsignada;
  #turno;

  constructor(id, nombre, cajaAsignada, turno) {
    this.#id = id;
    this.#nombre = nombre;
    this.#cajaAsignada = cajaAsignada;
    this.#turno = turno;
  }

  get id() { return this.#id; }
  set id(nuevoId) { this.#id = nuevoId; }

  get nombre() { return this.#nombre; }
  set nombre(nuevoNombre) { this.#nombre = nuevoNombre; }

  get cajaAsignada() { return this.#cajaAsignada; }
  set cajaAsignada(nuevaCaja) { this.#cajaAsignada = nuevaCaja; }

  get turno() { return this.#turno; }
  set turno(nuevoTurno) { this.#turno = nuevoTurno; }
}