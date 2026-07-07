// vendedor.js
// Clase Persona y clase Vendedor para el sistema de venta de equipos electrónicos para PC.

class Persona {
    #id;
    #nombre;
    #apellido;
    #edad;
    #telefono;
    #fechaNacimiento;

    constructor({
        id,
        nombre,
        apellido = "Sin Apellido",
        edad = 0,
        telefono = "",
        fechaNacimiento = new Date()
    }) {
        if (typeof id !== "number") throw new TypeError("ID debe ser un número");
        if (typeof nombre !== "string") throw new TypeError("Nombre debe ser un string");
        if (typeof apellido !== "string") throw new TypeError("Apellido debe ser un string");
        if (typeof edad !== "number") throw new TypeError("Edad debe ser un número");
        if (typeof telefono !== "string") throw new TypeError("Teléfono debe ser un string");

        if (!(fechaNacimiento instanceof Date) || isNaN(fechaNacimiento)) {
            throw new TypeError("Fecha de nacimiento inválida");
        }

        this.#id = id;
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#edad = edad;
        this.#telefono = telefono;
        this.#fechaNacimiento = fechaNacimiento;
    }

    #esMayorDeEdad() {
        return this.#edad >= 18;
    }

    get id() {
        return this.#id;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(nuevoNombre) {
        if (typeof nuevoNombre !== "string" || nuevoNombre.trim() === "") {
            throw new TypeError("Nombre inválido");
        }
        this.#nombre = nuevoNombre;
    }

    get apellido() {
        return this.#apellido;
    }

    set apellido(nuevoApellido) {
        if (typeof nuevoApellido !== "string" || nuevoApellido.trim() === "") {
            throw new TypeError("Apellido inválido");
        }
        this.#apellido = nuevoApellido;
    }

    get edad() {
        return this.#edad;
    }

    get telefono() {
        return this.#telefono;
    }

    get fechaNacimiento() {
        return this.#fechaNacimiento;
    }

    get nombreCompleto() {
        return `${this.#nombre} ${this.#apellido}`.trim();
    }

    get estado() {
        const condicion = this.#esMayorDeEdad() ? "mayor" : "menor";
        return `Es ${condicion} de edad - ${this.#edad} años`;
    }

    mostrarContacto() {
        return `
            Nombre: ${this.nombreCompleto}<br>
            Edad: ${this.#edad}<br>
            Estado: ${this.estado}<br>
            Teléfono: ${this.#telefono}
        `;
    }

    toJSON() {
        return {
            id: this.#id,
            nombreCompleto: this.nombreCompleto,
            edad: this.#edad,
            telefono: this.#telefono,
            fechaNacimiento: this.#fechaNacimiento,
            estado: this.estado
        };
    }
}

class Vendedor extends Persona {
    #codigoEmpleado;
    #correo;
    #sede;
    #cargo;

    constructor({
        id,
        nombre,
        apellido = "Sin Apellido",
        edad = 18,
        telefono = "",
        fechaNacimiento = new Date(),
        codigoEmpleado,
        correo,
        sede,
        cargo
    }) {
        super({ id, nombre, apellido, edad, telefono, fechaNacimiento });

        if (typeof codigoEmpleado !== "string" || codigoEmpleado.trim() === "") {
            throw new TypeError("El código del empleado es obligatorio");
        }

        if (typeof correo !== "string" || !correo.includes("@")) {
            throw new TypeError("El correo no es válido");
        }

        if (typeof sede !== "string" || sede.trim() === "") {
            throw new TypeError("La sede es obligatoria");
        }

        if (typeof cargo !== "string" || cargo.trim() === "") {
            throw new TypeError("El cargo es obligatorio");
        }

        this.#codigoEmpleado = codigoEmpleado;
        this.#correo = correo;
        this.#sede = sede;
        this.#cargo = cargo;
    }

    get codigoEmpleado() {
        return this.#codigoEmpleado;
    }

    get correo() {
        return this.#correo;
    }

    get sede() {
        return this.#sede;
    }

    get cargo() {
        return this.#cargo;
    }

    mostrarDatos() {
        return `
            ${this.mostrarContacto()}<br>
            Código: ${this.#codigoEmpleado}<br>
            Correo: ${this.#correo}<br>
            Cargo: ${this.#cargo}<br>
            Sede: ${this.#sede}
        `;
    }

    registrarEntrada(fechaHora) {
        console.log(`${this.nombreCompleto} registró entrada (${fechaHora.toLocaleString()})`);
    }

    registrarSalida(fechaHora) {
        console.log(`${this.nombreCompleto} registró salida (${fechaHora.toLocaleString()})`);
    }
}
