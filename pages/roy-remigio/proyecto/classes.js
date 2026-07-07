class EntidadBase {
    constructor(id, tipo) {
        if (new.target === EntidadBase) {
            throw new Error('No se puede instanciar la clase abstracta EntidadBase');
        }
        this.id = id;
        this.tipo = tipo;
    }

    obtenerIdentificador() {
        return this.id;
    }

    mostrarResumen() {
        throw new Error('Debe implementar mostrarResumen()');
    }

    presentar() {
        return `${this.tipo.toUpperCase()} #${this.id}`;
    }

    #validarTipo() {
        return Boolean(this.tipo);
    }

    #formatearTipo() {
        return this.#validarTipo() ? this.tipo : 'sin-tipo';
    }

    obtenerEtiqueta() {
        return this.#formatearTipo();
    }
}

class Usuario extends EntidadBase {
    #nombre;
    #correo;
    #rol;

    constructor({ id, nombre, email, rol = 'visitante', registrados = [] } = {}) {
        super(id, 'usuario');
        this.#nombre = nombre || 'Invitado';
        this.#correo = email || '';
        this.#rol = rol;
        this.registrados = new Set(registrados);
    }

    mostrarResumen() {
        return `${this.#formatearNombre()} (${this.#rol})`;
    }

    actualizarRol(nuevoRol) {
        this.#rol = this.#validarRol(nuevoRol) ? nuevoRol : this.#rol;
    }

    estaRegistrado(eventoId) {
        return this.registrados.has(eventoId);
    }

    registrar(eventoId) {
        this.registrados.add(eventoId);
    }

    cancelar(eventoId) {
        this.registrados.delete(eventoId);
    }

    #validarRol(rol) {
        return typeof rol === 'string' && rol.trim().length > 0;
    }

    #formatearNombre() {
        return this.#nombre.charAt(0).toUpperCase() + this.#nombre.slice(1);
    }

    get nombre() {
        return this.#nombre;
    }

    get email() {
        return this.#correo;
    }
}

class Organizador extends EntidadBase {
    #nombre;
    #equipo;
    #especialidad;

    constructor(id, nombre, equipo, especialidad) {
        super(id, 'organizador');
        this.#nombre = nombre;
        this.#equipo = equipo;
        this.#especialidad = especialidad;
    }

    mostrarResumen() {
        return `${this.#nombre} lidera ${this.#equipo}`;
    }

    asignarEquipo(nuevoEquipo) {
        this.#equipo = this.#validarEquipo(nuevoEquipo) ? nuevoEquipo : this.#equipo;
    }

    #validarEquipo(value) {
        return typeof value === 'string' && value.trim().length > 0;
    }

    #formatearNombre() {
        return this.#nombre.toUpperCase();
    }

    get especialidad() {
        return this.#especialidad;
    }
}

class Participante extends EntidadBase {
    #nombre;
    #interes;
    #nivel;

    constructor(id, nombre, interes, nivel) {
        super(id, 'participante');
        this.#nombre = nombre;
        this.#interes = interes;
        this.#nivel = nivel;
    }

    mostrarResumen() {
        return `${this.#nombre} está interesado en ${this.#interes}`;
    }

    actualizarInteres(nuevoInteres) {
        this.#interes = this.#validarInteres(nuevoInteres) ? nuevoInteres : this.#interes;
    }

    #validarInteres(value) {
        return typeof value === 'string' && value.trim().length > 0;
    }

    #formatearInteres() {
        return this.#interes.toLowerCase();
    }

    get nivel() {
        return this.#nivel;
    }
}

class Evento extends EntidadBase {
    #titulo;
    #categoria;
    #datos;

    constructor({ id, titulo, categoria, fecha, hora = '', ubicacion = '', capacidad = 100, registrados = 0, precio = 0.0, descripcion = '', imagen = '' }) {
        super(id, 'evento');
        this.#titulo = titulo || 'Evento';
        this.#categoria = categoria || 'general';
        this.#datos = { fecha, hora, ubicacion, capacidad, registrados, precio, descripcion, imagen };
    }

    mostrarResumen() {
        return `${this.#titulo} (${this.#formatearCategoria(this.#categoria)})`;
    }

