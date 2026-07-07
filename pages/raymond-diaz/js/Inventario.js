// Inventario.js
// Clase para controlar movimientos de inventario de productos para PC.

class Inventario {
    #id;
    #almacen;
    #movimientos;

    responsable;

    constructor(id, almacen, responsable) {
        if (typeof id !== "number") throw new TypeError("El ID del inventario debe ser numérico.");
        if (typeof almacen !== "string" || almacen.trim() === "") {
            throw new TypeError("El almacén es obligatorio.");
        }
        if (typeof responsable !== "string" || responsable.trim() === "") {
            throw new TypeError("El responsable es obligatorio.");
        }

        this.#id = id;
        this.#almacen = almacen;
        this.#movimientos = [];
        this.responsable = responsable;
    }

    #registrarMovimiento(tipo, producto, cantidad) {
        if (typeof cantidad !== "number" || cantidad <= 0) {
            throw new TypeError("La cantidad debe ser mayor que cero.");
        }

        this.#movimientos.push({
            tipo,
            producto,
            cantidad,
            fecha: new Date()
        });
    }

    get id() {
        return this.#id;
    }

    get almacen() {
        return this.#almacen;
    }

    registrarEntrada(producto, cantidad) {
        this.#registrarMovimiento("Entrada", producto, cantidad);
    }

    registrarSalida(producto, cantidad) {
        this.#registrarMovimiento("Salida", producto, cantidad);
    }

    obtenerMovimientos() {
        return this.#movimientos;
    }

    mostrarDatos() {
        return `
        Almacén: ${this.#almacen}<br>
        Responsable: ${this.responsable}<br>
        Movimientos registrados: ${this.#movimientos.length}
        `;
    }
}
