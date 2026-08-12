import { Persona } from "./Persona.js";

export class Empleado extends Persona {

    #idEmpleado;
    #fechaIngreso;
    #salario;
    #estado;
    #idTipoEmpleado;
    #idCargo;
    #idArea;
    #idSede;

    constructor(
        idEmpleado,
        dni,
        nombres,
        apellidos,
        telefono,
        correo,
        direccion,
        fechaIngreso,
        salario,
        estado,
        idTipoEmpleado,
        idCargo,
        idArea,
        idSede
    ) {

        super(
            dni,
            nombres,
            apellidos,
            telefono,
            correo,
            direccion
        );

        this.#idEmpleado = idEmpleado;
        this.#fechaIngreso = fechaIngreso;
        this.#salario = salario;
        this.#estado = estado;
        this.#idTipoEmpleado = idTipoEmpleado;
        this.#idCargo = idCargo;
        this.#idArea = idArea;
        this.#idSede = idSede;

    }

    // Getters

    getIdEmpleado() {
        return this.#idEmpleado;
    }

    getFechaIngreso() {
        return this.#fechaIngreso;
    }

    getSalario() {
        return this.#salario;
    }

    getEstado() {
        return this.#estado;
    }

    getIdTipoEmpleado() {
        return this.#idTipoEmpleado;
    }

    getIdCargo() {
        return this.#idCargo;
    }

    getIdArea() {
        return this.#idArea;
    }

    getIdSede() {
        return this.#idSede;
    }

    // Setters

    setFechaIngreso(fechaIngreso) {
        this.#fechaIngreso = fechaIngreso;
    }

    setSalario(salario) {
        this.#salario = salario;
    }

    setEstado(estado) {
        this.#estado = estado;
    }

    setIdTipoEmpleado(idTipoEmpleado) {
        this.#idTipoEmpleado = idTipoEmpleado;
    }

    setIdCargo(idCargo) {
        this.#idCargo = idCargo;
    }

    setIdArea(idArea) {
        this.#idArea = idArea;
    }

    setIdSede(idSede) {
        this.#idSede = idSede;
    }

    mostrarDatos() {
        return `
${super.mostrarDatos()}
ID Empleado: ${this.#idEmpleado}
Fecha de ingreso: ${this.#fechaIngreso}
Salario: ${this.#salario}
Estado: ${this.#estado}
`;
    }

}