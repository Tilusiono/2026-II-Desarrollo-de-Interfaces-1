/**======================================
 * Clase Categoria
 * Agrupa productos.
 ======================================*/
export class Categoria {                                      // Define la clase Categoria para agrupar productos

    // PRIVADOS
    #idCategoria;                                             // Campo privado: ID único de la categoría
    #nombreCategoria;                                         // Campo privado: nombre de la categoría

    // PÚBLICOS
    descripcion;                                              // Atributo público: descripción de la categoría
    cantidadProductos;                                        // Atributo público: número de productos en la categoría

    /**
     * Constructor Categoria
     */
    constructor(
        idCategoria,                                          // ID único de la categoría
        nombreCategoria,                                      // Nombre de la categoría
        descripcion = "",                                     // Descripción vacía por defecto
        cantidadProductos = 0                                 // Cantidad de productos en 0 por defecto
    ) {

        if(typeof idCategoria !== "number")                   // Valida que el ID sea número
            throw new Error("ID inválido");                   // Lanza error si el ID no es número

        if(typeof nombreCategoria !== "string")               // Valida que el nombre sea texto
            throw new Error("Nombre inválido");               // Lanza error si el nombre no es string

        this.#idCategoria = idCategoria;                      // Asigna el ID al campo privado
        this.#nombreCategoria = nombreCategoria;              // Asigna el nombre al campo privado

        this.descripcion = descripcion;                       // Asigna la descripción al atributo público
        this.cantidadProductos = cantidadProductos;           // Asigna la cantidad de productos al atributo público
    }

    /**
     * Método privado
     */
    #tieneProductos() {                                       // Método privado: verifica si hay productos en la categoría
        return this.cantidadProductos > 0;                    // Retorna true si la cantidad de productos es mayor a cero
    }

    /**
     * Método público
     */
    mostrarCantidad() {                                       // Método público: muestra cuántos productos tiene la categoría

        if(this.#tieneProductos())                            // Llama al método privado para verificar si hay productos
            return `Productos registrados: ${this.cantidadProductos}`; // Retorna el conteo si hay productos

        return "Categoría vacía";                             // Retorna mensaje si no hay productos registrados
    }

    // GETTERS

    getIdCategoria() {                                        // Getter: permite leer el ID privado de la categoría
        return this.#idCategoria;                             // Retorna el valor del campo privado #idCategoria
    }

    getNombreCategoria() {                                    // Getter: permite leer el nombre privado de la categoría
        return this.#nombreCategoria;                         // Retorna el valor del campo privado #nombreCategoria
    }

    // SETTERS

    setNombreCategoria(nombre) {                              // Setter: permite cambiar el nombre de la categoría con validación

        if(typeof nombre !== "string")                        // Verifica que el nuevo nombre sea texto
            throw new Error("Nombre inválido");               // Lanza error si el tipo no es válido

        this.#nombreCategoria = nombre;                       // Actualiza el campo privado con el nuevo nombre
    }
}