    actualizarDatos(nuevosDatos) {
        if (!nuevosDatos || typeof nuevosDatos !== 'object') return;
        if (nuevosDatos.titulo) this.#titulo = this.#validarTitulo(nuevosDatos.titulo) ? nuevosDatos.titulo : this.#titulo;
        if (nuevosDatos.categoria) this.#categoria = nuevosDatos.categoria;
        if (nuevosDatos.fecha) this.#datos.fecha = nuevosDatos.fecha;
        if (nuevosDatos.hora) this.#datos.hora = nuevosDatos.hora;
        if (nuevosDatos.ubicacion) this.#datos.ubicacion = nuevosDatos.ubicacion;
        if (typeof nuevosDatos.capacidad === 'number') this.#datos.capacidad = nuevosDatos.capacidad;
        if (typeof nuevosDatos.precio === 'number') this.#datos.precio = nuevosDatos.precio;
    }

    hayCupo() {
        return this.registrados < this.capacidad;
    }

    obtenerCuposDisponibles() {
        return Math.max(0, this.capacidad - this.registrados);
    }

    obtenerFechaFormateada() {
        try {
            const d = new Date(this.fecha);
            return d.toLocaleDateString('es-ES');
        } catch (e) {
            return this.fecha;
        }
    }

    obtenerPorcentajeOcupacion() {
        return Math.round((this.registrados / this.capacidad) * 100);
    }

    #validarTitulo(value) {
        return typeof value === 'string' && value.trim().length > 0;
    }

    #formatearCategoria(value) {
        return value ? value.toUpperCase() : 'GENERAL';
    }

    get titulo() {
        return this.#titulo;
    }

    get categoria() {
        return this.#categoria;
    }

    get fecha() {
        return this.#datos.fecha;
    }

    get hora() {
        return this.#datos.hora;
    }

    get ubicacion() {
        return this.#datos.ubicacion;
    }

    get capacidad() {
        return this.#datos.capacidad;
    }

    get registrados() {
        return this.#datos.registrados;
    }

    set registrados(value) {
        this.#datos.registrados = value;
    }

    get precio() {
        return this.#datos.precio;
    }

    get descripcion() {
        return this.#datos.descripcion;
    }

    get imagen() {
        return this.#datos.imagen;
    }

    set imagen(value) {
        this.#datos.imagen = value;
    }
}

class Conferencia extends Evento {
    #ponente;
    #duracion;
    #tema;

    constructor({ id, titulo, fecha, ponente, duracion, tema, hora = '', ubicacion = '', capacidad = 100, registrados = 0, precio = 0.0, descripcion = '', imagen = '' }) {
        super({ id, titulo, categoria: 'conferencia', fecha, hora, ubicacion, capacidad, registrados, precio, descripcion, imagen });
        this.tipo = 'conferencia';
        this.#ponente = ponente || 'Por confirmar';
        this.#duracion = duracion || '1 hora';
        this.#tema = tema || 'Tecnología';
    }

    mostrarResumen() {
        return `${this.titulo} por ${this.#ponente}`;
    }

    actualizarPonente(nuevoPonente) {
        this.#ponente = this.#validarPonente(nuevoPonente) ? nuevoPonente : this.#ponente;
    }

    #validarPonente(value) {
        return typeof value === 'string' && value.trim().length > 0;
    }

    #formatearPonente() {
        return this.#ponente.toUpperCase();
    }

    get duracion() {
        return this.#duracion;
    }

    get tema() {
        return this.#tema;
    }
}

class Taller extends Evento {
    #materiales;
    #nivel;
    #duracion;

    constructor({ id, titulo, fecha, materiales, nivel, duracion, hora = '', ubicacion = '', capacidad = 100, registrados = 0, precio = 0.0, descripcion = '', imagen = '' }) {
        super({ id, titulo, categoria: 'taller', fecha, hora, ubicacion, capacidad, registrados, precio, descripcion, imagen });
        this.tipo = 'taller';
        this.#materiales = materiales || 'Material básico';
        this.#nivel = nivel || 'Inicial';
        this.#duracion = duracion || '2 horas';
    }

    mostrarResumen() {
        return `${this.titulo} nivel ${this.#nivel}`;
    }

