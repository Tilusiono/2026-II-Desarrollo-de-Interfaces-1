//1
class Alumno {

    /**
     * 
     * @param {number} id 
     * @param {string} nombre 
     * @param {string} apellido 
     * @param {number} edad 
     * @param {string} correoElectronico 
     * @param {string} telefono 
     * @param {string} gradoAcademico 
     * @param {boolean} estado 
     */
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

let a0 = new Alumno(1, "Villanueva");
let a1 = new Alumno(2, "Jose", "Carlos");
let a2 = new Alumno(3, "Tulio", "Manaure", 19);
let a3 = new Alumno(4, "Joe", "Estefano", 19, "947851485");
let a4 = new Alumno(5, "Roy", "Remigio", 17, "948751489", new Date("2009-02-16"));

//2
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

let p0 = new Profesor(101, "Kenny");
let p1 = new Profesor(102, "Bernabe", "Inche");
let p2 = new Profesor(103, "Giomar", "Bazan", 32);
let p3 = new Profesor(104, "Yenner", "Mendoza", 38, "YMendoza@email.com");
let p4 = new Profesor(105, "Herber", "de la Cruz", 30, "HDLC@email.com", "987654321", "Base de Datos", new Date("1996-08-11"));

//3
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

//4
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

let c0 = new Curso(501, "Programación Orientada a Objetos");
let c1 = new Curso(502, "Desarrollo de Interfaces 1", "AUL-402");
let c2 = new Curso(503, "Lectura Crítica y Argumentación", "AUL-207", 105); 
let c3 = new Curso(504, "Proyecto Desarrollo de los Componentes de la Capa de Vista", "PCV-504", 104, 4);
let c4 = new Curso(505, "Diseño de Base Datos Relacionales", "BD-504", 103, 5, "jueves 08:45 - 11:00");

//5
class Matricula {
    constructor(id, idAlumno, idCurso, periodoAcademico, fechaInscripcion) {
        this.idMatricula = id;
        this.idAlumno = idAlumno;
        this.idCurso = idCurso;
        this.periodoAcademico = periodoAcademico;
        this.fechaInscripcion = fechaInscripcion;
    }
}


//6
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

//7
class Aula {
    constructor(id, nombreAula, capacidad, pabellon, tipoAula) {
        this.idAula = id;
        this.nombreAula = nombreAula;
        this.capacidad = capacidad;
        this.pabellon = pabellon;
        this.tipoAula = tipoAula;
    }
}

//8
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


//9
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

//10
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

const igv =19.4
console.log(igv); 
const cigv=20;
console.log(cigv); 

class Alimnotop10 extends Producto {
    constructor(id, nombre, categoria, precio, stock, marca, fechaVencimiento) {
        super(id, nombre, categoria, precio, stock, marca);
        this.fechaVencimiento = fechaVencimiento;
    }
}

class alumnoterciosuperios extends Producto {
    constructor(id, nombre, categoria, precio, stock, marca, fechaVencimiento) {
        super(id, nombre, categoria, precio, stock, marca);
        this.fechaVencimiento = fechaVencimiento;
    }
}

class alumnoterciopromedio extends Producto {
    constructor(id, nombre, categoria, precio, stock, marca, fechaVencimiento) {
        super(id, nombre, categoria, precio, stock, marca);
        this.fechaVencimiento = fechaVencimiento;
    }
}
