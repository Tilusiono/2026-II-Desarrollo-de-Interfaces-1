class Alumno {
    constructor(idAlumno, nombre, apellido, edad, correo, telefono, grado, estado) {
        this.idAlumno = idAlumno || null;
        this.nombre = nombre || "";
        this.apellido = apellido || "";
        this.edad = edad || null;
        this.correoElectronico = correo || "";
        this.telefono = telefono || "";
        this.gradoAcademico = grado || "";
        this.estado = estado !== undefined ? estado : true;
    }
}

const a0 = new Alumno(1, "Remigio", "Villanueva Roy", 17, "masterstreamingrv@email.com", "948751489", "Desarrollo Front-end y Back-end", true);
const a1 = new Alumno(2, "Jose", "Carlos");
const a2 = new Alumno(3, "Tulio", "Manaure", 19);
const a3 = new Alumno(4, "Joe", "Estefano", 19, "joe@email.com", "947851485");

class Profesor {
    constructor(idProfesor, nombre, apellido, edad, correo, telefono, especialidad, fechaContrato) {
        this.idProfesor = idProfesor || null;
        this.nombre = nombre || "";
        this.apellido = apellido || "";
        this.edad = edad || null;
        this.correoElectronico = correo || "";
        this.telefono = telefono || "";
        this.especialidad = especialidad || "";
        this.fechaContratacion = fechaContrato || null;
    }
}

const p0 = new Profesor(101, "Kenny");
const p1 = new Profesor(102, "Bernabe", "Inche");
const p2 = new Profesor(103, "Giomar", "Bazan", 32);
const p3 = new Profesor(104, "Yenner", "Mendoza", 38, "YMendoza@email.com");
const p4 = new Profesor(105, "Herber", "de la Cruz", 30, "HDLC@email.com", "987654321", "Base de Datos", new Date("1996-08-11"));

class Nota {
    constructor(idNota, idAlumno, idCurso, calificacion, tipoEvaluacion, fecha) {
        this.idNota = idNota || null;
        this.idAlumno = idAlumno || null;
        this.idCurso = idCurso || null;
        this.calificacion = calificacion || 0;
        this.tipoEvaluacion = tipoEvaluacion || "";
        this.fecha = fecha || new Date();
    }
}

class Curso {
    constructor(idCurso, nombreCurso, codigoCurso, idProfesor, creditos, horario) {
        this.idCurso = idCurso || null;
        this.nombreCurso = nombreCurso || "";
        this.codigoCurso = codigoCurso || "";
        this.idProfesor = idProfesor || null;
        this.creditos = creditos || 0;
        this.horario = horario || "";
    }
}

const c0 = new Curso(501, "Programación Orientada a Objetos");
const c1 = new Curso(502, "Desarrollo de Interfaces 1", "AUL-402");
const c2 = new Curso(503, "Lectura Crítica y Argumentación", "AUL-207", 105);
const c3 = new Curso(504, "Proyecto Desarrollo de los Componentes de la Capa de Vista", "PCV-504", 104, 4);
const c4 = new Curso(505, "Diseño de Base Datos Relacionales", "BD-504", 103, 5, "jueves 08:45 - 11:00");

class Matricula {
    constructor(idMatricula, idAlumno, idCurso, periodo, fecha) {
        this.idMatricula = idMatricula || null;
        this.idAlumno = idAlumno || null;
        this.idCurso = idCurso || null;
        this.periodoAcademico = periodo || "";
        this.fechaInscripcion = fecha || new Date();
    }
}

class Asistencia {
    constructor(idAsistencia, idAlumno, idCurso, fecha, estado, observaciones) {
        this.idAsistencia = idAsistencia || null;
        this.idAlumno = idAlumno || null;
        this.idCurso = idCurso || null;
        this.fecha = fecha || new Date();
        this.estadoAsistencia = estado || "Ausente";
        this.observaciones = observaciones || "";
    }
}

class Aula {
    constructor(idAula, nombreAula, capacidad, pabellon, tipoAula) {
        this.idAula = idAula || null;
        this.nombreAula = nombreAula || "";
        this.capacidad = capacidad || 0;
        this.pabellon = pabellon || "";
        this.tipoAula = tipoAula || "";
    }
}

class Carrera {
    constructor(idCarrera, nombreCarrera, codigoCarrera, duracion, director, estado) {
        this.idCarrera = idCarrera || null;
        this.nombreCarrera = nombreCarrera || "";
        this.codigoCarrera = codigoCarrera || "";
        this.duracionSemestres = duracion || 0;
        this.directorCarrera = director || "";
        this.estado = estado !== undefined ? estado : true;
    }
}

class Pago {
    constructor(idPago, idAlumno, monto, fecha, concepto, estado, metodo) {
        this.idPago = idPago || null;
        this.idAlumno = idAlumno || null;
        this.monto = monto || 0.0;
        this.fechaPago = fecha || new Date();
        this.concepto = concepto || "";
        this.estadoPago = estado || "Pendiente";
        this.metodoPago = metodo || "";
    }
}

class Departamento {
    constructor(idDepartamento, nombreDepartamento, jefe, ubicacion, estado) {
        this.idDepartamento = idDepartamento || null;
        this.nombreDepartamento = nombreDepartamento || "";
        this.jefeDepartamento = jefe || "";
        this.ubicacion = ubicacion || "";
        this.estado = estado !== undefined ? estado : true;
    }
}

class Producto {
    constructor(id, nombre, categoria, precio, stock, marca) {
        this.id = id || null;
        this.nombre = nombre || "";
        this.categoria = categoria || "";
        this.precio = precio || 0.0;
        this.stock = stock || 0;
        this.marca = marca || "";
    }
}

const producto1 = new Producto(101, "Mouse Gamer", "Periféricos", 120, 25, "Logitech");

const IGV_ACTUAL = 18.0;
const IGV_HISTORICO = 20.0;

class AlumnoTop10 extends Alumno {
    constructor(idAlumno, nombre, apellido, edad, correo, telefono, grado, estado, porcentajeBeca) {
        super(idAlumno, nombre, apellido, edad, correo, telefono, grado, estado);
        this.porcentajeBeca = porcentajeBeca !== undefined ? porcentajeBeca : 100;
    }
}

class AlumnoTercioSuperior extends Alumno {
    constructor(idAlumno, nombre, apellido, edad, correo, telefono, grado, estado, descuentoPension) {
        super(idAlumno, nombre, apellido, edad, correo, telefono, grado, estado);
        this.descuentoPension = descuentoPension !== undefined ? descuentoPension : 50;
    }
}

class AlumnoTercioPromedio extends Alumno {
    constructor(idAlumno, nombre, apellido, edad, correo, telefono, grado, estado, requiereTutor) {
        super(idAlumno, nombre, apellido, edad, correo, telefono, grado, estado);
        this.requiereTutor = requiereTutor !== undefined ? requiereTutor : false;
    }
}