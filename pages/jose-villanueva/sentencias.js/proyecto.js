//1
class Persona {
    #id;
    #nombre;
    #apellido;
    #edad;

    constructor(id, nombre, apellido, edad) {
        this.#id = id;
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#edad = edad;
    }

    // GETTERS (encapsulamiento)
    getNombreCompleto() {
        return `${this.#nombre} ${this.#apellido}`;
    }

    mostrarEdad() {
        return this.#edad;
    }

    // MÉTODOS PRIVADOS
    #validarEdad() {
        return this.#edad >= 0;
    }

    #formatearNombre() {
        return this.#nombre.toUpperCase();
    }
}
//2
class Alumno extends Persona {
    #correo;
    #telefono;
    #grado;
    #estado;

    constructor(id, nombre, apellido, edad, correo, telefono, grado, estado) {
        super(id, nombre, apellido, edad);
        this.#correo = correo;
        this.#telefono = telefono;
        this.#grado = grado;
        this.#estado = estado;
    }

    // POLIMORFISMO
    mostrarRol() {
        return "Soy un alumno";
    }

    mostrarInfo() {
        return `${this.getNombreCompleto()} - ${this.#grado}`;
    }

    #validarCorreo() {
        return this.#correo.includes("@");
    }

    #estadoActivo() {
        return this.#estado === true;
    }
}
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

class Profesor extends Persona {
    #correo;
    #especialidad;
    #telefono;
    #contratacion;

    constructor(id, nombre, apellido, edad, correo, especialidad, telefono, fecha) {
        super(id, nombre, apellido, edad);
        this.#correo = correo;
        this.#especialidad = especialidad;
        this.#telefono = telefono;
        this.#contratacion = fecha;
    }

    mostrarRol() {
        return "Soy un profesor";
    }

    mostrarEspecialidad() {
        return this.#especialidad;
    }

    #validarContrato() {
        return this.#contratacion instanceof Date;
    }

    #correoValido() {
        return this.#correo.includes("@");
    }
}

//4
class Curso {
    #id;
    #nombre;
    #codigo;
    #creditos;

    constructor(id, nombre, codigo, creditos) {
        this.#id = id;
        this.#nombre = nombre;
        this.#codigo = codigo;
        this.#creditos = creditos;
    }

    mostrarCurso() {
        return `${this.#nombre} (${this.#codigo})`;
    }

    obtenerCreditos() {
        return this.#creditos;
    }

    #validarCreditos() {
        return this.#creditos > 0;
    }

    #formatoCodigo() {
        return this.#codigo.toUpperCase();
    }
}
//5
class Matricula {
    #id;
    #alumno;
    #curso;
    #fecha;

    constructor(id, alumno, curso, fecha) {
        this.#id = id;
        this.#alumno = alumno;
        this.#curso = curso;
        this.#fecha = fecha;
    }

    mostrarMatricula() {
        return `Matrícula registrada`;
    }

    resumen() {
        return `${this.#alumno} en ${this.#curso}`;
    }

    #validarFecha() {
        return this.#fecha instanceof Date;
    }

    #estadoMatricula() {
        return true;
    }
}
//6
class Asistencia {
    #id; #estado; #fecha; #observacion;
    constructor(id, estado, fecha, obs) { this.#id=id; this.#estado=estado; this.#fecha=fecha; this.#observacion=obs; }
    registrar(){ return "Asistencia registrada"; }
    estado(){ return this.#estado; }
    #validar(){ return true; }
    #formato(){ return this.#fecha.toString(); }
}
//7
class Aula {
    #id; #nombre; #capacidad; #pabellon;
    constructor(id,nombre,cap,pab){ this.#id=id; this.#nombre=nombre; this.#capacidad=cap; this.#pabellon=pab; }
    mostrar(){ return this.#nombre; }
    capacidad(){ return this.#capacidad; }
    #validar(){ return this.#capacidad>0; }
    #info(){ return "Aula OK"; }
}
//8
class Carrera {
    #id; #nombre; #duracion; #director;
    constructor(id,nombre,duracion,director){ this.#id=id; this.#nombre=nombre; this.#duracion=duracion; this.#director=director; }
    mostrar(){ return this.#nombre; }
    duracion(){ return this.#duracion; }
    #validar(){ return true; }
    #estado(){ return "activa"; }
}
//9
class Pago {
    #id; #monto; #metodo; #estado;
    constructor(id,monto,metodo,estado){ this.#id=id; this.#monto=monto; this.#metodo=metodo; this.#estado=estado; }
    pagar(){ return "Pago realizado"; }
    estado(){ return this.#estado; }
    #validar(){ return this.#monto>0; }
    #tipo(){ return this.#metodo; }
}
//10
class Departamento {
    #id; #nombre; #jefe; #ubicacion;
    constructor(id,nombre,jefe,ubi){ this.#id=id; this.#nombre=nombre; this.#jefe=jefe; this.#ubicacion=ubi; }
    mostrar(){ return this.#nombre; }
    jefe(){ return this.#jefe; }
    #validar(){ return true; }
    #info(){ return this.#ubicacion; }
}

class Producto {
    #id;
    #nombre;
    #precio;
    #stock;

    constructor(id, nombre, precio, stock) {
        this.#id = id;
        this.#nombre = nombre;
        this.#precio = precio;
        this.#stock = stock;
    }

    mostrarInfo() {
        return `${this.#nombre} - S/ ${this.#precio}`;
    }

    calcularValorInventario() {
        return this.#precio * this.#stock;
    }

    #validarStock() {
        return this.#stock > 0;
    }

    #formatearNombre() {
        return this.#nombre.toUpperCase();
    }
}

class Alumnotop10 extends Producto {
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
