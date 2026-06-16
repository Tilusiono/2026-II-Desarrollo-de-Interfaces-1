

class Vendedor {
    nombre;
    numeroCaja;
    codigoVendedor;
    turno;

    constructor(nombre, numeroCaja, codigoVendedor, turno) {
        this.nombre = nombre;
        this.numeroCaja = numeroCaja;
        this.codigoVendedor = codigoVendedor;
        this.turno = turno;
    }
}

class Cliente {
    nombreCompleto;
    numeroDNI;
    telefono;
    direccion;

    constructor(nombreCompleto, numeroDNI, telefono, direccion) {
        this.nombreCompleto = nombreCompleto;
        this.numeroDNI = numeroDNI;
        this.telefono = telefono;
        this.direccion = direccion;
    }
}

class Productos {
    nombreProducto;
    codigoProducto;
    precioUnitario;
    stock;

    constructor(nombreProducto, codigoProducto, precioUnitario, stock) {
        this.nombreProducto = nombreProducto;
        this.codigoProducto = codigoProducto;
        this.precioUnitario = precioUnitario;
        this.stock = stock;
    }
}

class CalidadProducto {
    estado;
    categoria;
    garantia;
    observaciones;

    constructor(estado, categoria, garantia, observaciones) {
        this.estado = estado;
        this.categoria = categoria;
        this.garantia = garantia;
        this.observaciones = observaciones;
    }
}

class AtencionCliente {
    tipoAtencion;
    nivelSatisfaccion;
    reclamo;
    comentario;

    constructor(tipoAtencion, nivelSatisfaccion, reclamo, comentario) {
        this.tipoAtencion = tipoAtencion;
        this.nivelSatisfaccion = nivelSatisfaccion;
        this.reclamo = reclamo;
        this.comentario = comentario;
    }
}

class CantidadVendida {
    cantidad;
    unidadMedida;
    subtotal;
    fechaRegistro;

    constructor(cantidad, unidadMedida, subtotal, fechaRegistro) {
        this.cantidad = cantidad;
        this.unidadMedida = unidadMedida;
        this.subtotal = subtotal;
        this.fechaRegistro = fechaRegistro;
    }
}

class TotalVenta {
    subtotal;
    impuesto;
    descuento;
    totalPagar;

    constructor(subtotal, impuesto, descuento, totalPagar) {
        this.subtotal = subtotal;
        this.impuesto = impuesto;
        this.descuento = descuento;
        this.totalPagar = totalPagar;
    }
}

class Precio {
    precioCompra;
    precioVenta;
    descuento;
    precioFinal;

    constructor(precioCompra, precioVenta, descuento, precioFinal) {
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.descuento = descuento;
        this.precioFinal = precioFinal;
    }
}



