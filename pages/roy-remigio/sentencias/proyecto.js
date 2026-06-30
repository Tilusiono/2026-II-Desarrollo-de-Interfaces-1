class Persona {
    constructor(codigo, nombre, apellido, edad, movil, correo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.movil = movil;
        this.correo = correo;
    }

    obtenerNombreCompleto() {
        return `${this.nombre} ${this.apellido}`;
    }

    actualizarContacto(movil, correo) {
        this.movil = movil;
        this.correo = correo;
    }
}

class Notas {
    constructor(nota1, nota2, nota3) {
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.nota3 = nota3;
        this.promedio = 0;
        this.estado = "Pendiente";
    }

    calcularPromedio() {
        this.promedio = (this.nota1 + this.nota2 + this.nota3) / 3;
        this.determinarEstado();
        return this.promedio;
    }

    determinarEstado() {
        this.estado = this.promedio >= 13 ? "Aprobado" : "Desaprobado";
    }
}

class Alumno extends Persona {
    constructor(codigo, nombre, apellido, edad, movil, correo, direccion, gradoAcademico, carrera) {
        super(codigo, nombre, apellido, edad, movil, correo);
        this.direccion = direccion;
        this.gradoAcademico = gradoAcademico;
        this.carrera = carrera;
        this.notas = null;
    }

    asignarNotas(notas) {
        this.notas = notas;
    }

    mostrarResumen() {
        return {
            codigo: this.codigo,
            nombreCompleto: this.obtenerNombreCompleto(),
            carrera: this.carrera,
            promedio: this.notas ? this.notas.calcularPromedio() : null,
            estado: this.notas ? this.notas.estado : "Sin notas"
        };
    }
}

class Profesor extends Persona {
    constructor(codigo, nombre, apellido, edad, movil, correo, especialidad, gradoAcademico) {
        super(codigo, nombre, apellido, edad, movil, correo);
        this.especialidad = especialidad;
        this.gradoAcademico = gradoAcademico;
        this.cursosAsignados = [];
    }

    asignarCurso(curso) {
        this.cursosAsignados.push(curso);
    }
}

class Asignatura {
    constructor(codigo, nombre, creditos, ciclo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.creditos = creditos;
        this.ciclo = ciclo;
    }
}

class Curso {
    constructor(codigo, nombre, creditos, ciclo, profesor, asignatura) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.creditos = creditos;
        this.ciclo = ciclo;
        this.profesor = profesor;
        this.asignatura = asignatura;
    }

    asignarProfesor(profesor) {
        this.profesor = profesor;
    }
}

class Matricula {
    constructor(codigoMatricula, alumno, curso, fechaMatricula, periodoAcademico, aula) {
        this.codigoMatricula = codigoMatricula;
        this.alumno = alumno;
        this.curso = curso;
        this.fechaMatricula = fechaMatricula;
        this.periodoAcademico = periodoAcademico;
        this.aula = aula;
        this.estado = "Activa";
    }

    cancelarMatricula() {
        this.estado = "Cancelada";
    }

    mostrarDetalle() {
        return {
            codigoMatricula: this.codigoMatricula,
            alumno: this.alumno.obtenerNombreCompleto(),
            curso: this.curso.nombre,
            estado: this.estado,
            periodo: this.periodoAcademico
        };
    }
}

class Aula {
    constructor(codigo, nombre, capacidad, pabellon) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.capacidad = capacidad;
        this.pabellon = pabellon;
    }

    estaDisponible(cantidadEstudiantes) {
        return cantidadEstudiantes <= this.capacidad;
    }
}

class Carrera {
    constructor(codigo, nombre, duracionAnios, facultad) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.duracionAnios = duracionAnios;
        this.facultad = facultad;
        this.cursos = [];
    }

    agregarCurso(curso) {
        this.cursos.push(curso);
    }
}

class Facultad {
    constructor(codigo, nombre, decano, direccion) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.decano = decano;
        this.direccion = direccion;
        this.carreras = [];
    }

    agregarCarrera(carrera) {
        this.carreras.push(carrera);
    }
}

// Ejemplo de uso
const facultad = new Facultad("F001", "Facultad de Ingeniería", "Dr. Pérez", "Av. Central 123");
const carrera = new Carrera("C001", "Ingeniería de Sistemas", 5, facultad);
const profesor = new Profesor("P001", "Carlos", "Mendoza", 40, "987654321", "carlos@uni.edu", "Programación", "Maestría");
const asignatura = new Asignatura("A001", "Programación I", 4, 1);
const curso = new Curso("CUR001", "Programación I", 4, 1, profesor, asignatura);
const alumno = new Alumno("AL001", "Ana", "Torres", 20, "912345678", "ana@uni.edu", "Av. Lima 456", "Universitario", "Ingeniería de Sistemas");
const notas = new Notas(15, 14, 13);

alumno.asignarNotas(notas);
carrera.agregarCurso(curso);
facultad.agregarCarrera(carrera);

const matricula = new Matricula("M001", alumno, curso, "2026-03-01", "2026-I", new Aula("A001", "Lab 01", 30, "Pabellón B"));

console.log(alumno.mostrarResumen());
console.log(matricula.mostrarDetalle());
