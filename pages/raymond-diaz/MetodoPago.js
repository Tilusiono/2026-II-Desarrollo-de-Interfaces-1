// MetodoPago.js
// Clase para representar métodos de pago.

class MetodoPago {
    #id;
    #nombre;
    #descripcion;
    #comision;

    activo;

    constructor(id, nombre, descripcion, comision = 0, activo = true) {
        if (typeof id !== "number") throw new TypeError("El ID del método de pago debe ser numérico.");
        if (typeof nombre !== "string" || nombre.trim() === "") {
            throw new TypeError("El nombre del método de pago es obligatorio.");
        }
        if (typeof descripcion !== "string") throw new TypeError("La descripción debe ser texto.");
        if (typeof comision !== "number" || comision < 0) {
            throw new TypeError("La comisión no puede ser negativa.");
        }

        this.#id = id;
        this.#nombre = nombre;
        this.#descripcion = descripcion;
        this.#comision = comision;
        this.activo = activo;
    }

    #tieneComision() {
        return this.#comision > 0;
    }

    get nombre() {
        return this.#nombre;
    }

    get comision() {
        return this.#comision;
    }

    calcularMontoConComision(monto) {
        if (typeof monto !== "number" || monto < 0) {
            throw new TypeError("El monto debe ser numérico y positivo.");
        }

        return monto + (monto * this.#comision);
    }

    mostrarDatos() {
        return `
            Método: ${this.#nombre}<br>
            Descripción: ${this.#descripcion}<br>
            Comisión: ${(this.#comision * 100).toFixed(1)}%<br>
            Tiene comisión: ${this.#tieneComision()}<br>
            Activo: ${this.activo}
        `;
    }
}
