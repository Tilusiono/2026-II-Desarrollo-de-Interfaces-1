class Cafeteria {
    #nombre;
    #tipoCafe;
    #capacidad;
    #sucursal;

    constructor(nombre, tipoCafe, capacidad, sucursal) 
{
    this.#nombre = nombre;
    this.#tipoCafe = tipoCafe;
    this.#capacidad = capacidad;
    this.#sucursal = sucursal;
}
}

const cafeteria1 = new Cafeteria("Central", "Arábica", 120, "Sucursal Centro");



class Vendedor {
    #nombre;
    #apellido;
    #turno;
    #salario;
constructor(nombre, apellido, turno, salario)
 {
    this.#nombre = nombre;
    this.#apellido = apellido;
    this.#turno = turno;
    this.#salario = salario;
}

}


const vendedor1 = new Vendedor("Luis", "Gómez", "Mañana", 1500);


class Cliente {
    #nombre;
    #telefono;
    #correo;
    #direccion;

    constructor(nombre, telefono, correo, direccion) 
{
    this.#nombre = nombre;
    this.#telefono = telefono;
    this.#correo = correo;
    this.#direccion = direccion;    
}
}

const cliente1 = new Cliente("Luis", "999999999", "luis@email.com", "Av. Principal 123");


class Producto {
    #nombreProducto;
    #categoria;
    #stock;
    #descripcion;

    constructor(nombreProducto, categoria, stock) 
{
    this.#nombreProducto = nombreProducto;
    this.#categoria = categoria;
    this.#stock = stock;
    this.#descripcion = descripcion;
}

}

const producto1 = new Producto("Latte", "Bebida", 20, "Café con leche");





class Precio {
    #precioUnitario;
    #descuento;
    #precioFinal;
    #moneda;

constructor(precioUnitario, descuento, precioFinal) 
{
    this.#precioUnitario = precioUnitario;
    this.#descuento = descuento;
    this.#precioFinal = precioFinal;
    this.#moneda = moneda;
}

}

const precio1 = new Precio(10, 2, 8, "Soles");


class Ubicacion {
    #direccion;
    #distrito;
    #referencia;
    #codigoPostal;
constructor(direccion, distrito, referencia) 
{
    this.#direccion = direccion;
    this.#distrito = distrito;
    this.#referencia = referencia;
    this.#codigoPostal = codigoPostal;
}
}


const ubicacion1 = new Ubicacion("Av. Principal 123", "Miraflores", "Frente al parque", "15074");


class Horario {
    #horaApertura;
    #horaCierre;
    #diasAtencion;
    #turnoEspecial;

constructor(horaApertura, horaCierre, diasAtencion) 
{
    this.#horaApertura = horaApertura;
    this.#horaCierre = horaCierre;
    this.#diasAtencion = diasAtencion;
    this.#turnoEspecial = turnoEspecial;
}

}

const horario1 = new Horario("08:00", "20:00", "Lunes a Sábado", "Noche");


class Telefono {
    #numeroPrincipal;
    #numeroSecundario;
    #codigoPais;
    #extension;

constructor(numeroPrincipal, numeroSecundario, codigoPais)
 {
    this.#numeroPrincipal = numeroPrincipal;
    this.#numeroSecundario = numeroSecundario;
    this.#codigoPais = codigoPais;
    this.#extension = extension;
}
}

const telefono1 = new Telefono("987654321", "912345678", "+51", "101");




class Correo {
    #correoPrincipal;
    #correoSoporte;
    #dominio;
    #estado;

constructor(correoPrincipal, correoSoporte, dominio) 
{
    this.#correoPrincipal = correoPrincipal;
    this.#correoSoporte = correoSoporte;
    this.#dominio = dominio;
    this.#estado = estado;
}
}

const correo1 = new Correo("info@cafe.com", "soporte@cafe.com", "cafe.com", "Activo");



class Venta {
    #fecha;
    #cantidad;
    #total;
    #metodoPago;

constructor(fecha, cantidad, total) 
{
    this.#fecha = fecha;
    this.#cantidad = cantidad;
    this.#total = total;
    this.#metodoPago = metodoPago;  
}
}
const venta1 = new Venta("18/06/2026", 3, 30, "Efectivo");

