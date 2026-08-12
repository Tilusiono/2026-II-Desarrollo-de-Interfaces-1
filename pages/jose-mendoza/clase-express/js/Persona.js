class Persona {

    #id;
    #nombre;
    #apellido;
    #edad;
    #telefono;

    fechaNacimiento;

    constructor(
        id,
        nombre,
        apellido = "Sin Apellido",
        edad = 0,
        telefono = "",
        fechaNacimiento = new Date()
    ) {
        this.#id = id;
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#edad = edad;
        this.#telefono = telefono;
        this.fechaNacimiento = fechaNacimiento;
    }

    #validarEdad() {
        return this.#edad >= 18;
    }

    mostrarEstado() {
        if (this.#validarEdad()) {
            return "Es mayor de edad - " + this.#edad;
        } else {
            return "Es menor de edad - " + this.#edad;
        }
    }

    getNombre() {
        return this.#nombre;
    }

    setNombre(nombre) {
        if (typeof nombre !== "string")
            throw new Error("Nombre inválido");

        this.#nombre = nombre;
    }
}

export default Persona;