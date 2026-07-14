/**======================================
 * Clase Proveedor
 * Información de proveedores.
 ======================================*/
export class Proveedor {                                      // Define la clase Proveedor para gestionar datos de proveedores

    // PRIVADOS
    #idProveedor;                                             // Campo privado: ID único del proveedor
    #nombre;                                                  // Campo privado: nombre de la empresa proveedora

    // PÚBLICOS
    telefono;                                                 // Atributo público: teléfono de contacto del proveedor
    correo;                                                   // Atributo público: correo electrónico del proveedor
    direccion;                                                // Atributo público: dirección física del proveedor
    ruc;                                                      // Atributo público: registro único de contribuyente del proveedor
    nombreContacto;                                           // Atributo público: nombre de la persona de contacto

    /**
     * Constructor Proveedor
     */
    constructor(
        idProveedor,                                          // ID único del proveedor
        nombre,                                               // Nombre de la empresa proveedora
        telefono = "",                                        // Teléfono vacío por defecto
        correo = "",                                          // Correo vacío por defecto
        direccion = "",                                       // Dirección vacía por defecto
        ruc = "",                                             // RUC vacío por defecto
        nombreContacto = ""                                   // Nombre de contacto vacío por defecto
    ) {

        if(typeof idProveedor !== "number")                   // Valida que el ID sea número
            throw new Error("ID inválido");                   // Lanza error si el ID no es número

        if(typeof nombre !== "string")                        // Valida que el nombre sea texto
            throw new Error("Nombre inválido");               // Lanza error si el nombre no es string

        this.#idProveedor = idProveedor;                      // Asigna el ID al campo privado
        this.#nombre = nombre;                                // Asigna el nombre al campo privado

        this.telefono = telefono;                             // Asigna el teléfono al atributo público
        this.correo = correo;                                 // Asigna el correo al atributo público
        this.direccion = direccion;                           // Asigna la dirección al atributo público
        this.ruc = ruc;                                       // Asigna el RUC al atributo público
        this.nombreContacto = nombreContacto;                 // Asigna el nombre de contacto al atributo público
    }

    /**
     * Método privado
     * Valida correo básico.
     */
    #correoValido() {                                         // Método privado: verifica si el correo tiene formato básico
        return this.correo.includes("@");                     // Retorna true si el correo contiene el símbolo "@"
    }

    /**
     * Método público
     */
    mostrarProveedor() {                                      // Método público: muestra el nombre e indica si el correo es válido

        if(this.#correoValido())                              // Llama al método privado para validar el correo
            return `${this.#nombre} - Correo válido`;         // Retorna nombre + confirmación de correo válido

        return `${this.#nombre} - Correo inválido`;           // Retorna nombre + alerta de correo inválido
    }

    // GETTERS

    getIdProveedor() {                                        // Getter: permite leer el ID privado del proveedor
        return this.#idProveedor;                             // Retorna el valor del campo privado #idProveedor
    }

    getNombre() {                                             // Getter: permite leer el nombre privado del proveedor
        return this.#nombre;                                  // Retorna el valor del campo privado #nombre
    }

    // SETTERS

    setNombre(nombre) {                                       // Setter: permite cambiar el nombre del proveedor con validación

        if(typeof nombre !== "string")                        // Verifica que el nuevo nombre sea texto
            throw new Error("Nombre inválido");               // Lanza error si el tipo no es válido

        this.#nombre = nombre;                                // Actualiza el campo privado con el nuevo nombre
    }
}