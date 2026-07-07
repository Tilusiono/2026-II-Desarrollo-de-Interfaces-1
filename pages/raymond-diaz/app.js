class Evento {
    #id;
    #nombre;
    #fecha;
    #ubicacion;
    #categoria;
    #descripcion;
    #inscrito;

    constructor({ id, nombre, fecha, ubicacion, categoria, descripcion, inscrito = false }) {
        if (typeof id !== "number") throw new TypeError("El ID debe ser numérico.");
        if (typeof nombre !== "string" || nombre.trim() === "") throw new TypeError("El nombre del evento es obligatorio.");
        if (typeof fecha !== "string" || fecha.trim() === "") throw new TypeError("La fecha es obligatoria.");
        if (typeof ubicacion !== "string" || ubicacion.trim() === "") throw new TypeError("La ubicación es obligatoria.");
        if (typeof categoria !== "string" || categoria.trim() === "") throw new TypeError("La categoría es obligatoria.");
        if (typeof descripcion !== "string") throw new TypeError("La descripción debe ser texto.");

        this.#id = id;
        this.#nombre = nombre;
        this.#fecha = fecha;
        this.#ubicacion = ubicacion;
        this.#categoria = categoria;
        this.#descripcion = descripcion;
        this.#inscrito = inscrito;
    }

    get id() {
        return this.#id;
    }

    get nombre() {
        return this.#nombre;
    }

    get fecha() {
        return this.#fecha;
    }

    get ubicacion() {
        return this.#ubicacion;
    }

    get categoria() {
        return this.#categoria;
    }

    get descripcion() {
        return this.#descripcion;
    }

    get inscrito() {
        return this.#inscrito;
    }

    registrar() {
        if (this.#inscrito) {
            return "Ya estás inscrito en este evento.";
        }

        this.#inscrito = true;
        return "Inscripción realizada correctamente.";
    }

    cancelar() {
        if (!this.#inscrito) {
            return "No tienes una inscripción activa en este evento.";
        }

        this.#inscrito = false;
        return "Inscripción cancelada correctamente.";
    }

    coincideConBusqueda(textoBusqueda, categoriaSeleccionada) {
        const texto = textoBusqueda.toLowerCase();

        const coincideTexto =
            this.#nombre.toLowerCase().includes(texto) ||
            this.#ubicacion.toLowerCase().includes(texto) ||
            this.#categoria.toLowerCase().includes(texto);

        const coincideCategoria =
            categoriaSeleccionada === "todos" || this.#categoria === categoriaSeleccionada;

        return coincideTexto && coincideCategoria;
    }

    toJSON() {
        return {
            id: this.#id,
            nombre: this.#nombre,
            fecha: this.#fecha,
            ubicacion: this.#ubicacion,
            categoria: this.#categoria,
            descripcion: this.#descripcion,
            inscrito: this.#inscrito
        };
    }
}

class GestorEventos {
    #eventos;
    #claveStorage;

    constructor(eventosIniciales = []) {
        this.#claveStorage = "eventos_inscritos_web";
        this.#eventos = eventosIniciales;
        this.#cargarInscripciones();
    }

    obtenerEventos() {
        return this.#eventos;
    }

    buscarPorId(id) {
        return this.#eventos.find(evento => evento.id === id);
    }

    filtrarEventos(textoBusqueda, categoriaSeleccionada) {
        return this.#eventos.filter(evento => evento.coincideConBusqueda(textoBusqueda, categoriaSeleccionada));
    }

    obtenerInscritos() {
        return this.#eventos.filter(evento => evento.inscrito);
    }

    registrarEvento(id) {
        const evento = this.buscarPorId(id);

        if (!evento) {
            throw new Error("No se encontró el evento seleccionado.");
        }

        const mensaje = evento.registrar();
        this.#guardarInscripciones();
        return mensaje;
    }

    cancelarEvento(id) {
        const evento = this.buscarPorId(id);

        if (!evento) {
            throw new Error("No se encontró el evento seleccionado.");
        }

        const mensaje = evento.cancelar();
        this.#guardarInscripciones();
        return mensaje;
    }

    #guardarInscripciones() {
        const idsInscritos = this.obtenerInscritos().map(evento => evento.id);
        localStorage.setItem(this.#claveStorage, JSON.stringify(idsInscritos));
    }

    #cargarInscripciones() {
        const datosGuardados = localStorage.getItem(this.#claveStorage);

        if (!datosGuardados) {
            return;
        }

        try {
            const idsInscritos = JSON.parse(datosGuardados);

            this.#eventos.forEach(evento => {
                if (idsInscritos.includes(evento.id)) {
                    evento.registrar();
                }
            });
        } catch (error) {
            console.error("No se pudieron cargar las inscripciones:", error);
            localStorage.removeItem(this.#claveStorage);
        }
    }
}

