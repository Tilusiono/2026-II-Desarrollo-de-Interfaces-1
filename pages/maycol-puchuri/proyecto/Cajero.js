// ==========================================
// CLASE : Cajero
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
    get nombre() { return this.#nombre; }
    get cajaAsignada() { return this.#cajaAsignada; }
    get turno() { return this.#turno; }
}