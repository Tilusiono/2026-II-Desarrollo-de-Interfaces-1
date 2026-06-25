/*
Ctrl+Shift+P -> Quokka.js Run Automatically for current file
TEST
*/



import Persona from "./Persona.js";

class Alumno extends Persona {
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
    constructor(
        id,
        nombreAlumno,
        apellidoAlumno = "Sin Apellido",
        edadAlumno = 0,
        telefonoAlumno = "",
        fechaNacimiento = new Date()
    ) {
        super(
            id,
            nombreAlumno,
            apellidoAlumno,
            edadAlumno,
            telefonoAlumno,
            fechaNacimiento
        );
    }
    
}

export default Alumno;