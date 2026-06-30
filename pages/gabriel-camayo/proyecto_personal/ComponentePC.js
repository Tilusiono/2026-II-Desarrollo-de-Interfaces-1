class ComponentePC extends Articulo {
    esCompatibleMac;
    #tdp;
    #socket;
    #frecuencia;

    constructor(id, codigoRef, nombreArticulo, precioBase, stockActual, tdp, socket, frecuencia, esCompatibleMac = false) {
        super(id, codigoRef, nombreArticulo, precioBase, stockActual);
        this.#tdp = tdp;
        this.#socket = socket;
        this.#frecuencia = frecuencia;
        this.esCompatibleMac = esCompatibleMac;
    }

    #evaluarTemperatura() {
        return this.#tdp > 100 ? "Requiere refrigeración líquida" : "Disipador de aire suficiente";
    }

    #validarSocket(placaBase) {
        return this.#socket === placaBase;
    }

    testearRendimiento(placaBase) {
        const temp = this.#evaluarTemperatura();
        const compatible = this.#validarSocket(placaBase);
        return compatible ? `Rendimiento óptimo a ${this.#frecuencia}MHz. ${temp}` : "Error de compatibilidad";
    }

    obtenerDetalles() { 
        return `Componente PC | Socket: ${this.#socket} | Mac Compatible: ${this.esCompatibleMac}`;
    }
}