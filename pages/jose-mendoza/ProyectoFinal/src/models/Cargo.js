export class Cargo {

    #idCargo;
    #nombre;
    #descripcion;
    #sueldoBase;

    constructor(idCargo, nombre, descripcion, sueldoBase) {

        this.#idCargo = idCargo;
        this.#nombre = nombre;
        this.#descripcion = descripcion;
        this.#sueldoBase = sueldoBase;

    }

    getIdCargo() {
        return this.#idCargo;
    }

    getNombre() {
        return this.#nombre;
    }

    getDescripcion() {
        return this.#descripcion;
    }

    getSueldoBase() {
        return this.#sueldoBase;
    }

    setNombre(nombre) {
        this.#nombre = nombre;
    }

    setDescripcion(descripcion) {
        this.#descripcion = descripcion;
    }

    setSueldoBase(sueldoBase) {
        this.#sueldoBase = sueldoBase;
    }

}