    actualizarNivel(nuevoNivel) {
        this.#nivel = this.#validarNivel(nuevoNivel) ? nuevoNivel : this.#nivel;
    }

    #validarNivel(value) {
        return typeof value === 'string' && value.trim().length > 0;
    }

    #formatearMateriales() {
        return this.#materiales.toLowerCase();
    }

    get materiales() {
        return this.#materiales;
    }
}

class Concierto extends Evento {
    #artista;
    #aforo;
    #genero;

    constructor({ id, titulo, fecha, artista, aforo, genero, hora = '', ubicacion = '', capacidad = 100, registrados = 0, precio = 0.0, descripcion = '', imagen = '' }) {
        super({ id, titulo, categoria: 'concierto', fecha, hora, ubicacion, capacidad, registrados, precio, descripcion, imagen });
        this.tipo = 'concierto';
        this.#artista = artista || 'Artista invitado';
        this.#aforo = aforo || capacidad;
        this.#genero = genero || 'Variado';
    }

    mostrarResumen() {
        return `${this.titulo} - ${this.#artista}`;
    }

    actualizarAforo(nuevoAforo) {
        this.#aforo = this.#validarAforo(nuevoAforo) ? nuevoAforo : this.#aforo;
    }

    #validarAforo(value) {
        return typeof value === 'number' && value > 0;
    }

    #formatearArtista() {
        return this.#artista.toUpperCase();
    }

    get genero() {
        return this.#genero;
    }
}

class Deporte extends Evento {
    #modalidad;
    #distancia;
    #rangoEdad;

    constructor({ id, titulo, fecha, modalidad, distancia, rangoEdad, hora = '', ubicacion = '', capacidad = 100, registrados = 0, precio = 0.0, descripcion = '', imagen = '' }) {
        super({ id, titulo, categoria: 'deporte', fecha, hora, ubicacion, capacidad, registrados, precio, descripcion, imagen });
        this.tipo = 'deporte';
        this.#modalidad = modalidad || 'General';
        this.#distancia = distancia || '5 km';
        this.#rangoEdad = rangoEdad || 'Todos';
    }

    mostrarResumen() {
        return `${this.titulo} en ${this.#modalidad}`;
    }

    actualizarModalidad(nuevaModalidad) {
        this.#modalidad = this.#validarModalidad(nuevaModalidad) ? nuevaModalidad : this.#modalidad;
    }

    #validarModalidad(value) {
        return typeof value === 'string' && value.trim().length > 0;
    }

    #formatearModalidad() {
        return this.#modalidad.toLowerCase();
    }

    get distancia() {
        return this.#distancia;
    }
}

class Cultura extends Evento {
    #tematica;
    #lugar;
    #duracion;

    constructor({ id, titulo, fecha, tematica, lugar, duracion, hora = '', ubicacion = '', capacidad = 100, registrados = 0, precio = 0.0, descripcion = '', imagen = '' }) {
        super({ id, titulo, categoria: 'cultura', fecha, hora, ubicacion, capacidad, registrados, precio, descripcion, imagen });
        this.tipo = 'cultura';
        this.#tematica = tematica || 'General';
        this.#lugar = lugar || 'Por definir';
        this.#duracion = duracion || '1 día';
    }

    mostrarResumen() {
        return `${this.titulo} sobre ${this.#tematica}`;
    }

    actualizarLugar(nuevoLugar) {
        this.#lugar = this.#validarLugar(nuevoLugar) ? nuevoLugar : this.#lugar;
    }

    #validarLugar(value) {
        return typeof value === 'string' && value.trim().length > 0;
    }

    #formatearTematica() {
        return this.#tematica.toUpperCase();
    }

    get lugar() {
        return this.#lugar;
    }
}

class Inscripcion extends EntidadBase {
    #usuario;
    #evento;
    #estado;

    constructor(id, usuario, evento, estado = 'pendiente') {
        super(id, 'inscripcion');
        this.#usuario = usuario;
        this.#evento = evento;
        this.#estado = estado;
    }

    mostrarResumen() {
        return `${this.#usuario.nombre} se inscribió en ${this.#evento.titulo}`;
    }

