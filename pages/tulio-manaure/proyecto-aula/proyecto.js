class Entidad {
    #id;
    #nombre;
    #identificador; // puede ser DNI, microchip, etc.
    #edad;

    constructor(id, nombre, identificador, edad) {
        this.#id = id;
        this.#nombre = nombre;
        this.#identificador = identificador;
        this.#edad = edad;
    }

    getNombreIdentificador() {
        return `${this.#nombre} (${this.#identificador})`;
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

class Can extends Entidad {
    estado; 
    #raza;
    #contactoDueno;
    #nivelEducativo;
    #estado;

    constructor(id, nombre, microchip, edad, raza, contactoDueno, nivelEducativo, estado) {
        super(id, nombre, microchip, edad);
        this.#raza = raza;
        this.#contactoDueno = contactoDueno;
        this.#nivelEducativo = nivelEducativo;
        this.#estado = estado;
        this.estado = estado;
    }

    mostrarRol() {
        return "Soy un can en entrenamiento";
    }

    mostrarInfo() {
        return `${this.getNombreIdentificador()} - Raza: ${this.#raza}`;
    }

    // Nuevo método para exponer el contacto del dueño externamente
    mostrarContactoDueno() {
        return this.#contactoDueno;
    }

    #validarContacto() {
        return this.#contactoDueno.includes("@") || this.#contactoDueno.length > 6;
    }

    #estadoActivo() {
        return this.#estado === true;
    }
}

class CanExperto extends Can {
    #puntuacionObediencia;
    #puestoTorneo;
    estado = "Elite Canina";

    constructor(id, nombre, microchip, edad, raza, contactoDueno, nivelEducativo, estado, puntuacion, puesto) {
        super(id, nombre, microchip, edad, raza, contactoDueno, nivelEducativo, estado);
        this.#puntuacionObediencia = puntuacion;
        this.#puestoTorneo = puesto;
    }

    mostrarRol() {
        return "Soy un can de nivel Experto / Exhibición";
    }

    mostrarPuntuacion() {
        return this.#puntuacionObediencia;
    }

    // Nuevo método para exponer el puesto del torneo externamente
    mostrarPuestoTorneo() {
        return this.#puestoTorneo;
    }

    #validarPuntuacion() {
        return this.#puntuacionObediencia >= 18; // Escala de 0 a 20
    }

    #calcularMerito() {
        return this.#puestoTorneo;
    }
}

class CanIntermedio extends Can {
    estado; 
    #puntuacionObediencia;
    constructor(id, nombre, microchip, edad, raza, contactoDueno, nivelEducativo, estado, puntuacion) {
        super(id, nombre, microchip, edad, raza, contactoDueno, nivelEducativo, estado);
        this.#puntuacionObediencia = puntuacion;
    }

    mostrarRol() {
        return "Soy un can de nivel Intermedio";
    }

    mostrarPuntuacion() {
        return this.#puntuacionObediencia;
    }

    #validarPuntuacion() {
        return this.#puntuacionObediencia >= 15;
    }
}

class CanCachorro extends Can {
    estado; 
    #puntuacionObediencia;
    constructor(id, nombre, microchip, edad, raza, contactoDueno, nivelEducativo, estado, puntuacion) {
        super(id, nombre, microchip, edad, raza, contactoDueno, nivelEducativo, estado);
        this.#puntuacionObediencia = puntuacion;
    }

    mostrarRol() {
        return "Soy un cachorro en socialización elemental";
    }

    mostrarPuntuacion() {
        return this.#puntuacionObediencia;
    }

    #validarPuntuacion() {
        return this.#puntuacionObediencia >= 10;
    }
}

class Entrenador extends Entidad {
    cargo;
    #correo;
    #especialidad; // agilidad, modificacion de conducta, etc.
    #telefono;
    #contratacion;

    constructor(id, nombre, dni, edad, correo, especialidad, telefono, fecha) {
        super(id, nombre, dni, edad);
        this.#correo = correo;
        this.#especialidad = especialidad;
        this.#telefono = telefono;
        this.#contratacion = fecha;
    }

    mostrarRol() {
        return "Soy un entrenador certificado";
    }

    mostrarEspecialidad() {
        return this.#especialidad;
    }

    // Nuevos métodos para exponer datos de contacto del entrenador
    mostrarCorreo() {
        return this.#correo;
    }

    mostrarTelefono() {
        return this.#telefono;
    }

    #validarContrato() {
        return this.#contratacion instanceof Date;
    }

    #correoValido() {
        return this.#correo.includes("@");
    }
}

class EntrenadorPrincipal extends Entrenador {
    estado = "Activo";
    #cargo;

    constructor(id, nombre, dni, edad, correo, especialidad, telefono, fecha, cargo) {
        super(id, nombre, dni, edad, correo, especialidad, telefono, fecha);
        this.#cargo = cargo;
    }

    mostrarRol() {
        return "Soy el entrenador principal / Director del Taller";
    }

    mostrarCargo() {
        return this.#cargo;
    }

    #validarCargo() {
        return this.#cargo !== "";
    }
}

class EtólogoInvitado extends Entrenador {
    centroDeOrigen; 

    #centroDeOrigen;
    constructor(id, nombre, dni, edad, correo, especialidad, telefono, fecha, centroDeOrigen) {
        super(id, nombre, dni, edad, correo, especialidad, telefono, fecha);
        this.#centroDeOrigen = centroDeOrigen;
    }

