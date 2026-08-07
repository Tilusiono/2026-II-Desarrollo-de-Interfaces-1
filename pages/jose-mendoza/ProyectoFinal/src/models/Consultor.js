import { Persona } from "./Persona.js";

export class Consultor extends Persona {

    #idConsultor;
    #especialidad;
    #empresa;
    #proyectoAsignado;
    #fechaInicioContrato;
    #fechaFinContrato;
    #honorarios;
    #modalidad;
    #estado;

    constructor(
        idConsultor,
        dni,
        nombres,
        apellidos,
        telefono,
        correo,
        direccion,
        especialidad,
        empresa,
        proyectoAsignado,
        fechaInicioContrato,
        fechaFinContrato,
        honorarios,
        modalidad,
        estado
    ) {

        super(
            dni,
            nombres,
            apellidos,
            telefono,
            correo,
            direccion
        );

        this.#idConsultor = idConsultor;
        this.#especialidad = especialidad;
        this.#empresa = empresa;
        this.#proyectoAsignado = proyectoAsignado;
        this.#fechaInicioContrato = fechaInicioContrato;
        this.#fechaFinContrato = fechaFinContrato;
        this.#honorarios = honorarios;
        this.#modalidad = modalidad;
        this.#estado = estado;

    }

    // Getters

    getIdConsultor() {
        return this.#idConsultor;
    }

    getEspecialidad() {
        return this.#especialidad;
    }

    getEmpresa() {
        return this.#empresa;
    }

    getProyectoAsignado() {
        return this.#proyectoAsignado;
    }

    getFechaInicioContrato() {
        return this.#fechaInicioContrato;
    }

    getFechaFinContrato() {
        return this.#fechaFinContrato;
    }

    getHonorarios() {
        return this.#honorarios;
    }

    getModalidad() {
        return this.#modalidad;
    }

    getEstado() {
        return this.#estado;
    }

    // Setters

    setEspecialidad(especialidad) {
        this.#especialidad = especialidad;
    }

    setEmpresa(empresa) {
        this.#empresa = empresa;
    }

    setProyectoAsignado(proyectoAsignado) {
        this.#proyectoAsignado = proyectoAsignado;
    }

    setFechaInicioContrato(fechaInicioContrato) {
        this.#fechaInicioContrato = fechaInicioContrato;
    }

    setFechaFinContrato(fechaFinContrato) {
        this.#fechaFinContrato = fechaFinContrato;
    }

    setHonorarios(honorarios) {
        this.#honorarios = honorarios;
    }

    setModalidad(modalidad) {
        this.#modalidad = modalidad;
    }

    setEstado(estado) {
        this.#estado = estado;
    }

    mostrarDatos() {

        return `
${super.mostrarDatos()}
ID Consultor: ${this.#idConsultor}
Especialidad: ${this.#especialidad}
Empresa: ${this.#empresa}
Proyecto: ${this.#proyectoAsignado}
Inicio del contrato: ${this.#fechaInicioContrato}
Fin del contrato: ${this.#fechaFinContrato}
Honorarios: ${this.#honorarios}
Modalidad: ${this.#modalidad}
Estado: ${this.#estado}
`;

    }

}