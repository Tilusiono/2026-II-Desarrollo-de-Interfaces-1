import Periferico from './Periferico.js';

class Teclado extends Periferico {
    esMecanico;
    #tipoSwitch;
    #formato;
    #idioma;

    constructor(id, nombre, precioBase, tipoConexion, color, rgb, inalambrico, tipoSwitch, formato, idioma, esMecanico = true) {
        super(id, nombre, precioBase, tipoConexion, color, rgb, inalambrico);
        this.#tipoSwitch = tipoSwitch;
        this.#formato = formato;
        this.#idioma = idioma;
        this.esMecanico = esMecanico;
    }

    #evaluarRuido() {
        return this.#tipoSwitch === "Blue" ? "Muy ruidoso" : "Silencioso";
    }

    #validarDistribucion() {
        return this.#idioma === "ES" ? "Tiene la letra Ñ" : "Distribución en Inglés";
    }

    testearTeclas() {
        const ruido = this.#evaluarRuido();
        return `Switch ${this.#tipoSwitch} testeado. Nivel: ${ruido}`;
    }

    obtenerDetalles() {
        return `Teclado ${this.#formato} | Mecánico: ${this.esMecanico} | ${this.#validarDistribucion()}`;
    }
}

export default Teclado