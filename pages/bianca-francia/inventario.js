export class Inventario {

    ubicacion;

    #stockActual;
    #stockMinimo;
    #codigoProducto;

    constructor(codigoProducto, stockActual, stockMinimo, ubicacion) {

        this.ubicacion = ubicacion;
        this.#codigoProducto = codigoProducto;
        this.#stockActual = stockActual;
        this.#stockMinimo = stockMinimo;
    }

    actualizarStock(cantidad) {
        this.#stockActual += cantidad;
    }

    mostrarDatos() {
        console.log(this.ubicacion);
    }
}