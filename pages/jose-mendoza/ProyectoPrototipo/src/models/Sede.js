export class Sede {

    #idSede;
    #nombre;
    #direccion;
    #telefono;
    #capacidad;
    #estado;
    #horaApertura;
    #fechaInauguracion;

    constructor(
        idSede,
        nombre,
        direccion,
        telefono,
        capacidad,
        estado,
        horaApertura,
        fechaInauguracion
    ) {

        this.#idSede = idSede;
        this.#nombre = nombre;
        this.#direccion = direccion;
        this.#telefono = telefono;
        this.#capacidad = capacidad;
        this.#estado = estado;
        this.#horaApertura = horaApertura;
        this.#fechaInauguracion = fechaInauguracion;

    }

    getIdSede() { return this.#idSede; }
    getNombre() { return this.#nombre; }
    getDireccion() { return this.#direccion; }
    getTelefono() { return this.#telefono; }
    getCapacidad() { return this.#capacidad; }
    getEstado() { return this.#estado; }
    getHoraApertura() { return this.#horaApertura; }
    getFechaInauguracion() { return this.#fechaInauguracion; }

    setNombre(nombre) { this.#nombre = nombre; }
    setDireccion(direccion) { this.#direccion = direccion; }
    setTelefono(telefono) { this.#telefono = telefono; }
    setCapacidad(capacidad) { this.#capacidad = capacidad; }
    setEstado(estado) { this.#estado = estado; }
    setHoraApertura(horaApertura) { this.#horaApertura = horaApertura; }
    setFechaInauguracion(fechaInauguracion) { this.#fechaInauguracion = fechaInauguracion; }

}