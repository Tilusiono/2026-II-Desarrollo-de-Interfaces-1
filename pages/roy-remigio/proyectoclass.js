class Alumno {
    constructor(idAlumno = null, nombre = "", apellido = "", edad = null, correoElectronico = "", telefono = "", gradoAcademico = "", estado = true) {
        Object.assign(this, { idAlumno, nombre, apellido, edad, correoElectronico, telefono, gradoAcademico, estado });
    }
}

const a0 = new Alumno(1, "Remigio", "Villanueva Roy", 17, "masterstreamingrv@email.com", "948751489", "Desarrollo Front-end y Back-end", true);
const a1 = new Alumno(2, "Jose", "Carlos");
const a2 = new Alumno(3, "Tulio", "Manaure", 19);
const a3 = new Alumno(4, "Joe", "Estefano", 19, "joe@email.com", "947851485");

class Profesor {
    constructor(idProfesor = null, nombre = "", apellido = "", edad = null, correoElectronico = "", telefono = "", especialidad = "", fechaContratacion = null) {
        Object.assign(this, { idProfesor, nombre, apellido, edad, correoElectronico, telefono, especialidad, fechaContratacion });
    }
}

const p0 = new Profesor(101, "Kenny");
const p1 = new Profesor(102, "Bernabe", "Inche");
const p2 = new Profesor(103, "Giomar", "Bazan", 32);
const p3 = new Profesor(104, "Yenner", "Mendoza", 38, "YMendoza@email.com");
const p4 = new Profesor(105, "Herber", "de la Cruz", 30, "HDLC@email.com", "987654321", "Base de Datos", new Date("1996-08-11"));

class Nota {
    constructor(idNota = null, idAlumno = null, idCurso = null, calificacion = 0, tipoEvaluacion = "", fecha = new Date()) {
        Object.assign(this, { idNota, idAlumno, idCurso, calificacion, tipoEvaluacion, fecha });
    }
}

class Curso {
    constructor(idCurso = null, nombreCurso = "", codigoCurso = "", idProfesor = null, creditos = 0, horario = "") {
        Object.assign(this, { idCurso, nombreCurso, codigoCurso, idProfesor, creditos, horario });
    }
}

const c0 = new Curso(501, "Programación Orientada a Objetos");
const c1 = new Curso(502, "Desarrollo de Interfaces 1", "AUL-402");
const c2 = new Curso(503, "Lectura Crítica y Argumentación", "AUL-207", 105);
const c3 = new Curso(504, "Proyecto Desarrollo de los Componentes de la Capa de Vista", "PCV-504", 104, 4);
const c4 = new Curso(505, "Diseño de Base Datos Relacionales", "BD-504", 103, 5, "jueves 08:45 - 11:00");

class Matricula {
    constructor(idMatricula = null, idAlumno = null, idCurso = null, periodoAcademico = "", fechaInscripcion = new Date()) {
        Object.assign(this, { idMatricula, idAlumno, idCurso, periodoAcademico, fechaInscripcion });
    }
}

class Asistencia {
    constructor(idAsistencia = null, idAlumno = null, idCurso = null, fecha = new Date(), estadoAsistencia = "Ausente", observaciones = "") {
        Object.assign(this, { idAsistencia, idAlumno, idCurso, fecha, estadoAsistencia, observaciones });
    }
}

class Aula {
    constructor(idAula = null, nombreAula = "", capacidad = 0, pabellon = "", tipoAula = "") {
        Object.assign(this, { idAula, nombreAula, capacidad, pabellon, tipoAula });
    }
}

class Carrera {
    constructor(idCarrera = null, nombreCarrera = "", codigoCarrera = "", duracionSemestres = 0, directorCarrera = "", estado = true) {
        Object.assign(this, { idCarrera, nombreCarrera, codigoCarrera, duracionSemestres, directorCarrera, estado });
    }
}

class Pago {
    constructor(idPago = null, idAlumno = null, monto = 0.0, fechaPago = new Date(), concepto = "", estadoPago = "Pendiente", metodoPago = "") {
        Object.assign(this, { idPago, idAlumno, monto, fechaPago, concepto, estadoPago, metodoPago });
    }
}

class Departamento {
    constructor(idDepartamento = null, nombreDepartamento = "", jefeDepartamento = "", ubicacion = "", estado = true) {
        Object.assign(this, { idDepartamento, nombreDepartamento, jefeDepartamento, ubicacion, estado });
    }
}

class Producto {
    constructor(id = null, nombre = "", categoria = "", precio = 0.0, stock = 0, marca = "") {
        Object.assign(this, { id, nombre, categoria, precio, stock, marca });
    }
}

const producto1 = new Producto(101, "Mouse Gamer", "Periféricos", 120, 25, "Logitech");

const IMPUESTOS = Object.freeze({
    IGV_ACTUAL: 18.0,
    IGV_HISTORICO: 20.0
});

class AlumnoTop10 extends Alumno {
    constructor(idAlumno, nombre, apellido, edad, correoElectronico, telefono, gradoAcademico, estado, porcentajeBeca = 100) {
        super(idAlumno, nombre, apellido, edad, correoElectronico, telefono, gradoAcademico, estado);
        this.porcentajeBeca = porcentajeBeca;
    }
}

class AlumnoTercioSuperior extends Alumno {
    constructor(idAlumno, nombre, apellido, edad, correoElectronico, telefono, gradoAcademico, estado, descuentoPension = 50) {
        super(idAlumno, nombre, apellido, edad, correoElectronico, telefono, gradoAcademico, estado);
        this.descuentoPension = descuentoPension;
    }
}

class AlumnoTercioPromedio extends Alumno {
    constructor(idAlumno, nombre, apellido, edad, correoElectronico, telefono, gradoAcademico, estado, requiereTutor = false) {
        super(idAlumno, nombre, apellido, edad, correoElectronico, telefono, gradoAcademico, estado);
        this.requiereTutor = requiereTutor;
    }
}