


// factura

class Factura {
    #numero;
    #igv;
    #fecha;
    #compra;


    constructor(numero, compra, igv, fecha) {
        this.#compra = compra;      

        this.#numero = numero;     // Privada
        this.#igv = igv;           // Privada
        this.fecha = fecha;       
    }

    // Getters
    getNumero() {
        return this.#numero;
    }

    getIGV() {
        return this.#igv;
    }

    getCompra() {
        return this.#compra;
    }

    // Métodos privados
    #calcularSubtotal() {
        return this.#compra.calcularTotal() / (1 + this.#igv);
    }

    #calcularIGV() {
        return this.#compra.calcularTotal() - this.#calcularSubtotal();
    }

    // cuenta productos facturados
    contarProductosFacturados() {
    let cantidad = 0;

    for (let i = 0; i < this.#compra.productos.length; i++) {
        cantidad++;
    }

    return cantidad;
}




   obtenerFactura() {
    return `
Factura N°: ${this.#numero}
Fecha: ${this.#fecha}
Cantidad de productos: ${this.contarProductosFacturados()}
Total: S/ ${this.#compra.calcularTotal().toFixed(2)}
IGV: S/ ${this.#calcularIGV().toFixed(2)}
`;
}
}