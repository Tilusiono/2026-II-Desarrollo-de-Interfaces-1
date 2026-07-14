// ============================================
// CLASE: carrito (NO hereda)
// ============================================

export class carrito {
    #cantidadItems;
    #descuentoAplicado;

    items;
    metodoPago;
    total;
    subtotal;

    constructor(itm, metPag, tot, subTot) {
        this.items = Array.isArray(itm) ? itm : [];
        this.metodoPago = metPag;
        this.total = tot;
        this.subtotal = subTot;
        this.#cantidadItems = 0;
        this.#descuentoAplicado = 0;
    }

    getcantidadItems() {
        return this.#cantidadItems;
    }

    getdescuentoAplicado() {
        return this.#descuentoAplicado;
    }

    setmetodoPago(nuevoMetodo) {
        this.metodoPago = nuevoMetodo;
    }

    agregarItem(producto, cantidad) {
        let encontrado = null;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].producto.id === producto.id) {
                encontrado = this.items[i];
                break;
            }
        }
        if (encontrado !== null) {
            encontrado.cantidad = encontrado.cantidad + cantidad;
        } else {
            this.items.push({
                producto: producto,
                cantidad: cantidad
            });
        }
        this.#actualizarTotales();
        return this.items.length;
    }

    eliminarItem(id) {
        let nuevoCarrito = [];
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].producto.id !== id) {
                nuevoCarrito.push(this.items[i]);
            }
        }
        this.items = nuevoCarrito;
        this.#actualizarTotales();
        return this.items.length;
    }

    vaciar() {
        this.items = [];
        this.total = 0;
        this.subtotal = 0;
        this.#cantidadItems = 0;
        this.#descuentoAplicado = 0;
    }

    obtenerSubtotal() {
        return this.subtotal;
    }

    obtenerTotal() {
        return this.total;
    }

    estaVacio() {
        return this.items.length === 0;
    }

    cambiarPago(metodo) {
        this.metodoPago = metodo;
        return this.metodoPago;
    }

    obtenerPago() {
        return this.metodoPago;
    }

    aplicarDescuento() {
        this.#calcularDescuento();
        this.total = this.subtotal - this.#descuentoAplicado;
        return this.total;
    }

    #actualizarTotales() {
        let total = 0;
        let cantidad = 0;
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            cantidad = cantidad + item.cantidad;
            total = total + (item.producto.precioUnitario * item.cantidad);
        }
        this.#cantidadItems = cantidad;
        this.subtotal = total;
        this.total = total - this.#descuentoAplicado;
    }

    #calcularDescuento() {
        if (this.#cantidadItems >= 24) {
            this.#descuentoAplicado = this.subtotal * 0.15;
        } else if (this.#cantidadItems >= 12) {
            this.#descuentoAplicado = this.subtotal * 0.10;
        } else if (this.#cantidadItems >= 6) {
            this.#descuentoAplicado = this.subtotal * 0.05;
        } else {
            this.#descuentoAplicado = 0;
        }
        return this.#descuentoAplicado;
    }
}