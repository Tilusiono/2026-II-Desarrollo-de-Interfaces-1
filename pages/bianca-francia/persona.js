export class Persona {

    nombre;

    #codigo;
    #telefono;
    #direccion;

    constructor(nombre, codigo, telefono, direccion) {

        if (new.target === Persona) {
            throw new Error("No se puede instanciar Persona");
        }

        this.nombre = nombre;
        this.#codigo = codigo;
        this.#telefono = telefono;
        this.#direccion = direccion;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(valor) {
        this.#codigo = valor;
    }

    mostrarDatos() {
        console.log(this.nombre);
    }

    registrar() {
        console.log("Persona registrada");
    }

    #validarCodigo() {
        return true;
    }

    #guardar() {
        console.log("Guardado");
    }
}