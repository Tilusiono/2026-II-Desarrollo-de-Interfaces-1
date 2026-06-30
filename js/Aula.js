class Aula {
    #numero;
    #capacidad;
    #edificio;
    #piso;

    constructor(numero, capacidad, edificio, piso) {
        this.#numero = numero;
        this.#capacidad = capacidad;
        this.#edificio = edificio;
        this.#piso = piso;
    }

    mostrarDatos() {
        return `
        Aula: ${this.#numero}
        Capacidad: ${this.#capacidad}
        Edificio: ${this.#edificio}
        Piso: ${this.#piso}
        `;
    }

    getNumero() {
        return this.#numero;
    }

    getCapacidad() {
        return this.#capacidad;
    }

    getEdificio() {
        return this.#edificio;
    }

    getPiso() {
        return this.#piso;
    }
}

export default Aula;
