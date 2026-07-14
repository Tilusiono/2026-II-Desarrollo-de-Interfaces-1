import Producto from "./Producto.js";


// ---------
// POSTRE 
// ---------
class Postre extends Producto {
    constructor(id, nombre, precio, stock, disponible, tamano, tipo) {
        super(id, nombre, precio, stock, disponible);

        this.tamano = tamano; // chico, mediano, grande
        this.tipo = tipo;     // caliente o fría
    }
     

    obtenerInfo() {
        return `${this.nombre} (${this.tamano}) - ${this.tipo} - S/ ${this.precio}`;
    }

    // PRIVADO

    #validarTamano(tamano) {
    return ["Chico", "Mediano", "Grande"].includes(tamano);
    }

    #validarTipo(tipo) {
    return ["Caliente", "Fría"].includes(tipo);
    }
}