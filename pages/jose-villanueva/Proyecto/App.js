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

    getNombreCompleto() {
        return `${this.#nombre} ${this.#apellido}`;
    }

    mostrarEdad() {
        return this.#edad;
    }

    #validarEdad() {
        return this.#edad >= 0;
    }

    #formatearNombre() {
        return this.#nombre.toUpperCase();
    }
    }
class Alumno extends Persona {

    estado; 
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

        this.estado = estado;
    }

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
class AlumnoTop10 extends Alumno {

    #promedio;
    #puesto;

    estado = "Top 10";

    constructor(
        id,
        nombre,
        apellido,
        edad,
        correo,
        telefono,
        grado,
        estado,
        promedio,
        puesto
    ) {

        super(
            id,
            nombre,
            apellido,
            edad,
            correo,
            telefono,
            grado,
            estado
        );

        this.#promedio = promedio;
        this.#puesto = puesto;
    }


    mostrarRol() {
        return "Soy un alumno Top 10";
    }


    mostrarPromedio() {
        return this.#promedio;
    }


    #validarPromedio() {
        return this.#promedio >= 18;
    }


    #calcularMerito() {
        return this.#puesto;
    }
}
class AlumnoTercioSuperior extends Alumno {

    estado; 

    #promedio;
    #puesto;
    #categoria;
    constructor(
        id,
        nombre,
        apellido,
        edad,
        correo,
        telefono,
        grado,
        estado,
        promedio
    ) {

        super(
            id,
            nombre,
            apellido,
            edad,
            correo,
            telefono,
            grado,
            estado
        );

        this.#promedio = promedio;
    }


    mostrarRol() {
        return "Soy un alumno del tercio superior";
    }


    mostrarPromedio() {
        return this.#promedio;
    }


    #validarPromedio() {
        return this.#promedio >= 15;
    }
}
class AlumnoTercioPromedio extends Alumno {

    estado; 

    #promedio;
    #puesto;
    #categoria;
    constructor(
        id,
        nombre,
        apellido,
        edad,
        correo,
        telefono,
        grado,
        estado,
        promedio
    ) {

        super(
            id,
            nombre,
            apellido,
            edad,
            correo,
            telefono,
            grado,
            estado
        );

        this.#promedio = promedio;
    }


    mostrarRol() {
        return "Soy un alumno de promedio regular";
    }


    mostrarPromedio() {
        return this.#promedio;
    }


    #validarPromedio() {
        return this.#promedio >= 10;
    }
}
class Profesor extends Persona {

    cargo;

    #correo;
    #especialidad;
    #telefono;
    #contratacion;

    constructor(
        id,
        nombre,
        apellido,
        edad,
        correo,
        especialidad,
        telefono,
        fecha
    ) {

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
class ProfesorPrincipal extends Profesor {

    estado = "Activo";

    #cargo;
    #nivel;
    #experiencia;


    constructor(
        id,
        nombre,
        apellido,
        edad,
        correo,
        especialidad,
        telefono,
        fecha,
        cargo
    ) {

        super(
            id,
            nombre,
            apellido,
            edad,
            correo,
            especialidad,
            telefono,
            fecha
        );

        this.#cargo = cargo;
    }


    mostrarRol() {
        return "Soy un profesor principal";
    }


    mostrarCargo() {
        return this.#cargo;
    }


    #validarCargo() {
        return this.#cargo !== "";
    }


    #estadoProfesor() {
        return true;
    }
}
class ProfesorInvitado extends Profesor {

    universidad; 

    #universidad;
    #contrato;
    #horas;
    constructor(
        id,
        nombre,
        apellido,
        edad,
        correo,
        especialidad,
        telefono,
        fecha,
        universidad
    ) {

        super(
            id,
            nombre,
            apellido,
            edad,
            correo,
            especialidad,
            telefono,
            fecha
        );

        this.#universidad = universidad;
    }


    mostrarRol() {
        return "Soy un profesor invitado";
    }


    mostrarUniversidad() {
        return this.#universidad;
    }


    #validarUniversidad() {
        return this.#universidad !== "";
    }


    #estadoInvitado() {
        return true;
    }
}
class Notas {

    tipo; 

    #id;
    #calificacion;
    #fecha;
    constructor(id, calificacion, fecha, tipo) {

        this.#id = id;
        this.#calificacion = calificacion;
        this.#fecha = fecha;
        this.tipo = tipo;
    }


    mostrarNota() {
        return this.#calificacion;
    }


    mostrarTipo() {
        return this.tipo;
    }


    #validarNota() {
        return this.#calificacion >= 0 && this.#calificacion <= 20;
    }


    #esAprobado() {
        return this.#calificacion >= 11;
    }
}
class Curso {

    codigo; 

    #id;
    #nombre;
    #creditos;
    constructor(id, nombre, codigo, creditos) {

        this.#id = id;
        this.#nombre = nombre;
        this.codigo = codigo;
        this.#creditos = creditos;
    }


    mostrarCurso() {
        return `${this.#nombre} (${this.codigo})`;
    }


