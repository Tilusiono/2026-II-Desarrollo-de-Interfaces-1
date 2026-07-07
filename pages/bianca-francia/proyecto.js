

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

const vendedor = new Vendedor("Juan Pérez", 1, "V001", "Mañana");

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

const cliente = new Cliente("María Gómez", "12345678", "987654321", "Av. Principal 123");

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

const producto = new Productos("Laptop Lenovo", "P001", 2500, 15);

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

const calidadProducto = new CalidadProducto("Nuevo", "Electrónica", "12 meses", "Sin observaciones");

class Inventario {
    codigoProducto;
    stockActual;
    stockMinimo;
    ubicacion;

    constructor(codigoProducto, stockActual, stockMinimo, ubicacion) {
        this.codigoProducto = codigoProducto;
        this.stockActual = stockActual;
        this.stockMinimo = stockMinimo;
        this.ubicacion = ubicacion;
    }
}

const inventario = new Inventario("P001", 15, 5, "Almacén A");

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

const cantidadVendida = new CantidadVendida(2, "Unidad", 5000, "18/06/2026");

class Proveedor {
    idProveedor;
    nombreProveedor;
    telefono;
    direccion;

    constructor(idProveedor, nombreProveedor, telefono, direccion) {
        this.idProveedor = idProveedor;
        this.nombreProveedor = nombreProveedor;
        this.telefono = telefono;
        this.direccion = direccion;
    }
}
const proveedor = new Proveedor("PR001", "Tech Import SAC", "999888777", "Lima, Perú");

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

const precio = new Precio(2000, 2500, 100, 2400);

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

const totalVenta = new TotalVenta(5000, 900, 100, 5800);

class Comprobante {
     tipoComprobante;
     numeroComprobante;
     fechaEmision;
     montoTotal;

    constructor(tipoComprobante, numeroComprobante, fechaEmision, montoTotal) {
        this.tipoComprobante = tipoComprobante;
        this.numeroComprobante = numeroComprobante;
        this.fechaEmision = fechaEmision;
        this.montoTotal = montoTotal;
    }
}

const comprobante = new Comprobante("Factura", "F001-000123", "18/06/2026", 5800);

const venta = new Venta(vendedor, cliente, producto, cantidadVendida, precio, totalVenta, comprobante);
