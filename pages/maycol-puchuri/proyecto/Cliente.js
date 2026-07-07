// ==========================================
// CLASE 1: Cliente
// Representa a la persona que realiza la compra.
// ==========================================
class Cliente {
    #id;
    #nombre;
    #documento; // DNI, RUC, etc.
    #email;

    constructor(id, nombre, documento, email) {
        this.#id = id;
        this.#nombre = nombre;
        this.#documento = documento;
        this.#email = email;
    }

    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get documento() { return this.#documento; }
    get email() { return this.#email; }
}
