export class Vacaciones {

    #idVacacion;
    #fechaInicio;
    #fechaFin;
    #cantidadDias;
    #estado;
    #observacion;
    #idEmpleado;

    constructor(
        idVacacion,
        fechaInicio,
        fechaFin,
        cantidadDias,
        estado,
        observacion,
        idEmpleado
    ) {

        this.#idVacacion = idVacacion;
        this.#fechaInicio = fechaInicio;
        this.#fechaFin = fechaFin;
        this.#cantidadDias = cantidadDias;
        this.#estado = estado;
        this.#observacion = observacion;
        this.#idEmpleado = idEmpleado;

    }

    // Getters

    getIdVacacion() {
        return this.#idVacacion;
    }

    getFechaInicio() {
        return this.#fechaInicio;
    }

    getFechaFin() {
        return this.#fechaFin;
    }

    getCantidadDias() {
        return this.#cantidadDias;
    }

    getEstado() {
        return this.#estado;
    }

    getObservacion() {
        return this.#observacion;
    }

    getIdEmpleado() {
        return this.#idEmpleado;
    }

    // Setters

    setFechaInicio(fechaInicio) {
        this.#fechaInicio = fechaInicio;
    }

    setFechaFin(fechaFin) {
        this.#fechaFin = fechaFin;
    }

    setCantidadDias(cantidadDias) {
        this.#cantidadDias = cantidadDias;
    }

    setEstado(estado) {
        this.#estado = estado;
    }

    setObservacion(observacion) {
        this.#observacion = observacion;
    }

    setIdEmpleado(idEmpleado) {
        this.#idEmpleado = idEmpleado;
    }

}