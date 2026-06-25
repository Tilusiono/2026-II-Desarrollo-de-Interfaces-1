
class Gimnasio {
    #nombre;
    #dirección;
    #capacidad;
    #sedes;



    /**
     * Creates an instance of Gimnasio.
     *
     * @constructor
     * @param {string} nombre 
     * @param {string} dirección 
     * @param {number} capacidad 
     * @param {string} sedes 
     */

    constructor(nombre, dirección, capacidad, sedes) {
        this.#nombre = nombre;
        this.#dirección = dirección;
        this.#capacidad = capacidad;
        this.#sedes = sedes;
    }
}

const gimnasio1 = new Gimnasio("Power Gym", "Calle Trabajo", 200, "Ate Vitarte, San Juan de Lurigancho, San Borja y Miraflores");



class Vendedor {
    #nombre;
    #apellido;
    #turno;
    #salario;


    /**
     * Creates an instance of Vendedor.
     *
     * @constructor
     * @param {string} nombre 
     * @param {string} apellido 
     * @param {string} turno 
     * @param {number} salario 
     */
    constructor(nombre, apellido, turno, salario) {
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#turno = turno;
        this.#salario = salario;
    }

}

const vendedor1 = new Vendedor("Tulio", "Manaure", "Tarde", 2000);



class Socio {
    #nombre;
    #telefono;
    #correo;
    #direccion;



    /**
     * Creates an instance of Socio.
     *
     * @constructor
     * @param {string} nombre 
     * @param {number} telefono 
     * @param {string} correo 
     * @param {string} direccion 
     */
    constructor(nombre, telefono, correo, direccion) {
        this.#nombre = nombre;
        this.#telefono = telefono;
        this.#correo = correo;
        this.#direccion = direccion;
    }
}

const socio1 = new Socio("José", "992531000", "tupapijose@soyrico.com", "San Roque Vitarte");


class Membresía {
    #nombreMembresía;
    #meses;
    #beneficios;
    #estado;

    /**
     * Creates an instance of Membresía.
     *
     * @constructor
     * @param {string} nombreMembresía 
     * @param {number} meses 
     * @param {string} beneficios 
     * @param {string} estado 
     */
    constructor(nombreMembresía, meses, beneficios, estado) {
        this.#nombreMembresía = nombreMembresía;
        this.#meses = meses;
        this.#beneficios = beneficios;
        this.#estado = estado;
    }

}

const membresia1 = new Membresía("Plan Anual Black", 12, "Acceso a todas las instalaciones durante un año", "Activa");




class Precio {
    #precioUnitario;
    #descuentoSoles;
    #pagoTotal;
    #moneda;


    /**
     * Creates an instance of Precio.
     *
     * @constructor
     * @param {number} precioUnitario 
     * @param {number} descuentoSoles 
     * @param {number} pagoTotal 
     * @param {string} moneda 
     */
    constructor(precioUnitario, descuentoSoles, pagoTotal, moneda) {
        this.#precioUnitario = precioUnitario;
        this.#descuentoSoles = descuentoSoles;
        this.#pagoTotal = pagoTotal;
        this.#moneda = moneda;
    }

}

const precio1 = new Precio(350, 50, 300, "Soles");


class Ubicacion {
    #direccion;
    #distrito;
    #referencia;
    #codigoPostal;

    /**
     * Creates an instance of Ubicacion.
     *
     * @constructor
     * @param {string} direccion 
     * @param {string} distrito 
     * @param {string} referencia 
     * @param {number} codigoPostal 
     */
    constructor(direccion, distrito, referencia, codigoPostal) {
        this.#direccion = direccion;
        this.#distrito = distrito;
        this.#referencia = referencia;
        this.#codigoPostal = codigoPostal;
    }

}


const ubicacion1 = new Ubicacion("Paradero Inca Cola", "Ate Vitarte", "A una cuadra de Idat", "15074");


class Horario {
    #horaApertura;
    #horaCierre;
    #diasAtencion;
    #turnoEspecial;

    /**
     * Creates an instance of Horario.
     *
     * @constructor
     * @param {number} horaApertura 
     * @param {number} horaCierre 
     * @param {string} diasAtencion 
     * @param {string} turnoEspecial 
     */
    constructor(horaApertura, horaCierre, diasAtencion, turnoEspecial) {
        this.#horaApertura = horaApertura;
        this.#horaCierre = horaCierre;
        this.#diasAtencion = diasAtencion;
        this.#turnoEspecial = turnoEspecial;
    }

}

const horario = new Horario("06:00", "22:00", "Lunes a Sábado", "Domingos y festivos");



class Telefono {
    #numeroPrincipal;
    #numeroSecundario;
    #codigoPais;
    #extension;




    constructor(numeroPrincipal, numeroSecundario, codigoPais, extension) {
        this.#numeroPrincipal = numeroPrincipal;
        this.#numeroSecundario = numeroSecundario;
        this.#codigoPais = codigoPais;
        this.#extension = extension;
    }
}

const telefono1 = new Telefono("976920560", "992587789", "+51", "101");




class Correo {
    #correoPrincipal;
    #correoSoporte;
    #dominio;
    #estado;



    constructor(correoPrincipal, correoSoporte, dominio, estado) {
        this.#correoPrincipal = correoPrincipal;
        this.#correoSoporte = correoSoporte;
        this.#dominio = dominio;
        this.#estado = estado;
    }

}

const correo1 = new Correo("Powe@gym.com", "soporte@powergym.com", "powergym.com", "Activo");



class Venta {
    #fecha;
    #membresiaCompradas;
    #total;
    #metodoPago;

    constructor(fecha, membresiaCompradas, total, metodoPago) {
        this.#fecha = fecha;
        this.#membresiaCompradas = membresiaCompradas;
        this.#total = total;
        this.#metodoPago = metodoPago;
    }
}
const venta1 = new Venta("22/06/2026", membresia1, 300, "Tarjeta de Crédito");

/*****PRUEBA EN CLASEEEEEEEEEEE******* */

class alumnoTop10 extends Alumno {


}

class AlumnoTercioSuperior extends Alumno {


}

class AlumnoGeneral extends Alumno {


}

