class Vendedor extends Empleado {
    #cargo; #metaVentas;

    constructor({ id, nombre, apellido, edad, telefono, fechaNacimiento, codigoEmpleado, correo, sede, area, cargo, metaVentas }) {
        super({ id, nombre, apellido, edad, telefono, fechaNacimiento, codigoEmpleado, correo, sede, area });

        if (typeof cargo !== "string" || cargo.trim() === "") throw new TypeError("Cargo obligatorio");
        if (typeof metaVentas !== "number" || metaVentas < 0) throw new TypeError("Meta inválida");

        this.#cargo = cargo;
        this.#metaVentas = metaVentas;
    }

    #cumpleMeta(montoVenta) { return montoVenta >= this.#metaVentas; }

    get cargo() { return this.#cargo; }

    mostrarDatos() {
        return `Vendedor<br>${this.mostrarDatosEmpleado()}<br>Cargo: ${this.#cargo}<br>Meta de ventas: S/ ${this.#metaVentas.toFixed(2)}`;
    }

    evaluarVenta(montoVenta) {
        return this.#cumpleMeta(montoVenta) ? "Cumplió la meta." : "Aún no cumple la meta.";
    }
}
