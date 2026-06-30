class Curso {
    #nombre;
    #codigo;
    #cupo;
    #horario;

    constructor(nombre, codigo, cupo, horario) {
        this.#nombre = nombre;
        this.#codigo = codigo;
        this.#cupo = cupo;
        this.#horario = horario;
    }

    mostrarDatos() {
        return `
        Curso: ${this.#nombre}
        Código: ${this.#codigo}
        Cupo: ${this.#cupo}
        Horario: ${this.#horario}
        `;
    }

    getNombre() {
        return this.#nombre;
    }

    getCodigo() {
        return this.#codigo;
    }

    getCupo() {
        return this.#cupo;
    }

    getHorario() {
        return this.#horario;
    }

    setCupo(nuevoCupo) {
        this.#cupo = nuevoCupo;
    }
}

export default Curso;
