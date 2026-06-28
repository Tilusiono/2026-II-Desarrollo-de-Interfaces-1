class Producto {
    idProducto;
    nombre;
    precio;
    inventario;

    constructor(id, nom, prec, inv) {

        this.idProducto = id;
        this.nombre = nom;
        this.precio = prec;
        this.inventario = inv;
    }

    mostrarDatos() {
        console.log(`\nProducto: ${this.nombre} \nPrecio: ${this.precio} \nInventario: ${this.inventario}`)

    }

    añadirStock(cantidadAgregar) {
        this.inventario += cantidadAgregar;
    }
}

export default Producto