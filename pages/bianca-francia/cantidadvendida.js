export class CantidadVendida {

    unidadMedida;

    #cantidad;
    #subtotal;
    #fechaRegistro;

    constructor(cantidad, unidadMedida, subtotal, fechaRegistro) {

        this.unidadMedida = unidadMedida;
        this.#cantidad = cantidad;
        this.#subtotal = subtotal;
        this.#fechaRegistro = fechaRegistro;
    }

    mostrarDatos() {
        console.log(this.#cantidad);
    }

    calcularSubtotal() {
        console.log(this.#subtotal);
    }
}