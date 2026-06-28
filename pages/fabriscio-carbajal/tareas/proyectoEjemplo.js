class Alumno {
    nombre;
    apellido;
    edad;
    telmovil;

    constructor(nom, ape, edad, tel) {
        this.nombre = nom;
        this.apelido = ape;
        this.edad = edad;
        this.telmovil = tel;
        }
}

class Profesor {
    nombresCompletos;
    fechaNac;
    nroTelefono;
    gradoAcademico; 
        constructor(nom, fech, tel, grado) {
        this.nombresCompletos = nom;
        this.fechaNac = fech;
        this.nroTelefono = tel;
        this.gradoAcademico = grado;
        }
    }

class Notas {

    preliminar1;
    parcial;
    preliminar2;
    final;

        constructor(pre1, parc, pre2, final) {
        this.preliminar1 = pre1;
        this.parcial = parc;
        this.preliminar2 = pre2;
        this.final = final;
        }
}

class Cursos {
    nombre;
    descripcion;
    ciclo;
        constructor(nom, descr, ciclo) {
        this.nombre = nom;
        this.descripcion = descr;
        this.ciclo = ciclo;
        }
}