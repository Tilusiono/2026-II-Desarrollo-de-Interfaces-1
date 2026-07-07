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
    get nombre() { return this.#nombre; }
    get direccion() { return this.#direccion; }
}
