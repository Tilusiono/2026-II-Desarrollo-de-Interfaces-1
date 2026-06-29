class Cliente {
    #idCliente;
    #nombre;
    #apellidoPaterno;
    #dni;
    #telefono;
    
    /**
     * Crea una instancia de la clase Cliente
     * 
     * @param {number} id Identificador único del cliente.
     * @param {string} nom Nombre del cliente.
     * @param {string} [ape = "Sin apellido"] Apellido paterno del cliente.
     * @param {string} dni DNI del cliente.
     * @param {string} [tel = "none"] Teléfono del cliente.
     */

    constructor(id, nom, ape = "Sin apellido", dni, tel = "none") {

        if (typeof id !== "number")
            throw new Error("El ID debe ser un número");
        if (typeof nom !== "string")
            throw new Error("El nombre debe ser una cadena de texto");
        if (typeof ape !== "string")
            throw new Error("El apellido debe ser una cadena de texto");
        if (typeof dni !== "string")
            throw new Error("El DNI debe ser una cadena de texto");
        if (typeof tel !== "string")
            throw new Error("El teléfono debe ser una cadena de texto");

        this.#idCliente = id;
        this.#nombre = nom;
        this.#apellidoPaterno = ape;
        this.#dni = dni;
        this.#telefono = tel;
    }

    getNombre() {
        return this.#nombre;
    }

    añadirCarrito(producto, cantidad){

        if (cantidad >= producto.inventario){
            return console.log("Cantidad insuficiente en el inventario, pruebe con una cantidad menor")
        }

        let carrito = {
            "id": producto.idProducto,
            "producto": producto.nombre,
            "cantidad": cantidad
        }
        return carrito
    }

}

export default Cliente;