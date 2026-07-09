class Persona {
    nombre;
    apellido;
    #telefono;
    #correo;

    constructor(nombre, apellido, telefono, correo) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.#telefono = telefono;
        this.#correo = correo;
    }

    // 2 Métodos Privados
    #validarIdentidad() { return true; }
    #formatearNombre() { return `${this.nombre} ${this.apellido}`; }

    // 2 Métodos Públicos//
    obtenerDetalles() {
        // Método base (opcional, los hijos lo sobrescriben)
        console.log(`[Persona]: ${this.nombre} ${this.apellido}`);
    }

    presentarse() {
        if (this.#validarIdentidad()) {
            console.log(`Hola, mi nombre es ${this.#formatearNombre()}`);
        }
    }
}


/**CLASE 1, Socio (Hereda de Persona)**/

class Socio extends Persona {
    #direccion;
    tipoCliente;
    #historialAccesos = [];
    #deudaPendiente = 0;

    constructor(nombre, apellido, telefono, correo, direccion, tipoCliente = "Normal", historialAccesos = [], deudaPendiente = 0) {
        super(nombre, apellido, telefono, correo);
        this.#direccion = direccion;
        this.tipoCliente = tipoCliente;
        // Inicializamos con algunas fechas de ejemplo para el ciclo
        this.#historialAccesos = historialAccesos.length > 0 ? historialAccesos : [new Date(), new Date()];
        this.#deudaPendiente = deudaPendiente;
    }
    // 2 Métodos Privados
    #verificarEstadoCuenta() { return this.#deudaPendiente === 0; }
    #registrarVisita() { this.#historialAccesos.push(new Date()); }

    // 2 Métodos Públicos //
    obtenerDetalles() {
        console.log(`[Socio]: ${this.nombre} ${this.apellido} (${this.tipoCliente})`);
    }

    // PRIMER MÉTODO CON CICLOS (for...of y switch)
    mostrarHistorialYResumen() {
        console.log(`--- Historial de accesos de ${this.nombre} ---`);

        // Uso de ciclo FOR para recorrer los accesos
        for (const fecha of this.#historialAccesos) {
            console.log(`Acceso registrado el: ${fecha.toLocaleDateString()}`);
        }

        // Uso de SWITCH basado en el tipo de cliente
        switch (this.tipoCliente) {
            case "Normal":
                console.log("Sugerencia: Pásate a Premium para obtener pases de invitados.");
                break;
            case "Premium":
                console.log("¡Gracias por ser miembro VIP!");
                break;
            default:
                console.log("Tipo de cliente no reconocido.");
        }
    }

    intentarIngreso() {
        if (this.#verificarEstadoCuenta()) {
            this.#registrarVisita();
            console.log("Ingreso autorizado al gimnasio.");
        }
    }
}



/**CLASE 2: SocioPremium (Hereda de Socio)**/

class SocioPremium extends Socio {
    #casilleroAsignado;
    beneficioExtra = "Acceso Spa";
    #pasesInvitado = 5;
    #codigoVip = "VIP-100";

    constructor(nombre, apellido, telefono, correo, direccion, tipoCliente, casilleroAsignado) {
        super(nombre, apellido, telefono, correo, direccion, "Premium");
        this.#casilleroAsignado = casilleroAsignado;
    }
    #consumirPase() { this.#pasesInvitado--; }
    #validarCasillero() { return this.#casilleroAsignado != null; }

    // 2 Métodos Públicos

    obtenerDetalles() {
        console.log(`[Socio Premium]: ${this.nombre} ${this.apellido} (Casillero: ${this.#casilleroAsignado})`);
    }

    // SEGUNDO MÉTODO CON CICLOS (do...while)
    gastarMultiplesPases(cantidad) {
        console.log(`Intentando gastar ${cantidad} pases de invitado...`);
        let pasesGastados = 0;

        // Uso de ciclo DO...WHILE
        do {
            if (this.#pasesInvitado > 0) {
                this.#consumirPase();
                pasesGastados++;
            } else {
                console.log("¡Te has quedado sin pases!");
                break;
            }
        } while (pasesGastados < cantidad);

        console.log(`Se procesaron ${pasesGastados} invitaciones. Pases restantes: ${this.#pasesInvitado}`);
    }

    invitarAmigo() {
        if (this.#pasesInvitado > 0) {
            this.#consumirPase();
            console.log("Invitación procesada. Pases restantes: " + this.#pasesInvitado);
        }
    }
}

/**CLASE 3: Vendedor (Hereda de Persona)**/

class Vendedor extends Persona {
    #turno;
    #salario;
    codigoVendedor;
    #comisionAcumulada;

