class Cliente extends Persona {
    #codigoCliente; #correo;
    direccion; tipoCliente;

    constructor({ id, nombre, apellido, edad, telefono, fechaNacimiento, codigoCliente, correo, direccion, tipoCliente }) {
        super({ id, nombre, apellido, edad, telefono, fechaNacimiento });

        if (typeof codigoCliente !== "string" || codigoCliente.trim() === "") throw new TypeError("Código de cliente obligatorio");
        if (typeof correo !== "string" || !correo.includes("@")) throw new TypeError("Correo inválido");
        if (typeof direccion !== "string" || direccion.trim() === "") throw new TypeError("Dirección obligatoria");
        if (typeof tipoCliente !== "string" || tipoCliente.trim() === "") throw new TypeError("Tipo de cliente obligatorio");

        this.#codigoCliente = codigoCliente;
        this.#correo = correo;
        this.direccion = direccion;
        this.tipoCliente = tipoCliente;
    }

    #validarCodigoCliente() { return this.#codigoCliente.length >= 5; }

    get codigoCliente() { return this.#codigoCliente; }
    get correo() { return this.#correo; }

    mostrarDatosCliente() {
        return `${this.mostrarContacto()}<br>Código cliente: ${this.#codigoCliente}<br>Código válido: ${this.#validarCodigoCliente()}<br>Correo: ${this.#correo}<br>Dirección: ${this.direccion}<br>Tipo: ${this.tipoCliente}`;
    }

    registrarCompra(fechaHora) {
        console.log(`${this.nombreCompleto} registró una compra (${fechaHora.toLocaleString()})`);
    }

    cancelarCompra(fechaHora) {
        console.log(`${this.nombreCompleto} canceló una compra (${fechaHora.toLocaleString()})`);
    }
}
