
/*
Ctrl+Shift+P -> Quokka.js Run Automatically for current file


*/
class Alumno {

    // Propiedades privadas
    #id;
    #nombre;
    #apellido;
    #edad;
    #telefono;
    fechaNacimiento;

  
    /**
     * Creates an instance of Alumno.
     *
     * @constructor
     * @param {*} id de alumno en formato number
     * @param {*} nombreAlumno
     * @param {string} apellido en formato string, pero no es obligatorio
     * @param {number} 
     * @param {string}
     * @param {*} 
     */
    constructor(id, nombreAlumno, apellidoAlumno = "Sin Apellido", edadAlumno = 0, telefonoAlumno = "", fechaNacimiento = new Date()) {

        if (typeof id !== "number")
            throw new Error("ID debe ser number");
        if (typeof nombreAlumno !== "string")
            throw new Error("Nombre debe ser string");
        if (typeof apellidoAlumno !== "string")
            throw new Error("Apellido debe ser string");
        if (typeof edadAlumno !== "number")
            throw new Error("Edad debe ser number");
        if (typeof telefonoAlumno !== "string")
            throw new Error("Teléfono debe ser string");
        if (!(fechaNacimiento instanceof Date))
            throw new Error("Fecha de nacimiento debe ser una instancia de Date");
        // Asignación de propiedades privadas
        this.#id = id;
        this.#nombre = nombreAlumno;
        this.#apellido = apellidoAlumno;
        this.#edad = edadAlumno;
        this.#telefono = telefonoAlumno;
        this.fechaNacimiento = fechaNacimiento;
    }

    #validarEdad() {
        return this.#edad >= 18;
    }

    mostrarEstado() {

        if (this.#validarEdad()) {
            return "Es mayor de edad - " + this.#edad;
        } else {
            return "Es menor de edad - " + this.#edad;
        }
    }

    // Getter
    getNombre() {
        return this.#nombre;
    }

    // Setter

    /**
     * Establece el nombre del alumno.
     *
     * @param {nombre} parametro de entrada
     */
    setNombre(nombre) {
        if (typeof nombre !== "string")
            throw new Error("Nombre inválido");

        this.#nombre = nombre;
    }
}
