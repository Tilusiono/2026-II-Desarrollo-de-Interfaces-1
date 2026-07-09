export class TotalVenta {

    descuento;

    #subtotal;
    #impuesto;
    #totalPagar;

    constructor(subtotal, impuesto, descuento, totalPagar) {

        this.descuento = descuento;
        this.#subtotal = subtotal;
        this.#impuesto = impuesto;
        this.#totalPagar = totalPagar;
    }

    mostrarDatos() {
        console.log(this.#totalPagar);
    }

    calcularTotal() {
        console.log(this.#subtotal + this.#impuesto - this.descuento);
    }
}