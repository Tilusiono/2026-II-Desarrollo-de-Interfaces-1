class Evaluacion {
    #nombre;
    #tipo;
    #porcentaje;
    #fecha;

    constructor(nombre, tipo, porcentaje, fecha) {
        this.#nombre = nombre;
        this.#tipo = tipo;
        this.#porcentaje = porcentaje;
        this.#fecha = fecha;
    }

    mostrarDatos() {
        return `
        Evaluación: ${this.#nombre}
        Tipo: ${this.#tipo}
        Porcentaje: ${this.#porcentaje}%
        Fecha: ${this.#fecha.toLocaleDateString()}
        `;
    }

    getNombre() {
        return this.#nombre;
    }

    getTipo() {
        return this.#tipo;
    }

    getPorcentaje() {
        return this.#porcentaje;
    }

    getFecha() {
        return this.#fecha;
    }
}

export default Evaluacion;
