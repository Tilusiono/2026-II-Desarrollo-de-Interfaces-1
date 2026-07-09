export class Categoria {

    nombreCategoria;

    #codigoCategoria;
    #descripcion;

    constructor(nombre, codigo, descripcion) {

        this.nombreCategoria = nombre;
        this.#codigoCategoria = codigo;
        this.#descripcion = descripcion;
    }

    get codigoCategoria() {
        return this.#codigoCategoria;
    }

    get descripcion() {
        return this.#descripcion;
    }

    set descripcion(valor) {
        this.#descripcion = valor;
    }

    registrarCategoria() {
        console.log("Categoría registrada");
    }
}