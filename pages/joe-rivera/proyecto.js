/**CLASE 1**/
class Gimnasio {
    nombre;
    #direccion; 
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

    constructor(nombre, dirección, capacidad, sedes) 
    {
        this.nombre = nombre;
        this.#direccion = dirección; 
        this.#capacidad = capacidad;
        this.#sedes = sedes;
    }
    // --- MÉTODOS DE GIMNASIO ---//
    // ABSTRACCIÓN Y POLIMORFISMO//
    obtenerDetalles() { return `Gym: ${this.nombre}`; }
    verDireccion() { return this.#formatearDireccion(); }

    #formatearDireccion() { return this.#direccion; }
    #verificarAforo() { return this.#capacidad > 0; }
}

const gimnasio1 = new Gimnasio("Power Gym", "Calle Trabajo", 200, "Ate Vitarte, San Juan de Lurigancho, San Borja y Miraflores");


/**CLASE 2**/
// HERENCIa, socio hereda de Gimnasio
class Socio extends Gimnasio{
    nombre;
    #telefono;
    #correo;
    #direccion;

    constructor(nombre, telefono, correo, direccion) 
    {
        super("Power Gym", "Calle Trabajo", 200, "Sedes globales");
        this.nombre = nombre;
        this.#telefono = telefono;
        this.#correo = correo;
        this.#direccion = direccion; 
    }

    // --- MÉTODOS DE SOCIO ---//
    // POLIMORFISMO: Sobrescribe el método obtenerDetalles de la clase superior
    obtenerDetalles() { return `Socio: ${this.nombre} - Email: ${this.#correo}`; } 
    llamarSocio() { return this.#generarMarcacion(); }

    #generarMarcacion() { return `Marcando al ${this.#telefono}`; }
    #esActivo() { return true; }
}

const socio1 = new Socio("José", "992531000", "tupapijose@soyrico.com", "San Roque Vitarte");


/**CLASE 3**/
// HERENCIA, vendedor hereda de Socio 
class Vendedor extends Socio{
    nombreVendedor;
    #apellido;
    #turno;
    #salario;

    constructor(nombre, apellido, turno, salario)
    {
        super("José", "992531000", "tupapijose@soyrico.com", "San Roque Vitarte");
        this.nombreVendedor = nombre;
        this.#apellido = apellido;
        this.#turno = turno;
        this.#salario = salario;
    }

    // --- MÉTODOS DE VENDEDOR ---//
    // POLIMORFISMO//
    obtenerDetalles() { return `Vendedor: ${this.nombreVendedor} (Turno ${this.#turno})`; } 
    calcularNeto() { return this.#descontarImpuestos(); }

    #descontarImpuestos() { return this.#salario * 0.90; }
    #verificarContrato() { return true; }
}

const vendedor1 = new Vendedor("Tulio", "Manaure", "Tarde", 2000);


/**CLASE 4**/
class Membresía {
    nombreMembresía;
    #meses;
    #beneficios;
    #estado;

    constructor(nombreMembresía, meses, beneficios, estado) 
    {
        this.nombreMembresía = nombreMembresía;
        this.#meses = meses;
        this.#beneficios = beneficios;
        this.#estado = estado;
    }

    // --- MÉTODOS DE MEMBRESÍA ---
    vigencia() { return `${this.#meses} meses`; }
    estaActiva() { return this.#validarEstado(); }

    #validarEstado() { return this.#estado === "Activa"; }
    #auditar() { return true; }
}

const membresia1 = new Membresía("Plan Anual Black", 12, "Acceso a todas las instalaciones durante un año", "Activa");


/**CLASE 5**/
class Precio {
    precioUnitario;
    #descuentoSoles;
    #pagoTotal;
    #moneda;

    constructor(precioUnitario, descuentoSoles, pagoTotal, moneda) 
    {
        this.precioUnitario = precioUnitario;
        this.#descuentoSoles = descuentoSoles;
        this.#pagoTotal = pagoTotal;
        this.#moneda = moneda;
    }

