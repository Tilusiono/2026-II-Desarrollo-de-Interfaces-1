export class TipoEmpleado {

    #idTipoEmpleado;
    #nombre;

    constructor(idTipoEmpleado, nombre) {

        this.#idTipoEmpleado = idTipoEmpleado;
        this.#nombre = nombre;

    }

    getIdTipoEmpleado() {
        return this.#idTipoEmpleado;
    }

    getNombre() {
        return this.#nombre;
    }

    setNombre(nombre) {
        this.#nombre = nombre;
    }

}