    constructor(nombre, apellido, telefono, correo, codigoVendedor, turno, salario) {
        super(nombre, apellido, telefono, correo);
        this.#turno = turno;
        this.#salario = salario;
        this.codigoVendedor = codigoVendedor;
        this.#comisionAcumulada = 0;
    }

    // 2 Métodos Privados//

    #calcularBono() { return this.#comisionAcumulada * 0.10; }
    #registrarVentaInterna() { this.#comisionAcumulada += 50; }

    // 2 Métodos Públicos//
    obtenerDetalles() {
        console.log(`[Vendedor]: ${this.nombre} ${this.apellido} (Turno: ${this.#turno})`);
    }
    registrarNuevaVenta() {
        this.#registrarVentaInterna();
        console.log(`Venta registrada por el código: ${this.codigoVendedor}`);
    }
}


/**CLASE 4**/
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

    constructor(nombre, dirección, capacidad, sedes) {
        this.nombre = nombre;
        this.#direccion = dirección;
        this.#capacidad = capacidad;
        this.#sedes = sedes;
    }

    // 2 Métodos Privados

    #evaluarAforo() { return true; }
    #notificarAdministrador() { return "Alerta enviada"; }

    // 2 Métodos Públicos
    obtenerDetalles() {
        console.log(`[Gym]: ${this.nombre}`);
    }
    verificarEstadoSedes() {
        this.#notificarAdministrador();
        console.log(`Sedes operativas en: ${this.#sedes}`);
    }
}

const gimnasio1 = new Gimnasio("Power Gym", "Calle Trabajo", 200, "Ate Vitarte, San Juan de Lurigancho, San Borja y Miraflores");



/**CLASE 5**/
class Membresía {
    nombreMembresía;
    #meses;
    #beneficios;
    #estado;

    constructor(nombreMembresía, meses, beneficios, estado) {
        this.nombreMembresía = nombreMembresía;
        this.#meses = meses;
        this.#beneficios = beneficios;
        this.#estado = estado;
    }

    // 2 Métodos Privados

    #calcularDiasRestantes() { return this.#meses * 30; }
    #cambiarEstadoInterno(nuevoEstado) { this.#estado = nuevoEstado; }

    // 2 Métodos Públicos
    obtenerDetalles() {
        console.log(`[Membresía]: ${this.nombreMembresía} (${this.#meses} meses)`);
    }
    cancelarSuscripcion() {
        this.#cambiarEstadoInterno("Inactiva");
        console.log("La membresía ha sido cancelada.");
    }
}

const membresia1 = new Membresía("Plan Anual Black", 12, "Acceso a todas las instalaciones durante un año", "Activa");


/**CLASE 6**/
class Precio {
    precioUnitario;
    #descuentoSoles;
    #pagoTotal;
    #moneda;

    constructor(precioUnitario, descuentoSoles, pagoTotal, moneda) {
        this.precioUnitario = precioUnitario;
        this.#descuentoSoles = descuentoSoles;
        this.#pagoTotal = pagoTotal;
        this.#moneda = moneda;
    }

    // 2 Métodos Privados
    #calcularImpuesto() { return this.precioUnitario * 0.18; }
    #verificarDescuentoValido() { return this.#descuentoSoles >= 0; }

    // 2 Métodos Públicos
    obtenerDetalles() {
        console.log(`[Precio]: ${this.precioUnitario} ${this.#moneda} (Total: ${this.#pagoTotal})`);
    }
    mostrarDesglose() {
        console.log(`Impuesto estimado: S/. ${this.#calcularImpuesto()}`);
    }
}

const precio1 = new Precio(350, 50, 300, "Soles");


/**CLASE 7**/
class Ubicacion {
    direccion;
    #distrito;
    #referencia;
    #codigoPostal;

    constructor(direccion, distrito, referencia, codigoPostal) {
        this.direccion = direccion;
        this.#distrito = distrito;
        this.#referencia = referencia;
        this.#codigoPostal = codigoPostal;
    }

    // 2 Métodos Privados**/

    #obtenerCoordenadas() { return "-12.04, -76.94"; }
    #formatearDireccion() { return `${this.direccion}, ${this.#distrito}`; }

    // 2 Métodos Públicos**/

    obtenerDetalles() {
        console.log(`[Ubicación]: ${this.direccion}, ${this.#distrito}`);
    }
    imprimirFichaUbicacion() {
        console.log(`Referencia de llegada: ${this.#referencia}`);
    }
}
const ubicacion1 = new Ubicacion("Paradero Inca Cola", "Ate Vitarte", "A una cuadra de Idat", "15074");


/**CLASE 8**/
class Horario {
    horaApertura;
    #horaCierre;
    #diasAtencion;
    #turnoEspecial;

