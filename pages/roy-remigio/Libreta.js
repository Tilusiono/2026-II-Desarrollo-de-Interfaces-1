class Libreta {
    #alumnoId;
    #anio;
    #ciclo;
    #estado;

    constructor(alumnoId, anio, ciclo, estado) {
        this.#alumnoId = alumnoId;
        this.#anio = anio;
        this.#ciclo = ciclo;
        this.#estado = estado;
    }

    mostrarDatos() {
        return `
        Libreta:
        Alumno ID: ${this.#alumnoId}
        Año: ${this.#anio}
        Ciclo: ${this.#ciclo}
        Estado: ${this.#estado}
        `;
    }

    getAlumnoId() {
        return this.#alumnoId;
    }

    getAnio() {
        return this.#anio;
    }

    getCiclo() {
        return this.#ciclo;
    }

    getEstado() {
        return this.#estado;
    }

    setEstado(nuevoEstado) {
        this.#estado = nuevoEstado;
    }
}

export default Libreta;
