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
     * Crea una instancia de Alumno.
     *
     * @param {number} id Identificador único del alumno.
     * @param {string} nombreAlumno Nombre del alumno.
     * @param {string} [apellidoAlumno="Sin Apellido"] Apellido del alumno.
     * @param {number} [edadAlumno=0] Edad del alumno.
     * @param {string} [telefonoAlumno=""] Teléfono del alumno.
     * @param {Date} [fechaNacimiento=new Date()] Fecha de nacimiento del alumno.
     */
    constructor(id,nombreAlumno, apellidoAlumno ="Sin Apellido", edadAlumno =0, telefonoAlumno = "", fechaNacimiento = new Date()) {

        if(typeof id !== "number")
            throw new Error("ID debe ser number");
        if(typeof nombreAlumno !== "string")
            throw new Error("Nombre debe ser string");
        if(typeof apellidoAlumno !== "string")
            throw new Error("Apellido debe ser string");
        if(typeof edadAlumno !== "number")
            throw new Error("Edad debe ser number");
        if(typeof telefonoAlumno !== "string")
            throw new Error("Teléfono debe ser string");
        if(!(fechaNacimiento instanceof Date))
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
        
        if (this.#validarEdad() ) {
            return "Es mayor de edad - "+ this.#edad;
        } else {
            return "Es menor de edad - "+ this.#edad;
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
     * @param {string} nombre Nuevo nombre del alumno.
     */
    setNombre(nombre) {
        if (typeof nombre !== "string")
            throw new Error("Nombre inválido");

        this.#nombre = nombre;
    }
}



let a0 = new Alumno("Bernabe");
let a1 = new Alumno("Jose", "Rojas");
let a2 = new Alumno("Felix", "Rodriguez", 22);
let a3 = new Alumno("Ana", "Mejia", 22, "999421499"); 
let a4 = new Alumno("Daniel","Inche",32,"919759571", new Date("1993-12-15"));

console.log(a3.getNombre());
a3.setNombre("Ana Luisa");
console.log(a3.getNombre());

console.log(a4.getNombre()); 


console.dir(a4); 
console.log(a4); 
console.log(a4.fechaNacimiento);

console.log(a0.mostrarEstado());
console.log(a1.mostrarEstado());
console.log(a2.mostrarEstado());
console.log(a3.mostrarEstado());
console.log(a4.mostrarEstado());
/*
Tipos de datos en JavaScript

| Tipo      | Resultado de `typeof` | Ejemplo               |
| --------- | --------------------- | --------------------- |
| String    | `"string"`            | `typeof "Hola"`       |
| Number    | `"number"`            | `typeof 25`           |
| Boolean   | `"boolean"`           | `typeof true`         |
| Undefined | `"undefined"`         | `typeof undefined`    |
| Object    | `"object"`            | `typeof {}`           |
| Function  | `"function"`          | `typeof function(){}` |
| BigInt    | `"bigint"`            | `typeof 100n`         |
| Symbol    | `"symbol"`            | `typeof Symbol()`     | 
*/