    // --- MÉTODOS DE PRECIO ---
    obtenerTotal() { return this.#calcular(); }
    tipoMoneda() { return this.#moneda; }

    #calcular() { return this.precioUnitario - this.#descuentoSoles; }
    #validarMonto() { return this.#pagoTotal > 0; }
}

const precio1 = new Precio(350, 50, 300, "Soles");


/**CLASE 6**/
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

    // --- MÉTODOS DE UBICACION ---
    obtenerZona() { return this.#distrito; }
    verPostal() { return this.#ocultarPostal(); }

    #ocultarPostal() { return `CP: ${this.#codigoPostal}`; }
    #verificarReferencia() { return this.#referencia !== ""; }
}

const ubicacion1 = new Ubicacion("Paradero Inca Cola", "Ate Vitarte", "A una cuadra de Idat", "15074");


/**CLASE 7**/
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

    // --- MÉTODOS DE HORARIO ---
    verApertura() { return this.horaApertura; }
    verCierre() { return this.#horaCierre; }

    #esFinDeSemana() { return this.#diasAtencion.includes("Domingo"); }
    #alertaCierre() { return false; }
}

const horario = new Horario("06:00", "22:00", "Lunes a Sábado", "Domingos y festivos");



/**CLASE 10**/
class Membresía {
    nombreMembresía;
    #meses;
    #beneficios;
    #estado;

    
    constructor(nombreMembresía, meses, beneficios, estado) 
    {
    this.nombreMembresía = nombreMembresía;
    this.#meses = meses;
    this.#beneficios = beneficios;
    this.#estado = estado;
    
}

// --- MÉTODOS DE MEMBRESÍA ---
    vigencia() { return `${this.#meses} meses`; }
    estaActiva() { return this.#validarEstado(); }

    #validarEstado() { return this.#estado === "Activa"; }
    #auditar() { return true; }
}


const membresia1 = new Membresía("Plan Anual Black", 12, "Acceso a todas las instalaciones durante un año", "Activa");


/**CLASE 11**/
class Precio {
    precioUnitario;
    #descuentoSoles;
    #pagoTotal;
    #moneda;



constructor(precioUnitario, descuentoSoles, pagoTotal, moneda) 
{
    this.precioUnitario = precioUnitario;
    this.#descuentoSoles = descuentoSoles;
    this.#pagoTotal = pagoTotal;
    this.#moneda = moneda;

}

// --- MÉTODOS DE PRECIO ---
    obtenerTotal() { return this.#calcular(); }
    tipoMoneda() { return this.#moneda; }

    #calcular() { return this.precioUnitario - this.#descuentoSoles; }
    #validarMonto() { return this.#pagoTotal > 0; }
}


const precio1 = new Precio(350, 50, 300, "Soles");


/**CLASE 12**/

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

// --- MÉTODOS DE UBICACION ---
    obtenerZona() { return this.#distrito; }
    verPostal() { return this.#ocultarPostal(); }

    #ocultarPostal() { return `CP: ${this.#codigoPostal}`; }
    #verificarReferencia() { return this.#referencia !== ""; }
}


const ubicacion1 = new Ubicacion("Paradero Inca Cola", "Ate Vitarte", "A una cuadra de Idat", "15074");


/**CLASE 13**/
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

// --- MÉTODOS DE HORARIO ---
    verApertura() { return this.horaApertura; }
    verCierre() { return this.#horaCierre; }

    #esFinDeSemana() { return this.#diasAtencion.includes("Domingo"); }
    #alertaCierre() { return false; }
}


const horario = new Horario("06:00", "22:00", "Lunes a Sábado", "Domingos y festivos");


/**CLASE 14**/

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

// --- MÉTODOS DE CORREO ---
    despachar() { return this.#enviar(); }
    estadoCuenta() { return this.#estado; }

    #enviar() { return `Destino: ${this.correoPrincipal}`; }
    #filtrarSpam() { return true; }
}


const correo1 = new Correo("Powe@gym.com", "soporte@powergym.com", "powergym.com", "Activo");


/**CLASE 15**/

class Venta {
    fecha;
    #membresiaCompradas;
    #total;
    #metodoPago;

constructor(fecha, membresiaCompradas, total, metodoPago) 
{
    this.fecha = fecha;
    this.#membresiaCompradas = membresiaCompradas;
    this.#total = total;
    this.#metodoPago = metodoPago;   
}
// --- MÉTODOS DE VENTA ---
    imprimirTicket() { return this.#generarCuerpo(); }
    montoTotal() { return this.#total; }

    #generarCuerpo() { return `Ticket del ${this.fecha}`; }
    #validarTarjeta() { return this.#metodoPago === "Tarjeta de Crédito"; }
}

const venta1 = new Venta("22/06/2026", membresia1, 300, "Tarjeta de Crédito");

