// vendedor.js
// Aquí se usa HERENCIA: Vendedor hereda de Persona.

class Persona {
    #id;
    #nombre;
    #apellido;
    #telefono;
    #correo;

    constructor({ id, nombre, apellido, telefono, correo }) {
        if (typeof id !== "number") throw new TypeError("El ID debe ser numérico.");
        if (typeof nombre !== "string" || nombre.trim() === "") throw new TypeError("El nombre es obligatorio.");
        if (typeof apellido !== "string" || apellido.trim() === "") throw new TypeError("El apellido es obligatorio.");
        if (typeof telefono !== "string" || telefono.trim() === "") throw new TypeError("El teléfono es obligatorio.");
        if (typeof correo !== "string" || !correo.includes("@")) throw new TypeError("El correo no es válido.");

        this.#id = id;
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#telefono = telefono;
        this.#correo = correo;
    }

    get id() {
        return this.#id;
    }

    get nombreCompleto() {
        return `${this.#nombre} ${this.#apellido}`;
    }

    get telefono() {
        return this.#telefono;
    }

    get correo() {
        return this.#correo;
    }

    mostrarContacto() {
        return `${this.nombreCompleto}<br>Tel: ${this.#telefono}<br>${this.#correo}`;
    }
}

class Vendedor extends Persona {
    #codigoEmpleado;
    #sede;
    #cargo;

    constructor({ id, nombre, apellido, telefono, correo, codigoEmpleado, sede, cargo }) {
        super({ id, nombre, apellido, telefono, correo });

        if (typeof codigoEmpleado !== "string" || codigoEmpleado.trim() === "") {
            throw new TypeError("El código del empleado es obligatorio.");
        }

        if (typeof sede !== "string" || sede.trim() === "") {
            throw new TypeError("La sede es obligatoria.");
        }

        if (typeof cargo !== "string" || cargo.trim() === "") {
            throw new TypeError("El cargo es obligatorio.");
        }

        this.#codigoEmpleado = codigoEmpleado;
        this.#sede = sede;
        this.#cargo = cargo;
    }

    get codigoEmpleado() {
        return this.#codigoEmpleado;
    }

    get sede() {
        return this.#sede;
    }

    get cargo() {
        return this.#cargo;
    }

    mostrarDatos() {
        return `${this.mostrarContacto()}<br>Código: ${this.#codigoEmpleado}<br>Cargo: ${this.#cargo}<br>Sede: ${this.#sede}`;
    }
}
