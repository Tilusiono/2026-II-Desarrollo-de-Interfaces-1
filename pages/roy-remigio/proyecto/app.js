let paginaActual = 'home';

function showPage(page) {
    document.querySelectorAll('.page').forEach(p => {
        p.style.display = 'none';
    });

    const pageElement = document.getElementById(page + 'Page');
    if (pageElement) {
        pageElement.style.display = 'block';
        paginaActual = page;
    }

    switch(page) {
        case 'home':
            cargarEventosDestacados();
            break;
        case 'events':
            cargarTodosLosEventos();
            break;
        case 'my-events':
            cargarMisEventos();
            break;
    }

    actualizarEstadoAutenticacion();
}

function actualizarEstadoAutenticacion() {
    const authButtons = document.getElementById('authButtons');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const myEventsLink = document.getElementById('myEventsLink');

    if (sistema.usuarioActual) {
        authButtons.style.display = 'none';
        userInfo.style.display = 'flex';
        userName.textContent = sistema.usuarioActual.nombre;
        myEventsLink.style.display = 'block';
    } else {
        authButtons.style.display = 'flex';
        userInfo.style.display = 'none';
        myEventsLink.style.display = 'none';
    }
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const resultado = sistema.iniciarSesion(email, password);

    if (resultado.exito) {
        alert(resultado.mensaje);
        showPage('home');
        this.reset();
    } else {
        alert(resultado.mensaje);
    }
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    const resultado = sistema.registrarUsuario(nombre, email, password);

    if (resultado.exito) {
        alert(resultado.mensaje);
        showPage('login');
        this.reset();
    } else {
        alert(resultado.mensaje);
    }
});

function logout() {
    sistema.cerrarSesion();
    actualizarEstadoAutenticacion();
    showPage('home');
    alert('Sesión cerrada exitosamente');
}

function cargarEventosDestacados() {
    const container = document.getElementById('featuredEvents');
    const eventos = sistema.obtenerEventosDestacados();

    if (eventos.length === 0) {
        container.innerHTML = '<p class="empty-state">No hay eventos destacados</p>';
        return;
    }

    container.innerHTML = eventos.map(evento => crearTarjetaEvento(evento)).join('');
}

function cargarTodosLosEventos() {
    const container = document.getElementById('eventsList');
    const busqueda = document.getElementById('searchInput').value;
    const categoria = document.getElementById('categoryFilter').value;
    const fecha = document.getElementById('dateFilter').value;

    let eventos = sistema.eventos;

    if (busqueda) {
        eventos = sistema.buscarEventos(busqueda);
    }

    if (categoria) {
        eventos = eventos.filter(e => e.categoria === categoria);
    }

    if (fecha) {
        eventos = eventos.filter(e => e.fecha === fecha);
    }

    if (eventos.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>No se encontraron eventos</h3><p>Intenta con otros criterios de búsqueda</p></div>';
        return;
    }

    container.innerHTML = eventos.map(evento => crearTarjetaEvento(evento)).join('');
}

function cargarMisEventos() {
    const container = document.getElementById('myRegistrations');
    const eventos = sistema.obtenerEventosDelUsuario();

    if (!sistema.usuarioActual) {
        container.innerHTML = '<div class="empty-state"><h3>Debes iniciar sesión</h3><p>Inicia sesión para ver tus inscripciones</p></div>';
        return;
    }

    if (eventos.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>No tienes inscripciones</h3><p>Explora los eventos y regístrate en los que te interesen</p></div>';
        return;
    }

    container.innerHTML = eventos.map(evento => crearTarjetaEvento(evento, true)).join('');
}

function crearTarjetaEvento(evento, esMiEvento = false) {
    const estaRegistrado = sistema.usuarioActual && sistema.usuarioActual.estaRegistrado(evento.id);
    const hayCupo = evento.hayCupo();
    const cuposDisponibles = evento.obtenerCuposDisponibles();

    let botonAccion = '';
    if (esMiEvento) {
        botonAccion = `
            <button onclick="cancelarRegistro('${evento.id}')" class="btn btn-outline">
                Cancelar Inscripción
            </button>
        `;
    } else if (estaRegistrado) {
        botonAccion = `
            <button class="btn btn-outline" disabled>
                ✓ Ya Registrado
            </button>
        `;
    } else if (!hayCupo) {
        botonAccion = `
            <button class="btn btn-outline" disabled>
                ✗ Sin Cupo
            </button>
        `;
    } else {
        botonAccion = `
            <button onclick="registrarse('${evento.id}')" class="btn btn-primary">
                Registrarse
            </button>
        `;
    }

    const imageHTML = evento.imagen ?
        `<img src="${evento.imagen}" alt="${evento.titulo}" class="event-image">` :
        `<div class="event-image placeholder">
            <div class="placeholder-text">Sin imagen</div>
            <a href="#" onclick="promptSetImage('${evento.id}')" class="placeholder-link">Añadir link</a>
        </div>`;

    return `
        <div class="event-card">
            ${imageHTML}
            <div class="event-content">
                <span class="event-category">${evento.categoria}</span>
                <h3 class="event-title">${evento.titulo}</h3>
                <p class="event-date">📅 ${evento.obtenerFechaFormateada()} - ${evento.hora}</p>
                <p class="event-location">📍 ${evento.ubicacion}</p>
                <p class="event-capacity">👥 ${cuposDisponibles} cupos disponibles</p>
                <p class="event-price">S/ ${evento.precio.toFixed(2)}</p>
                <div class="event-actions">
                    <button onclick="verDetalle('${evento.id}')" class="btn btn-outline">
                        Ver Detalles
                    </button>
                    ${botonAccion}
                </div>
            </div>
        </div>
    `;
}

