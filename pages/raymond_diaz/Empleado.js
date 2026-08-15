class Empleado extends Persona {
    #codigoEmpleado; #correo;
    sede; area;

    constructor({ id, nombre, apellido, edad, telefono, fechaNacimiento, codigoEmpleado, correo, sede, area }) {
        super({ id, nombre, apellido, edad, telefono, fechaNacimiento });

        if (typeof codigoEmpleado !== "string" || codigoEmpleado.trim() === "") throw new TypeError("Código de empleado obligatorio");
        if (typeof correo !== "string" || !correo.includes("@")) throw new TypeError("Correo inválido");
        if (typeof sede !== "string" || sede.trim() === "") throw new TypeError("Sede obligatoria");
        if (typeof area !== "string" || area.trim() === "") throw new TypeError("Área obligatoria");

        this.#codigoEmpleado = codigoEmpleado;
        this.#correo = correo;
        this.sede = sede;
        this.area = area;
    }

    #validarCodigoEmpleado() { return this.#codigoEmpleado.length >= 5; }

    get codigoEmpleado() { return this.#codigoEmpleado; }
    get correo() { return this.#correo; }

    mostrarDatosEmpleado() {
        return `${this.mostrarContacto()}<br>Código empleado: ${this.#codigoEmpleado}<br>Código válido: ${this.#validarCodigoEmpleado()}<br>Correo: ${this.#correo}<br>Sede: ${this.sede}<br>Área: ${this.area}`;
    }

    registrarEntrada(fechaHora) {
        console.log(`${this.nombreCompleto} registró entrada (${fechaHora.toLocaleString()})`);
    }

    registrarSalida(fechaHora) {
        console.log(`${this.nombreCompleto} registró salida (${fechaHora.toLocaleString()})`);
    }
}
