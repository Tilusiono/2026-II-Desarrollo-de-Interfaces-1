// ClienteNatural.js
// ClienteNatural hereda de Persona.

class ClienteNatural extends Persona {
    #dni;
    #direccion;

    tipoCliente;
    metodoPago;

    constructor(
        id,
        nombre,
        apellido,
        edad,
        telefono,
        fechaNacimiento,
        dni,
        direccion,
        tipoCliente,
        metodoPago
    ) {
        super({ id, nombre, apellido, edad, telefono, fechaNacimiento });

        this.#dni = dni;
        this.#direccion = direccion;

        this.tipoCliente = tipoCliente;
        this.metodoPago = metodoPago;
    }

    #validarDni() {
        return this.#dni.length === 8;
    }

    #obtenerDireccion() {
        return this.#direccion.toUpperCase();
    }

    mostrarDatos() {
        return `
            Cliente Natural<br>
            Nombre: ${this.nombreCompleto}<br>
            DNI válido: ${this.#validarDni()}<br>
            Dirección: ${this.#obtenerDireccion()}<br>
            Tipo: ${this.tipoCliente}<br>
            Pago: ${this.metodoPago}
        `;
    }

    cambiarMetodoPago(nuevoMetodo) {
        this.metodoPago = nuevoMetodo;
    }

    registrarCompra(fechaHora) {
        console.log(`${this.nombreCompleto} registró una compra (${fechaHora.toLocaleString()})`);
    }

    cancelarCompra(fechaHora) {
        console.log(`${this.nombreCompleto} canceló una compra (${fechaHora.toLocaleString()})`);
    }
}
