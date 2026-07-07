class Articulo {
    fechaRegistro;
    #id;
    #nombre;
    #precioBase;

    constructor(id, nombre, precioBase, fechaRegistro = new Date()) {
        if (new.target === Articulo) {
            throw new Error("Abstracción: Articulo no se puede instanciar directamente.");
        }
        if (typeof id !== "number") throw new Error("ID debe ser number");
        
        this.#id = id;
        this.#nombre = nombre;
        this.#precioBase = precioBase;
        this.fechaRegistro = fechaRegistro;
    }

    #calcularIGV() {
        return this.#precioBase * 0.18;
    }

    #validarPrecioVenta() {
        return this.#precioBase > 0;
    }

    calcularPrecioFinal() {
        if (!this.#validarPrecioVenta()) throw new Error("Precio inválido");
        return this.#precioBase + this.#calcularIGV();
    }

    obtenerDetalles() {
        throw new Error("Polimorfismo: Debe implementarse en la clase hija.");
    }
}

 export default Articulo