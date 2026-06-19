class Alumno {
    constructor(id, nombre, apellido, edad, correoElectronico, telefono, gradoAcademico, estado) {
        this.idAlumno = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.correoElectronico = correoElectronico;
        this.telefono = telefono;
        this.gradoAcademico = gradoAcademico;
        this.estado = estado;
    }
}

class Profesor {
    constructor(id, nombre, apellido, edad, correoElectronico, telefono, especialidad, fechaContratacion) {
        this.idProfesor = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.correoElectronico = correoElectronico;
        this.telefono = telefono;
        this.especialidad = especialidad;
        this.fechaContratacion = fechaContratacion;
    }
}

class Notas {
    constructor(id, idAlumno, idCurso, calificacion, tipoEvaluacion, fecha) {
        this.idNota = id;
        this.idAlumno = idAlumno;
        this.idCurso = idCurso;
        this.calificacion = calificacion;
        this.tipoEvaluacion = tipoEvaluacion;
        this.fecha = fecha;
    }
}

class Curso {
    constructor(id, nombreCurso, codigoCurso, idProfesor, creditos, horario) {
        this.idCurso = id;
        this.nombreCurso = nombreCurso;
        this.codigoCurso = codigoCurso;
        this.idProfesor = idProfesor;
        this.creditos = creditos;
        this.horario = horario;
    }
}

class Matricula {
    constructor(id, idAlumno, idCurso, periodoAcademico, fechaInscripcion) {
        this.idMatricula = id;
        this.idAlumno = idAlumno;
        this.idCurso = idCurso;
        this.periodoAcademico = periodoAcademico;
        this.fechaInscripcion = fechaInscripcion;
    }
}

class Asistencia {
    constructor(id, idAlumno, idCurso, fecha, estadoAsistencia, observaciones) {
        this.idAsistencia = id;
        this.idAlumno = idAlumno;
        this.idCurso = idCurso;
        this.fecha = fecha;
        this.estadoAsistencia = estadoAsistencia;
        this.observaciones = observaciones;
    }
}

class Aula {
    constructor(id, nombreAula, capacidad, pabellon, tipoAula) {
        this.idAula = id;
        this.nombreAula = nombreAula;
        this.capacidad = capacidad;
        this.pabellon = pabellon;
        this.tipoAula = tipoAula;
    }
}

class Carrera {
    constructor(id, nombreCarrera, codigoCarrera, duracionSemestres, directorCarrera, estado) {
        this.idCarrera = id;
        this.nombreCarrera = nombreCarrera;
        this.codigoCarrera = codigoCarrera;
        this.duracionSemestres = duracionSemestres;
        this.directorCarrera = directorCarrera;
        this.estado = estado;
    }
}

class Pago {
    constructor(id, idAlumno, monto, fechaPago, concepto, estadoPago, metodoPago) {
        this.idPago = id;
        this.idAlumno = idAlumno;
        this.monto = monto;
        this.fechaPago = fechaPago;
        this.concepto = concepto;
        this.estadoPago = estadoPago;
        this.metodoPago = metodoPago;
    }
}

class Departamento {
    constructor(id, nombreDepartamento, jefeDepartamento, ubicacion, estado) {
        this.idDepartamento = id;
        this.nombreDepartamento = nombreDepartamento;
        this.jefeDepartamento = jefeDepartamento;
        this.ubicacion = ubicacion;
        this.estado = estado;
    }
}

class Producto {
    constructor(id, nombre, categoria, precio, stock, marca) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
        this.marca = marca;
    }
}

let producto1 = new Producto(
    101,
    "Mouse Gamer",
    "Periféricos",
    120,
    25,
    "Logitech"
);