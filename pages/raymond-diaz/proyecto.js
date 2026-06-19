class Alumno {
    nombre;
    apellido;
    edad;
    telmovil;

    constructor(nombre, apellido, edad, telmovil) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.telmovil = telmovil;
    }
}   
class profesor {
    Nombrescompleto;
    Fechanacimiento;
    nrotelefono;
    gradoacademico;

    constructor(Nombrescompleto, Fechanacimiento, nrotelefono, gradoacademico) {
        this.Nombrescompleto = Nombrescompleto;
        this.Fechanacimiento = Fechanacimiento;
        this.nrotelefono = nrotelefono;
        this.gradoacademico = gradoacademico;
    }
}
class notas {
    preliminar;
    parcial;
    preliminar2;
    final;
    
    constructor(preliminar, parcial, preliminar2, final) {
        this.preliminar = preliminar;
        this.parcial = parcial; 
        this.preliminar2 = preliminar2;
        this.final = final;
    }
}

class cursos {
    nombrecurso;
    profesor;
    alumno;
    notas;

    constructor(nombrecurso, profesor, alumno, notas) {
        this.nombrecurso = nombrecurso;
        this.profesor = profesor;
        this.alumno = alumno;
        this.notas = notas;
    }   
}        



let alumno1 = new Alumno("Raymond", "Diaz", 20, "123456789");
console.log(alumno1);