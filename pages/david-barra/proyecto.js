/*SUPERMERCADO "Élite Market"*/

class Producto {
    idProducto;
    nombre;
    descripcion;
    precio;
    stock;
    marca;
    fechaVencimiento;
    codigoBarras;

    constructor(idpro, nom, desc, pre, sto, mar, fecVen, cod) {
        this.idProducto = idpro;
        this.nombre = nom;
        this.descripcion = desc;
        this.precio = pre;
        this.stock = sto;
        this.marca = mar;
        this.fechaVencimiento = fecVen;
        this.codigoBarras = cod;
    }
}

class Categoria {
    idCategoria;
    nombreCategoria;
    descripcion;
    cantidadProductos;

    constructor(idCat, nomCat, desc, cant) {
        this.idCategoria = idCat;
        this.nombreCategoria = nomCat;
        this.descripcion = desc;
        this.cantidadProductos = cant;
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

class Empleado {
    idEmpleado;
    nombre;
    apellido;
    cargo;
    salario;
    telefono;
    correo;
    fechaContratacion;

    constructor(idEmp, nom, ape, car, sal, tel, cor, fecCon) {
        this.idEmpleado = idEmp;
        this.nombre = nom;
        this.apellido = ape;
        this.cargo = car;
        this.salario = sal;
        this.telefono = tel;
        this.correo = cor;
        this.fechaContratacion = fecCon;
    }
}

class CarritoCompra {
    idCarrito;
    cantidadProductos;
    total;
    estado;
    fechaCreacion;

    constructor(idCar, cant, tot, est, fec) {
        this.idCarrito = idCar;
        this.cantidadProductos = cant;
        this.total = tot;
        this.estado = est;
        this.fechaCreacion = fec;
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

    constructor(idVen, fec, tot, met, des, imp, est) {
        this.idVenta = idVen;
        this.fecha = fec;
        this.total = tot;
        this.metodoPago = met;
        this.descuento = des;
        this.impuesto = imp;
        this.estado = est;
    }
}

class DetalleVenta {
    idDetalle;
    cantidad;
    precioUnitario;
    subtotal;
    descuento;

    constructor(idDet, cant, preUni, sub, des) {
        this.idDetalle = idDet;
        this.cantidad = cant;
        this.precioUnitario = preUni;
        this.subtotal = sub;
        this.descuento = des;
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

    constructor(idPro, nom, tel, cor, dir, ruc, con) {
        this.idProveedor = idPro;
        this.nombre = nom;
        this.telefono = tel;
        this.correo = cor;
        this.direccion = dir;
        this.ruc = ruc;
        this.nombreContacto = con;
    }
}

class Factura {
    idFactura;
    fechaEmision;
    subtotal;
    impuesto;
    total;
    estadoPago;

    constructor(idFac, fec, sub, imp, tot, est) {
        this.idFactura = idFac;
        this.fechaEmision = fec;
        this.subtotal = sub;
        this.impuesto = imp;
        this.total = tot;
        this.estadoPago = est;
    }
}