    cambiarEstado(nuevoEstado) {
        this.#estado = this.#validarEstado(nuevoEstado) ? nuevoEstado : this.#estado;
    }

    #validarEstado(value) {
        return typeof value === 'string' && value.trim().length > 0;
    }

    #formatearUsuario() {
        return this.#usuario.nombre.toUpperCase();
    }

    get estado() {
        return this.#estado;
    }
}

class Pago extends EntidadBase {
    #monto;
    #metodo;
    #estado;

    constructor(id, monto, metodo, estado = 'pendiente') {
        super(id, 'pago');
        this.#monto = monto;
        this.#metodo = metodo;
        this.#estado = estado;
    }

    mostrarResumen() {
        return `Pago de S/ ${this.#monto} con ${this.#metodo}`;
    }

    actualizarMetodo(nuevoMetodo) {
        this.#metodo = this.#validarMetodo(nuevoMetodo) ? nuevoMetodo : this.#metodo;
    }

    #validarMetodo(value) {
        return typeof value === 'string' && value.trim().length > 0;
    }

    #formatearMetodo() {
        return this.#metodo.toLowerCase();
    }

    get estado() {
        return this.#estado;
    }
}

const sistema = (function () {
    const eventos = [
        new Evento({ id: 'E1', titulo: 'Conferencia: JavaScript moderno', categoria: 'conferencia', fecha: new Date().toISOString(), hora: '18:00', ubicacion: 'Auditorio A', capacidad: 50, registrados: 12, precio: 30.00, descripcion: 'Charla sobre buenas prácticas en JS', imagen: 'https://picsum.photos/seed/event1/800/500' }),
        new Evento({ id: 'E2', titulo: 'Taller de Diseño UX', categoria: 'taller', fecha: new Date(Date.now() + 86400000).toISOString(), hora: '10:00', ubicacion: 'Sala 2', capacidad: 30, registrados: 8, precio: 50.00, descripcion: 'Taller práctico de UX', imagen: 'https://picsum.photos/seed/event2/800/500' }),
        new Evento({ id: 'E3', titulo: 'Concierto: Noche Indie', categoria: 'concierto', fecha: new Date(Date.now() + 86400000 * 3).toISOString(), hora: '20:30', ubicacion: 'Plaza Central', capacidad: 200, registrados: 150, precio: 75.00, descripcion: 'Banda local e invitados', imagen: 'https://picsum.photos/seed/event3/800/500' }),
        new Evento({ id: 'E4', titulo: 'Maratón 10K Ciudad', categoria: 'deporte', fecha: new Date(Date.now() + 86400000 * 7).toISOString(), hora: '07:00', ubicacion: 'Parque Metropolitano', capacidad: 500, registrados: 420, precio: 20.00, descripcion: 'Carrera para toda la familia', imagen: 'https://picsum.photos/seed/event4/800/500' }),
        new Evento({ id: 'E5', titulo: 'Feria Cultural', categoria: 'cultura', fecha: new Date(Date.now() + 86400000 * 10).toISOString(), hora: '11:00', ubicacion: 'Centro Cultural', capacidad: 300, registrados: 45, precio: 0.00, descripcion: 'Artistas, gastronomía y talleres', imagen: 'https://picsum.photos/seed/event5/800/500' }),
        new Evento({ id: 'E6', titulo: 'Hackathon 48h', categoria: 'conferencia', fecha: new Date(Date.now() + 86400000 * 15).toISOString(), hora: '09:00', ubicacion: 'Aula Magna', capacidad: 120, registrados: 60, precio: 10.00, descripcion: 'Desarrollo de soluciones en 48 horas', imagen: 'https://picsum.photos/seed/event6/800/500' }),
        new Evento({ id: 'E7', titulo: 'Taller: Fotografía básica', categoria: 'taller', fecha: new Date(Date.now() + 86400000 * 20).toISOString(), hora: '15:00', ubicacion: 'Estudio Fotográfico', capacidad: 25, registrados: 10, precio: 40.00, descripcion: 'Práctica y teoría de fotografía', imagen: 'https://picsum.photos/seed/event7/800/500' }),
        new Evento({ id: 'E8', titulo: 'Meetup Tech: Nube y DevOps', categoria: 'conferencia', fecha: new Date(Date.now() + 86400000 * 25).toISOString(), hora: '18:30', ubicacion: 'Coworking Hub', capacidad: 80, registrados: 22, precio: 15.00, descripcion: 'Charlas y networking', imagen: 'https://picsum.photos/seed/event8/800/500' }),
        new Evento({ id: 'E9', titulo: 'Cine al Aire Libre', categoria: 'cultura', fecha: new Date(Date.now() + 86400000 * 30).toISOString(), hora: '19:00', ubicacion: 'Jardines del Parque', capacidad: 150, registrados: 90, precio: 10.00, descripcion: 'Proyección de película bajo las estrellas', imagen: 'https://picsum.photos/seed/event9/800/500' }),
        new Evento({ id: 'E10', titulo: 'Seminario: Marketing Digital', categoria: 'conferencia', fecha: new Date(Date.now() + 86400000 * 35).toISOString(), hora: '17:00', ubicacion: 'Sala de Conferencias', capacidad: 70, registrados: 28, precio: 25.00, descripcion: 'Estrategias actuales para redes sociales y ventas', imagen: 'https://picsum.photos/seed/event10/800/500' })
    ];

    const usuarios = [];
    let usuarioActual = null;

    return {
        eventos,
        usuarios,
        usuarioActual,

        iniciarSesion(email) {
            const user = usuarios.find(u => u.email === email);
            if (user) {
                usuarioActual = user;
                this.usuarioActual = usuarioActual;
                return { exito: true, mensaje: 'Inicio de sesión correcto' };
            }
            return { exito: false, mensaje: 'Usuario no encontrado' };
        },

        registrarUsuario(nombre, email) {
            if (usuarios.find(u => u.email === email)) {
                return { exito: false, mensaje: 'El correo ya está registrado' };
            }
            const u = new Usuario({ id: Date.now(), nombre, email });
            usuarios.push(u);
            return { exito: true, mensaje: 'Registro exitoso' };
        },

        cerrarSesion() {
            usuarioActual = null;
            this.usuarioActual = null;
        },

        obtenerEventosDestacados() {
            return eventos.slice(0, 10);
        },

        buscarEventos(termino) {
            const t = (termino || '').toLowerCase();
            return eventos.filter(e => e.titulo.toLowerCase().includes(t) || e.categoria.toLowerCase().includes(t));
        },

        obtenerEventosDelUsuario() {
            if (!usuarioActual) return [];
            return eventos.filter(e => usuarioActual.estaRegistrado(e.id));
        },

        buscarEventoPorId(id) {
            return eventos.find(e => e.id === id) || null;
        },

        registrarUsuarioEnEvento(eventoId) {
            if (!usuarioActual) return { exito: false, mensaje: 'Debes iniciar sesión' };
            const ev = this.buscarEventoPorId(eventoId);
            if (!ev) return { exito: false, mensaje: 'Evento no encontrado' };
            if (!ev.hayCupo()) return { exito: false, mensaje: 'No hay cupo disponible' };
            ev.registrados += 1;
            usuarioActual.registrar(eventoId);
            return { exito: true, mensaje: 'Registro confirmado' };
        },

        cancelarRegistroEnEvento(eventoId) {
            if (!usuarioActual) return { exito: false, mensaje: 'Debes iniciar sesión' };
            const ev = this.buscarEventoPorId(eventoId);
            if (!ev) return { exito: false, mensaje: 'Evento no encontrado' };
            if (!usuarioActual.estaRegistrado(eventoId)) return { exito: false, mensaje: 'No estás registrado en este evento' };
            ev.registrados = Math.max(0, ev.registrados - 1);
            usuarioActual.cancelar(eventoId);
            return { exito: true, mensaje: 'Inscripción cancelada' };
        }
    };
})();

export {
    EntidadBase,
    Usuario,
    Organizador,
    Participante,
    Evento,
    Conferencia,
    Taller,
    Concierto,
    Deporte,
    Cultura,
    Inscripcion,
    Pago,
    sistema
};

export default sistema;

if (typeof window !== 'undefined') {
    window.sistema = sistema;
}
