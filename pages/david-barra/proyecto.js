/*
=====================================================
SUPERMERCADO "ÉLITE MARKET"
=====================================================
*/

/**======================================
 * Clase Persona
 * Clase base para Cliente y Cajero.
 ======================================*/
class Persona {                                                  // Define la clase base Persona (será heredada por otras clases)

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

/**======================================
 * Clase Cliente
 * Hereda de Persona.
 ======================================*/
class Cliente extends Persona {                                // Define la clase Cliente que hereda atributos y métodos de Persona

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

/**======================================
 * Clase Cajero
 * Hereda de Persona.
 ======================================*/
class Cajero extends Persona {                                // Define la clase Cajero que hereda de Persona

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

/**======================================
 * Clase Producto
 * Representa productos del supermercado.
 ======================================*/
class Producto {                                              // Define la clase Producto para representar artículos del mercado

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

/**======================================
 * Clase Categoria
 * Agrupa productos.
 ======================================*/
class Categoria {                                             // Define la clase Categoria para agrupar productos

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

/**======================================
 * Clase Inventario
 * Controla las existencias de productos.
 ======================================*/
class Inventario {                                            // Define la clase Inventario para controlar existencias

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

/**======================================
 * Clase Proveedor
 * Información de proveedores.
 ======================================*/
class Proveedor {                                             // Define la clase Proveedor para gestionar datos de proveedores

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

/**======================================
 * Clase CarritoCompra
 * Almacena productos seleccionados.
 ======================================*/
class CarritoCompra {                                         // Define la clase CarritoCompra para gestionar compras en curso

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

/**======================================
 * Clase Venta
 * Registra una venta realizada.
 ======================================*/
class Venta {                                                 // Define la clase Venta para registrar transacciones completadas

    // PRIVADOS
    #idVenta;                                                 // Campo privado: ID único de la venta
    #total;                                                   // Campo privado: monto total de la venta

    // PÚBLICOS
    fecha;                                                    // Atributo público: fecha en que se realizó la venta
    total;                                                    // Atributo público: total accesible desde fuera
    metodoPago;                                               // Atributo público: forma de pago usada (efectivo, tarjeta, etc.)
    descuento;                                                // Atributo público: monto de descuento aplicado
    impuesto;                                                 // Atributo público: monto de impuesto (IGV) aplicado
    estado;                                                   // Atributo público: estado de la venta (Completada, etc.)

    /**
     * Constructor Venta
     */
    constructor(
        idVenta,                                              // ID único de la venta
        total,                                                // Monto total de la venta
        metodoPago = "Efectivo",                              // Método de pago ("Efectivo" por defecto)
        descuento = 0,                                        // Descuento en 0 por defecto
        impuesto = 0,                                         // Impuesto en 0 por defecto
        estado = "Completada",                                // Estado "Completada" por defecto
        fecha = new Date()                                    // Fecha de venta (hoy por defecto)
    ) {

        if(typeof idVenta !== "number")                       // Valida que el ID sea número
            throw new Error("ID inválido");                   // Lanza error si el ID no es número

        if(typeof total !== "number")                         // Valida que el total sea número
            throw new Error("Total inválido");                // Lanza error si el total no es número

        this.#idVenta = idVenta;                              // Asigna el ID al campo privado
        this.#total = total;                                  // Asigna el total al campo privado

        this.fecha = fecha;                                   // Asigna la fecha al atributo público
        this.metodoPago = metodoPago;                         // Asigna el método de pago al atributo público
        this.descuento = descuento;                           // Asigna el descuento al atributo público
        this.impuesto = impuesto;                             // Asigna el impuesto al atributo público
        this.estado = estado;                                 // Asigna el estado al atributo público
    }

    /**
     * Método privado
     */
    #aplicaDescuento() {                                      // Método privado: verifica si se aplicó algún descuento
        return this.descuento > 0;                            // Retorna true si el descuento es mayor a cero
    }

    /**
     * Método público
     */
    calcularTotal() {                                         // Método público: calcula y muestra el total final de la venta

        let totalFinal =                                      // Declara variable para almacenar el total calculado
            this.#total -                                     // Parte del monto base de la venta
            this.descuento +                                  // Resta el descuento aplicado
            this.impuesto;                                    // Suma el impuesto correspondiente

        if(this.#aplicaDescuento())                           // Verifica si hubo descuento en la venta
            return `Total con descuento: ${totalFinal}`;      // Retorna total indicando que se aplicó descuento

        return `Total: ${totalFinal}`;                        // Retorna total sin mención de descuento
    }

    getIdVenta() {                                            // Getter: permite leer el ID privado de la venta
        return this.#idVenta;                                 // Retorna el valor del campo privado #idVenta
    }

    getTotal() {                                              // Getter: permite leer el total privado de la venta
        return this.#total;                                   // Retorna el valor del campo privado #total
    }

    setTotal(total) {                                         // Setter: permite actualizar el total de la venta con validación

        if(typeof total !== "number")                         // Verifica que el nuevo total sea número
            throw new Error("Total inválido");                // Lanza error si el tipo no es válido

        this.#total = total;                                  // Actualiza el campo privado con el nuevo total
    }
}

/**======================================
 * Clase DetalleVenta
 * Detalles de productos vendidos.
 ======================================*/
class DetalleVenta {                                          // Define la clase DetalleVenta para el desglose de cada línea vendida

