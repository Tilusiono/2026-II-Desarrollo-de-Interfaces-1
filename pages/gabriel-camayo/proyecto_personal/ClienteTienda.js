class ClienteTienda extends Persona {
    esVip;
    #puntosFidelidad;
    #nivel;
    #ultimaCompra;

    constructor(id, codigoRef, nombre, documento, contacto, puntosFidelidad, nivel, ultimaCompra, esVip = false) {
        super(id, codigoRef, nombre, documento, contacto);
        this.#puntosFidelidad = puntosFidelidad;
        this.#nivel = nivel;
        this.#ultimaCompra = ultimaCompra;
        this.esVip = esVip;
    }

    #calcularPuntosRestantes(gasto) {
        return this.#puntosFidelidad - gasto;
    }

    #actualizarNivel() {
        if (this.#puntosFidelidad > 500) this.#nivel = "Oro";
    }

    canjearPuntos(cantidad) {
        this.#puntosFidelidad = this.#calcularPuntosRestantes(cantidad);
        this.#actualizarNivel();
        return `Puntos canjeados. Saldo: ${this.#puntosFidelidad} | Nivel: ${this.#nivel}`;
    }

    obtenerDetalles() { 
        return `Cliente VIP: ${this.esVip} | Puntos: ${this.#puntosFidelidad}`;
    }
}