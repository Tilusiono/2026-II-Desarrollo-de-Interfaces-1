/**======================================
 * Clase ClienteFrecuente
 * Hereda de Cliente.
 ======================================*/
import { Cliente } from "./2.Cliente.js";

export class ClienteFrecuente extends Cliente {                // Define la clase ClienteFrecuente que hereda de Cliente

    puntos;                                                    // Atributo público: puntos acumulados por compras
    nivel;                                                     // Atributo público: nivel del cliente frecuente

    /**
     * Constructor de ClienteFrecuente
     */
    constructor(
        id,                                                    // ID único del cliente
        nombre,                                                // Nombre del cliente
        apellido,                                              // Apellido del cliente
        telefono,                                              // Teléfono del cliente
        correo,                                                // Correo electrónico del cliente
        direccion,                                             // Dirección del cliente
        fechaRegistro = new Date(),                            // Fecha de registro (hoy por defecto)
        puntos = 0,                                            // Puntos acumulados (0 por defecto)
        nivel = "Bronce"                                       // Nivel del cliente ("Bronce" por defecto)
    ) {

        super(                                                 // Llama al constructor de la clase Cliente
            id,
            nombre,
            apellido,
            telefono,
            correo,
            direccion,
            fechaRegistro
        );

        this.puntos = puntos;                                  // Asigna los puntos al atributo público
        this.nivel = nivel;                                    // Asigna el nivel al atributo público
    }

    /**
     * Método privado
     */
    #tienePuntos() {                                           // Método privado: verifica si el cliente tiene puntos acumulados
        return this.puntos > 0;                                // Retorna true si los puntos son mayores que cero
    }

    /**
     * Método público
     */
    mostrarPuntos() {                                          // Método público: muestra los puntos acumulados del cliente

        if(this.#tienePuntos())                                // Llama al método privado para verificar si existen puntos
            return `Puntos acumulados: ${this.puntos}`;        // Retorna la cantidad de puntos acumulados

        return "Sin puntos";                                   // Retorna mensaje si el cliente no tiene puntos
    }
}
