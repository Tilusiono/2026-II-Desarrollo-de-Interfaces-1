/**======================================
 * Clase CarritoCompra
 * Almacena productos seleccionados.
 ======================================*/
export class CarritoCompra {                                  // Define la clase CarritoCompra para gestionar compras en curso

    // PRIVADOS
    #idCarrito;                                               // Campo privado: ID único del carrito
    #total;                                                   // Campo privado: monto total acumulado en el carrito

    // PÚBLICOS
    cantidadProductos;                                        // Atributo público: número de productos agregados al carrito
    total;                                                    // Atributo público: total accesible desde fuera
    estado;                                                   // Atributo público: estado actual del carrito (Activo, etc.)
    fechaCreacion;                                            // Atributo público: fecha en que se creó el carrito

    /**
     * Constructor CarritoCompra
     */
    constructor(
        idCarrito,                                            // ID único del carrito
        total = 0,                                            // Total inicial en 0 por defecto
        cantidadProductos = 0,                                // Cantidad de productos en 0 por defecto
        estado = "Activo",                                    // Estado "Activo" por defecto
        fechaCreacion = new Date()                            // Fecha de creación (hoy por defecto)
    ) {

        if(typeof idCarrito !== "number")                     // Valida que el ID sea número
            throw new Error("ID inválido");                   // Lanza error si el ID no es número

        this.#idCarrito = idCarrito;                          // Asigna el ID al campo privado
        this.#total = total;                                  // Asigna el total al campo privado

        this.cantidadProductos = cantidadProductos;           // Asigna la cantidad de productos al atributo público
        this.estado = estado;                                 // Asigna el estado al atributo público
        this.fechaCreacion = fechaCreacion;                   // Asigna la fecha de creación al atributo público
    }

    /**
     * Método privado
     */
    #carritoVacio() {                                         // Método privado: verifica si el carrito no tiene productos
        return this.cantidadProductos === 0;                  // Retorna true si la cantidad de productos es exactamente cero
    }

    /**
     * Método público
     */
    mostrarTotal() {                                          // Método público: muestra el total o informa que el carrito está vacío

        if(this.#carritoVacio())                              // Llama al método privado para verificar si está vacío
            return "Carrito vacío";                           // Retorna mensaje si no hay productos en el carrito

        return `Total: S/ ${this.#total}`;                    // Retorna el total en soles si hay productos
    }
    /**
     * Método público
     * Muestra la cantidad de productos del carrito 
     * utilizando un ciclo for.
     */
    mostrarProductos() {                                      // Método público: recorre los productos registrados en el carrito

        for(let i = 1; i <= this.cantidadProductos; i++) {    // Recorre desde el primer producto hasta la cantidad registrada
            console.log(`Producto ${i}`);                     // Muestra cada producto en la consola
        }

        return `Se registraron ${this.cantidadProductos} productos`; // Retorna la cantidad total de productos
    }
    // GETTERS

    getIdCarrito() {                                          // Getter: permite leer el ID privado del carrito
        return this.#idCarrito;                               // Retorna el valor del campo privado #idCarrito
    }

    getTotal() {                                              // Getter: permite leer el total privado del carrito
        return this.#total;                                   // Retorna el valor del campo privado #total
    }

    // SETTERS

    setTotal(total) {                                         // Setter: permite actualizar el total del carrito con validación

        if(typeof total !== "number")                         // Verifica que el nuevo total sea número
            throw new Error("Total inválido");                // Lanza error si el tipo no es válido

        this.#total = total;                                  // Actualiza el campo privado con el nuevo total
    }
}