    mostrarRol() {
        return "Soy un especialista en conducta invitado externo";
    }

    mostrarOrigen() {
        return this.#centroDeOrigen;
    }
}

class Evaluaciones {
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

    #esAprobado() {
        return this.#calificacion >= 11;
    }
}

class ProgramaEntrenamiento {
    codigo; 
    #id;
    #nombre;
    #sesiones;

    constructor(id, nombre, codigo, sesiones) {
        this.#id = id;
        this.#nombre = nombre;
        this.codigo = codigo;
        this.#sesiones = sesiones;
    }

    mostrarPrograma() {
        return `${this.#nombre} (${this.codigo})`;
    }

    obtenerSesiones() {
        return this.#sesiones;
    }
}

class Reserva {
    estado;
    #id;
    #can;
    #programa;

    constructor(id, can, programa, estado) {
        this.#id = id;
        this.#can = can;
        this.#programa = programa;
        this.estado = estado;
    }

    resumen() {
        return `${this.#can} inscrito en ${this.#programa}`;
    }
}

class AsistenciaClase {
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

    mostrarEstado() {
        return this.#estado;
    }
}

class ZonaTaller {
    codigo; 
    #id;
    #nombre;
    #capacidadCanes;

    constructor(id, nombre, capacidadCanes, codigo) {
        this.#id = id;
        this.#nombre = nombre;
        this.#capacidadCanes = capacidadCanes;
        this.codigo = codigo;
    }

    mostrar() {
        return this.#nombre;
    }
}

class EspecialidadTaller {
    codigo; 
    #id;
    #nombre;
    #duracionMeses;

    constructor(id, nombre, duracionMeses, codigo) {
        this.#id = id;
        this.#nombre = nombre;
        this.#duracionMeses = duracionMeses;
        this.codigo = codigo;
    }

    mostrar() {
        return this.#nombre;
    }
}

class PagoServicio {
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

    mostrarEstado() {
        return this.#estado;
    }
}

class DepartamentoGestion {
    ubicacion; 
    #id;
    #nombre;
    #responsable;

    constructor(id, nombre, responsable, ubicacion) {
        this.#id = id;
        this.#nombre = nombre;
        this.#responsable = responsable;
        this.ubicacion = ubicacion;
    }

    mostrar() {
        return this.#nombre;
    }
}

class AccesorioCanino {
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
}

// ==========================================
// pruebas e inicializacion
// ==========================================

let perro1 = new CanExperto(
    1,
    "Rambo",
    "CHIP-9923",
    3, // 3 años
    "Pastor Alemán",
    "dueno_rambo@gmail.com",
    "Avanzado",
    true,
    19, // obediencia
    1  // puesto en el ranking del taller
);

let entrenador1 = new EntrenadorPrincipal(
    2,
    "joe",
    "DNI-456789",
    45,
    "joe.instructordeperras@taller.com",
    "K9 & Modificación de Conducta",
    "987654321",
    new Date(),
    "Director Técnico del Centro"
);

let programa1 = new ProgramaEntrenamiento(
    1,
    "Agilidad y Destreza Nivel I",
    "AG-01",
    12 // sesiones requeridas
);

let accesorio1 = new AccesorioCanino(
    1,
    "Arnés de Entrenamiento Táctico",
    180,
    "seguridad"
);

let resultado = document.getElementById("resultado");

// renderizado completo en el HTML al final del script
resultado.innerHTML = `

<h3> Mascota en Registro</h3>
<p><strong>Información Principal:</strong> ${perro1.mostrarInfo()}</p> 
<p><strong>Edad:</strong> ${perro1.mostrarEdad()} años</p>
<p><strong>Rol:</strong> ${perro1.mostrarRol()}</p>
<p><strong>Puntuación de Obediencia:</strong> ${perro1.mostrarPuntuacion()} / 20</p>
<p><strong>Puesto del Torneo:</strong> #${perro1.mostrarPuestoTorneo()}</p>
<p><strong>Contacto del Dueño:</strong> ${perro1.mostrarContactoDueno()}</p>

<hr>

<h3> Entrenador Responsable</h3>
<p><strong>Nombre e Identificador:</strong> ${entrenador1.getNombreIdentificador()}</p> 
<p><strong>Edad:</strong> ${entrenador1.mostrarEdad()} años</p>
<p><strong>Rol:</strong> ${entrenador1.mostrarRol()}</p>
<p><strong>Cargo:</strong> ${entrenador1.mostrarCargo()}</p>
<p><strong>Especialidad:</strong> ${entrenador1.mostrarEspecialidad()}</p>
<p><strong>Correo Electrónico:</strong> ${entrenador1.mostrarCorreo()}</p>
<p><strong>Teléfono:</strong> ${entrenador1.mostrarTelefono()}</p>

<hr>

<h3> Programa Asignado</h3>
<p><strong>Curso de Entrenamiento:</strong> ${programa1.mostrarPrograma()}</p>
<p><strong>Cantidad de Sesiones:</strong> ${programa1.obtenerSesiones()} clases obligatorias</p>

<hr>

<h3> Equipamiento Sugerido</h3>
<p><strong>Accesorio Sugerido:</strong> ${accesorio1.mostrarInfo()} (Categoría: ${accesorio1.categoria})</p>

`;