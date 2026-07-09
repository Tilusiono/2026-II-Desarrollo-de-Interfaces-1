class Alumno {
    // Propiedades privadas nativas (#)
    #id;
    #nombre;
    #apellido;
    #edad;
    #telefono;
    #fechaNacimiento;

    /**
     * Crea una instancia de Alumno usando desestructuración de objetos.
     * @param {Object} params - Parámetros de inicialización.
     */
    constructor({ id, nombre, apellido = "Sin Apellido", edad = 0, telefono = "", fechaNacimiento = new Date() }) {
        // Validaciones estrictas unificadas
        if (typeof id !== "number") throw new TypeError("ID debe ser un número");
        if (typeof nombre !== "string") throw new TypeError("Nombre debe ser un string");
        if (typeof apellido !== "string") throw new TypeError("Apellido debe ser un string");
        if (typeof edad !== "number") throw new TypeError("Edad debe ser un número");
        if (typeof telefono !== "string") throw new TypeError("Teléfono debe ser un string");
        if (!(fechaNacimiento instanceof Date) || isNaN(fechaNacimiento)) throw new TypeError("Fecha de nacimiento inválida");

        this.#id = id;
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#edad = edad;
        this.#telefono = telefono;
        this.#fechaNacimiento = fechaNacimiento;
    }

    // Método privado encapsulado
    #esMayorDeEdad() {
        return this.#edad >= 18;
    }

    // Getters nativos (Sintaxis moderna de JS)
    get id() { return this.#id; }
    get edad() { return this.#edad; }
    get telefono() { return this.#telefono; }
    get fechaNacimiento() { return this.#fechaNacimiento; }

    get nombre() { return this.#nombre; }
    set nombre(nuevoNombre) {
        if (typeof nuevoNombre !== "string") throw new TypeError("Nombre inválido");
        this.#nombre = nuevoNombre;
    }

    get apellido() { return this.#apellido; }
    set apellido(nuevoApellido) {
        if (typeof nuevoApellido !== "string") throw new TypeError("Apellido inválido");
        this.#apellido = nuevoApellido;
    }

    // Propiedad calculada dinámicamente
    get nombreCompleto() { 
        return `${this.#nombre} ${this.#apellido}`.trim(); 
    }

    // Reemplaza al antiguo método mostrarEstado() usando Plantillas de Texto
    get estado() {
        const condicion = this.#esMayorDeEdad() ? "mayor" : "menor";
        return `Es ${condicion} de edad - ${this.#edad} años`;
    }

    // Interceptor nativo para serialización segura en formato JSON
    toJSON() {
        return {
            id: this.#id,
            nombreCompleto: this.nombreCompleto,
            edad: this.#edad,
            estado: this.estado
        };
    }
}
