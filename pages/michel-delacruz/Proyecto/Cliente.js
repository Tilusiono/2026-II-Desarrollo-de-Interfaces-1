import Persona from "./Persona.js";

// ---------
// CLIENTE
// ---------
class Cliente extends Persona {
    #compras;
    #totalGastado;

    constructor(nombre, apellido_paterno, apellido_materno, correo, telefono, direccion) {
        super(nombre,apellido_paterno,apellido_materno);

        this.apellido_paterno = apellido_paterno;
        this.apellido_materno = apellido_materno;
        this.correo = correo;
        this.telefono = telefono;
        this.direccion = direccion;

        this.#compras = [];
        this.#totalGastado = 0;
    }

    getCompras() {
        return this.#compras;
    }

    getTotalGastado() {
        return this.#totalGastado;
    }

   agregarCompra(compra) {
    this.#compras.push(compra);
    this.#actualizarTotalGastado(compra);
    }

    obtenerDatos() {
        return `Cliente: ${this.nombre} - ${this.correo}`;
    }


    // PRIVADO

    #validarCorreo(correo) {
    return correo.includes("@") && correo.includes(".");
    }

    #actualizarTotalGastado(compra) {
    this.#totalGastado += compra.calcularTotal();
    }
}
