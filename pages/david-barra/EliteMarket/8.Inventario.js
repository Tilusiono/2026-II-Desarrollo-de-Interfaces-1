/**======================================
 * Clase Inventario
 * Controla las existencias de productos.
 ======================================*/
 export class Inventario {                                    // Define la clase Inventario para controlar existencias

    // ATRIBUTOS PRIVADOS
    #idInventario;                                            // Campo privado: ID único del inventario
    #cantidadDisponible;                                      // Campo privado: cantidad actual de unidades en stock

    // ATRIBUTOS PÚBLICOS
    cantidadMinima;                                           // Atributo público: cantidad mínima permitida antes de reponer
    cantidadMaxima;                                           // Atributo público: cantidad máxima que puede almacenarse
    ubicacion;                                                // Atributo público: lugar físico del almacén
    fechaActualizacion;                                       // Atributo público: última fecha de actualización del inventario

    /**
     * Constructor de Inventario
     */
    constructor(
        idInventario,                                         // ID único del inventario
        cantidadDisponible,                                   // Cantidad actual de unidades disponibles
        cantidadMinima = 0,                                   // Cantidad mínima (0 por defecto)
        cantidadMaxima = 100,                                 // Cantidad máxima (100 por defecto)
        ubicacion = "",                                       // Ubicación vacía por defecto
        fechaActualizacion = new Date()                       // Fecha de actualización (hoy por defecto)
    ) {

        if(typeof idInventario !== "number")                  // Valida que el ID sea número
            throw new Error("ID inválido");                   // Lanza error si el ID no es número

        if(typeof cantidadDisponible !== "number")            // Valida que la cantidad disponible sea número
            throw new Error("Cantidad disponible inválida");  // Lanza error si el tipo no es válido

        this.#idInventario = idInventario;                    // Asigna el ID al campo privado
        this.#cantidadDisponible = cantidadDisponible;        // Asigna la cantidad disponible al campo privado

        this.cantidadMinima = cantidadMinima;                 // Asigna la cantidad mínima al atributo público
        this.cantidadMaxima = cantidadMaxima;                 // Asigna la cantidad máxima al atributo público
        this.ubicacion = ubicacion;                           // Asigna la ubicación al atributo público
        this.fechaActualizacion = fechaActualizacion;         // Asigna la fecha de actualización al atributo público
    }

    /**
     * Método privado
     * Verifica si el stock está por debajo del mínimo.
     */
    #stockBajo() {                                            // Método privado: detecta si el stock está en nivel crítico
        return this.#cantidadDisponible <= this.cantidadMinima; // Retorna true si la cantidad disponible no supera el mínimo
    }

    /**
     * Método público
     */
    mostrarEstadoStock() {                                    // Método público: informa si el stock es suficiente o bajo

        if(this.#stockBajo())                                 // Llama al método privado para verificar si el stock es bajo
            return "Stock Bajo";                              // Retorna alerta si la cantidad es crítica

        return "Stock Disponible";                            // Retorna estado normal si hay suficiente stock
    }

    // GETTERS

    getIdInventario() {                                       // Getter: permite leer el ID privado del inventario
        return this.#idInventario;                            // Retorna el valor del campo privado #idInventario
    }

    getCantidadDisponible() {                                 // Getter: permite leer la cantidad disponible privada
        return this.#cantidadDisponible;                      // Retorna el valor del campo privado #cantidadDisponible
    }

    // SETTERS

    setCantidadDisponible(cantidad) {                         // Setter: permite actualizar la cantidad disponible con validación

        if(typeof cantidad !== "number")                      // Verifica que la nueva cantidad sea número
            throw new Error("Cantidad inválida");             // Lanza error si el tipo no es válido

        this.#cantidadDisponible = cantidad;                  // Actualiza el campo privado con la nueva cantidad
    }
}
