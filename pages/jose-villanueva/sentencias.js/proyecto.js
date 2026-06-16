class Alumno {
    idAlumno;         
    nombre;
    apellido;
    edad;
    correoElectronico;
    telefono;
    gradoAcademico;  
    estado; 

    constructor(id, nombre, apellido) {
        this.idAlumno = id;
        this.nombre = nombre;
        this.apellido = apellido;
    }
}

class Alumno {
    idAlumno; nombre; apellido; edad; correoElectronico; telefono; gradoAcademico; estado; 
}

class Profesor {
    idProfesor; nombre; apellido; edad; correoElectronico; telefono; especialidad; fechaContratacion;
}

class Notas {
    idNota; idAlumno; idCurso; calificacion; tipoEvaluacion; fecha; 
}

class Curso {
    idCurso; nombreCurso; codigoCurso; idProfesor; creditos; horario; 
}

class Matricula {  
    idMatricula; idAlumno; idCurso; periodoAcademico; fechaInscripcion; 
}

class Asistencia {
    idAsistencia; idAlumno; idCurso; fecha; estadoAsistencia; observaciones;
}

class Aula {
    idAula; nombreAula; capacidad; pabellon; tipoAula; 
}

class Carrera {
    idCarrera; nombreCarrera; codigoCarrera; duracionSemestres; directorCarrera; estado;
}

class Pago {
    idPago; idAlumno; monto; fechaPago; concepto; estadoPago; metodoPago;
}