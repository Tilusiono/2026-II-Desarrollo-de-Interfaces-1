// CLASE 10: Tienda
// ==========================================
class Tienda {
  #id;
  #nombre;
  #direccion;

  constructor(id, nombre, direccion) {
    this.#id = id;
    this.#nombre = nombre;
    this.#direccion = direccion;
  }

  get id() { return this.#id; }
  set id(nuevoId) { this.#id = nuevoId; }

  get nombre() { return this.#nombre; }
  set nombre(nuevoNombre) { this.#nombre = nuevoNombre; }

  get direccion() { return this.#direccion; }
  set direccion(nuevaDireccion) { this.#direccion = nuevaDireccion; }
}
