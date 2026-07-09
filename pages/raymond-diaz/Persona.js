class Persona {
    #id; #nombre; #apellido; #edad; #telefono; #fechaNacimiento;

    constructor({ id, nombre, apellido = "Sin Apellido", edad = 0, telefono = "", fechaNacimiento = new Date() }) {
        if (typeof id !== "number") throw new TypeError("ID debe ser un número");
        if (typeof nombre !== "string") throw new TypeError("Nombre debe ser un string");
        if (typeof apellido !== "string") throw new TypeError("Apellido debe ser un string");
        if (typeof edad !== "number") throw new TypeError("Edad debe ser un número");
        if (typeof telefono !== "string") throw new TypeError("Teléfono debe ser un string");
        if (!(fechaNacimiento instanceof Date) || isNaN(fechaNacimiento)) throw new TypeError("Fecha inválida");

        this.#id = id;
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#edad = edad;
        this.#telefono = telefono;
        this.#fechaNacimiento = fechaNacimiento;
    }

    #esMayorDeEdad() { return this.#edad >= 18; }

    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get apellido() { return this.#apellido; }
    get edad() { return this.#edad; }
    get telefono() { return this.#telefono; }
    get fechaNacimiento() { return this.#fechaNacimiento; }

    set nombre(nuevoNombre) {
        if (typeof nuevoNombre !== "string" || nuevoNombre.trim() === "") throw new TypeError("Nombre inválido");
        this.#nombre = nuevoNombre;
    }

    set apellido(nuevoApellido) {
        if (typeof nuevoApellido !== "string" || nuevoApellido.trim() === "") throw new TypeError("Apellido inválido");
        this.#apellido = nuevoApellido;
    }

    get nombreCompleto() { return `${this.#nombre} ${this.#apellido}`.trim(); }

    get estado() {
        const condicion = this.#esMayorDeEdad() ? "mayor" : "menor";
        return `Es ${condicion} de edad - ${this.#edad} años`;
    }

    mostrarContacto() {
        return `Nombre: ${this.nombreCompleto}<br>Edad: ${this.#edad}<br>Estado: ${this.estado}<br>Teléfono: ${this.#telefono}`;
    }
}
