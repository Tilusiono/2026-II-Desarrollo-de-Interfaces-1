/**======================================
 * Clase Cajero
 * Hereda de Persona.
 ======================================*/
import { Persona } from "./1.Persona.js";

export class Cajero extends Persona {                         // Define la clase Cajero que hereda de Persona

    salario;                                                  // Atributo público: sueldo del cajero
    turno;                                                    // Atributo público: horario de trabajo del cajero
    fechaContratacion;                                        // Atributo público: fecha en que fue contratado

    /**
     * Constructor de Cajero
     */
    constructor(
        id,                                                   // ID único del cajero
        nombre,                                               // Nombre del cajero
        apellido,                                             // Apellido del cajero
        telefono,                                             // Teléfono del cajero
        correo,                                               // Correo electrónico del cajero
        salario = 0,                                          // Salario del cajero (0 por defecto)
        turno = "Mañana",                                     // Turno asignado ("Mañana" por defecto)
        fechaContratacion = new Date()                        // Fecha de contratación (hoy por defecto)
    ) {

        super(id,nombre,apellido,telefono,correo);            // Llama al constructor de Persona con los datos comunes

        this.salario = salario;                               // Asigna el salario al atributo público
        this.turno = turno;                                   // Asigna el turno al atributo público
        this.fechaContratacion = fechaContratacion;           // Asigna la fecha de contratación al atributo público
    }

    /**
     * Método privado
     */
    #esTurnoNoche() {                                         // Método privado: verifica si el cajero trabaja de noche
        return this.turno.toLowerCase() === "noche";          // Compara el turno (en minúsculas) con la cadena "noche"
    }

    /**
     * Método público
     */
    mostrarTurno() {                                          // Método público: muestra si el turno es nocturno o diurno

        if(this.#esTurnoNoche())                              // Llama al método privado para verificar si es turno noche
            return "Turno Nocturno";                          // Retorna "nocturno" si el turno es "noche"

        return "Turno Diurno";                                // Retorna "diurno" para cualquier otro turno
    }
}