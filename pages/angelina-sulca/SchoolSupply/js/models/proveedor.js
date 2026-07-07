// ============================================
// CLASE: proveedor (NO hereda)
// ============================================

export class proveedor {
    #productos;
    #totalProductos;
    #activo;

    nombre;
    telefono;
    direccion;
    correo;
    ruc;

    constructor(cod, nom, tel, dir, corr, rucProv) {
        this.nombre = nom;
        this.telefono = tel;
        this.direccion = dir;
        this.correo = corr;
        this.ruc = rucProv;
        this.#productos = [];
        this.#totalProductos = 0;
        this.#activo = true;
    }

    getproductos() {
        return this.#productos;
    }

    gettotalProductos() {
        return this.#totalProductos;
    }

    getactivo() {
        return this.#activo;
    }

    setnombre(nuevoNombre) {
        this.nombre = nuevoNombre;
    }

    settelefono(nuevoTelefono) {
        if (nuevoTelefono.length >= 9) {
            this.telefono = nuevoTelefono;
        }
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
        this.#activo = true;
        return this.#activo;
    }

    desactivar() {
        this.#activo = false;
        return this.#activo;
    }

    estaActivo() {
        return this.#activo;
    }

    obtenerInformacion() {
        return "Proveedor: " + this.nombre + " - RUC: " + this.ruc;
    }

    obtenerContacto() {
        return "Teléfono: " + this.telefono + " - Dirección: " + this.direccion;
    }

    #validarRUC() {
        return this.ruc.length === 11;
    }
}