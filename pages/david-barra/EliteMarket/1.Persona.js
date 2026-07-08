/**======================================
 * Clase Persona
 * Clase base para Cliente y Cajero.
 ======================================*/
export class Persona {                                          // Define la clase base Persona (será heredada por otras clases)

    // ATRIBUTOS PRIVADOS
    #id;                                                        // Campo privado: solo accesible dentro de esta clase
    #nombre;                                                    // Campo privado: protege el nombre de modificaciones externas
    #apellido;                                                  // Campo privado: protege el apellido de modificaciones externas

    // ATRIBUTOS PÚBLICOS
    telefono;                                                   // Atributo público: accesible y modificable desde fuera
    correo;                                                     // Atributo público: accesible y modificable desde fuera

    /**
     * Constructor de Persona
     * @param {number} id
     * @param {string} nombre
     * @param {string} apellido
     * @param {string} telefono
     * @param {string} correo
     */
    constructor(
        id,                                                     // Parámetro obligatorio: identificador único
        nombre,                                                 // Parámetro obligatorio: primer nombre
        apellido = "Sin Apellido",                             // Parámetro opcional: apellido con valor por defecto
        telefono = "",                                          // Parámetro opcional: teléfono vacío por defecto
        correo = ""                                             // Parámetro opcional: correo vacío por defecto
    ) {

        if(typeof id !== "number")                             // Valida que el ID sea un número
            throw new Error("ID debe ser number");             // Lanza error si el ID no es número

        if(typeof nombre !== "string")                         // Valida que el nombre sea texto
            throw new Error("Nombre debe ser string");         // Lanza error si el nombre no es string

        if(typeof apellido !== "string")                       // Valida que el apellido sea texto
            throw new Error("Apellido debe ser string");       // Lanza error si el apellido no es string

        this.#id = id;                                         // Asigna el ID al campo privado
        this.#nombre = nombre;                                  // Asigna el nombre al campo privado
        this.#apellido = apellido;                             // Asigna el apellido al campo privado

        this.telefono = telefono;                              // Asigna el teléfono al atributo público
        this.correo = correo;                                  // Asigna el correo al atributo público
    }

    /**
     * Método privado
     * Retorna nombre completo.
     */
    #obtenerNombreCompleto() {                                  // Método privado: solo se usa dentro de la clase
        return `${this.#nombre} ${this.#apellido}`;            // Concatena nombre y apellido con un espacio
    }

    /**
     * Método público
     * Muestra información básica.
     */
    mostrarDatos() {                                            // Método público: permite acceder al nombre completo desde fuera
        return this.#obtenerNombreCompleto();                  // Llama al método privado y retorna el resultado
    }

    // GETTERS

    getId() {                                                   // Getter: permite leer el ID privado desde fuera
        return this.#id;                                       // Retorna el valor del campo privado #id
    }

    getNombre() {                                              // Getter: permite leer el nombre privado desde fuera
        return this.#nombre;                                   // Retorna el valor del campo privado #nombre
    }

    getApellido() {                                            // Getter: permite leer el apellido privado desde fuera
        return this.#apellido;                                 // Retorna el valor del campo privado #apellido
    }

    // SETTERS

    setNombre(nombre) {                                        // Setter: permite modificar el nombre con validación

        if(typeof nombre !== "string")                         // Verifica que el nuevo nombre sea texto
            throw new Error("Nombre inválido");                // Lanza error si el tipo no es válido

        this.#nombre = nombre;                                 // Actualiza el campo privado con el nuevo nombre
    }

    setApellido(apellido) {                                    // Setter: permite modificar el apellido con validación

        if(typeof apellido !== "string")                       // Verifica que el nuevo apellido sea texto
            throw new Error("Apellido inválido");              // Lanza error si el tipo no es válido

        this.#apellido = apellido;                             // Actualiza el campo privado con el nuevo apellido
    }
}