function verDetalle(eventoId) {
    const evento = sistema.buscarEventoPorId(eventoId);
    if (!evento) return;

    const estaRegistrado = sistema.usuarioActual && sistema.usuarioActual.estaRegistrado(eventoId);
    const hayCupo = evento.hayCupo();
    const cuposDisponibles = evento.obtenerCuposDisponibles();
    const porcentajeOcupacion = evento.obtenerPorcentajeOcupacion();

    let estadoRegistro = '';
    let botonAccion = '';

    if (!sistema.usuarioActual) {
        estadoRegistro = '<div class="registration-status not-registered">Debes iniciar sesión para registrarte</div>';
        botonAccion = '';
    } else if (estaRegistrado) {
        estadoRegistro = '<div class="registration-status registered">✓ Ya estás registrado en este evento</div>';
        botonAccion = `<button onclick="cancelarRegistro('${evento.id}')" class="btn btn-outline">Cancelar Inscripción</button>`;
    } else if (!hayCupo) {
        estadoRegistro = '<div class="registration-status full">✗ No hay cupo disponible</div>';
        botonAccion = '';
    } else {
        estadoRegistro = '<div class="registration-status not-registered">Cupos disponibles: ' + cuposDisponibles + '</div>';
        botonAccion = `<button onclick="registrarse('${evento.id}')" class="btn btn-primary">Registrarse Ahora</button>`;
    }

    const detalleHTML = `
        <div class="event-detail">
            <div class="event-detail-header">
                ${evento.imagen ? `<img src="${evento.imagen}" alt="${evento.titulo}" class="event-detail-image">` : `<div class="event-detail-image placeholder-detail">
                    <div class="placeholder-text">Imagen no asignada</div>
                    <a href="#" onclick="promptSetImage('${evento.id}')" class="placeholder-link">Agregar link</a>
                </div>`}
                <div class="event-detail-info">
                    <h2 class="event-detail-title">${evento.titulo}</h2>
                    ${estadoRegistro}
                    <div class="event-detail-meta">
                        <p><strong>Categoría:</strong> ${evento.categoria}</p>
                        <p><strong>Fecha:</strong> ${evento.obtenerFechaFormateada()}</p>
                        <p><strong>Hora:</strong> ${evento.hora}</p>
                        <p><strong>Ubicación:</strong> ${evento.ubicacion}</p>
                        <p><strong>Precio:</strong> S/ ${evento.precio.toFixed(2)}</p>
                        <p><strong>Capacidad:</strong> ${evento.capacidad} personas</p>
                        <p><strong>Registrados:</strong> ${evento.registrados} (${porcentajeOcupacion}%)</p>
                        <p><strong>Cupos Disponibles:</strong> ${cuposDisponibles}</p>
                    </div>
                    <p class="event-detail-price">S/ ${evento.precio.toFixed(2)}</p>
                    ${botonAccion}
                </div>
            </div>
            <div class="event-detail-description">
                <h3>Descripción del Evento</h3>
                <p>${evento.descripcion}</p>
            </div>
        </div>
    `;

    document.getElementById('eventDetail').innerHTML = detalleHTML;
    showPage('eventDetail');
}

function promptSetImage(eventoId) {
    const url = prompt('Pega el link de la imagen para este evento (URL completa):');
    if (!url) return;
    const ev = sistema.buscarEventoPorId(eventoId);
    if (!ev) return alert('Evento no encontrado');
    ev.imagen = url;

    if (paginaActual === 'eventDetail') {
        verDetalle(eventoId);
    } else if (paginaActual === 'home') {
        cargarEventosDestacados();
    } else {
        cargarTodosLosEventos();
    }
}

function registrarse(eventoId) {
    const resultado = sistema.registrarUsuarioEnEvento(eventoId);

    if (resultado.exito) {
        alert(resultado.mensaje);

        if (paginaActual === 'eventDetail') {
            verDetalle(eventoId);
        } else {
            cargarTodosLosEventos();
        }
    } else {
        alert(resultado.mensaje);
    }
}

function cancelarRegistro(eventoId) {
    if (!confirm('¿Estás seguro de que deseas cancelar tu inscripción?')) {
        return;
    }

    const resultado = sistema.cancelarRegistroEnEvento(eventoId);

    if (resultado.exito) {
        alert(resultado.mensaje);

        if (paginaActual === 'eventDetail') {
            verDetalle(eventoId);
        } else if (paginaActual === 'my-events') {
            cargarMisEventos();
        } else {
            cargarTodosLosEventos();
        }
    } else {
        alert(resultado.mensaje);
    }
}

document.getElementById('searchInput').addEventListener('input', cargarTodosLosEventos);
document.getElementById('categoryFilter').addEventListener('change', cargarTodosLosEventos);
document.getElementById('dateFilter').addEventListener('change', cargarTodosLosEventos);

document.addEventListener('DOMContentLoaded', function() {
    showPage('home');
    actualizarEstadoAutenticacion();

    const fechaActual = new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    console.log('EventHub - Sistema de Organización de Eventos');
    console.log('Fecha:', fechaActual);
    console.log('Eventos cargados:', sistema.eventos.length);
    console.log('Usuarios registrados:', sistema.usuarios.length);

    const footerDateEl = document.getElementById('siteFooterDate');
    if (footerDateEl) {
        footerDateEl.textContent = new Date().toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    const footerYearEl = document.getElementById('footerYear');
    if (footerYearEl) footerYearEl.textContent = new Date().getFullYear();
});
