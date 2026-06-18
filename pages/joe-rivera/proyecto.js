class Mercado {
    nombre;
    tipoCafe;
    capacidad;
    sucursal;

    constructor(nombre, tipoCafe, capacidad) 
{
    this.nombre = nombre;
    this.tipoCafe = tipoCafe;
    this.capacidad = capacidad;
}
}

const cafeteria1 = new Mercado("Central", "Arábica", 120, "Sucursal Centro");



class Vendedor {
    nombre;
    apellido;
    turno;
    salario;
constructor(nombre, apellido, turno)
 {
    this.nombre = nombre;
    this.apellido = apellido;
    this.turno = turno;
}

}

const vendedor1 = new Vendedor("Luis", "Gómez", "Mañana", 1500);



class Cliente {
    nombre;
    telefono;
    correo;
    direccion;

    constructor(nombre, telefono, correo) 
{
    this.nombre = nombre;
    this.telefono = telefono;
    this.correo = correo;
}
}

const vendedor1 = new Vendedor("Luis", "Gómez", "Mañana", 1500);


class Producto {
    nombreProducto;
    categoria;
    stock;
    descripcion;

    constructor(nombreProducto, categoria, stock) 
{
    this.nombreProducto = nombreProducto;
    this.categoria = categoria;
    this.stock = stock;
}

}

const producto1 = new Producto("Latte", "Bebida", 20, "Café con leche");





class Precio {
    precioUnitario;
    descuento;
    precioFinal;
    moneda;

constructor(precioUnitario, descuento, precioFinal) 
{
    this.precioUnitario = precioUnitario;
    this.descuento = descuento;
    this.precioFinal = precioFinal;
}

}

const precio1 = new Precio(10, 2, 8, "Soles");


class Ubicacion {
    direccion;
    distrito;
    referencia;
    codigoPostal;
constructor(direccion, distrito, referencia) 
{
    this.direccion = direccion;
    this.distrito = distrito;
    this.referencia = referencia;
}

}


const ubicacion1 = new Ubicacion("Av. Principal 123", "Miraflores", "Frente al parque", "15074");


class Horario {
    horaApertura;
    horaCierre;
    diasAtencion;
    turnoEspecial;

constructor(horaApertura, horaCierre, diasAtencion) 
{
    this.horaApertura = horaApertura;
    this.horaCierre = horaCierre;
    this.diasAtencion = diasAtencion;
}

}

const horario1 = new Horario("08:00", "20:00", "Lunes a Sábado", "Noche");



class Telefono {
    numeroPrincipal;
    numeroSecundario;
    codigoPais;
    extension;

constructor(numeroPrincipal, numeroSecundario, codigoPais)
 {
    this.numeroPrincipal = numeroPrincipal;
    this.numeroSecundario = numeroSecundario;
    this.codigoPais = codigoPais;
}
}

const telefono1 = new Telefono("987654321", "912345678", "+51", "101");




class Correo {
    correoPrincipal;
    correoSoporte;
    dominio;
    estado;

constructor(correoPrincipal, correoSoporte, dominio) 
{
    this.correoPrincipal = correoPrincipal;
    this.correoSoporte = correoSoporte;
    this.dominio = dominio;
}
}

const correo1 = new Correo("info@cafe.com", "soporte@cafe.com", "cafe.com", "Activo");



class Venta {
    fecha;
    cantidad;
    total;
    metodoPago;

constructor(fecha, cantidad, total) 
{
    this.fecha = fecha;
    this.cantidad = cantidad;
    this.total = total;
}
}
const venta1 = new Venta("18/06/2026", 3, 30, "Efectivo");