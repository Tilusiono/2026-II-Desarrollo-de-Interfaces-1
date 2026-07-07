class Persona {
    nombre; 
    #dni;
    #telefono;
    #correo;

    constructor(nombre, dni, telefono, correo) {
        if (new.target === Persona) {
            throw new Error("No se puede crear un objeto de Persona.");
        }

        this.nombre = nombre;
        this.#dni = dni;
        this.#telefono = telefono;
        this.#correo = correo;
    }

    
    mostrarDatos() {
        console.log("Nombre: " + this.nombre);
    }

    trabajar() {
        console.log("La persona trabaja.");
    }

    
    #validarCorreo() {
        return this.#correo.includes("@");
    }

    #validarTelefono() {
        return this.#telefono.length >= 9;
    }
}
 class Cafeteria {
    nombre;
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
    this.nombre = nombre;
    this.#tipoCafe = tipoCafe;
    this.#capacidad = capacidad;
    this.#sucursal = sucursal;
}
abrir() {
    console.log("La cafetería abrió.");
}

cerrar() {
    console.log("La cafetería cerró.");
}

// Métodos privados
#limpiar() {
    console.log("Limpiando...");
}

#contarMesas() {
    return this.#capacidad;
}
}


class Empleado extends persona{
 cargo; 
    #salario;
    #turno;
    #codigo;

    constructor(nombre, dni, telefono, correo, cargo, salario, turno, codigo) {

        super(nombre, dni, telefono, correo);

        this.cargo = cargo;
        this.#salario = salario;
        this.#turno = turno;
        this.#codigo = codigo;
    }

    mostrarCargo() {
        console.log(this.cargo);
    }

    trabajar() {
        console.log("El empleado trabaja.");
    }

    #calcularBono() {
        return this.#salario * 0.10;
    }

    #registrarEntrada() {
        console.log("Entrada registrada");
    }
}

class Vendedor extends Empleado {

    sucursal; // Pública
    #ventas;
    #comision;
    #zona;

    constructor(nombre, dni, telefono, correo, cargo, salario, turno, codigo,
        sucursal, ventas, comision, zona) {

        super(nombre, dni, telefono, correo, cargo, salario, turno, codigo);

        this.sucursal = sucursal;
        this.#ventas = ventas;
        this.#comision = comision;
        this.#zona = zona;
    }

    trabajar() {
        console.log("El vendedor vende café.");
    }

    vender() {
        console.log("Venta realizada.");
    }

    #calcularComision() {
        return this.#ventas * this.#comision;
    }

    #actualizarVentas() {
        this.#ventas++;
    }
  
}
const vendedor1 = new Vendedor(
    "Luis",
    "12345678",
    "999999999",
    "luis@email.com",
    "Vendedor",
    1500,
    "Mañana",
    "EMP001",
    "Sucursal Centro",
    20,
    5,
    "Zona Norte"
);






class Cliente {
    nombre;
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
comprar() {
    console.log("Cliente comprando");
}

consultar() {
    console.log("Consulta realizada");
}

#validarCorreo() {
    return true;
}

#registrarCompra() {
    console.log("Compra registrada");
}
}



class Producto {
    nombreProducto;
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

vender() {
    console.log("Producto vendido");
}

reponer() {
    console.log("Stock actualizado");
}

#actualizarStock() {}

#validarStock() {}

}






class Precio {
    precioUnitario;
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

calcular() {}

mostrar() {}

#aplicarDescuento() {}

#convertir() {}
}



class Ubicacion {
    direccion;
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
mostrar() {}

actualizar() {}

#validar() {}

#buscarMapa() {}
}



class Horario {
    horaApertura;
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
abrir() {}

cerrar() {}

#validarHora() {}

#cambiarTurno() {}
}




class Telefono {
    numeroPrincipal;
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
abrir() {}

cerrar() {}

#validarHora() {}

#cambiarTurno() {}
}





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



