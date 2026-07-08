/**======================================
 * Clase Venta
 * Registra una venta realizada.
 ======================================*/
export class Venta {                                          // Define la clase Venta para registrar transacciones completadas

    // PRIVADOS
    #idVenta;                                                 // Campo privado: ID único de la venta
    #total;                                                   // Campo privado: monto total de la venta

    // PÚBLICOS
    fecha;                                                    // Atributo público: fecha en que se realizó la venta
    total;                                                    // Atributo público: total accesible desde fuera
    metodoPago;                                               // Atributo público: forma de pago usada (efectivo, tarjeta, etc.)
    descuento;                                                // Atributo público: monto de descuento aplicado
    impuesto;                                                 // Atributo público: monto de impuesto (IGV) aplicado
    estado;                                                   // Atributo público: estado de la venta (Completada, etc.)

    /**
     * Constructor Venta
     */
    constructor(
        idVenta,                                              // ID único de la venta
        total,                                                // Monto total de la venta
        metodoPago = "Efectivo",                              // Método de pago ("Efectivo" por defecto)
        descuento = 0,                                        // Descuento en 0 por defecto
        impuesto = 0,                                         // Impuesto en 0 por defecto
        estado = "Completada",                                // Estado "Completada" por defecto
        fecha = new Date()                                    // Fecha de venta (hoy por defecto)
    ) {

        if(typeof idVenta !== "number")                       // Valida que el ID sea número
            throw new Error("ID inválido");                   // Lanza error si el ID no es número

        if(typeof total !== "number")                         // Valida que el total sea número
            throw new Error("Total inválido");                // Lanza error si el total no es número

        this.#idVenta = idVenta;                              // Asigna el ID al campo privado
        this.#total = total;                                  // Asigna el total al campo privado

        this.fecha = fecha;                                   // Asigna la fecha al atributo público
        this.metodoPago = metodoPago;                         // Asigna el método de pago al atributo público
        this.descuento = descuento;                           // Asigna el descuento al atributo público
        this.impuesto = impuesto;                             // Asigna el impuesto al atributo público
        this.estado = estado;                                 // Asigna el estado al atributo público
    }

    /**
     * Método privado
     */
    #aplicaDescuento() {                                      // Método privado: verifica si se aplicó algún descuento
        return this.descuento > 0;                            // Retorna true si el descuento es mayor a cero
    }

    /**
     * Método público
     */
    calcularTotal() {                                         // Método público: calcula y muestra el total final de la venta

        let totalFinal =                                      // Declara variable para almacenar el total calculado
            this.#total -                                     // Parte del monto base de la venta
            this.descuento +                                  // Resta el descuento aplicado
            this.impuesto;                                    // Suma el impuesto correspondiente

        if(this.#aplicaDescuento())                           // Verifica si hubo descuento en la venta
            return `Total con descuento: ${totalFinal}`;      // Retorna total indicando que se aplicó descuento

        return `Total: ${totalFinal}`;                        // Retorna total sin mención de descuento
    }

    getIdVenta() {                                            // Getter: permite leer el ID privado de la venta
        return this.#idVenta;                                 // Retorna el valor del campo privado #idVenta
    }

    getTotal() {                                              // Getter: permite leer el total privado de la venta
        return this.#total;                                   // Retorna el valor del campo privado #total
    }

    setTotal(total) {                                         // Setter: permite actualizar el total de la venta con validación

        if(typeof total !== "number")                         // Verifica que el nuevo total sea número
            throw new Error("Total inválido");                // Lanza error si el tipo no es válido

        this.#total = total;                                  // Actualiza el campo privado con el nuevo total
    }
}