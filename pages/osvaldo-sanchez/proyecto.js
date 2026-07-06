class Alumno {
    nombre;
    #apellido;
  #edad;
    #telmovil;

    constructor(nom, ape, edad, tel) {
        this.nombre = nom;
        this.#apellido = ape;
        this.#edad = edad;
        this.#telmovil = tel;
    }

    // Métodos públicos
    mostrarAlumno() {
        console.log("Nombre: " + this.nombre);
    }

    estudiar() {
        console.log(this.nombre + " está estudiando.");
    }

    // Métodos privados
    #validarEdad() {
        return this.#edad >= 18;
    }

    #mostrarTelefono() {
        return this.#telmovil;
    }
}

class Profesor {

    nombre;
    #apellido;
    #fechaNac;
    #gradoAcademico;

    constructor(nombre, apellido, fechaNac, gradoAcademico) {
        this.nombre = nombre;
        this.#apellido = apellido;
        this.#fechaNac = fechaNac;
        this.#gradoAcademico = gradoAcademico;
    }

    // Métodos públicos
    mostrarProfesor() {
        console.log("Profesor: " + this.nombre);
    }

    enseñar() {
        console.log(this.nombre + " está enseñando.");
    }

    // Métodos privados
    #validarFecha() {
        return this.#fechaNac != "";
    }

    #mostrarGrado() {
        return this.#gradoAcademico;
    }
}
class Notas {

    fechaRegistro;
    #fechaCierre;
    #nota;
    #notaPrevia;

    constructor(fechaRegistro, fechaCierre, nota, notaPrevia) {
        this.fechaRegistro = fechaRegistro;
        this.#fechaCierre = fechaCierre;
        this.#nota = nota;
        this.#notaPrevia = notaPrevia;
    }

    // Métodos públicos
    mostrarNota() {
        console.log("Fecha de Registro: " + this.fechaRegistro);
    }

    calcularPromedio() {
        return (this.#nota + this.#notaPrevia) / 2;
    }

    // Métodos privados
    #validarNota() {
        return this.#nota >= 0 && this.#nota <= 20;
    }

    #compararNotas() {
        return this.#nota > this.#notaPrevia;
    }
}
class Cursos {

    nombre;
    #descripcion;
    #codigo;
    #creditos;

    constructor(nombre, descripcion, codigo, creditos) {
        this.nombre = nombre;
        this.#descripcion = descripcion;
        this.#codigo = codigo;
        this.#creditos = creditos;
    }

    mostrarCurso() {
        console.log("Nombre: " + this.nombre);
        console.log("Descripción: " + this.#descripcion);
        console.log("Código: " + this.#codigo);
        console.log("Créditos: " + this.#creditos);
    }

    editarCurso(nombre) {
        this.nombre = nombre;
    }

    // Métodos privados
    #validarCodigo() {
        return this.#codigo.length > 0;
    }

    #calcularHoras() {
        return this.#creditos * 16;
    }
}

class Producto {

    nombre;
    #precio;
    #stock;
    #categoria;

    constructor(nombre, precio, stock, categoria) {
        this.nombre = nombre;
        this.#precio = precio;
        this.#stock = stock;
        this.#categoria = categoria;
    }

    // Métodos públicos
    mostrarProducto() {
        console.log("Nombre: " + this.nombre);
        console.log("Precio: S/ " + this.#precio);
        console.log("Stock: " + this.#stock);
        console.log("Categoría: " + this.#categoria);
    }

    vender(cantidad) {
        if (cantidad <= this.#stock) {
            this.#stock -= cantidad;
            console.log("Venta realizada.");
        } else {
            console.log("Stock insuficiente.");
        }
    }

    // Métodos privados
    #validarStock() {
        return this.#stock > 0;
    }

    #calcularValor() {
        return this.#precio * this.#stock;
    }
}

class Aula {

    nombre;
    #codigo;
    #capacidad;
    #pabellon;

    constructor(nombre, codigo, capacidad, pabellon) {
        this.nombre = nombre;
        this.#codigo = codigo;
        this.#capacidad = capacidad;
        this.#pabellon = pabellon;
    }

    mostrarAula() {
        console.log(this.nombre);
    }

    cambiarNombre(nombre) {
        this.nombre = nombre;
    }

    #validarCapacidad() {
        return this.#capacidad > 0;
    }

    #mostrarCodigo() {
        return this.#codigo;
    }

}

class Carrera {

    nombre;
    #codigo;
    #facultad;
    #duracion;

    constructor(nombre, codigo, facultad, duracion) {
        this.nombre = nombre;
        this.#codigo = codigo;
        this.#facultad = facultad;
        this.#duracion = duracion;
    }

    mostrarCarrera() {
        console.log(this.nombre);
    }

    cambiarNombre(nombre) {
        this.nombre = nombre;
    }

    #validarCodigo() {
        return this.#codigo != "";
    }

    #calcularCiclos() {
        return this.#duracion;
    }

}

class Facultad {

    nombre;
    #codigo;
    #director;
    #ubicacion;

    constructor(nombre, codigo, director, ubicacion) {
        this.nombre = nombre;
        this.#codigo = codigo;
        this.#director = director;
        this.#ubicacion = ubicacion;
    }

    mostrarFacultad() {
        console.log(this.nombre);
    }

    cambiarDirector(nombre) {
        this.#director = nombre;
    }

    #validarDirector() {
        return this.#director != "";
    }

    #mostrarUbicacion() {
        return this.#ubicacion;
    }

}

class Matricula {

    codigo;
    #fecha;
    #estado;
    #costo;

    constructor(codigo, fecha, estado, costo) {
        this.codigo = codigo;
        this.#fecha = fecha;
        this.#estado = estado;
        this.#costo = costo;
    }

    mostrarMatricula() {
        console.log(this.codigo);
    }

    pagar() {
        console.log("Matrícula pagada");
    }

    #validarEstado() {
        return this.#estado;
    }

    #calcularCosto() {
        return this.#costo;
    }

}

class Asistencia {

    codigo;
    #fecha;
    #estado;
    #hora;

    constructor(codigo, fecha, estado, hora) {
        this.codigo = codigo;
        this.#fecha = fecha;
        this.#estado = estado;
        this.#hora = hora;
    }

    mostrarAsistencia() {
        console.log(this.codigo);
    }

    registrar() {
        console.log("Asistencia registrada");
    }

    #validarHora() {
        return this.#hora;
    }

    #mostrarEstado() {
        return this.#estado;
    }

}

let alumno1 = new alumno("Osvaldo", "Sanchez", 18, "123456789");
console.log(alumno1);



let igv2024 = -19.4
console.log(igv2024)
igv2024 = 20;
console.log(igv2024)


class Persona {

}