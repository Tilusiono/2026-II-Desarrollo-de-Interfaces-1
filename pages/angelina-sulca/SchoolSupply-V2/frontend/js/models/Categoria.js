// ============================================
// CLASE: Categoria (NO hereda)
// ============================================

export class Categoria {
    #productos;
    #totalProductos;

    nombre;
    descripcion;
    estado;
    fechaRegistro;

    constructor(cod, nom, desc, est, fecReg) {
        this.nombre = nom;
        this.descripcion = desc;
        this.estado = est;
        this.fechaRegistro = fecReg;
        this.#productos = [];
        this.#totalProductos = 0;
    }

    getproductos() {
        return this.#productos;
    }

    gettotalProductos() {
        return this.#totalProductos;
    }

    setnombre(nuevoNombre) {
        this.nombre = nuevoNombre;
    }

    setdescripcion(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }

    agregarProducto(producto) {
        this.#productos.push(producto);
        this.#totalProductos = this.#totalProductos + 1;
        return this.#totalProductos;
    }

    eliminarProducto(id) {
        let nuevos = [];
        for (let i = 0; i < this.#productos.length; i++) {
            if (this.#productos[i].id !== id) {
                nuevos.push(this.#productos[i]);
            }
        }
        this.#productos = nuevos;
        this.#totalProductos = this.#productos.length;
        return this.#totalProductos;
    }

    activar() {
        this.estado = true;
        return this.estado;
    }

    desactivar() {
        this.estado = false;
        return this.estado;
    }

    estaActiva() {
        return this.estado;
    }

    obtenerInformacion() {
        return "Categoría: " + this.nombre + " - " + this.descripcion;
    }

    obtenerActivos() {
        return this.#contarProductosActivos();
    }

    #contarProductosActivos() {
        let activos = 0;
        for (let i = 0; i < this.#productos.length; i++) {
            if (this.#productos[i].activo) {
                activos++;
            }
        }
        return activos;
    }
}