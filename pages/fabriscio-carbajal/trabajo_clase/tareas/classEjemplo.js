class Producto {
    nombre;
    precio;
    stock;

    constrcutor(nom, pre, stoc) {
        this.nombre = nom;
        this.precio = pre;
        this.stock = stoc;
    }
}

let nom1 = "Producto";
let precio = 10;
let stock = 50;

p1 = new Producto(nom1, precio, stock)