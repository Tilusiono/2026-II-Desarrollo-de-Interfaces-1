class surculsl {

    nombre;
    correo;
    telefono;
    gerente;

    #codigo;
    #dirreccion;
    #capacidad;
    #horario;

    constructor(nombre, correo, telefono, gerente, codigo, dirreccion, capacidad, horario) {
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.gerente = gerente;

        this.#codigo = codigo;
        this.#dirreccion = dirreccion;
        this.#capacidad = capacidad;
        this.#horario = horario;
    }

    mostrarSucursal() {
        console.log("Sucursal: " + this.nombre);
    }

    abrirSucursal() {
        console.log(this.nombre + " está abierta.");
    }

    #validarCodigo() {
        return this.#codigo != "";
    }

    #mostrarHorario() {
        return this.#horario;
    }
}