    obtenerCreditos() {
        return this.#creditos;
    }


    #validarCreditos() {
        return this.#creditos > 0;
    }


    #formatoCodigo() {
        return this.codigo.toUpperCase();
    }
}
class Matricula {

    estado;

    #id;
    #alumno;
    #curso;
    constructor(id, alumno, curso, estado) {

        this.#id = id;
        this.#alumno = alumno;
        this.#curso = curso;
        this.estado = estado;
    }


    mostrarMatricula() {
        return "Matrícula registrada";
    }


    resumen() {
        return `${this.#alumno} en ${this.#curso}`;
    }


    #validarMatricula() {
        return this.estado !== "";
    }


    #estadoActivo() {
        return true;
    }
}
class Asistencia {

    tipo; 
    #id;
    #estado;
    #fecha;
    constructor(id, estado, fecha, tipo) {

        this.#id = id;
        this.#estado = estado;
        this.#fecha = fecha;
        this.tipo = tipo;
    }


    registrar() {
        return "Asistencia registrada";
    }


    mostrarEstado() {
        return this.#estado;
    }


    #validarFecha() {
        return this.#fecha instanceof Date;
    }


    #formatoFecha() {
        return this.#fecha.toString();
    }
}
class Aula {

    codigo; 

    #id;
    #nombre;
    #capacidad;
    constructor(id, nombre, capacidad, codigo) {

        this.#id = id;
        this.#nombre = nombre;
        this.#capacidad = capacidad;
        this.codigo = codigo;
    }


    mostrar() {
        return this.#nombre;
    }


    obtenerCapacidad() {
        return this.#capacidad;
    }


    #validarCapacidad() {
        return this.#capacidad > 0;
    }


    #informacion() {
        return "Aula disponible";
    }
}
class Carrera {

    codigo; 

    #id;
    #nombre;
    #duracion;
    constructor(id, nombre, duracion, codigo) {

        this.#id = id;
        this.#nombre = nombre;
        this.#duracion = duracion;
        this.codigo = codigo;
    }


    mostrar() {
        return this.#nombre;
    }


    obtenerDuracion() {
        return this.#duracion;
    }


    #validarDuracion() {
        return this.#duracion > 0;
    }


    #estadoCarrera() {
        return "Activa";
    }
}
class Pago {

    metodo;

    #id;
    #monto;
    #estado;
    constructor(id, monto, estado, metodo) {

        this.#id = id;
        this.#monto = monto;
        this.#estado = estado;
        this.metodo = metodo;
    }


    pagar() {
        return "Pago realizado";
    }


    mostrarEstado() {
        return this.#estado;
    }


    #validarMonto() {
        return this.#monto > 0;
    }


    #tipoPago() {
        return this.metodo;
    }
}
class Departamento {

    ubicacion; 

    #id;
    #nombre;
    #jefe;
    constructor(id, nombre, jefe, ubicacion) {

        this.#id = id;
        this.#nombre = nombre;
        this.#jefe = jefe;
        this.ubicacion = ubicacion;
    }


    mostrar() {
        return this.#nombre;
    }


    mostrarJefe() {
        return this.#jefe;
    }


    #validarDepartamento() {
        return true;
    }


    #informacion() {
        return this.ubicacion;
    }
}
class Producto {

    categoria; 

    #id;
    #nombre;
    #precio;
    constructor(id, nombre, precio, categoria) {

        this.#id = id;
        this.#nombre = nombre;
        this.#precio = precio;
        this.categoria = categoria;
    }


    mostrarInfo() {
        return `${this.#nombre} - S/ ${this.#precio}`;
    }


    obtenerPrecio() {
        return this.#precio;
    }


    #validarPrecio() {
        return this.#precio > 0;
    }


    #formatearNombre() {
        return this.#nombre.toUpperCase();
    }
}


let alumno1 = new AlumnoTop10(
    1,
    "Juan",
    "Perez",
    20,
    "juan@gmail.com",
    "999999999",
    "Ingeniería",
    true,
    19,
    1
);
let profesor1 = new ProfesorPrincipal(
    2,
    "Carlos",
    "Lopez",
    45,
    "carlos@gmail.com",
    "Programación",
    "987654321",
    new Date(),
    "Director académico"
);
let curso1 = new Curso(
    1,
    "Programación Web",
    "PW01",
    4
);
let producto1 = new Producto(
    1,
    "Laptop",
    2500,
    "Tecnología"
);
let resultado = document.getElementById("resultado");


resultado.innerHTML = `

<h3>Alumno</h3>
<p>${alumno1.mostrarRol()}</p>
<p>Promedio: ${alumno1.mostrarPromedio()}</p>


<h3>Profesor</h3>
<p>${profesor1.mostrarRol()}</p>
<p>Cargo: ${profesor1.mostrarCargo()}</p>


<h3>Curso</h3>
<p>${curso1.mostrarCurso()}</p>


<h3>Producto</h3>
<p>${producto1.mostrarInfo()}</p>

`;