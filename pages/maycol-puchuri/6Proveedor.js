// CLASE 6: Proveedor
// ==========================================
class Proveedor {
  #id;
  #razonSocial;
  #ruc;
  #telefono;

  constructor(id, razonSocial, ruc, telefono) {
    this.#id = id;
    this.#razonSocial = razonSocial;
    this.#ruc = ruc;
    this.#telefono = telefono;
  }

  get id() { return this.#id; }
  set id(nuevoId) { this.#id = nuevoId; }

  get razonSocial() { return this.#razonSocial; }
  set razonSocial(nuevaRazon) { this.#razonSocial = nuevaRazon; }

  get ruc() { return this.#ruc; }
  set ruc(nuevoRuc) { this.#ruc = nuevoRuc; }

  get telefono() { return this.#telefono; }
  set telefono(nuevoTelefono) { this.#telefono = nuevoTelefono; }
}
