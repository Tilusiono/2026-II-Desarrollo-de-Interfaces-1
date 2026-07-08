/**======================================
 * Clase Producto
 * Representa productos del supermercado.
 ======================================*/
export class Producto {                                       // Define la clase Producto para representar artículos del mercado

    // PRIVADOS
    #idProducto;                                              // Campo privado: ID único del producto
    #nombre;                                                  // Campo privado: nombre del producto
    #precio;                                                  // Campo privado: precio del producto

    // PÚBLICOS
    descripcion;                                              // Atributo público: descripción del producto
    precio;                                                   // Atributo público: precio accesible desde fuera
    stock;                                                    // Atributo público: cantidad disponible en almacén
    marca;                                                    // Atributo público: marca del producto
    fechaVencimiento;                                         // Atributo público: fecha de caducidad del producto
    codigoBarras;                                             // Atributo público: código de barras del producto

    /**
     * Constructor Producto
     */
    constructor(
        idProducto,                                           // ID único del producto
        nombre,                                               // Nombre del producto
        precio,                                               // Precio del producto
        descripcion = "",                                     // Descripción vacía por defecto
        stock = 0,                                            // Stock inicial en 0 por defecto
        marca = "",                                           // Marca vacía por defecto
        fechaVencimiento = new Date(),                        // Fecha de vencimiento (hoy por defecto)
        codigoBarras = ""                                     // Código de barras vacío por defecto
    ) {

        if(typeof idProducto !== "number")                    // Valida que el ID sea número
            throw new Error("ID inválido");                   // Lanza error si el ID no es número

        if(typeof nombre !== "string")                        // Valida que el nombre sea texto
            throw new Error("Nombre inválido");               // Lanza error si el nombre no es string

        if(typeof precio !== "number")                        // Valida que el precio sea número
            throw new Error("Precio inválido");               // Lanza error si el precio no es número

        this.#idProducto = idProducto;                        // Asigna el ID al campo privado
        this.#nombre = nombre;                                // Asigna el nombre al campo privado
        this.#precio = precio;                                // Asigna el precio al campo privado

        this.descripcion = descripcion;                       // Asigna la descripción al atributo público
        this.stock = stock;                                   // Asigna el stock al atributo público
        this.marca = marca;                                   // Asigna la marca al atributo público
        this.fechaVencimiento = fechaVencimiento;             // Asigna la fecha de vencimiento al atributo público
        this.codigoBarras = codigoBarras;                     // Asigna el código de barras al atributo público
    }

    /**
     * Método privado
     */
    #hayStock() {                                             // Método privado: verifica si hay unidades disponibles
        return this.stock > 0;                                // Retorna true si el stock es mayor a cero
    }

    /**
     * Método público
     */
    mostrarEstado() {                                         // Método público: indica si el producto está disponible

        if(this.#hayStock())                                  // Llama al método privado para verificar stock
            return `Disponible (${this.stock})`;              // Retorna "Disponible" con la cantidad actual

        return "Sin Stock";                                   // Retorna "Sin Stock" si no hay unidades
    }

    // GETTERS

    getIdProducto() {                                         // Getter: permite leer el ID privado del producto
        return this.#idProducto;                              // Retorna el valor del campo privado #idProducto
    }

    getNombre() {                                             // Getter: permite leer el nombre privado del producto
        return this.#nombre;                                  // Retorna el valor del campo privado #nombre
    }

    getPrecio() {                                             // Getter: permite leer el precio privado del producto
        return this.#precio;                                  // Retorna el valor del campo privado #precio
    }

    // SETTERS

    setNombre(nombre) {                                       // Setter: permite modificar el nombre con validación

        if(typeof nombre !== "string")                        // Verifica que el nuevo nombre sea texto
            throw new Error("Nombre inválido");               // Lanza error si el tipo no es válido

        this.#nombre = nombre;                                // Actualiza el campo privado con el nuevo nombre
    }

    setPrecio(precio) {                                       // Setter: permite modificar el precio con validación

        if(typeof precio !== "number")                        // Verifica que el nuevo precio sea número
            throw new Error("Precio inválido");               // Lanza error si el tipo no es válido

        this.#precio = precio;                                // Actualiza el campo privado con el nuevo precio
    }
}
