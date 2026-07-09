class consesionaria {

    nombre;
    ciudad;
    telefono;
    gerente;

    #ruc;
    #capacidad;
    #estado;
    #cantidadEmpleados;

    constructor(nombre, ciudad, telefono, gerente) {
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.telefono = telefono;
        this.gerente = gerente;

        this.#ruc = "";
        this.#capacidad = 0;
        this.#estado = "";
        this.#cantidadEmpleados = 0;
    }

    mostrarConcesionaria() {
        console.log("Concesionaria: " + this.nombre);
    }

    venderCarro() {
        console.log("La concesionaria vendió un carro.");
    }

    mostrarCiudad() {
        console.log("Ciudad: " + this.ciudad);
    }

    mostrarGerente() {
        console.log("Gerente: " + this.gerente);
    }

    #validarRuc() {
        return this.#ruc != "";
    }

    #mostrarEstado() {
        return this.#estado;
    }
}
