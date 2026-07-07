class Persona {
    nacionalidad;
    #id;
    #nombre;
    #documento;

    constructor(id, nombre, documento, nacionalidad = "Peruana") {
        if (new.target === Persona) {
            throw new Error("Abstracción: Persona no se puede instanciar.");
        }
        this.#id = id;
        this.#nombre = nombre;
        this.#documento = documento;
        this.nacionalidad = nacionalidad;
    }

    #esDocumentoValido() {
        return this.#documento.length >= 8;
    }

    #formatearNombre() {
        return this.#nombre.toUpperCase();
    }

    verificarIdentidad() {
        const valido = this.#esDocumentoValido();
        return `Usuario ${this.#formatearNombre()} - DNI válido: ${valido}`;
    }

    obtenerDetalles() {
        throw new Error("Polimorfismo: Debe implementarse en la clase hija.");
    }
}

export default Persona