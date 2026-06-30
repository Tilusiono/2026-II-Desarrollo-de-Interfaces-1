const propiedades = [
    {
        id: 1,
        nombre: "Apartamento Moderno Centro",
        tipo: "apartamento",
        ciudad: "Madrid",
        precio: 120,
        imagen: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500",
        capacidad: 4,
        descripcion: "Apartamento con vista al centro",
        amenidades: ["WiFi", "TV", "Cocina", "Aire Acondicionado"]
    },
    {
        id: 2,
        nombre: "Casa de Playa Relajante",
        tipo: "casa",
        ciudad: "Barcelona",
        precio: 150,
        imagen: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500",
        capacidad: 6,
        descripcion: "Casa con acceso directo a la playa",
        amenidades: ["WiFi", "Piscina", "Terraza", "Horno"]
    },
    {
        id: 3,
        nombre: "Villa Lujo Montaña",
        tipo: "villa",
        ciudad: "Asturias",
        precio: 250,
        imagen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500",
        capacidad: 8,
        descripcion: "Villa con vistas panorámicas",
        amenidades: ["WiFi", "Jacuzzi", "Chimenea", "Sauna"]
    },
    {
        id: 4,
        nombre: "Cabaña Acogedora Bosque",
        tipo: "cabaña",
        ciudad: "Pirineos",
        precio: 95,
        imagen: "https://images.unsplash.com/photo-1506272537185-b5f8b5c5a9cf?w=500",
        capacidad: 2,
        descripcion: "Cabaña romántica en el bosque",
        amenidades: ["WiFi", "Chimenea", "Cocina", "Baño Moderno"]
    },
    {
        id: 5,
        nombre: "Penthouse Panorámico",
        tipo: "apartamento",
        ciudad: "Valencia",
        precio: 180,
        imagen: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500",
        capacidad: 4,
        descripcion: "Penthouse con vista a la ciudad",
        amenidades: ["WiFi", "Terraza", "Cocina Gourmet", "Biblioteca"]
    },
    {
        id: 6,
        nombre: "Casa Típica Andaluza",
        tipo: "casa",
        ciudad: "Sevilla",
        precio: 130,
        imagen: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500",
        capacidad: 5,
        descripcion: "Casa tradicional con patio",
        amenidades: ["WiFi", "Patio", "Cocina Española", "Aire Acondicionado"]
    }
];

let carrito = [];
let reservas = [];
let propiedadesActuales = [...propiedades];
let propiedadSeleccionada = null;

const propiedadesGrid = document.getElementById('propiedadesGrid');
const modalReserva = document.getElementById('modalReserva');
const formularioReserva = document.getElementById('formularioReserva');
const buscador = document.getElementById('buscador');
const filtroTipo = document.getElementById('filtroTipo');
const filtroCapacidad = document.getElementById('filtroCapacidad');
const btnBuscar = document.getElementById('btnBuscar');
const carritoIcon = document.getElementById('carritoIcon');
const carritoPanel = document.getElementById('carritoPanel');
const carritoCount = document.getElementById('carritoCount');
const carritoItems = document.getElementById('carritoItems');
const totalCarrito = document.getElementById('totalCarrito');
const closeCarrito = document.querySelector('.close-carrito');
const btnCheckout = document.getElementById('btnCheckout');
const fechaEntrada = document.getElementById('fechaEntrada');
const fechaSalida = document.getElementById('fechaSalida');
const cantidadHuespedes = document.getElementById('cantidadHuespedes');
const reservasList = document.getElementById('reservasList');
const filtroTexto = document.getElementById('filtroTexto');

function inicializar() {
    cargarDatos();
    mostrarPropiedades(propiedades);
    configurarEventos();
    setearFechaMinima();
}

function cargarDatos() {
    const carritoGuardado = localStorage.getItem('carrito');
    const reservasGuardadas = localStorage.getItem('reservas');
    
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
    
    if (reservasGuardadas) {
        reservas = JSON.parse(reservasGuardadas);
        mostrarReservas();
    }
}

function guardarDatos() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('reservas', JSON.stringify(reservas));
}

