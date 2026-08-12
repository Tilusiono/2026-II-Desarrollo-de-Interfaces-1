export class Permiso {

    #idPermiso;
    #tipoPermiso;
    #fechaInicio;
    #fechaFin;
    #motivo;
    #estado;
    #idEmpleado;

    constructor(
        idPermiso,
        tipoPermiso,
        fechaInicio,
        fechaFin,
        motivo,
        estado,
        idEmpleado
    ) {

        this.#idPermiso = idPermiso;
        this.#tipoPermiso = tipoPermiso;
        this.#fechaInicio = fechaInicio;
        this.#fechaFin = fechaFin;
        this.#motivo = motivo;
        this.#estado = estado;
        this.#idEmpleado = idEmpleado;

    }

    // Getters

    getIdPermiso() {
        return this.#idPermiso;
    }

    getTipoPermiso() {
        return this.#tipoPermiso;
    }

    getFechaInicio() {
        return this.#fechaInicio;
    }

    getFechaFin() {
        return this.#fechaFin;
    }

    getMotivo() {
        return this.#motivo;
    }

    getEstado() {
        return this.#estado;
    }

    getIdEmpleado() {
        return this.#idEmpleado;
    }

    // Setters

    setTipoPermiso(tipoPermiso) {
        this.#tipoPermiso = tipoPermiso;
    }

    setFechaInicio(fechaInicio) {
        this.#fechaInicio = fechaInicio;
    }

    setFechaFin(fechaFin) {
        this.#fechaFin = fechaFin;
    }

    setMotivo(motivo) {
        this.#motivo = motivo;
    }

    setEstado(estado) {
        this.#estado = estado;
    }

    setIdEmpleado(idEmpleado) {
        this.#idEmpleado = idEmpleado;
    }

}