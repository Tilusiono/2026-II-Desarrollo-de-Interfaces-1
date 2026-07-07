import Persona from './Persona.js';

class Cliente extends Persona {
    suscritoBoletin;
    #puntosFidelidad;
    #nivel;
    #ultimaCompra;

    constructor(id, nombre, documento, puntos, nivel, ultimaCompra, suscrito = false) {
        super(id, nombre, documento);
        this.#puntosFidelidad = puntos;
        this.#nivel = nivel;
        this.#ultimaCompra = ultimaCompra;
        this.suscritoBoletin = suscrito;
    }

    #calcularPuntosRestantes(gasto) {
        return this.#puntosFidelidad - gasto;
    }

    #actualizarNivel() {
        if (this.#puntosFidelidad > 1000) this.#nivel = "Diamante";
    }

    canjearRecompensa(costoPuntos) {
        this.#puntosFidelidad = this.#calcularPuntosRestantes(costoPuntos);
        this.#actualizarNivel();
        return `Recompensa canjeada. Puntos actuales: ${this.#puntosFidelidad}`;
    }

    obtenerDetalles() {
        return `Cliente Nivel ${this.#nivel} | Suscrito: ${this.suscritoBoletin}`;
    }
}

export default Cliente