function mostrarPropiedades(lista) {
    propiedadesGrid.innerHTML = '';
    
    if (lista.length === 0) {
        propiedadesGrid.innerHTML = '<p class="sin-resultados">No se encontraron propiedades</p>';
        return;
    }
    
    lista.forEach(propiedad => {
        const card = document.createElement('div');
        card.className = 'propiedad-card';
        card.innerHTML = `
            <img src="${propiedad.imagen}" alt="${propiedad.nombre}" class="propiedad-img">
            <div class="propiedad-badge">${propiedad.tipo}</div>
            <div class="propiedad-info">
                <h3>${propiedad.nombre}</h3>
                <p class="ubicacion">📍 ${propiedad.ciudad}</p>
                <p class="capacidad">👥 Hasta ${propiedad.capacidad} personas</p>
                <p class="descripcion">${propiedad.descripcion}</p>
                <div class="amenidades">
                    ${propiedad.amenidades.slice(0, 3).map(a => `<span class="amenidad">${a}</span>`).join('')}
                </div>
                <div class="propiedad-footer">
                    <span class="precio">$${propiedad.precio}/noche</span>
                    <button class="btn-reservar" onclick="abrirModalReserva(${propiedad.id})">Reservar</button>
                </div>
            </div>
        `;
        propiedadesGrid.appendChild(card);
    });
}

function abrirModalReserva(id) {
    propiedadSeleccionada = propiedades.find(p => p.id === id);
    
    document.getElementById('modalImg').src = propiedadSeleccionada.imagen;
    document.getElementById('modalTitulo').textContent = propiedadSeleccionada.nombre;
    document.getElementById('modalPrecio').textContent = `$${propiedadSeleccionada.precio} por noche`;
    document.getElementById('modalCapacidad').textContent = `Capacidad: ${propiedadSeleccionada.capacidad} personas`;
    document.getElementById('precioNoche').textContent = propiedadSeleccionada.precio;
    
    formularioReserva.reset();
    modalReserva.style.display = 'block';
}

function cerrarModalReserva() {
    modalReserva.style.display = 'none';
    propiedadSeleccionada = null;
}

function calcularReserva() {
    if (!fechaEntrada.value || !fechaSalida.value) return;
    
    const entrada = new Date(fechaEntrada.value);
    const salida = new Date(fechaSalida.value);
    const noches = Math.floor((salida - entrada) / (1000 * 60 * 60 * 24));
    
    if (noches <= 0) {
        alert('La fecha de salida debe ser posterior a la entrada');
        return;
    }
    
    const total = noches * propiedadSeleccionada.precio;
    
    document.getElementById('cantidadNoches').textContent = noches;
    document.getElementById('totalReserva').textContent = total;
}

function confirmarReserva(e) {
    e.preventDefault();
    
    if (!fechaEntrada.value || !fechaSalida.value || !cantidadHuespedes.value) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    const entrada = new Date(fechaEntrada.value);
    const salida = new Date(fechaSalida.value);
    const noches = Math.floor((salida - entrada) / (1000 * 60 * 60 * 24));
    
    if (noches <= 0) {
        alert('Fechas inválidas');
        return;
    }
    
    if (parseInt(cantidadHuespedes.value) > propiedadSeleccionada.capacidad) {
        alert(`Esta propiedad sólo puede albergar ${propiedadSeleccionada.capacidad} personas`);
        return;
    }
    
    const reserva = {
        id: Date.now(),
        propiedad: propiedadSeleccionada,
        fechaEntrada: fechaEntrada.value,
        fechaSalida: fechaSalida.value,
        huespedes: parseInt(cantidadHuespedes.value),
        noches: noches,
        total: noches * propiedadSeleccionada.precio,
        estado: 'pendiente'
    };
    
    carrito.push(reserva);
    guardarDatos();
    actualizarCarrito();
    cerrarModalReserva();
    
    alert('Reserva agregada al carrito');
}

function actualizarCarrito() {
    carritoCount.textContent = carrito.length;
    carritoItems.innerHTML = '';
    
    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
        totalCarrito.textContent = '0';
        return;
    }
    
    let total = 0;
    
    carrito.forEach((item, index) => {
        total += item.total;
        const div = document.createElement('div');
        div.className = 'carrito-item';
        div.innerHTML = `
            <img src="${item.propiedad.imagen}" alt="${item.propiedad.nombre}">
            <div class="carrito-item-info">
                <h4>${item.propiedad.nombre}</h4>
                <p>${item.fechaEntrada} → ${item.fechaSalida}</p>
                <p class="carrito-item-precio">$${item.total}</p>
            </div>
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">❌</button>
        `;
        carritoItems.appendChild(div);
    });
    
    totalCarrito.textContent = total;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarDatos();
    actualizarCarrito();
}

