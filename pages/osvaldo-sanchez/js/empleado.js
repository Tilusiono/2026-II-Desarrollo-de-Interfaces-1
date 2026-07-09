class Empleado {

    // Públicos
    nombre;
    cargo;
    correo;
    telefono;

    // Privados
    #dni;
    #edad;
    #salario;
    #codigo;

    constructor(nombre, cargo, correo, telefono) {
        this.nombre = nombre;
        this.cargo = cargo;
        this.correo = correo;
        this.telefono = telefono;

        this.#dni = "";
        this.#edad = 0;
        this.#salario = 0;
        this.#codigo = "";
    }

    mostrarEmpleado() {
        console.log("Empleado: " + this.nombre);
    }

    trabajar() {
        console.log(this.nombre + " está trabajando.");
    }

    #validarEdad() {
        return this.#edad >= 18;
    }

    #mostrarSalario() {
        return this.#salario;
    }
}

// Clase hija 1
class Vendedor extends Empleado {

    comision;

    constructor(nombre, cargo, correo, telefono, comision) {
        super(nombre, cargo, correo, telefono);
        this.comision = comision;
    }

    venderCarro() {
        console.log(this.nombre + " vendió un carro.");
    }

    atenderCliente() {
        console.log(this.nombre + " está atendiendo a un cliente.");
    }

    registrarVenta() {
        console.log(this.nombre + " registró una venta.");
    }
}

// Clase hija 2
class Mecanico extends Empleado {

    especialidad;

    constructor(nombre, cargo, correo, telefono, especialidad) {
        super(nombre, cargo, correo, telefono);
        this.especialidad = especialidad;
    }

    repararCarro() {
        console.log(this.nombre + " está reparando un carro.");
    }

    cambiarAceite() {
        console.log(this.nombre + " cambió el aceite.");
    }

    revisarMotor() {
        console.log(this.nombre + " revisó el motor.");
    }
}

// Clase hija 3
class Cajero extends Empleado {

    turno;

    constructor(nombre, cargo, correo, telefono, turno) {
        super(nombre, cargo, correo, telefono);
        this.turno = turno;
    }

    cobrarVenta() {
        console.log(this.nombre + " realizó el cobro.");
    }

    emitirBoleta() {
        console.log(this.nombre + " emitió una boleta.");
    }

    cerrarCaja() {
        console.log(this.nombre + " cerró la caja.");
    }
}