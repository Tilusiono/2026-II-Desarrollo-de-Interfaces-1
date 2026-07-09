import { Persona } from "./Persona.js";

export class Cliente extends Persona {

    nombreCompleto;

    #numeroDNI;
    #telefono;
    #direccion;

    constructor(nombre, dni, telefono, direccion) {

        super(nombre, dni, telefono, direccion);

        this.nombreCompleto = nombre;
        this.#numeroDNI = dni;
        this.#telefono = telefono;
        this.#direccion = direccion;
    }

    get numeroDNI() {
        return this.#numeroDNI;
    }

    set numeroDNI(valor) {
        this.#numeroDNI = valor;
    }

    mostrarDatos() {
        console.log("Cliente:", this.nombreCompleto);
    }

    comprar() {
        console.log("Compra realizada");
    }
}