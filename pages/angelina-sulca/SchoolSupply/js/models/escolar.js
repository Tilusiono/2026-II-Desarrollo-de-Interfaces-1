// ============================================
// CLASE HIJO 1: escolar (hereda de producto)
// ============================================

import { producto } from './producto.js';

export class escolar extends producto {
    grado;
    materia;
    nivel;
    #tipoEscolar;

    constructor(id, nombre, marca, precioUnitario, precioDocena, stock, grado, materia, nivel) {
        super(id, nombre, marca, precioUnitario, precioDocena, stock);
        this.grado = grado;
        this.materia = materia;
        this.nivel = nivel;
        this.#tipoEscolar = "Escolar";
    }

    get tipoEscolar() {
        return this.#tipoEscolar;
    }

    set grado(nuevoGrado) {
        this.grado = nuevoGrado;
    }

    obtenerInfo() {
        return super.obtenerInfo() + " - " + this.nivel + " - " + this.materia;
    }

    obtenerTipo() {
        return "Escolar";
    }

    obtenerDescripcion() {
        return "Producto Escolar: " + this.nombre + " (" + this.nivel + ")";
    }

    #validarGrado() {
        return this.grado > 0 && this.grado <= 11;
    }
}