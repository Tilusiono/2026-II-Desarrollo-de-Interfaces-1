class Persona extends EntidadTienda {
    nacionalidad;
    #nombre;
    #documento;
    #contacto;

    constructor(id, codigoRef, nombre, documento, contacto, nacionalidad = "Peruana") {
        super(id, codigoRef);
        if (typeof nombre !== "string") throw new Error("Nombre debe ser string");

        this.#nombre = nombre;
        this.#documento = documento;
        this.#contacto = contacto;
        this.nacionalidad = nacionalidad;
    }

    #esDocumentoValido() {
        return this.#documento.length >= 8;
    }

    #formatearContacto() {
        return `Contacto registrado: ${this.#contacto}`;
    }

    actualizarContactoBase(nuevoContacto) {
        if (typeof nuevoContacto === "string") this.#contacto = nuevoContacto;
        return this.#formatearContacto();
    }

    obtenerDetalles() { 
        return `Persona: ${this.#nombre} - Doc Válido: ${this.#esDocumentoValido()}`;
    }
}