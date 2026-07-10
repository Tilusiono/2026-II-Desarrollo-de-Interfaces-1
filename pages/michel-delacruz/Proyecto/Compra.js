

// ---------
// COMPRA
// ---------
class Compra {
    constructor(id, cliente) {
        this.id = id;
        this.#cliente = cliente;
        this.productos = [];
        this.total = 0;
        this.#fecha = new Date();
    }

    agregarProducto(producto) {
        this.productos.push(producto);
        this.total += producto.precio;
    }

    calcularTotal() {
        return this.total;
    }

    // PRIVADO
    #calcularSubtotal() {
    let subtotal = 0;

    this.productos.forEach(producto => {
        subtotal += producto.precio;
    });

    return subtotal;

    }

    #actualizarTotal() {
    this.total = this.#calcularSubtotal();
    }
}