import Empleado from './Empleado.js';

class Vendedor extends Empleado {
    comisionador;
    #zonaAsignada;
    #clientesAtendidos;
    #ventasConcretadas;

    constructor(id, nombre, documento, salario, cargo, activo, turno, zona, clientes, ventas, comisionador = true) {
        super(id, nombre, documento, salario, cargo, activo, turno);
        this.#zonaAsignada = zona;
        this.#clientesAtendidos = clientes;
        this.#ventasConcretadas = ventas;
        this.comisionador = comisionador;
    }

    #tasaConversion() {
        if (this.#clientesAtendidos === 0) return 0;
        return (this.#ventasConcretadas / this.#clientesAtendidos) * 100;
    }

    #evaluarMeta() {
        return this.#ventasConcretadas > 50 ? "Meta superada" : "Por debajo de la meta";
    }

    reportarProductividad() {
        const tasa = this.#tasaConversion();
        return `Tasa de conversión: ${tasa.toFixed(2)}% | ${this.#evaluarMeta()}`;
    }

    obtenerDetalles() {
        return `Vendedor de ${this.#zonaAsignada} | Comisionador: ${this.comisionador}`;
    }
}

export default Vendedor