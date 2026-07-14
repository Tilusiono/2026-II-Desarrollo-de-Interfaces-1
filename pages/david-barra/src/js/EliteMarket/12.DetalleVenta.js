/**======================================
 * Clase DetalleVenta
 * Detalles de productos vendidos.
 ======================================*/
export class DetalleVenta {                                   // Define la clase DetalleVenta para el desglose de cada línea vendida

    // PRIVADOS
    #idDetalleVenta;                                          // Campo privado: ID único del detalle de venta
    #cantidad;                                                // Campo privado: cantidad de unidades de ese producto vendidas

    // PÚBLICOS
    precioUnitario;                                           // Atributo público: precio por unidad del producto
    subtotal;                                                 // Atributo público: subtotal de esa línea de venta
    descuento;                                                // Atributo público: descuento aplicado a esa línea

    /**
     * Constructor DetalleVenta
     */
    constructor(
        idDetalleVenta,                                       // ID único del detalle
        cantidad,                                             // Cantidad de unidades vendidas
        precioUnitario,                                       // Precio por unidad del producto
        subtotal,                                             // Subtotal de la línea (cantidad × precio)
        descuento = 0                                         // Descuento en 0 por defecto
    ) {

        this.#idDetalleVenta = idDetalleVenta;                // Asigna el ID al campo privado
        this.#cantidad = cantidad;                            // Asigna la cantidad al campo privado

        this.precioUnitario = precioUnitario;                 // Asigna el precio unitario al atributo público
        this.subtotal = subtotal;                             // Asigna el subtotal al atributo público
        this.descuento = descuento;                           // Asigna el descuento al atributo público
    }

    /**
     * Método privado
     */
    #calcularSubtotal() {                                     // Método privado: calcula el subtotal multiplicando cantidad × precio
        return this.#cantidad * this.precioUnitario;          // Multiplica la cantidad privada por el precio unitario público
    }

    /**
     * Método público
     */
    mostrarSubtotal() {                                       // Método público: muestra el subtotal calculado
        return `Subtotal: ${this.#calcularSubtotal()}`;       // Llama al método privado y retorna el resultado formateado
    }

    getCantidad() {                                           // Getter: permite leer la cantidad privada del detalle
        return this.#cantidad;                                // Retorna el valor del campo privado #cantidad
    }

    setCantidad(cantidad) {                                   // Setter: permite actualizar la cantidad con validación

        if(typeof cantidad !== "number")                      // Verifica que la nueva cantidad sea número
            throw new Error("Cantidad inválida");             // Lanza error si el tipo no es válido

        this.#cantidad = cantidad;                            // Actualiza el campo privado con la nueva cantidad
    }
}