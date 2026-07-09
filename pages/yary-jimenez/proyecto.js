class Cafeteria {
    #nombre;
    #tipoCafe;
    #capacidad;
    #sucursal;

    /**
     * 
     * @param {number} nombre 
     * @param {string} tipoCafe 
     * @param {string} capacidad 
     * @param {number} sucursal 
     */

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


class Cliente  extends Persona {

    categoria;
    #direccion;
    #puntos;
    #codigoCliente;

    constructor(nombre, dni, telefono, correo,
                categoria, direccion, puntos, codigoCliente) {

        super(nombre, dni, telefono, correo);

        this.categoria = categoria;
        this.#direccion = direccion;
        this.#puntos = puntos;
        this.#codigoCliente = codigoCliente;
    }

    comprar() {
       const productos = ["Latte", "Capuccino", "Espresso"];

    console.log("Productos comprados:");

    for (let i = 0; i < productos.length; i++) {
        switch (productos[i]) {
            case "Latte":
                console.log("- Latte: S/10");
                break;
            case "Capuccino":
                console.log("- Capuccino: S/12");
                break;
            case "Espresso":
                console.log("- Espresso: S/8");
                break;
        }
    }
}

    consultar() {
        console.log("Consulta realizada");
    }

    trabajar() {
        console.log("El cliente no trabaja en la cafetería.");
    }

    #registrarCompra() {
        console.log("Compra registrada");
    }

    #actualizarPuntos() {
        this.#puntos += 10;
    }
}

const cliente1 = new Cliente(
    "Luis",
    "12345678",
    "999999999",
    "luis@email.com",
    "Frecuente",
    "Av. Principal 123",
    120,
    "CLI001"
);

class Conserje extends Empleado {

    area;
    #productosLimpieza;
    #horarioLimpieza;
    #sector;

    constructor(nombre, dni, telefono, correo,
        cargo, salario, turno, codigo,
        area, productosLimpieza, horarioLimpieza, sector) {

        super(nombre, dni, telefono, correo,
            cargo, salario, turno, codigo);

        this.area = area;
        this.#productosLimpieza = productosLimpieza;
        this.#horarioLimpieza = horarioLimpieza;
        this.#sector = sector;
    }

    trabajar() {
        console.log("El conserje realiza labores de limpieza.");
    }

    limpiar() {
       let area = 1;

    while (area <= 3) {
        console.log("Limpiando área " + area);
        area++;
    }
}
    #revisarMateriales() {
        console.log("Materiales revisados.");
    }

    #registrarLimpieza() {
        console.log("Limpieza registrada.");
    }
}

const conserje1 = new Conserje(
    "Carlos",
    "87654321",
    "988888888",
    "carlos@email.com",
    "Conserje",
    1300,
    "Tarde",
    "EMP010",
    "Área de mesas",
    "Detergente",
    "18:00",
    "Primer piso"
);

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


class Sede {

    nombre;
    #direccion;
    #horarioAtencion;
    #capacidad;

    constructor(nombre, direccion, horarioAtencion, capacidad) {

        this.nombre = nombre;
        this.#direccion = direccion;
        this.#horarioAtencion = horarioAtencion;
        this.#capacidad = capacidad;
    }

    abrir() {
         let hora = 8;

    do {
        console.log("Atendiendo desde las " + hora + ":00");
        hora++;
    } while (hora <= 10);
}

    cerrar() {
        console.log("La sede cerró.");
    }

    mostrarHorario() {
        console.log("Horario: " + this.#horarioAtencion);
    }

    #validarCapacidad() {
        return this.#capacidad > 0;
    }

    #actualizarHorario(nuevoHorario) {
        this.#horarioAtencion = nuevoHorario;
    }
}

const sede1 = new Sede(
    "Sucursal Centro",
    "Av. Principal 123",
    "Lunes a Sábado 08:00 - 20:00",
    120
);

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


class AlumnoTop10 extends Alumno{

}

class AlumnoTercioSuperior extends Alumno{

}

class AlumnoGeneral extends Alumno{

}



