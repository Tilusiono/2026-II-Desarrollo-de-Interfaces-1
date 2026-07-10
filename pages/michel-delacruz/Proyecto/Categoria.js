
class Categoria {
    #productos;

    constructor(nombre, descripcion) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.#productos = [];
    }

    agregarProducto(producto) {
        this.#productos.push(producto);
    }

    obtenerProductos() {
        return this.#productos;
    }

    obtenerInfo() {
        return `Categoría: ${this.nombre} - ${this.descripcion}`;
    }

    // PRIVADO
    #validarDescripcion(descripcion) {
    return descripcion.trim() !== "";
    }

    #contarProductos() {
    return this.#productos.length;
    }
}