    // PRIVADOS
    #idDetalleVenta;                                          // Campo privado: ID único del detalle de venta
    #cantidad;                                                // Campo privado: cantidad de unidades de ese producto vendidas

    // PÚBLICOS
    precioUnitario;                                           // Atributo público: precio por unidad del producto
    subtotal;                                                 // Atributo público: subtotal de esa línea de venta
    descuento;                                                // Atributo público: descuento aplicado a esa línea

    /**
     * Constructor DetalleVenta
     */
    constructor(
        idDetalleVenta,                                       // ID único del detalle
        cantidad,                                             // Cantidad de unidades vendidas
        precioUnitario,                                       // Precio por unidad del producto
        subtotal,                                             // Subtotal de la línea (cantidad × precio)
        descuento = 0                                         // Descuento en 0 por defecto
    ) {

        this.#idDetalleVenta = idDetalleVenta;                // Asigna el ID al campo privado
        this.#cantidad = cantidad;                            // Asigna la cantidad al campo privado

        this.precioUnitario = precioUnitario;                 // Asigna el precio unitario al atributo público
        this.subtotal = subtotal;                             // Asigna el subtotal al atributo público
        this.descuento = descuento;                           // Asigna el descuento al atributo público
    }

    /**
     * Método privado
     */
    #calcularSubtotal() {                                     // Método privado: calcula el subtotal multiplicando cantidad × precio
        return this.#cantidad * this.precioUnitario;          // Multiplica la cantidad privada por el precio unitario público
    }

    /**
     * Método público
     */
    mostrarSubtotal() {                                       // Método público: muestra el subtotal calculado
        return `Subtotal: ${this.#calcularSubtotal()}`;       // Llama al método privado y retorna el resultado formateado
    }

    getCantidad() {                                           // Getter: permite leer la cantidad privada del detalle
        return this.#cantidad;                                // Retorna el valor del campo privado #cantidad
    }

    setCantidad(cantidad) {                                   // Setter: permite actualizar la cantidad con validación

        if(typeof cantidad !== "number")                      // Verifica que la nueva cantidad sea número
            throw new Error("Cantidad inválida");             // Lanza error si el tipo no es válido

        this.#cantidad = cantidad;                            // Actualiza el campo privado con la nueva cantidad
    }
}

/**======================================
 * Clase Comprobante
 * Genera boletas o facturas.
 =======================================*/
class Comprobante {                                           // Define la clase Comprobante para emitir boletas o facturas

    // PRIVADOS
    #idComprobante;                                           // Campo privado: ID único del comprobante
    #tipoComprobante;                                         // Campo privado: tipo de comprobante (Boleta o Factura)

    // PÚBLICOS
    fechaEmision;                                             // Atributo público: fecha en que se emitió el comprobante
    subtotal;                                                 // Atributo público: monto antes de impuestos
    impuesto;                                                 // Atributo público: monto del IGV aplicado
    total;                                                    // Atributo público: monto total a pagar
    estadoPago;                                               // Atributo público: indica si está pagado o pendiente

    /**
     * Constructor Comprobante
     */
    constructor(
        idComprobante,                                        // ID único del comprobante
        tipoComprobante,                                      // Tipo: "Boleta" o "Factura"
        subtotal,                                             // Monto base sin impuestos
        impuesto,                                             // Monto del IGV
        total,                                                // Monto total a cobrar
        estadoPago = "Pendiente",                             // Estado de pago ("Pendiente" por defecto)
        fechaEmision = new Date()                             // Fecha de emisión (hoy por defecto)
    ) {

        this.#idComprobante = idComprobante;                  // Asigna el ID al campo privado
        this.#tipoComprobante = tipoComprobante;              // Asigna el tipo de comprobante al campo privado

        this.fechaEmision = fechaEmision;                     // Asigna la fecha de emisión al atributo público
        this.subtotal = subtotal;                             // Asigna el subtotal al atributo público
        this.impuesto = impuesto;                             // Asigna el impuesto al atributo público
        this.total = total;                                   // Asigna el total al atributo público
        this.estadoPago = estadoPago;                         // Asigna el estado de pago al atributo público
    }

    /**
     * Método privado
     */
    #pagado() {                                               // Método privado: verifica si el comprobante está pagado
        return this.estadoPago.toLowerCase() === "pagado";   // Compara el estado (en minúsculas) con la cadena "pagado"
    }

