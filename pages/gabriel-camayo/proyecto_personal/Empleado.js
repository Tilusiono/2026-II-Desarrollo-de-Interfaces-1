import Persona from './Persona.js';

class Empleado extends Persona {
    turno;
    #salario;
    #cargo;
    #activo;

    constructor(id, nombre, documento, salario, cargo, activo = true, turno = "Mañana") {
        super(id, nombre, documento);
        this.#salario = salario;
        this.#cargo = cargo;
        this.#activo = activo;
        this.turno = turno;
    }

    #calcularBonoMensual() {
        return this.#salario * 0.05;
    }

    #verificarEstado() {
        return this.#activo ? "En planilla" : "Cesado";
    }

    generarBoleta() {
        const total = this.#salario + this.#calcularBonoMensual();
        return `Pago para ${this.#cargo}: S/${total} - Estado: ${this.#verificarEstado()}`;
    }

    obtenerDetalles() {
        return `Empleado [${this.#cargo}] - Turno ${this.turno}`;
    }
}

export default Empleado