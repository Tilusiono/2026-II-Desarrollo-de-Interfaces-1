///proyecto SchoolSupply.


class producto { 
     
     id;
     nombre;
     marca;
     color;
     calidad;
     precioUnitario;
     precioDocena;

    constructor (cod, nom, mar, col, cal, pUni, pDoc){
        this.id = cod;
        this.nombre = nom;
        this.marca = mar;
        this.color = col;
        this.calidad = cal;
        this.precioUnitario = pUni;
        this.precioDocena = pDoc;

    }
}

const producto1 = new producto();

class carrito{
     item;
     metodoPago;
     total;
     subtotal;
     
    constructor (itm, metPag, tot, subTot){
        this.item = itm;
        this.metodoPago = metPag;
        this.total = tot;
        this.subtotal = subTot;

    }
}

const carrito1 = new carrito();

class descuento{
     porcentajeCantidad;
     porcentajePago;
     descCantidad;
     subtotalConDescuento;
     descPago
     total
     
     
    constructor (porCant, porPag, desCant, subDesc, desPag, tot){
        this.porcentajeCantidad = porCant;
        this.porcentajePago = porPag;
        this.descCantidad = desCant;
        this.subtotalConDescuento = subDesc;
        this.descPago = desPag;
        this.total = tot;
    }
}

const descuento1 = new descuento();

class cliente{
     nombreCompleto;
     correo;
     telefono;
     direcion;
     fechaRegistro;

    constructor (nomComp, corr, tel, dir, fecReg){
        this.nombreCompleto = nomComp;
        this.correo = corr;
        this.telefono = tel;
        this.direccion = dir;
        this.fechaRegistro = fecReg;
    }
}

const cliente1 = new cliente();

class compra{
     cliente;
     carrito;
     descuento;
     fecha;
     estado;

    constructor (cli, car, desc, fec, est){
        this.cliente = cli;
        this.carrito = car;
        this.descuento = desc;
        this.fecha = fec;
        this.estado = est;
    }
}

const compra1 = new compra();

class Categoria {

    id;
    nombre;
    descripcion;
    estado;
    fechaRegistro;

    constructor(cod, nom, desc, est, fecReg) {
        this.id = cod;
        this.nombre = nom;
        this.descripcion = desc;
        this.estado = est;
        this.fechaRegistro = fecReg;
    }
}

const categoria1 = new Categoria();


class metodoPago {

    id;
    nombre;
    descuento;
    tipo;
    estado;

    constructor(cod, nom, desc, tip, est) {
        this.id = cod;
        this.nombre = nom;
        this.descuento = desc;
        this.tipo = tip;
        this.estado = est;
    }
}

const metodoPago1 = new metodoPago();


class proveedor {

    id;
    nombre;
    telefono;
    direccion;
    correo;
    ruc;

    constructor(cod, nom, tel, dir, corr, rucProv) {
        this.id = cod;
        this.nombre = nom;
        this.telefono = tel;
        this.direccion = dir;
        this.correo = corr;
        this.ruc = rucProv;
    }
}

const proveedor1 = new proveedor();


class inventario {

    id;
    producto;
    stock;
    almacen;
    fechaIngreso;
    estado;

    constructor(cod, prod, stk, alm, fecIng, est) {
        this.id = cod;
        this.producto = prod;
        this.stock = stk;
        this.almacen = alm;
        this.fechaIngreso = fecIng;
        this.estado = est;
    }
}

const inventario1 = new inventario();


class detalleCompra {

    id;
    producto;
    cantidad;
    precioUnitario;
    subtotal;
    observacion;

    constructor(cod, prod, cant, pUni, subTot, obs) {
        this.id = cod;
        this.producto = prod;
        this.cantidad = cant;
        this.precioUnitario = pUni;
        this.subtotal = subTot;
        this.observacion = obs;
    }
}

const detalleCompra1 = new detalleCompra();