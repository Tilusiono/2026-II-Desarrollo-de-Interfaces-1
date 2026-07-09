export class Producto {

    nombreProducto;

    #codigo;
    #precio;
    #stock;

    constructor(nombre, codigo, precio, stock) {

        this.nombreProducto = nombre;
        this.#codigo = codigo;
        this.#precio = precio;
        this.#stock = stock;
    }

    mostrarProducto() {
        console.log(this.nombreProducto);
    }
}