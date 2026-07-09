class venta {

    cliente;
    empleado;
    carro;
    fecha;

    #precio;
    #estado;
    #descuento;
    #codigo;

    constructor(cliente, empleado, carro, fecha, precio, estado, descuento, codigo) {
        this.cliente = cliente;
        this.empleado = empleado;
        this.carro = carro;
        this.fecha = fecha;

        this.#precio = precio;
        this.#estado = estado;
        this.#descuento = descuento;
        this.#codigo = codigo;
    }
    
      mostrarVenta() {
        console.log("Cliente: " + this.cliente);
    }

    registrarVenta() {
        console.log("La venta fue registrada.");
    }

    #validarPrecio() {
        return this.#precio > 0;
    }

    #mostrarEstado() {
        return this.#estado;
    }

}