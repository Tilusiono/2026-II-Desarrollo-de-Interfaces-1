import { Productos } from "./Productos.js";

export class CalidadProducto extends Productos {

    estado;

    #categoria;
    #garantia;
    #observaciones;

    constructor(nombre, codigo, precio, stock, estado, categoria, garantia, obs) {

        super(nombre, codigo, precio, stock, categoria);

        this.estado = estado;
        this.#categoria = categoria;
        this.#garantia = garantia;
        this.#observaciones = obs;
    }

    mostrarProducto() {
        console.log(this.nombreProducto, this.estado);
    }

    revisar() {
        console.log("Producto revisado");
    }
}