export class Precio {

    descuento;

    #precioCompra;
    #precioVenta;
    #precioFinal;

    constructor(precioCompra, precioVenta, descuento, precioFinal) {

        this.descuento = descuento;
        this.#precioCompra = precioCompra;
        this.#precioVenta = precioVenta;
        this.#precioFinal = precioFinal;
    }

    mostrarDatos() {
        console.log(this.#precioVenta);
    }

    calcularPrecio() {
        console.log(this.#precioFinal);
    }
}