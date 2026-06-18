class Alumno {
    constructor(id, nombre, apellido, edad, correo, telefono, grado, estado) {
        this.idAlumno = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.correoElectronico = correo;
        this.telefono = telefono;
        this.gradoAcademico = grado;
        this.estado = estado;
    }
}

class Profesor {
    constructor(id, nombre, apellido, edad, correo, telefono, especialidad, fecha) {
        this.idProfesor = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.correoElectronico = correo;
        this.telefono = telefono;
        this.especialidad = especialidad;
        this.fechaContratacion = fecha;
    }
}

class Notas {
    constructor(id, idAlumno, idCurso, calificacion, tipo, fecha) {
        this.idNota = id;
        this.idAlumno = idAlumno;
        this.idCurso = idCurso;
        this.calificacion = calificacion;
        this.tipoEvaluacion = tipo;
        this.fecha = fecha;
    }
}

class Curso {
    constructor(id, nombre, codigo, idProfesor, creditos, horario) {
        this.idCurso = id;
        this.nombreCurso = nombre;
        this.codigoCurso = codigo;
        this.idProfesor = idProfesor;
        this.creditos = creditos;
        this.horario = horario;
    }
}

class Matricula {
    constructor(id, idAlumno, idCurso, periodo, fecha) {
        this.idMatricula = id;
        this.idAlumno = idAlumno;
        this.idCurso = idCurso;
        this.periodoAcademico = periodo;
        this.fechaInscripcion = fecha;
    }
}

class Asistencia {
    constructor(id, idAlumno, idCurso, fecha, estado, observaciones) {
        this.idAsistencia = id;
        this.idAlumno = idAlumno;
        this.idCurso = idCurso;
        this.fecha = fecha;
        this.estadoAsistencia = estado;
        this.observaciones = observaciones;
    }
}

class Aula {
    constructor(id, nombre, capacidad, pabellon, tipo) {
        this.idAula = id;
        this.nombreAula = nombre;
        this.capacidad = capacidad;
        this.pabellon = pabellon;
        this.tipoAula = tipo;
    }
}

class Carrera {
    constructor(id, nombre, codigo, duracion, director, estado) {
        this.idCarrera = id;
        this.nombreCarrera = nombre;
        this.codigoCarrera = codigo;
        this.duracionSemestres = duracion;
        this.directorCarrera = director;
        this.estado = estado;
    }
}

class Pago {
    constructor(id, idAlumno, monto, fecha, concepto, estado, metodo) {
        this.idPago = id;
        this.idAlumno = idAlumno;
        this.monto = monto;
        this.fechaPago = fecha;
        this.concepto = concepto;
        this.estadoPago = estado;
        this.metodoPago = metodo;
    }
}

class Departamento {
    constructor(id, nombre, jefe, ubicacion, estado) {
        this.idDepartamento = id;
        this.nombreDepartamento = nombre;
        this.jefeDepartamento = jefe;
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