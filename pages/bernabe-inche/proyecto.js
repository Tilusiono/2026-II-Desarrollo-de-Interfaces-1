class Alumno{
    nombre;
    apellido;
    edad;
    telmovil;

    constructor(nom, ape,edad,tel) {
        this.nombre = nom;
        this.apellido = ape;
        this.edad=edad;
        this.telmovil=tel;
    }
     constructor(nom, ape,edad) {
        this.nombre = nom;
        this.apellido = ape;
        this.edad=edad;
    }
}
class Profesor{
    nombresCompletos;
    fechaNac;
    nroTelefono;
    gradoAcademico;
}
class Notas{
    fechaRegistro;
    fechaCierre;
    nota;
    notaPrevia;
}
class Cursos{
    nombre;
    descripcion;
    
}