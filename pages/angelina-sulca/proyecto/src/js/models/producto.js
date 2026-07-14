// ============================================
// CLASE PADRE: producto
// ============================================

export class producto {
    id;
    nombre;
    marca;
    precioUnitario;
    precioDocena;
    stock;
    activo;

    #codigoInterno;
    #fechaCreacion;

    constructor(id, nombre, marca, precioUnitario, precioDocena, stock) {
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.precioUnitario = precioUnitario;
        this.precioDocena = precioDocena;
        this.stock = stock;
        this.activo = true;
        this.#codigoInterno = "PROD-" + id;
        this.#fechaCreacion = new Date();
    }

    getcodigoInterno() {
        return this.#codigoInterno;
    }

    getfechaCreacion() {
        return this.#fechaCreacion.toLocaleDateString();
    }

    setstock(nuevoStock) {
        if (nuevoStock >= 0) {
            this.stock = nuevoStock;
        }
    }

    setactivo(estado) {
        this.activo = estado;
    }

    obtenerPrecio(cantidad) {
        let resultado = 0;
        if (cantidad >= 12) {
            resultado = this.precioDocena * (cantidad / 12);
        } else {
            resultado = this.precioUnitario * cantidad;
        }
        return resultado;
    }

    obtenerInfo() {
        return this.nombre + " - " + this.marca;
    }

    tieneStock(cantidad) {
        return this.stock >= cantidad;
    }

    reducirStock(cantidad) {
        if (this.tieneStock(cantidad)) {
            this.stock = this.stock - cantidad;
            return true;
        }
        return false;
    }

    obtenerTipo() {
        return "Producto";
    }

    obtenerDescripcion() {
        return "Producto: " + this.nombre;
    }

    #validarPrecio() {
        return this.precioUnitario > 0 && this.precioDocena > 0;
    }
}