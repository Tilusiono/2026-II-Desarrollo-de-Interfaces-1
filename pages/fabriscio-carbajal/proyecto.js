class Cliente {
    id_cliente;
    nombre;
    apellido_paterno;
    dni;
    telefono;

    constructor(id, nom, ape, dni, tel) {
        this.id_cliente = id;
        this.nombre = nom;
        this.apellido_paterno = ape;
        this.dni = dni;
        this.telefono = tel;
    }
}

class Cajero {
    id_cajero;
    nombre;
    apellido_paterno;
    dni;
    telefono;
    salario;
    constructor(id, nom, ape, dni, tel, sal) {
        this.id_cajero = id;
        this.nombre = nom;
        this.apellido_paterno = ape;
        this.dni = dni;
        this.telefono = tel;
        this.salario = sal;
    }
}

class Producto {
    id_producto;
    nombre;
    precio;
    inventario;
    constructor(id, nom, prec, inv) {
        this.id_producto = id;
        this.nombre = nom;
        this.precio = prec;
        this.inventario = inv;
    }
}


class Venta {
    id_venta;
    id_cliente;
    id_cajero;
    total;
    fecha;
    constructor(id_ven, id_cli, id_caj, tot, fec) {
        this.id_venta = id_ven;
        this.id_cliente = id_cli;
        this.id_cajero = id_caj;
        this.total = tot;
        this.fecha = fec;
    }
}

class DetalleVenta {
    id_detalle_venta;
    id_venta;
    id_producto;
    cantidad;
    subtotal;
    constructor(id_det, id_ven, id_prod, cant, subtot) {
        this.id_detalle_venta = id_det;
        this.id_venta = id_ven;
        this.id_producto = id_prod;
        this.cantidad = cant;
        this.subtotal = subtot;
    }
}

class Sede {
    id_sede;
    nombre_sede;
    ciudad;
    constructor(id, nom, ciu) {
        this.id_sede = id;
        this.nombre_sede = nom;
        this.ciudad = ciu;
    }
}

class Inventario {
    id_inventario;
    id_producto;
    id_sede;
    cantidad;
    constructor(id_inv, id_prod, id_sed, cant) {
        this.id_inventario = id_inv;
        this.id_producto = id_prod;
        this.id_sede = id_sed;
        this.cantidad = cant;
    }
}

class Comprobante {
    id_comprobante;
    id_venta;
    fecha_emision;
    igv;
    total;
    constructor(id_comp, id_ven, fec_emis, igv, tot) {
        this.id_comprobante = id_comp;
        this.id_venta = id_ven;
        this.fecha_emision = fec_emis;
        this.igv = igv;
        this.total = tot;
    }
}

