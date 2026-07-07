// Factura.js
// Clase para representar comprobantes de venta.

class Factura {
    #id;
    #serie;
    #numero;
    #tipoComprobante;
    #cliente;

    estado;

    constructor(id, serie, numero, tipoComprobante, cliente, estado = "Emitida") {
        if (typeof id !== "number") throw new TypeError("El ID de factura debe ser numérico.");
        if (typeof serie !== "string" || serie.trim() === "") throw new TypeError("La serie es obligatoria.");
        if (typeof numero !== "string" || numero.trim() === "") throw new TypeError("El número es obligatorio.");
        if (typeof tipoComprobante !== "string" || tipoComprobante.trim() === "") {
            throw new TypeError("El tipo de comprobante es obligatorio.");
        }
        if (typeof cliente !== "string" || cliente.trim() === "") throw new TypeError("El cliente es obligatorio.");

        this.#id = id;
        this.#serie = serie;
        this.#numero = numero;
        this.#tipoComprobante = tipoComprobante;
        this.#cliente = cliente;
        this.estado = estado;
    }

    #obtenerCodigoComprobante() {
        return `${this.#serie}-${this.#numero}`;
    }

    #esFactura() {
        return this.#tipoComprobante.toLowerCase() === "factura";
    }

    emitir(total) {
        return `
            ${this.#tipoComprobante}: ${this.#obtenerCodigoComprobante()}<br>
            Cliente: ${this.#cliente}<br>
            Total: S/ ${total.toFixed(2)}<br>
            Es factura: ${this.#esFactura()}<br>
            Estado: ${this.estado}
        `;
    }

    anular() {
        this.estado = "Anulada";
    }
}
