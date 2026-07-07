import ComponentePC from './ComponentePC.js';

class Procesador extends ComponentePC {
    incluyeGraficos; // 1 variable pública
    #nucleos;        // 3 variables privadas
    #hilos;
    #arquitectura;

    constructor(id, nombre, precioBase, tdp, socket, frecuencia, compatibleMac, nucleos, hilos, arquitectura, incluyeGraficos = false) {
        // Llama al constructor de ComponentePC
        super(id, nombre, precioBase, tdp, socket, frecuencia, compatibleMac);
        this.#nucleos = nucleos;
        this.#hilos = hilos;
        this.#arquitectura = arquitectura;
        this.incluyeGraficos = incluyeGraficos;
    }

    // 2 métodos privados
    #evaluarMultitarea() {
        return this.#hilos >= 12 ? "Multitarea Extrema" : "Multitarea Básica";
    }

    #verificarGeneracion() {
        return this.#arquitectura.includes("Zen") ? "Arquitectura AMD" : "Arquitectura Intel";
    }

    // 2 métodos públicos
    mostrarRendimiento() {
        const multitarea = this.#evaluarMultitarea();
        const gen = this.#verificarGeneracion();
        return `Procesador de ${this.#nucleos} núcleos (${gen}) - Capacidad: ${multitarea}`;
    }

    obtenerDetalles() { // Polimorfismo
        return `CPU: ${this.#nucleos} Cores / ${this.#hilos} Threads | Gráficos Integrados: ${this.incluyeGraficos}`;
    }
}

export default Procesador