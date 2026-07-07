// Garantia.js
// Clase para gestionar garantías de productos electrónicos para PC.

class Garantia {
    #id;
    #codigoGarantia;
    #mesesCobertura;
    #condiciones;

    producto;
    estado;

    constructor(id, codigoGarantia, mesesCobertura, condiciones, producto, estado = "Activa") {
        if (typeof id !== "number") throw new TypeError("El ID de garantía debe ser numérico.");
        if (typeof codigoGarantia !== "string" || codigoGarantia.trim() === "") {
            throw new TypeError("El código de garantía es obligatorio.");
        }
        if (typeof mesesCobertura !== "number" || mesesCobertura <= 0) {
            throw new TypeError("Los meses de cobertura deben ser mayores que cero.");
        }
        if (typeof condiciones !== "string" || condiciones.trim() === "") {
            throw new TypeError("Las condiciones son obligatorias.");
        }

        this.#id = id;
        this.#codigoGarantia = codigoGarantia;
        this.#mesesCobertura = mesesCobertura;
        this.#condiciones = condiciones;
        this.producto = producto;
        this.estado = estado;
    }

    #validarCobertura() {
        return this.#mesesCobertura >= 12;
    }

    #obtenerCodigo() {
        return this.#codigoGarantia.toUpperCase();
    }

    mostrarDatos() {
        return `
            Garantía: ${this.#obtenerCodigo()}<br>
            Producto: ${this.producto}<br>
            Cobertura: ${this.#mesesCobertura} meses<br>
            Cobertura amplia: ${this.#validarCobertura()}<br>
            Estado: ${this.estado}<br>
            Condiciones: ${this.#condiciones}
        `;
    }

    cancelarGarantia() {
        this.estado = "Cancelada";
    }
}
