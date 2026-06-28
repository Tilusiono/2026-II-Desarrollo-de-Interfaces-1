class DetalleVenta {
    id_detalle_venta;
    venta;
    producto;
    cantidad;
    subtotal;
    constructor(id_det, ven, prod, cant, subtot) {
        this.id_detalle_venta = id_det;
        this.id_venta = ven;
        this.producto = prod;
        this.cantidad = cant;
        this.subtotal = subtot;
    }
}

// falta