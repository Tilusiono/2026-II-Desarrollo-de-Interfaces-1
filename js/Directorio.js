class Directorio {
    #nombre;
    #telefono;
    #email;
    #rol;

    constructor(nombre, telefono, email, rol) {
        this.#nombre = nombre;
        this.#telefono = telefono;
        this.#email = email;
        this.#rol = rol;
    }

    mostrarDatos() {
        return `
        Directorio:
        Nombre: ${this.#nombre}
        Teléfono: ${this.#telefono}
        Email: ${this.#email}
        Rol: ${this.#rol}
        `;
    }

    getNombre() {
        return this.#nombre;
    }

    getTelefono() {
        return this.#telefono;
    }

    getEmail() {
        return this.#email;
    }

    getRol() {
        return this.#rol;
    }

    setEmail(nuevoEmail) {
        this.#email = nuevoEmail;
    }

    setTelefono(nuevoTelefono) {
        this.#telefono = nuevoTelefono;
    }
}

export default Directorio;
