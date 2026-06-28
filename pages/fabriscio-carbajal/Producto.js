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
        return `
        Producto: ${this.nombre}
        Precio: ${this.precio}
        Inventario: ${this.inventario}
        `    
    }

    añadirStock(cantidadAgregar) {
        this.inventario += cantidadAgregar;
    }
}

export default Producto