class ClienteNatural extends Cliente {
    #dni;
    metodoPago;

    constructor({ id, nombre, apellido, edad, telefono, fechaNacimiento, codigoCliente, correo, direccion, dni, metodoPago }) {
        super({ id, nombre, apellido, edad, telefono, fechaNacimiento, codigoCliente, correo, direccion, tipoCliente: "Cliente Natural" });

        if (typeof dni !== "string" || dni.trim() === "") throw new TypeError("DNI obligatorio");
        if (typeof metodoPago !== "string" || metodoPago.trim() === "") throw new TypeError("Método de pago obligatorio");

        this.#dni = dni;
        this.metodoPago = metodoPago;
    }

    #validarDni() { return this.#dni.length === 8; }

    mostrarDatos() {
        return `Cliente Natural<br>${this.mostrarDatosCliente()}<br>DNI válido: ${this.#validarDni()}<br>Método de pago: ${this.metodoPago}`;
    }
}
