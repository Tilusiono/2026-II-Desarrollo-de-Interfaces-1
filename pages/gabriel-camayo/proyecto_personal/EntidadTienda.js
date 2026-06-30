class EntidadTienda {
    fechaCreacion;
    #id;
    #codigoRef;
    #estado;

    constructor(id, codigoRef, estado = "Activo", fechaCreacion = new Date()) {
        if (new.target === EntidadTienda) {
            throw new Error("Abstracción: EntidadTienda es una clase abstracta y no puede ser instanciada.");
        }
        if (typeof id !== "number") throw new Error("ID debe ser number");
        if (typeof codigoRef !== "string") throw new Error("Código debe ser string");

        this.#id = id;
        this.#codigoRef = codigoRef;
        this.#estado = estado;
        this.fechaCreacion = fechaCreacion;
    }

    #generarHashInterno() {
        return `HASH-${this.#id}-${this.#codigoRef}`;
    }

    #validarEstadoInterno() {
        return this.#estado === "Activo";
    }

    auditarEntidad() {
        const estadoValidado = this.#validarEstadoInterno();
        return `Auditoría: ${this.#generarHashInterno()} - Activo: ${estadoValidado}`;
    }

    obtenerDetalles() {
        throw new Error("Este método debe ser implementado por las clases hijas.");
    }
}