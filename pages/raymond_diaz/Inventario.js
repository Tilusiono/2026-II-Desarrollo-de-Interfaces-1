class Inventario {
    #id; #almacen; #movimientos;
    responsable;

    constructor(id, almacen, responsable) {
        this.#id = id;
        this.#almacen = almacen;
        this.responsable = responsable;
        this.#movimientos = [];
    }

    #registrarMovimiento(tipo, producto, cantidad) {
        this.#movimientos.push({ tipo, producto, cantidad, fecha: new Date() });
    }

    registrarEntrada(producto, cantidad) { this.#registrarMovimiento("Entrada", producto, cantidad); }
    registrarSalida(producto, cantidad) { this.#registrarMovimiento("Salida", producto, cantidad); }

    mostrarDatos() {
        return `Almacén: ${this.#almacen}<br>Responsable: ${this.responsable}<br>Movimientos registrados: ${this.#movimientos.length}`;
    }
}
