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
    "Chumpitaz",
    20,
    "juan@gmail.com",
    "923131321",
    "Ingeniería de Sistemas",
    true,
    19,
    1
);
let alumno2 = new AlumnoTop10(
    2,
    "Erick",
    "Medina",
    19,
    "Erick@gmail.com",
    "987654321",
    "Ingeniería de Sistemas",
    true,
    18,
    2
);
let alumno3 = new AlumnoTercioSuperior(
    3,
    "Jose",
    "Villanueva",
    20,
    "VillaJose@gmail.com",
    "991232121",
    "Ingeniería de Sistemas",
    true,
    17
);
let alumno4 = new AlumnoTercioSuperior(
    4,
    "Tulio",
    "Manaure",
    21,
    "Tuliomana@gmail.com",
    "95231321",
    "Ingeniería de Sistemas",
    true,
    16
);
let alumno5 = new AlumnoTercioPromedio(
    5,
    "Joe",
    "Rivera",
    22,
    "Joerive@gmail.com",
    "988323211",
    "Ingeniería de Sistemas",
    true,
    14
);
let alumno6 = new AlumnoTercioPromedio(
    6,
    "Roy",
    "Remigio",
    18,
    "RoyRemigio@gmail.com",
    "93210321",
    "Ingeniería de Sistemas",
    true,
    13
);
let profesor1 = new ProfesorPrincipal(
    2,
    "Bernabe",
    "Inche",
    45,
    "bernabe@gmail.com",
    "Desarrollo de Interfaces 1",
    "987654321",
    new Date(),
    "Director académico"
);
let profesor2 = new ProfesorPrincipal(
    3,
    "Herber",
    "de la Cruz",
    50,
    "herber@gmail.com",
    "Base de Datos",
    "983220808",
    new Date(),
    "Coordinador de carrera"
);
let profesor3 = new ProfesorPrincipal(
    4,
    "Giomar",
    "Bazan",
    42,
    "giomar@gmail.com",
    "Lectura critica y argumentacion",
    "932198765",
    new Date(),
    "profesor titular"
);
let profesor4 = new ProfesorInvitado(
    5,
    "Yenner",
    "Mendoza",
    39,
    "yenner@gmail.com",
    "Capa de Vista",
    "931525642",
    new Date(),
    "Universidad Tecnológica del Perú"
);
let profesor5 = new ProfesorInvitado(
    6,
    "Kenny",
    "Malqui",
    37,
    "kenny@gmail.com",
    "Programación orientada a objetos",
    "955555555",
    new Date(),
    "Universidad Tecnológica del Perú"
);
let curso1 = new Curso(
    1,
    "Desarrollo de Interfaces 1",
    "DI01",
    4
);
let curso2 = new Curso(
    2,
    "Base de Datos",
    "BD02",
    5
);
let curso3 = new Curso(
    3,
    "Lectura critica y argumentacion",
    "LCA03",
    4
);
let curso4 = new Curso(
    4,
    "Capa de Vista",
    "CV04",
    3
);
let curso5 = new Curso(
    5,
    "Programación Orientada a Objetos",
    "POO05",
    4
);
let producto1 = new Producto(
    1,
    "Laptop",
    2500,
    "Tecnología"
);
let producto2 = new Producto(
    2,
    "Libro de Programación",
    80,
    "Libros"
);
let producto3 = new Producto(
    3,
    "Cuaderno Universitario",
    15,
    "Útiles"
);
let producto4 = new Producto(
    4,
    "Mouse Gamer",
    120,
    "Tecnología"
);
let producto5 = new Producto(
    5,
    "Teclado Mecánico",
    250,
    "Tecnología"
);
let resultado = document.getElementById("resultado");


resultado.innerHTML = `

<h3>Alumnos</h3>
<p>${alumno1.mostrarInfo()} - ${alumno1.mostrarRol()} - Promedio: ${alumno1.mostrarPromedio()}</p>
<p>${alumno2.mostrarInfo()} - ${alumno2.mostrarRol()} - Promedio: ${alumno2.mostrarPromedio()}</p>
<p>${alumno3.mostrarInfo()} - ${alumno3.mostrarRol()} - Promedio: ${alumno3.mostrarPromedio()}</p>
<p>${alumno4.mostrarInfo()} - ${alumno4.mostrarRol()} - Promedio: ${alumno4.mostrarPromedio()}</p>
<p>${alumno5.mostrarInfo()} - ${alumno5.mostrarRol()} - Promedio: ${alumno5.mostrarPromedio()}</p>
<p>${alumno6.mostrarInfo()} - ${alumno6.mostrarRol()} - Promedio: ${alumno6.mostrarPromedio()}</p>

<h3>Profesores</h3>
<p>${profesor1.getNombreCompleto()} - ${profesor1.mostrarRol()} - Cargo: ${profesor1.mostrarCargo()}</p>
<p>${profesor2.getNombreCompleto()} - ${profesor2.mostrarRol()} - Cargo: ${profesor2.mostrarCargo()}</p>
<p>${profesor3.getNombreCompleto()} - ${profesor3.mostrarRol()} - Cargo: ${profesor3.mostrarCargo()}</p>
<p>${profesor4.getNombreCompleto()} - ${profesor4.mostrarRol()} - Universidad: ${profesor4.mostrarUniversidad()}</p>
<p>${profesor5.getNombreCompleto()} - ${profesor5.mostrarRol()} - Universidad: ${profesor5.mostrarUniversidad()}</p>


<h3>Cursos</h3>
<p>${curso1.mostrarCurso()}</p>
<p>${curso2.mostrarCurso()}</p>
<p>${curso3.mostrarCurso()}</p>
<p>${curso4.mostrarCurso()}</p>
<p>${curso5.mostrarCurso()}</p>


<h3>Productos</h3>
<p>${producto1.mostrarInfo()}</p>
<p>${producto2.mostrarInfo()}</p>
<p>${producto3.mostrarInfo()}</p>
<p>${producto4.mostrarInfo()}</p>
<p>${producto5.mostrarInfo()}</p>

`;