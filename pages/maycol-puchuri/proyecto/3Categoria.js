// CLASE 3: Categoria
// ==========================================
class Categoria {
  #id;
  #nombre;
  #descripcion;

  constructor(id, nombre, descripcion) {
    this.#id = id;
    this.#nombre = nombre;
    this.#descripcion = descripcion;
  }

  get id() { return this.#id; }
  set id(nuevoId) { this.#id = nuevoId; }

  get nombre() { return this.#nombre; }
  set nombre(nuevoNombre) { this.#nombre = nuevoNombre; }

  get descripcion() { return this.#descripcion; }
  set descripcion(nuevaDescripcion) { this.#descripcion = nuevaDescripcion; }
}