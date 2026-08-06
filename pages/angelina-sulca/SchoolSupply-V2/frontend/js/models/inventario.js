// ============================================
// CLASE: inventario (NO hereda)
// ============================================

export class inventario {
    #valorTotal;
    #productosAlmacenados;

    producto;
    stock;
    almacen;
    fechaIngreso;
    estado;

    constructor(cod, prod, stk, alm, fecIng, est) {
        this.producto = prod;
        this.stock = stk;
        this.almacen = alm;
        this.fechaIngreso = fecIng;
        this.estado = est;
        this.#valorTotal = 0;
        this.#productosAlmacenados = [];
    }

    getvalorTotal() {
        return this.#valorTotal;
    }

    getproductosAlmacenados() {
        return this.#productosAlmacenados;
    }

    setalmacen(nuevoAlmacen) {
        this.almacen = nuevoAlmacen;
    }

    setestado(nuevoEstado) {
        this.estado = nuevoEstado;
    }

    agregarProducto(producto, cantidad) {
        this.#productosAlmacenados.push({
            producto: producto,
            stock: cantidad,
            fechaIngreso: new Date()
        });
        this.#actualizarValorTotal();
        return this.#productosAlmacenados.length;
    }

    eliminarProducto(id) {
        let nuevos = [];
        for (let i = 0; i < this.#productosAlmacenados.length; i++) {
            if (this.#productosAlmacenados[i].producto.id !== id) {
                nuevos.push(this.#productosAlmacenados[i]);
            }
        }
        this.#productosAlmacenados = nuevos;
        this.#actualizarValorTotal();
        return this.#productosAlmacenados.length;
    }

    buscarProducto(id) {
        let encontrado = null;
        for (let i = 0; i < this.#productosAlmacenados.length; i++) {
            if (this.#productosAlmacenados[i].producto.id === id) {
                encontrado = this.#productosAlmacenados[i];
                break;
            }
        }
        return encontrado;
    }

    obtenerTotalProductos() {
        return this.#productosAlmacenados.length;
    }

    hayStock(id, cantidad) {
        let producto = this.buscarProducto(id);
        if (producto !== null) {
            return producto.stock >= cantidad;
        }
        return false;
    }

    reducirStock(id, cantidad) {
        let producto = this.buscarProducto(id);
        if (producto !== null && producto.stock >= cantidad) {
            producto.stock = producto.stock - cantidad;
            this.#actualizarValorTotal();
            return true;
        }
        return false;
    }

    #actualizarValorTotal() {
        let total = 0;
        for (let i = 0; i < this.#productosAlmacenados.length; i++) {
            let item = this.#productosAlmacenados[i];
            total = total + (item.producto.precioUnitario * item.stock);
        }
        this.#valorTotal = total;
        return this.#valorTotal;
    }
}