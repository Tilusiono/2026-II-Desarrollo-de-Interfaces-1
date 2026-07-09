class cliente{

    nombre;
    apellido;
    correo;
    telefono;

    #dni;
    #edad;
    #direccion;
    #codigo;

    constructor(nombre, apellido, correo, telefono, dni, edad, dirreccion, codigo) {
        this,nombre = nombre
        this.apellido = apellido;
        this.correo = correo;
        this.telefono = telefono;

        this.#dni = dni;
        this.#edad = edad;
        this.#direccion = dirreccion;
        this.#codigo = codigo;

    }

    mostrarCliente() {
        console.log("Cliente: " + this.nombre);
    }

    comprarCarro() {
        console.log(this.nombre + " compró un carro.");
    }

}