    constructor(horaApertura, horaCierre, diasAtencion, turnoEspecial) {
        this.horaApertura = horaApertura;
        this.#horaCierre = horaCierre;
        this.#diasAtencion = diasAtencion;
        this.#turnoEspecial = turnoEspecial;
    }

    // 2 Métodos Privados
    #esFinDeSemana() { return false; }
    #calcularTotalHoras() { return 16; }

    // 2 Métodos Públicos
    obtenerDetalles() {
        console.log(`[Horario]: ${this.horaApertura} - ${this.#horaCierre} (${this.#diasAtencion})`);
    }
    mostrarAvisoCierre() {
        console.log(`El establecimiento cierra puntualmente a las ${this.#horaCierre}`);
    }
}

const horario = new Horario("06:00", "22:00", "Lunes a Sábado", "Domingos y festivos");


/**CLASE 9**/
class Correo {
    correoPrincipal;
    #correoSoporte;
    #dominio;
    #estado;

    constructor(correoPrincipal, correoSoporte, dominio, estado) {
        this.correoPrincipal = correoPrincipal;
        this.#correoSoporte = correoSoporte;
        this.#dominio = dominio;
        this.#estado = estado;
    }

    // 2 Métodos Privados//

    #validarEstructura() { return true; }
    #enviarCopiaOculta() { return "Copia enviada"; }

    // 2 Métodos Públicos//

    obtenerDetalles() {
        console.log(`[Correo]: ${this.correoPrincipal} (Estado: ${this.#estado})`);
    }
    cambiarEstadoCorreo(nuevoEstado) {
        this.#estado = nuevoEstado;
        console.log(`Estado del correo actualizado a: ${this.#estado}`);
    }
}
const correo1 = new Correo("Powe@gym.com", "soporte@powergym.com", "powergym.com", "Activo");


/**CLASE 10**/
class Venta {
    fecha;
    #membresiaCompradas;
    #total;
    #metodoPago;

    constructor(fecha, membresiaCompradas, total, metodoPago) {
        this.fecha = fecha;
        this.#membresiaCompradas = membresiaCompradas;
        this.#total = total;
        this.#metodoPago = metodoPago;
    }

    // 2 Métodos Privados
    #generarComprobanteId() { return "NRO-44910"; }
    #aplicarComisionBanco() { return this.#total * 0.02; }

    // 2 Métodos Públicos
    obtenerDetalles() {
        console.log(`[Venta]: Fecha ${this.fecha} - Total: S/. ${this.#total}`);
    }
    procesarTransaccion() {
        console.log(`Transacción completada exitosamente mediante: ${this.#metodoPago}`);
    }
}

const venta1 = new Venta("22/06/2026", membresia1, 300, "Tarjeta de Crédito");


/**CLASE 11**/
// Agregada explícitamente para completar las 10 clases del requisito estructural original
class Reporte {
    tipoReporte;
    #formato;
    #registros;
    #responsable;

    constructor(tipoReporte, formato, registros, responsable) {
        this.tipoReporte = tipoReporte;
        this.#formato = formato;
        this.#registros = registros;
        this.#responsable = responsable;
    }

    // 2 Métodos Privados

    #comprimirArchivo() { return true; }
    #generarFirmaDigital() { return "FIRMA-OK"; }

    // 2 Métodos Públicos

    obtenerDetalles() {
        console.log(`[Reporte]: Tipo ${this.tipoReporte} generado por ${this.#responsable}`);
    }
    exportarReporte() {
        this.#comprimirArchivo();
        console.log(`Reporte en formato ${this.#formato} descargado correctamente.`);
    }
}

const reporte1 = new Reporte("Ventas Diarias", "PDF", 150, "Tulio Manaure");




//********** AGREGO ESTO xdd *****/


const socio1 = new Socio("Osvaldo", "Sanchez", "992531000", "sideralTeAmo@mail.com", "San Roque Vitarte");
const socioPremium1 = new SocioPremium("Josè", "Villanueva", "999888777", "chupapapi_muñaños@vip.com", "La Molina", "Premium", 104);
const vendedor1 = new Vendedor("Tulio", "Manaure", "955444333", "tulio_dale_chupetin@gym.com", "VEND01", "Tarde", 2000);

// --- PRUEBA DE POLIMORFISMO VÍA CONSOLE.LOG ---
console.log("--- EJECUTANDO POLIMORFISMO ---");
gimnasio1.obtenerDetalles();
socio1.obtenerDetalles();
socioPremium1.obtenerDetalles();
vendedor1.obtenerDetalles();
membresia1.obtenerDetalles();
precio1.obtenerDetalles();
ubicacion1.obtenerDetalles();
horario.obtenerDetalles();
correo1.obtenerDetalles();
venta1.obtenerDetalles();
reporte1.obtenerDetalles();
