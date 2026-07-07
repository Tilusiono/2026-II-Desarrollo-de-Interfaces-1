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
     * @param {String} nombre 
     * @param {string} tipoCafe 
     * @param {Number} capacidad 
     * @param {String} sucursal 
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
const cafeteria1 = new Cafeteria(
    "Central",
    "Arábica",
    120,
    "Sucursal Centro"
);

class Empleado extends Persona{
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
    this.nombre = nombre;
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
const cliente1 = new Cliente(
    "Luis",
    "999999999",
    "luis@email.com",
    "Av. Principal 123"
);



class Producto {
    nombreProducto;
    #categoria;
    #stock;
    #descripcion;

    constructor(nombreProducto, categoria, stock, descripcion) 
{
    this.nombreProducto = nombreProducto;
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
const producto1 = new Producto(
    "Latte",
    "Bebida",
    20,
    "Café con leche"
);



class Precio {
    precioUnitario;
    #descuento;
    #precioFinal;
    #moneda;

constructor(precioUnitario, descuento, precioFinal, moneda) 
{
    this.precioUnitario = precioUnitario;
    this.#descuento = descuento;
    this.#precioFinal = precioFinal;
    this.#moneda = moneda;
}

calcular() {}

mostrar() {}

#aplicarDescuento() {}

#convertir() {}
}
const precio1 = new Precio(
    10,
    2,
    8,
    "Soles"
);


class Ubicacion {
    direccion;
    #distrito;
    #referencia;
    #codigoPostal;
constructor(direccion, distrito, referencia, codigoPostal) 
{
    this.direccion = direccion;
    this.#distrito = distrito;
    this.#referencia = referencia;
    this.#codigoPostal = codigoPostal;
}
mostrar() {}

actualizar() {}

#validar() {}

#buscarMapa() {}
}
const ubicacion1 = new Ubicacion(
    "Av. Principal 123",
    "Miraflores",
    "Frente al parque",
    "15074"
);


class Horario {
    horaApertura;
    #horaCierre;
    #diasAtencion;
    #turnoEspecial;

constructor(horaApertura, horaCierre, diasAtencion, turnoEspecial) 
{
    this.horaApertura = horaApertura;
    this.#horaCierre = horaCierre;
    this.#diasAtencion = diasAtencion;
    this.#turnoEspecial = turnoEspecial;
}
abrir() {}

cerrar() {}

#validarHora() {}

#cambiarTurno() {}
}
const horario1 = new Horario(
    "08:00",
    "20:00",
    "Lunes a Sábado",
    "Noche"
);




class Telefono {
    numeroPrincipal;
    #numeroSecundario;
    #codigoPais;
    #extension;

constructor(numeroPrincipal, numeroSecundario, codigoPais, extension)
 {
    this.numeroPrincipal = numeroPrincipal;
    this.#numeroSecundario = numeroSecundario;
    this.#codigoPais = codigoPais;
    this.#extension = extension;
}
llamar() {}

mostrar() {}

#validarNumero() {}

#registrar() {}
}

const telefono1 = new Telefono(
    "987654321",
    "912345678",
    "+51",
    "101"
);



class Correo {
    correoPrincipal;
    #correoSoporte;
    #dominio;
    #estado;

constructor(correoPrincipal, correoSoporte, dominio, estado) 
{
    this.correoPrincipal = correoPrincipal;
    this.#correoSoporte = correoSoporte;
    this.#dominio = dominio;
    this.#estado = estado;
}
enviar() {}

mostrar() {}

#validarCorreo() {}

#registrar() {}
}
const correo1 = new Correo(
    "info@cafe.com",
    "soporte@cafe.com",
    "cafe.com",
    "Activo"
);





class Venta {
    fecha;
    #cantidad;
    #total;
    #metodoPago;

constructor(fecha, cantidad, total, metodoPago) 
{
    this.fecha = fecha;
    this.#cantidad = cantidad;
    this.#total = total;
    this.#metodoPago = metodoPago;  
}
registrar() {}

imprimir() {}

#calcularTotal() {}

#guardarVenta() {}

}
const venta1 = new Venta(
    "18/06/2026",
    3,
    30,
    "Efectivo"
);






