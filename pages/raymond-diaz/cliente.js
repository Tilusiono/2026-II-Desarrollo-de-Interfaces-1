// cliente.js
// Clase aparte para representar al cliente de la tienda de equipos electrónicos para PC.

class Cliente {
    // Propiedades privadas nativas (#)
    #id;
    #nombre;
    #apellido;
    #edad;
    #telefono;
    #fechaNacimiento;
    #correo;
    #direccion;
    #tipoCliente;

    /**
     * Crea una instancia de Cliente usando desestructuración de objetos.
     * @param {Object} params - Parámetros de inicialización.
     */
    constructor({
        id,
        nombre,
        apellido = "Sin Apellido",
        edad = 0,
        telefono = "",
        fechaNacimiento = new Date(),
        correo = "",
        direccion = "Sin dirección",
        tipoCliente = "Nuevo"
    }) {
        // Validaciones
        if (typeof id !== "number") throw new TypeError("ID debe ser un número");
        if (typeof nombre !== "string") throw new TypeError("Nombre debe ser un string");
        if (typeof apellido !== "string") throw new TypeError("Apellido debe ser un string");
        if (typeof edad !== "number") throw new TypeError("Edad debe ser un número");
        if (typeof telefono !== "string") throw new TypeError("Teléfono debe ser un string");

        if (!(fechaNacimiento instanceof Date) || isNaN(fechaNacimiento)) {
            throw new TypeError("Fecha de nacimiento inválida");
        }

        if (typeof correo !== "string" || !correo.includes("@")) {
            throw new TypeError("Correo inválido");
        }

        if (typeof direccion !== "string") throw new TypeError("Dirección debe ser un string");
        if (typeof tipoCliente !== "string") throw new TypeError("Tipo de cliente debe ser un string");

        this.#id = id;
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#edad = edad;
        this.#telefono = telefono;
        this.#fechaNacimiento = fechaNacimiento;
        this.#correo = correo;
        this.#direccion = direccion;
        this.#tipoCliente = tipoCliente;
    }

    // Método privado encapsulado
    #esMayorDeEdad() {
        return this.#edad >= 18;
    }

    // Getters
    get id() {
        return this.#id;
    }

    get nombre() {
        return this.#nombre;
    }

    get apellido() {
        return this.#apellido;
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

    get correo() {
        return this.#correo;
    }

    get direccion() {
        return this.#direccion;
    }

    get tipoCliente() {
        return this.#tipoCliente;
    }

    // Setters
    set nombre(nuevoNombre) {
        if (typeof nuevoNombre !== "string" || nuevoNombre.trim() === "") {
            throw new TypeError("Nombre inválido");
        }

        this.#nombre = nuevoNombre;
    }

    set apellido(nuevoApellido) {
        if (typeof nuevoApellido !== "string" || nuevoApellido.trim() === "") {
            throw new TypeError("Apellido inválido");
        }

        this.#apellido = nuevoApellido;
    }

    set telefono(nuevoTelefono) {
        if (typeof nuevoTelefono !== "string" || nuevoTelefono.trim() === "") {
            throw new TypeError("Teléfono inválido");
        }

        this.#telefono = nuevoTelefono;
    }

    set correo(nuevoCorreo) {
        if (typeof nuevoCorreo !== "string" || !nuevoCorreo.includes("@")) {
            throw new TypeError("Correo inválido");
        }

        this.#correo = nuevoCorreo;
    }

    set direccion(nuevaDireccion) {
        if (typeof nuevaDireccion !== "string" || nuevaDireccion.trim() === "") {
            throw new TypeError("Dirección inválida");
        }

        this.#direccion = nuevaDireccion;
    }

    set tipoCliente(nuevoTipoCliente) {
        if (typeof nuevoTipoCliente !== "string" || nuevoTipoCliente.trim() === "") {
            throw new TypeError("Tipo de cliente inválido");
        }

        this.#tipoCliente = nuevoTipoCliente;
    }

    // Propiedad calculada
    get nombreCompleto() {
        return `${this.#nombre} ${this.#apellido}`.trim();
    }

    // Estado del cliente
    get estado() {
        const condicion = this.#esMayorDeEdad() ? "mayor" : "menor";
        return `Cliente ${condicion} de edad - ${this.#edad} años`;
    }

    // Método para mostrar datos del cliente
    mostrarDatosCliente() {
        return `
            Cliente: ${this.nombreCompleto}<br>
            Edad: ${this.#edad}<br>
            Estado: ${this.estado}<br>
            Teléfono: ${this.#telefono}<br>
            Correo: ${this.#correo}<br>
            Dirección: ${this.#direccion}<br>
            Tipo de cliente: ${this.#tipoCliente}
        `;
    }

    // Serialización segura
    toJSON() {
        return {
            id: this.#id,
            nombreCompleto: this.nombreCompleto,
            edad: this.#edad,
            telefono: this.#telefono,
            correo: this.#correo,
            direccion: this.#direccion,
            tipoCliente: this.#tipoCliente,
            estado: this.estado
        };
    }
}