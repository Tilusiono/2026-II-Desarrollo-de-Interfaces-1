class Cliente {
  #id;
  #nombre;
  #documento;
  #email;

  constructor(id, nombre, documento, email) {
    this.#id = id;
    this.#nombre = nombre;
    this.#documento = documento;
    this.#email = email;
  }

  get id() { return this.#id; }
  set id(nuevoId) { this.#id = nuevoId; }

  get nombre() { return this.#nombre; }
  set nombre(nuevoNombre) { this.#nombre = nuevoNombre; }

  get documento() { return this.#documento; }
  set documento(nuevoDocumento) { this.#documento = nuevoDocumento; }

  get email() { return this.#email; }
  set email(nuevoEmail) { this.#email = nuevoEmail; }
}
