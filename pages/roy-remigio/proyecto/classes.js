class Evento {
    constructor({id, titulo, categoria, fecha, hora = '', ubicacion = '', capacidad = 100, registrados = 0, precio = 0.0, descripcion = '', imagen = ''}) {
        Object.assign(this, { id, titulo, categoria, fecha, hora, ubicacion, capacidad, registrados, precio, descripcion, imagen });
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
}

class Usuario {
    constructor({id, nombre, email, registrados = []} = {}) {
        this.id = id || Date.now();
        this.nombre = nombre || 'Invitado';
        this.email = email || '';
        this.registrados = new Set(registrados);
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
}

const sistema = (function(){
    const eventos = [
        new Evento({id: 'E1', titulo: 'Conferencia: JavaScript moderno', categoria: 'conferencia', fecha: new Date().toISOString(), hora: '18:00', ubicacion: 'Auditorio A', capacidad: 50, registrados: 12, precio: 30.00, descripcion: 'Charla sobre buenas prácticas en JS', imagen: 'https://picsum.photos/seed/event1/800/500'}),
        new Evento({id: 'E2', titulo: 'Taller de Diseño UX', categoria: 'taller', fecha: new Date(Date.now()+86400000).toISOString(), hora: '10:00', ubicacion: 'Sala 2', capacidad: 30, registrados: 8, precio: 50.00, descripcion: 'Taller práctico de UX', imagen: 'https://picsum.photos/seed/event2/800/500'}),
        new Evento({id: 'E3', titulo: 'Concierto: Noche Indie', categoria: 'concierto', fecha: new Date(Date.now()+86400000*3).toISOString(), hora: '20:30', ubicacion: 'Plaza Central', capacidad: 200, registrados: 150, precio: 75.00, descripcion: 'Banda local e invitados', imagen: 'https://picsum.photos/seed/event3/800/500'}),
        new Evento({id: 'E4', titulo: 'Maratón 10K Ciudad', categoria: 'deporte', fecha: new Date(Date.now()+86400000*7).toISOString(), hora: '07:00', ubicacion: 'Parque Metropolitano', capacidad: 500, registrados: 420, precio: 20.00, descripcion: 'Carrera para toda la familia', imagen: 'https://picsum.photos/seed/event4/800/500'}),
        new Evento({id: 'E5', titulo: 'Feria Cultural', categoria: 'cultura', fecha: new Date(Date.now()+86400000*10).toISOString(), hora: '11:00', ubicacion: 'Centro Cultural', capacidad: 300, registrados: 45, precio: 0.00, descripcion: 'Artistas, gastronomía y talleres', imagen: 'https://picsum.photos/seed/event5/800/500'}),
        new Evento({id: 'E6', titulo: 'Hackathon 48h', categoria: 'conferencia', fecha: new Date(Date.now()+86400000*15).toISOString(), hora: '09:00', ubicacion: 'Aula Magna', capacidad: 120, registrados: 60, precio: 10.00, descripcion: 'Desarrollo de soluciones en 48 horas', imagen: 'https://picsum.photos/seed/event6/800/500'}),
        new Evento({id: 'E7', titulo: 'Taller: Fotografía básica', categoria: 'taller', fecha: new Date(Date.now()+86400000*20).toISOString(), hora: '15:00', ubicacion: 'Estudio Fotográfico', capacidad: 25, registrados: 10, precio: 40.00, descripcion: 'Práctica y teoría de fotografía', imagen: 'https://picsum.photos/seed/event7/800/500'}),
        new Evento({id: 'E8', titulo: 'Meetup Tech: Nube y DevOps', categoria: 'conferencia', fecha: new Date(Date.now()+86400000*25).toISOString(), hora: '18:30', ubicacion: 'Coworking Hub', capacidad: 80, registrados: 22, precio: 15.00, descripcion: 'Charlas y networking', imagen: 'https://picsum.photos/seed/event8/800/500'}),
        new Evento({id: 'E9', titulo: 'Cine al Aire Libre', categoria: 'cultura', fecha: new Date(Date.now()+86400000*30).toISOString(), hora: '19:00', ubicacion: 'Jardines del Parque', capacidad: 150, registrados: 90, precio: 10.00, descripcion: 'Proyección de película bajo las estrellas', imagen: 'https://picsum.photos/seed/event9/800/500'}),
        new Evento({id: 'E10', titulo: 'Seminario: Marketing Digital', categoria: 'conferencia', fecha: new Date(Date.now()+86400000*35).toISOString(), hora: '17:00', ubicacion: 'Sala de Conferencias', capacidad: 70, registrados: 28, precio: 25.00, descripcion: 'Estrategias actuales para redes sociales y ventas', imagen: 'https://picsum.photos/seed/event10/800/500'})
    ];

    const usuarios = [];

    let usuarioActual = null;

    return {
        eventos,
        usuarios,
        usuarioActual,

        iniciarSesion(email, password) {
            const user = usuarios.find(u => u.email === email);
            if (user) {
                usuarioActual = user;
                this.usuarioActual = usuarioActual;
                return { exito: true, mensaje: 'Inicio de sesión correcto' };
            }
            return { exito: false, mensaje: 'Usuario no encontrado' };
        },

        registrarUsuario(nombre, email, password) {
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

window.sistema = sistema;
