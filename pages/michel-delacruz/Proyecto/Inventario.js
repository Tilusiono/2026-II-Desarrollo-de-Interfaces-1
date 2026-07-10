

// ---------
// INVENTARIO
// ---------
class Inventario {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
    }

    eliminarProducto(id) {
        this.productos = this.productos.filter(p => p.getId() !== id);
    }

    buscarProducto(nombre) {
        return this.productos.find(p => p.getNombre() === nombre);
    }



    // for  k reorre uno por uno i muestra  


    mostrarInventario() {
    let i = 0;

    while (i < this.productos.length) {
        console.log(this.productos[i]);
        i++;
    }
    }





    #contarProductos() {
    return this.productos.length;
    }

    #verificarExistencia(id) {
    return this.productos.some(producto => producto.getId() === id);
    }


}
