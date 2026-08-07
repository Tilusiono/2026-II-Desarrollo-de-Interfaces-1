export class Persona {

    #dni;
    #nombres;
    #apellidos;
    #telefono;
    #correo;
    #direccion;

    constructor(
        dni,
        nombres,
        apellidos,
        telefono,
        correo,
        direccion
    ) {

        this.#dni = dni;
        this.#nombres = nombres;
        this.#apellidos = apellidos;
        this.#telefono = telefono;
        this.#correo = correo;
        this.#direccion = direccion;

    }

    // Getters

    getDni() {
        return this.#dni;
    }

    getNombres() {
        return this.#nombres;
    }

    getApellidos() {
        return this.#apellidos;
    }

    getTelefono() {
        return this.#telefono;
    }

    getCorreo() {
        return this.#correo;
    }

    getDireccion() {
        return this.#direccion;
    }

    // Setters

    setDni(dni) {
        this.#dni = dni;
    }

    setNombres(nombres) {
        this.#nombres = nombres;
    }

    setApellidos(apellidos) {
        this.#apellidos = apellidos;
    }

    setTelefono(telefono) {
        this.#telefono = telefono;
    }

    setCorreo(correo) {
        this.#correo = correo;
    }

    setDireccion(direccion) {
        this.#direccion = direccion;
    }

    obtenerNombreCompleto() {
        return `${this.#nombres} ${this.#apellidos}`;
    }

    mostrarDatos() {
        return `
DNI: ${this.#dni}
Nombre: ${this.obtenerNombreCompleto()}
Teléfono: ${this.#telefono}
Correo: ${this.#correo}
Dirección: ${this.#direccion}
`;
    }

}