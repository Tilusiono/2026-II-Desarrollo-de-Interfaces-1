class repuestos {

    nombre;
    marca;
    tipo;
    stock;

    #codigo;
    #precio;
    #proveedor;
    #garantia;

    constructor(nombre, marca, tipo, stock) {
        this.nombre = nombre;
        this.marca = marca;
        this.tipo = tipo;
        this.stock = stock;

        this.#codigo = "";
        this.#precio = 0;
        this.#proveedor = "";
        this.#garantia = "";
    }

    mostrarRepuesto() {
        console.log("Repuesto: " + this.nombre);
    }

    venderRepuesto() {
        console.log("Se vendió un repuesto.");
    }

    #validarStock() {
        return this.stock > 0;
    }

    #mostrarPrecio() {
        return this.#precio;
    }
}