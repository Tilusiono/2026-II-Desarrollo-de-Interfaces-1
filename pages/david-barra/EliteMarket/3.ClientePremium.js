/**======================================
 * Clase ClientePremium
 * Hereda de Cliente.
 ======================================*/
import { Cliente } from "./2.Cliente.js";
export class ClientePremium extends Cliente {                  // Define la clase ClientePremium que hereda de Cliente

    descuento;                                                 // Atributo público: porcentaje de descuento del cliente premium
    membresia;                                                 // Atributo público: tipo de membresía del cliente

    /**
     * Constructor de ClientePremium
     */
    constructor(
        id,                                                    // ID único del cliente
        nombre,                                                // Nombre del cliente
        apellido,                                              // Apellido del cliente
        telefono,                                              // Teléfono del cliente
        correo,                                                // Correo electrónico del cliente
        direccion,                                             // Dirección del cliente
        fechaRegistro = new Date(),                            // Fecha de registro (hoy por defecto)
        descuento = 20,                                        // Porcentaje de descuento (20% por defecto)
        membresia = "Gold"                                     // Tipo de membresía ("Gold" por defecto)
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

        this.descuento = descuento;                            // Asigna el descuento al atributo público
        this.membresia = membresia;                            // Asigna la membresía al atributo público
    }

    /**
     * Método privado
     */
    #tieneDescuento() {                                        // Método privado: verifica si el cliente posee descuento
        return this.descuento > 0;                             // Retorna true si el descuento es mayor que cero
    }

    /**
     * Método público
     */
    mostrarBeneficio() {                                       // Método público: muestra el beneficio del cliente premium

        if(this.#tieneDescuento())                             // Llama al método privado para verificar el descuento
            return `Descuento: ${this.descuento}%`;            // Retorna el porcentaje de descuento

        return "Sin descuento";                                // Retorna mensaje si no tiene descuento
    }
}