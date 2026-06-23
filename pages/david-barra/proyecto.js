/* SUPERMERCADO "Élite Market" */

class Producto {
    idProducto;
    nombre;
    descripcion;
    precio;
    stock;
    marca;
    fechaVencimiento;
    codigoBarras;

    constructor(idPro, nom, desc, pre, sto, mar, fecVen, codBar) {
        this.idProducto = idPro;
        this.nombre = nom;
        this.descripcion = desc;
        this.precio = pre;
        this.stock = sto;
        this.marca = mar;
        this.fechaVencimiento = fecVen;
        this.codigoBarras = codBar;
    }
}

class Categoria {
    idCategoria;
    nombreCategoria;
    descripcion; 
    cantidadProductos;

    constructor(idCat, nomCat, desc, cantPro) {
        this.idCategoria = idCat;
        this.nombreCategoria = nomCat;
        this.descripcion = desc;
        this.cantidadProductos = cantPro;
    }
}

class Cliente {
    idCliente;
    nombre;
    apellido;
    correo;
    telefono;
    direccion;
    fechaRegistro;

    constructor(idCli, nom, ape, cor, tel, dir, fecReg) {
        this.idCliente = idCli;
        this.nombre = nom;
        this.apellido = ape;
        this.correo = cor;
        this.telefono = tel;
        this.direccion = dir;
        this.fechaRegistro = fecReg;
    }
}

class Cajero {
    idCajero;
    nombre;
    apellido;
    turno;
    salario;
    telefono;
    correo;
    fechaContratacion;

    constructor(idCaj, nom, ape, tur, sal, tel, cor, fecCon) {
        this.idCajero = idCaj;
        this.nombre = nom;
        this.apellido = ape;
        this.turno = tur;
        this.salario = sal;
        this.telefono = tel;
        this.correo = cor;
        this.fechaContratacion = fecCon;
    }
}

class Inventario {
    idInventario;
    cantidadDisponible;
    cantidadMinima;
    cantidadMaxima;
    ubicacion;
    fechaActualizacion;

    constructor(idInv, cantDis, cantMin, cantMax, ubi, fecAct) {
        this.idInventario = idInv;
        this.cantidadDisponible = cantDis;
        this.cantidadMinima = cantMin;
        this.cantidadMaxima = cantMax;
        this.ubicacion = ubi;
        this.fechaActualizacion = fecAct;
    }
}

class Proveedor {
    idProveedor;
    nombre;
    telefono;
    correo;
    direccion;
    ruc;
    nombreContacto;

    constructor(idProv, nom, tel, cor, dir, ruc, nomCon) {
        this.idProveedor = idProv;
        this.nombre = nom;
        this.telefono = tel;
        this.correo = cor;
        this.direccion = dir;
        this.ruc = ruc;
        this.nombreContacto = nomCon;
    }
}

class CarritoCompra {
    idCarrito;
    cantidadProductos;
    total;
    estado;
    fechaCreacion;

    constructor(idCar, cantPro, tot, est, fecCre) {
        this.idCarrito = idCar;
        this.cantidadProductos = cantPro;
        this.total = tot;
        this.estado = est;
        this.fechaCreacion = fecCre;
    }
}

class Venta {
    idVenta;
    fecha;
    total;
    metodoPago;
    descuento;
    impuesto;
    estado;

    constructor(idVen, fec, tot, metPag, des, imp, est) {
        this.idVenta = idVen;
        this.fecha = fec;
        this.total = tot;
        this.metodoPago = metPag;
        this.descuento = des;
        this.impuesto = imp;
        this.estado = est;
    }
}

class DetalleVenta {
    idDetalleVenta;
    cantidad;
    precioUnitario;
    subtotal;
    descuento;

    constructor(idDet, cant, preUni, sub, des) {
        this.idDetalleVenta = idDet;
        this.cantidad = cant;
        this.precioUnitario = preUni;
        this.subtotal = sub;
        this.descuento = des;
    }
}

class Comprobante {
    idComprobante;
    tipoComprobante;
    fechaEmision;
    subtotal;
    impuesto;
    total;
    estadoPago;

    constructor(idCom, tipCom, fecEmi, sub, imp, tot, estPag) {
        this.idComprobante = idCom;
        this.tipoComprobante = tipCom;
        this.fechaEmision = fecEmi;
        this.subtotal = sub;
        this.impuesto = imp;
        this.total = tot;
        this.estadoPago = estPag;
    }
}