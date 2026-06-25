/*
Ctrl+Shift+P -> Quokka.js Run Automatically for current file
TEST
*/



import Persona from "./Persona.js";

class Alumno extends Persona {
    constructor(
        id,
        nombreAlumno,
        apellidoAlumno = "Sin Apellido",
        edadAlumno = 0,
        telefonoAlumno = "",
        fechaNacimiento = new Date(),
        grado = "",
        seccion = ""
    ) {
        super(
            id,
            nombreAlumno,
            apellidoAlumno,
            edadAlumno,
            telefonoAlumno,
            fechaNacimiento
        );

        this.grado = grado;
        this.seccion = seccion;
    }
}

export default Alumno;