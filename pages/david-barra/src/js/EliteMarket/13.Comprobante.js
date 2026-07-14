/**======================================
 * Clase Comprobante
 * Genera boletas o facturas.
 =======================================*/
export class Comprobante {                                    // Define la clase Comprobante para emitir boletas o facturas

    // PRIVADOS
    #idComprobante;                                           // Campo privado: ID único del comprobante
    #tipoComprobante;                                         // Campo privado: tipo de comprobante (Boleta o Factura)

    // PÚBLICOS
    fechaEmision;                                             // Atributo público: fecha en que se emitió el comprobante
    subtotal;                                                 // Atributo público: monto antes de impuestos
    impuesto;                                                 // Atributo público: monto del IGV aplicado
    total;                                                    // Atributo público: monto total a pagar
    estadoPago;                                               // Atributo público: indica si está pagado o pendiente

    /**
     * Constructor Comprobante
     */
    constructor(
        idComprobante,                                        // ID único del comprobante
        tipoComprobante,                                      // Tipo: "Boleta" o "Factura"
        subtotal,                                             // Monto base sin impuestos
        impuesto,                                             // Monto del IGV
        total,                                                // Monto total a cobrar
        estadoPago = "Pendiente",                             // Estado de pago ("Pendiente" por defecto)
        fechaEmision = new Date()                             // Fecha de emisión (hoy por defecto)
    ) {

        this.#idComprobante = idComprobante;                  // Asigna el ID al campo privado
        this.#tipoComprobante = tipoComprobante;              // Asigna el tipo de comprobante al campo privado

        this.fechaEmision = fechaEmision;                     // Asigna la fecha de emisión al atributo público
        this.subtotal = subtotal;                             // Asigna el subtotal al atributo público
        this.impuesto = impuesto;                             // Asigna el impuesto al atributo público
        this.total = total;                                   // Asigna el total al atributo público
        this.estadoPago = estadoPago;                         // Asigna el estado de pago al atributo público
    }

    /**
     * Método privado
     */
    #pagado() {                                               // Método privado: verifica si el comprobante está pagado
        return this.estadoPago.toLowerCase() === "pagado";   // Compara el estado (en minúsculas) con la cadena "pagado"
    }

    /**
     * Método público
     */
    mostrarEstadoPago() {                                     // Método público: indica si el comprobante fue pagado o está pendiente

        if(this.#pagado())                                    // Llama al método privado para verificar el estado de pago
            return "Comprobante Pagado";                      // Retorna confirmación si el comprobante está pagado
        
        return "Comprobante Pendiente";                       // Retorna alerta si el comprobante aún no está pagado
    }

    getTipoComprobante() {                                    // Getter: permite leer el tipo de comprobante privado
        return this.#tipoComprobante;                         // Retorna el valor del campo privado #tipoComprobante
    }

    setTipoComprobante(tipo) {                                // Setter: permite cambiar el tipo de comprobante con validación

        if(typeof tipo !== "string")                          // Verifica que el nuevo tipo sea texto
            throw new Error("Tipo inválido");                 // Lanza error si el tipo no es string

        this.#tipoComprobante = tipo;                         // Actualiza el campo privado con el nuevo tipo
    }
}