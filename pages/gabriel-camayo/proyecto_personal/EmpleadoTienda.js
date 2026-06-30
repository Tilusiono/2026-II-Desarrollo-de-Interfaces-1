class EmpleadoTienda extends Persona {
    turno;
    #salario;
    #cargo;
    #metaVentas;

    constructor(id, codigoRef, nombre, documento, contacto, salario, cargo, metaVentas, turno = "Mañana") {
        super(id, codigoRef, nombre, documento, contacto);
        this.#salario = salario;
        this.#cargo = cargo;
        this.#metaVentas = metaVentas;
        this.turno = turno;
    }

    #calcularBono() {
        return this.#metaVentas > 10000 ? this.#salario * 0.1 : 0;
    }

    #evaluarDesempeno() {
        return this.#calcularBono() > 0 ? "Excelente" : "Regular";
    }

    generarReportePago() {
        const total = this.#salario + this.#calcularBono();
        return `Pago para ${this.#cargo}: S/${total} - Desempeño: ${this.#evaluarDesempeno()}`;
    }

    obtenerDetalles() { 
        return `Empleado [${this.#cargo}] - Turno: ${this.turno}`;
    }
}