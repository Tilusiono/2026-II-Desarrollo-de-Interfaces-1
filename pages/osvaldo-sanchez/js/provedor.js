class provedor {

    nombre;
    correo;
    telefono;
    empresa;

    #dni;
    #edad;
    #dirreccion;
    #codigo;

    constructor(nombre, correo, telefono, empresa, dni, edad, dirreccion, codigo) {
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.empresa = empresa;

        this.#dni = dni;
        this.#edad = edad;
        this.#dirreccion = dirreccion;
        this.#codigo = codigo;
    }

    

    mostrarProveedor() {
        console.log("Proveedor: " + this.nombre);
    }

    entregarProductos() {
        console.log(this.nombre + " entregó los productos.");
    }

    #validarRuc() {
        return this.#ruc != "";
    }

    #mostrarCiudad() {
        return this.#ciudad;
    }
}