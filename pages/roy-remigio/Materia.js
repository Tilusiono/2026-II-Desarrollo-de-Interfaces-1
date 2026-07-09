class Materia {
    #nombre;
    #codigo;
    #creditos;
    #nivel;

    constructor(nombre, codigo, creditos, nivel) {
        this.#nombre = nombre;
        this.#codigo = codigo;
        this.#creditos = creditos;
        this.#nivel = nivel;
    }

    mostrarDatos() {
        return `
        Materia: ${this.#nombre}
        Código: ${this.#codigo}
        Créditos: ${this.#creditos}
        Nivel: ${this.#nivel}
        `;
    }

    getNombre() {
        return this.#nombre;
    }

    getCodigo() {
        return this.#codigo;
    }

    getCreditos() {
        return this.#creditos;
    }

    getNivel() {
        return this.#nivel;
    }
}

export default Materia;