    /**
     * Método público
     */
    mostrarEstadoPago() {                                     // Método público: indica si el comprobante fue pagado o está pendiente

        if(this.#pagado())                                    // Llama al método privado para verificar el estado de pago
            return "Comprobante Pagado";                      // Retorna confirmación si el comprobante está pagado

        return "Comprobante Pendiente";                       // Retorna alerta si el comprobante aún no está pagado
    }

    getTipoComprobante() {                                    // Getter: permite leer el tipo de comprobante privado
        return this.#tipoComprobante;                         // Retorna el valor del campo privado #tipoComprobante
    }

    setTipoComprobante(tipo) {                                // Setter: permite cambiar el tipo de comprobante con validación

        if(typeof tipo !== "string")                          // Verifica que el nuevo tipo sea texto
            throw new Error("Tipo inválido");                 // Lanza error si el tipo no es string

        this.#tipoComprobante = tipo;                         // Actualiza el campo privado con el nuevo tipo
    }
}

/*
=====================================================
PRUEBAS
=====================================================
*/

let cliente1 = new Cliente(                                   // Crea una instancia de la clase Cliente
    1,                                                        // ID del cliente
    "Juan",                                                   // Nombre
    "Perez",                                                  // Apellido
    "999888777",                                              // Teléfono
    "juan@gmail.com",                                         // Correo
    "Lima"                                                    // Dirección
);

let cajero1 = new Cajero(                                     // Crea una instancia de la clase Cajero
    1,                                                        // ID del cajero
    "Ana",                                                    // Nombre
    "Lopez",                                                  // Apellido
    "987654321",                                              // Teléfono
    "ana@gmail.com",                                          // Correo
    1800,                                                     // Salario
    "Noche"                                                   // Turno asignado
);

let producto1 = new Producto(                                 // Crea una instancia de la clase Producto
    1,                                                        // ID del producto
    "Arroz Costeño",                                          // Nombre del producto
    5.50,                                                     // Precio unitario
    "Arroz Premium",                                          // Descripción
    50,                                                       // Stock disponible
    "Costeño"                                                 // Marca del producto
);

let categoria1 = new Categoria(                               // Crea una instancia de la clase Categoria
    1,                                                        // ID de la categoría
    "Abarrotes",                                              // Nombre de la categoría
    "Productos básicos",                                      // Descripción de la categoría
    150                                                       // Cantidad de productos registrados
);

console.log(cliente1.mostrarEstadoCliente());                 // Imprime si Juan es cliente nuevo o frecuente
console.log(cajero1.mostrarTurno());                          // Imprime si Ana trabaja turno diurno o nocturno
console.log(producto1.mostrarEstado());                       // Imprime la disponibilidad del Arroz Costeño
console.log(categoria1.mostrarCantidad());                    // Imprime la cantidad de productos en Abarrotes

let inventario1 = new Inventario(                             // Crea una instancia de la clase Inventario
    1,                                                        // ID del inventario
    10,                                                       // Cantidad disponible actual
    15,                                                       // Cantidad mínima permitida
    100,                                                      // Cantidad máxima permitida
    "Almacén A"                                               // Ubicación física del almacén
);

let proveedor1 = new Proveedor(                               // Crea una instancia de la clase Proveedor
    1,                                                        // ID del proveedor
    "Gloria",                                                 // Nombre del proveedor
    "999888777",                                              // Teléfono de contacto
    "ventas@gloria.com"                                       // Correo electrónico del proveedor
);

let carrito1 = new CarritoCompra(                             // Crea una instancia de la clase CarritoCompra
    1,                                                        // ID del carrito
    250,                                                      // Total acumulado en el carrito
    5                                                         // Cantidad de productos en el carrito
);

let venta1 = new Venta(                                       // Crea una instancia de la clase Venta
    1,                                                        // ID de la venta
    300,                                                      // Monto total de la venta
    "Tarjeta",                                                // Método de pago utilizado
    20,                                                       // Descuento aplicado
    18                                                        // Impuesto (IGV) aplicado
);

let detalle1 = new DetalleVenta(                              // Crea una instancia de la clase DetalleVenta
    1,                                                        // ID del detalle
    3,                                                        // Cantidad de unidades vendidas
    15,                                                       // Precio unitario del producto
    45                                                        // Subtotal (3 × 15 = 45)
);

let comprobante1 = new Comprobante(                           // Crea una instancia de la clase Comprobante
    1,                                                        // ID del comprobante
    "Factura",                                                // Tipo de comprobante emitido
    100,                                                      // Subtotal antes de impuestos
    18,                                                       // Monto del impuesto (IGV)
    118,                                                      // Total a pagar (100 + 18)
    "Pagado"                                                  // Estado de pago del comprobante
);

console.log(inventario1.mostrarEstadoStock());                // Imprime si el inventario está bajo o disponible
console.log(proveedor1.mostrarProveedor());                   // Imprime el nombre del proveedor y validez de su correo
console.log(carrito1.mostrarTotal());                         // Imprime el total del carrito o indica que está vacío
console.log(venta1.calcularTotal());                          // Imprime el total final de la venta con/sin descuento
console.log(detalle1.mostrarSubtotal());                      // Imprime el subtotal calculado del detalle de venta
console.log(comprobante1.mostrarEstadoPago());                // Imprime si el comprobante está pagado o pendiente

//Profe lo documenté con IA para cordarme mejor :)//
