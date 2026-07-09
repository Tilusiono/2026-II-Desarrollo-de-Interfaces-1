class Marca {

    nombre;
    pais;
    fundacion;
    paginaWeb;

    #codigo;
    #telefono;
    #correo;
    #representante;

    constructor(nombre, pais, fundacion, paginaWeb) {
        this.nombre = nombre;
        this.pais = pais;
        this.fundacion = fundacion;
        this.paginaWeb = paginaWeb;

        this.#codigo = "";
        this.#telefono = "";
        this.#correo = "";
        this.#representante = "";
    }

    mostrarMarca() {
        console.log("Marca: " + this.nombre);
    }

    fabricarCarros() {
        console.log(this.nombre + " fabrica carros.");
    }

    #validarCodigo() {
        return this.#codigo != "";
    }

    #mostrarRepresentante() {
        return this.#representante;
    }
}