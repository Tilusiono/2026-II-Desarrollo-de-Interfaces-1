class taller {

    nombre;
    correo;
    telefono;
    mecanico;

    #ubicacion;
    #capacidad;
    #especialidad;
    #codigo;

    constructor(nombre, ubicacion, telefono, encargado) {
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.telefono = telefono;
        this.encargado = encargado;

        this.#codigo = "";
        this.#horario = "";
        this.#capacidad = 0;
        this.#especialidad = "";
    }

    mostrarTaller() {
        console.log("Taller: " + this.nombre);
    }

    repararCarro() {
        console.log("El taller está reparando un carro.");
    }

    #validarCodigo() {
        return this.#codigo != "";
    }

    #mostrarHorario() {
        return this.#horario;
    }
}
    
