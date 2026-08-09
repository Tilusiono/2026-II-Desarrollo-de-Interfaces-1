class Producto {
    idProducto;
    #nombre;            // convertir nombre de producto en privado
    precio;
    inventario;

    constructor(id, nom, prec, inv) {

        this.idProducto = id;
        this.#nombre = nom;
        this.precio = prec;
        this.inventario = inv;
    }

    // heredan el getter de nombre
    getNombre(){
        return this.#nombre
    }

    // heredan setter de nombre
    setNombre(nuevoNombre){
        this.#nombre = nuevoNombre
    }

    mostrarDatos() {
        console.log(`\nProducto: ${this.#nombre} \nPrecio: ${this.precio} \nInventario: ${this.inventario}`)

    }

    añadirStock(cantidadAgregar) {
        this.inventario += cantidadAgregar;
    }
}

export default Producto