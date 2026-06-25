class ProductoCafe {

    #categoria;
    #nombreProducto;
    #codigoCliente;
    #nombreCliente;
    #descripcion;
    #precio;
    #cantidad;

    constructor(
        categoria,
        nombreProducto,
        codigoCliente,
        nombreCliente,
        descripcion,
        precio,
        cantidad
    ) {
        this.#categoria = categoria;
        this.#nombreProducto = nombreProducto;
        this.#codigoCliente = codigoCliente;
        this.#nombreCliente = nombreCliente;
        this.#descripcion = descripcion;
        this.#precio = precio;
        this.#cantidad = cantidad;
    }

    mostrarStock() {
        if (this.#cantidad > 0) {
            return "Producto disponible - Stock: " + this.#cantidad;
        } else {
            return "Producto agotado";
        }
    }

    getNombreProducto() {
        return this.#nombreProducto;
    }

    setNombreProducto(nombre) {
        this.#nombreProducto = nombre;
    }
}