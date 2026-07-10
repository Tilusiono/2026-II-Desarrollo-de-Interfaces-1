// ---------
// PRODUCTO
// ---------
class Producto extends Categoria {
    #iditem;
    #stock;
    #disponible;

    constructor(iditem, nombre,descripcion, precio, stock, disponible) {
        super(nombre, descripcion);

        this.#iditem = iditem;
        this.precio = precio;
        this.#stock = stock;
        this.#disponible = disponible;
    }

    getId() {
        return this.#iditem;
    }

    getStock() {
        return this.#stock;
    }

    getDisponible() {
        return this.#disponible;
    }
    
    setDisponible(estado) {
        this.#disponible = estado;
    }

    obtenerInfo() {
        return `${this.nombre} - S/ ${this.precio}`;
    }

    // PRIVADA
    #validarNombre(nombre) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre);
    }

    #actualizarDisponibilidad() {
    this.#disponible = this.#stock > 0;
    }
}
