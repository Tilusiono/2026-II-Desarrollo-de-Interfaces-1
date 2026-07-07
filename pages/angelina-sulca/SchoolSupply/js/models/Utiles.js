// ============================================
// CLASE HIJO 3: Utiles (hereda de escolar)
// ============================================

import { escolar } from './escolar.js';

export class Utiles extends escolar {
    color;
    material;
    uso;
    enOferta;
    #tipoUtiles;

    constructor(id, nombre, marca, precioUnitario, precioDocena, stock,
                grado, materia, nivel, color, material, uso, enOferta = false) {
        super(id, nombre, marca, precioUnitario, precioDocena, stock, grado, materia, nivel);
        this.color = color;
        this.material = material;
        this.uso = uso;
        this.enOferta = enOferta;
        this.#tipoUtiles = "Utiles";
    }

    get tipoUtiles() {
        return this.#tipoUtiles;
    }

    set color(nuevoColor) {
        this.color = nuevoColor;
    }

    obtenerInfo() {
        return super.obtenerInfo() + " - " + this.color + " (" + this.material + ")";
    }

    obtenerTipo() {
        return "Utiles";
    }

    obtenerDescripcion() {
        return "Útiles: " + this.nombre + " - " + this.color;
    }

    #validarMaterial() {
        let materialesValidos = ["Plástico", "Madera", "Metal", "Tela"];
        for (let i = 0; i < materialesValidos.length; i++) {
            if (materialesValidos[i] === this.material) {
                return true;
            }
        }
        return false;
    }
}