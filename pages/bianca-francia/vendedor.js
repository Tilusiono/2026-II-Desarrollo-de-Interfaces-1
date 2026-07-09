import { Persona } from "./Persona.js";

export class Vendedor extends Persona {

    numeroCaja;

    #codigoVendedor;
    #turno;
    #ventas;

    constructor(nombre, numeroCaja, codigoVendedor, turno) {

        super(nombre, codigoVendedor, "", "");

        this.numeroCaja = numeroCaja;
        this.#codigoVendedor = codigoVendedor;
        this.#turno = turno;
        this.#ventas = 0;
    }

    get turno() {
        return this.#turno;
    }

    set turno(valor) {
        this.#turno = valor;
    }

    mostrarDatos() {
        console.log("Vendedor:", this.nombre);
    }

    vender() {
        this.#ventas++;
    }
}