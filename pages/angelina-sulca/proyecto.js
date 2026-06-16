///proyecto SchoolSupply.


class producto{
    let id;
    let nombre;
    let marca;
    let color;
    let calidad;
    let precioUnitario;
    let precioDocena;
}

class carrito{
    let item;
    let metodoPago;
    let total;
    let subtotal; 
}

class descuento{
    let porcentajeCantidad;
    let porcentanjePago;
    let descCantidad;
    let subtotalconDescuento;
    let descPago
    let total
}

class cliente{
    let nombreCompleto;
    let correo;
    let telefono;
    let dirrecion;
    let fechaRegistro;
}

class compra{
    let cliente;
    let carrito;
    let descuento;
    let fecha;
    let estado;
}