const eventosIniciales = [
    new Evento({
        id: 1,
        nombre: "Feria de Tecnología 2026",
        fecha: "15 de agosto de 2026",
        ubicacion: "Centro de Convenciones Lima",
        categoria: "Tecnología",
        descripcion: "Exposición de innovación, desarrollo web, inteligencia artificial y soluciones digitales."
    }),
    new Evento({
        id: 2,
        nombre: "Taller de Emprendimiento Juvenil",
        fecha: "22 de agosto de 2026",
        ubicacion: "Auditorio Principal",
        categoria: "Negocios",
        descripcion: "Sesión práctica para aprender a organizar ideas de negocio, costos y presentación de proyectos."
    }),
    new Evento({
        id: 3,
        nombre: "Seminario de Accesibilidad Web",
        fecha: "5 de septiembre de 2026",
        ubicacion: "Sala Virtual",
        categoria: "Educación",
        descripcion: "Evento sobre diseño inclusivo, navegación por teclado, contraste y buenas prácticas frontend."
    }),
    new Evento({
        id: 4,
        nombre: "Festival Cultural Universitario",
        fecha: "18 de septiembre de 2026",
        ubicacion: "Patio Central",
        categoria: "Cultura",
        descripcion: "Presentaciones artísticas, música, teatro y actividades para la comunidad universitaria."
    }),
    new Evento({
        id: 5,
        nombre: "Hackathon Frontend",
        fecha: "30 de septiembre de 2026",
        ubicacion: "Laboratorio 301",
        categoria: "Tecnología",
        descripcion: "Competencia de creación de interfaces dinámicas usando HTML, CSS y JavaScript."
    }),
    new Evento({
        id: 6,
        nombre: "Charla de Marca Personal",
        fecha: "12 de octubre de 2026",
        ubicacion: "Sala B",
        categoria: "Negocios",
        descripcion: "Aprende a presentar tus habilidades, proyectos y experiencia de forma profesional."
    })
];

const gestor = new GestorEventos(eventosIniciales);

const listaEventos = document.querySelector("#listaEventos");
const listaInscritos = document.querySelector("#listaInscritos");
const contadorInscritos = document.querySelector("#contadorInscritos");
const busqueda = document.querySelector("#busqueda");
const categoria = document.querySelector("#categoria");

const modal = document.querySelector("#modalDetalles");
const cerrarModal = document.querySelector("#cerrarModal");
const modalTitulo = document.querySelector("#modalTitulo");
const modalDescripcion = document.querySelector("#modalDescripcion");
const modalFecha = document.querySelector("#modalFecha");
const modalUbicacion = document.querySelector("#modalUbicacion");
const modalCategoria = document.querySelector("#modalCategoria");
const modalEstado = document.querySelector("#modalEstado");

function crearTarjetaEvento(evento) {
    const tarjeta = document.createElement("article");
    tarjeta.className = evento.inscrito ? "tarjeta-evento inscrito" : "tarjeta-evento";

    tarjeta.innerHTML = `
        <span class="categoria">${evento.categoria}</span>
        <h3>${evento.nombre}</h3>
        <p><strong>Fecha:</strong> ${evento.fecha}</p>
        <p><strong>Ubicación:</strong> ${evento.ubicacion}</p>
        <p><strong>Estado:</strong> ${evento.inscrito ? "Inscrito" : "Disponible"}</p>
        <div class="acciones">
            <button class="boton-detalle" data-accion="detalle" data-id="${evento.id}">Ver detalles</button>
            <button class="${evento.inscrito ? "boton-cancelar" : "boton-principal"}" data-accion="${evento.inscrito ? "cancelar" : "registrar"}" data-id="${evento.id}">
                ${evento.inscrito ? "Cancelar inscripción" : "Inscribirme"}
            </button>
        </div>
    `;

    return tarjeta;
}

function renderizarEventos() {
    const textoBusqueda = busqueda.value.trim();
    const categoriaSeleccionada = categoria.value;
    const eventosFiltrados = gestor.filtrarEventos(textoBusqueda, categoriaSeleccionada);

    listaEventos.innerHTML = "";

    if (eventosFiltrados.length === 0) {
        listaEventos.innerHTML = "<p>No se encontraron eventos con ese filtro.</p>";
        return;
    }

    eventosFiltrados.forEach(evento => {
        listaEventos.appendChild(crearTarjetaEvento(evento));
    });
}

function renderizarInscritos() {
    const inscritos = gestor.obtenerInscritos();

    contadorInscritos.textContent = inscritos.length;
    listaInscritos.innerHTML = "";

    if (inscritos.length === 0) {
        listaInscritos.innerHTML = "<li>Aún no te has inscrito en eventos.</li>";
        return;
    }

    inscritos.forEach(evento => {
        const item = document.createElement("li");
        item.textContent = `${evento.nombre} - ${evento.fecha}`;
        listaInscritos.appendChild(item);
    });
}

function actualizarInterfaz() {
    renderizarEventos();
    renderizarInscritos();
}

function mostrarDetalles(id) {
    const evento = gestor.buscarPorId(id);

    if (!evento) {
        return;
    }

    modalTitulo.textContent = evento.nombre;
    modalDescripcion.textContent = evento.descripcion;
    modalFecha.textContent = evento.fecha;
    modalUbicacion.textContent = evento.ubicacion;
    modalCategoria.textContent = evento.categoria;
    modalEstado.textContent = evento.inscrito ? "Inscrito" : "Disponible";

    modal.classList.remove("oculto");
    cerrarModal.focus();
}

function ocultarDetalles() {
    modal.classList.add("oculto");
}

listaEventos.addEventListener("click", event => {
    const boton = event.target.closest("button");

    if (!boton) {
        return;
    }

    const id = Number(boton.dataset.id);
    const accion = boton.dataset.accion;

    try {
        if (accion === "registrar") {
            gestor.registrarEvento(id);
        }

        if (accion === "cancelar") {
            gestor.cancelarEvento(id);
        }

        if (accion === "detalle") {
            mostrarDetalles(id);
            return;
        }

        actualizarInterfaz();
    } catch (error) {
        alert(error.message);
    }
});

busqueda.addEventListener("input", renderizarEventos);
categoria.addEventListener("change", renderizarEventos);
cerrarModal.addEventListener("click", ocultarDetalles);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        ocultarDetalles();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !modal.classList.contains("oculto")) {
        ocultarDetalles();
    }
});

actualizarInterfaz();
