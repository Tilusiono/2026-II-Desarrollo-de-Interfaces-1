import { Vendedor } from "./Vendedor.js";

export class Supervisor extends Vendedor {

    zona;

    #nivel;
    #bono;
    #area;

    constructor(nombre, caja, codigo, turno, zona, nivel) {

        super(nombre, caja, codigo, turno);

        this.zona = zona;
        this.#nivel = nivel;
        this.#bono = 500;
        this.#area = "Ventas";
    }

    mostrarDatos() {
        console.log("Supervisor:", this.nombre);
    }

    supervisar() {
        console.log("Supervisando");
    }
}