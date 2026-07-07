import Articulo from './Articulo.js';

class ComponentePC extends Articulo {
    compatibleMac;
    #tdp;
    #socket;
    #frecuencia;

    constructor(id, nombre, precioBase, tdp, socket, frecuencia, compatibleMac = false) {
        super(id, nombre, precioBase);
        this.#tdp = tdp;
        this.#socket = socket;
        this.#frecuencia = frecuencia;
        this.compatibleMac = compatibleMac;
    }

    #evaluarTemperatura() {
        return this.#tdp > 100 ? "Requiere líquida" : "Disipador stock";
    }

    #validarSocket(placa) {
        return this.#socket === placa;
    }

    testearRendimiento(placa) {
        const temp = this.#evaluarTemperatura();
        return this.#validarSocket(placa) ? `Óptimo a ${this.#frecuencia}MHz - ${temp}` : "No compatible";
    }

    obtenerDetalles() {
        return `Componente [Socket ${this.#socket}] - Mac: ${this.compatibleMac}`;
    }
}

export default ComponentePC