function procederCheckout() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    // Confirmar las reservas
    reservas.push(...carrito);
    carrito = [];
    guardarDatos();
    
    alert('¡Reservas confirmadas! Revisa tus detalles en "Mis Reservas"');
    actualizarCarrito();
    mostrarReservas();
    carritoPanel.style.display = 'none';
}

function mostrarReservas() {
    if (reservas.length === 0) {
        reservasList.innerHTML = '<p class="sin-reservas">No tienes reservas aún</p>';
        return;
    }
    
    reservasList.innerHTML = '';
    reservas.forEach((reserva, index) => {
        const div = document.createElement('div');
        div.className = 'reserva-item';
        div.innerHTML = `
            <img src="${reserva.propiedad.imagen}" alt="${reserva.propiedad.nombre}">
            <div class="reserva-detalles">
                <h3>${reserva.propiedad.nombre}</h3>
                <p>📍 ${reserva.propiedad.ciudad}</p>
                <p>📅 ${reserva.fechaEntrada} al ${reserva.fechaSalida}</p>
                <p>👥 ${reserva.huespedes} huéspedes</p>
                <p class="reserva-total">Total: $${reserva.total}</p>
                <span class="estado-badge ${reserva.estado}">${reserva.estado}</span>
            </div>
            <button class="btn-cancelar" onclick="cancelarReserva(${index})">Cancelar</button>
        `;
        reservasList.appendChild(div);
    });
}

function cancelarReserva(index) {
    if (confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
        reservas.splice(index, 1);
        guardarDatos();
        mostrarReservas();
    }
}

function filtrarPropiedades() {
    const texto = buscador.value.toLowerCase();
    const tipo = filtroTipo.value;
    const capacidad = filtroCapacidad.value ? parseInt(filtroCapacidad.value) : 0;
    
    propiedadesActuales = propiedades.filter(p => {
        const coincideTexto = p.nombre.toLowerCase().includes(texto) || 
                            p.ciudad.toLowerCase().includes(texto);
        const coincideTipo = !tipo || p.tipo === tipo;
        const coincideCapacidad = !capacidad || p.capacidad >= capacidad;
        
        return coincideTexto && coincideTipo && coincideCapacidad;
    });
    
    // Mostrar filtros activos
    let filtrosActivos = [];
    if (texto) filtrosActivos.push(`Búsqueda: "${texto}"`);
    if (tipo) filtrosActivos.push(`Tipo: ${tipo}`);
    if (capacidad) filtrosActivos.push(`Capacidad: ${capacidad}+`);
    
    if (filtrosActivos.length > 0) {
        filtroTexto.innerHTML = filtrosActivos.map(f => `<span class="chip">${f}</span>`).join('');
        filtroTexto.style.display = 'block';
    } else {
        filtroTexto.style.display = 'none';
    }
    
    mostrarPropiedades(propiedadesActuales);
}

function setearFechaMinima() {
    const hoy = new Date().toISOString().split('T')[0];
    fechaEntrada.setAttribute('min', hoy);
}

function configurarEventos() {
    document.querySelector('.close').addEventListener('click', cerrarModalReserva);
    window.addEventListener('click', (e) => {
        if (e.target === modalReserva) cerrarModalReserva();
    });
    
    formularioReserva.addEventListener('submit', confirmarReserva);
    fechaEntrada.addEventListener('change', calcularReserva);
    fechaSalida.addEventListener('change', calcularReserva);
    
    btnBuscar.addEventListener('click', filtrarPropiedades);
    buscador.addEventListener('keyup', filtrarPropiedades);
    filtroTipo.addEventListener('change', filtrarPropiedades);
    filtroCapacidad.addEventListener('change', filtrarPropiedades);
    
    carritoIcon.addEventListener('click', () => {
        carritoPanel.style.display = carritoPanel.style.display === 'none' ? 'block' : 'none';
    });
    
    closeCarrito.addEventListener('click', () => {
        carritoPanel.style.display = 'none';
    });
    
    btnCheckout.addEventListener('click', procederCheckout);
}

document.addEventListener('DOMContentLoaded', inicializar);
