class Calificacion {
    #alumnoId;
    #materiaId;
    #nota;
    #fecha;

    constructor(alumnoId, materiaId, nota, fecha) {
        this.#alumnoId = alumnoId;
        this.#materiaId = materiaId;
        this.#nota = nota;
        this.#fecha = fecha;
    }

    mostrarDatos() {
        return `
        Calificación:
        Alumno ID: ${this.#alumnoId}
        Materia ID: ${this.#materiaId}
        Nota: ${this.#nota}
        Fecha: ${this.#fecha.toLocaleDateString()}
        `;
    }

    getAlumnoId() {
        return this.#alumnoId;
    }

    getMateriaId() {
        return this.#materiaId;
    }

    getNota() {
        return this.#nota;
    }

    setNota(nuevaNota) {
        this.#nota = nuevaNota;
    }

    getFecha() {
        return this.#fecha;
    }
}

export default Calificacion;
