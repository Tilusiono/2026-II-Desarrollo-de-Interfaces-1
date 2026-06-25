class Asistencia {
    #alumnoId;
    #fecha;
    #estado;
    #observaciones;

    constructor(alumnoId, fecha, estado, observaciones) {
        this.#alumnoId = alumnoId;
        this.#fecha = fecha;
        this.#estado = estado;
        this.#observaciones = observaciones;
    }

    mostrarDatos() {
        return `
        Asistencia:
        Alumno ID: ${this.#alumnoId}
        Fecha: ${this.#fecha.toLocaleDateString()}
        Estado: ${this.#estado}
        Observaciones: ${this.#observaciones}
        `;
    }

    getAlumnoId() {
        return this.#alumnoId;
    }

    getFecha() {
        return this.#fecha;
    }

    getEstado() {
        return this.#estado;
    }

    setEstado(nuevoEstado) {
        this.#estado = nuevoEstado;
    }

    getObservaciones() {
        return this.#observaciones;
    }
}

export default Asistencia;
