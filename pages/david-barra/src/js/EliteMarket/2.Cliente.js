/**======================================
 * Clase Cliente
 * Hereda de Persona.
 ======================================*/
import { Persona } from "./1.Persona.js";
export class Cliente extends Persona {                         // Define la clase Cliente que hereda atributos y métodos de Persona
 
    direccion;                                                 // Atributo público: dirección del cliente
    fechaRegistro;                                             // Atributo público: fecha en que el cliente se registró

    /**
     * Constructor de Cliente
     */
    constructor(
        id,                                                    // ID único del cliente
        nombre,                                               // Nombre del cliente
        apellido,                                             // Apellido del cliente
        telefono,                                             // Teléfono del cliente
        correo,                                               // Correo electrónico del cliente
        direccion = "",                                       // Dirección del cliente (vacía por defecto)
        fechaRegistro = new Date()                            // Fecha de registro (hoy por defecto)
    ) {

        super(id,nombre,apellido,telefono,correo);            // Llama al constructor de Persona con los datos comunes

        this.direccion = direccion;                           // Asigna la dirección al atributo público
        this.fechaRegistro = fechaRegistro;                   // Asigna la fecha de registro al atributo público
    }

    /**
     * Método privado
     * Verifica si el cliente tiene menos de 1 año.
     */
    #esClienteNuevo() {                                        // Método privado: verifica antigüedad del cliente

        let hoy = new Date();                                  // Crea un objeto Date con la fecha actual

        let diferencia =                                       // Calcula la diferencia de años entre hoy y el registro
            hoy.getFullYear() -                               // Obtiene el año actual
            this.fechaRegistro.getFullYear();                 // Obtiene el año de registro del cliente

        return diferencia < 1;                                // Retorna true si lleva menos de 1 año registrado
    }

    /**
     * Método público
     */
    mostrarEstadoCliente() {                                   // Método público: muestra si el cliente es nuevo o frecuente

        if(this.#esClienteNuevo())                            // Llama al método privado para verificar antigüedad
            return "Cliente Nuevo";                           // Retorna "nuevo" si lleva menos de un año

        return "Cliente Frecuente";                           // Retorna "frecuente" si lleva un año o más
    }
}