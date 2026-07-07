import Articulo from './Articulo.js';

class Periferico extends Articulo {
    inalambrico;
    #tipoConexion;
    #color;
    #rgb;

    constructor(id, nombre, precioBase, tipoConexion, color, rgb, inalambrico = true) {
        super(id, nombre, precioBase);
        this.#tipoConexion = tipoConexion;
        this.#color = color;
        this.#rgb = rgb;
        this.inalambrico = inalambrico;
    }

    #validarConexion() {
        return this.inalambrico ? "Usa Batería" : "Usa Cable";
    }

    #consumoEnergia() {
        return this.#rgb ? "Consumo Alto" : "Consumo Bajo";
    }

    probarIluminacion() {
        const consumo = this.#consumoEnergia();
        return this.#rgb ? `RGB encendido (${consumo})` : "Sin RGB";
    }

    obtenerDetalles() {
        return `Periférico: ${this.#color} - Conexión: ${this.#validarConexion()}`;
    }
}

export default Periferico