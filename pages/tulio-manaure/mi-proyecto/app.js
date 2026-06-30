// ========================================================
// 1. estructura en poo (clases y métodos de la rúbrica)
// ========================================================

// clase para representar cada evento individual
class evento {
    constructor(id, nombre, fecha, ubicacion, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.fecha = fecha;
        this.ubicacion = ubicacion;
        this.categoria = categoria;
        this.inscrito = false; // estado por defecto
    }

    // método obligatorio para gestionar la acción de inscripción/cancelación
    cambiarestado() {
        this.inscrito = !this.inscrito;
    }
}

// clase controladora para gestionar el conjunto de datos
class gestoreventos {
    constructor() {
        this.eventos = [];
    }

    agregarevento(evento) {
        this.eventos.push(evento);
    }

    // método de filtrado dinámico por texto y categoría
    filtrar(texto, categoria) {
        return this.eventos.filter(e => {
            const cumpletexto = e.nombre.toLowerCase().includes(texto.toLowerCase());
            const cumplecategoria = categoria === 'todos' || e.categoria.toLowerCase() === categoria.toLowerCase();
            return cumpletexto && cumplecategoria;
        });
    }

    // método para obtener solo los eventos en los que se inscribió
    obtenerinscritos() {
        return this.eventos.filter(e => e.inscrito);
    }
}

// ========================================================
// 2. inicialización del sistema y datos mock
// ========================================================

const sistema = new gestoreventos();

// agregamos 4 eventos de prueba usando la clase evento (todo en minúscula)
sistema.agregarevento(new evento(1, "conferencia de javascript", "15 de julio", "auditorio virtual", "tecnología"));
sistema.agregarevento(new evento(2, "workshop de diseño ui/ux", "02 de agosto", "sala digital", "diseño"));
sistema.agregarevento(new evento(3, "networking de negocios", "20 de agosto", "hotel de convenciones", "negocios"));
sistema.agregarevento(new evento(4, "masterclass de css avanzado", "05 de septiembre", "transmisión en vivo", "diseño"));

// ========================================================
// 3. captura de elementos del dom
// ========================================================

const contenedoreventos = document.getElementById('events-container');
const listainscritos = document.getElementById('my-events-list');
const contadortickets = document.getElementById('ticket-count');
const inputbuscar = document.getElementById('search-input');
const selectcategoria = document.getElementById('category-select');

// ========================================================
// 4. función render (actualiza la interfaz sin recargar)
// ========================================================

function actualizarinterfaz() {
    const busqueda = inputbuscar.value;
    const categoria = selectcategoria.value;

    // obtenemos listas filtradas desde los métodos del gestor
    const visibles = sistema.filtrar(busqueda, categoria);
    const inscritos = sistema.obtenerinscritos();

    // pintar catálogo de eventos disponibles
    contenedoreventos.innerHTML = '';
    if (visibles.length === 0) {
        contenedoreventos.innerHTML = '<p class="empty-state">no se encontraron eventos.</p>';
    } else {
        visibles.forEach(e => {
            const tarjeta = document.createElement('article');
            tarjeta.className = 'tarjeta-evento';
            tarjeta.innerHTML = `
                <span class="categoria">${e.categoria.toLowerCase()}</span>
                <h3>${e.nombre.toLowerCase()}</h3>
                <p>fecha: ${e.fecha.toLowerCase()}</p>
                <p>lugar: ${e.ubicacion.toLowerCase()}</p>
                <button class="btn ${e.inscrito ? 'btn-cancelar' : ''}" data-id="${e.id}">
                    ${e.inscrito ? 'cancelar inscripción' : 'inscribirme'}
                </button>
            `;
            contenedoreventos.appendChild(tarjeta);
        });
    }

    // pintar panel lateral de mis inscripciones
    listainscritos.innerHTML = '';
    contadortickets.textContent = inscritos.length;

    if (inscritos.length === 0) {
        listainscritos.innerHTML = '<li class="empty-state">ningún evento inscrito.</li>';
    } else {
        inscritos.forEach(e => {
            const item = document.createElement('li');
            item.innerHTML = `
                <span>${e.nombre.toLowerCase()}</span>
                <button class="btn-remover" data-id="${e.id}">remover</button>
            `;
            listainscritos.appendChild(item);
        });
    }
}

// ========================================================
// 5. asociación de eventos (interactividad inmediata)
// ========================================================

// delegación del evento click para botones inscribir/cancelar/remover
document.addEventListener('click', (eventoclick) => {
    const idseleccionado = parseInt(eventoclick.target.getAttribute('data-id'));
    
    if (idseleccionado) {
        // buscamos el objeto evento correspondiente
        const eventoencontrado = sistema.eventos.find(e => e.id === idseleccionado);
        if (eventoencontrado) {
            eventoencontrado.cambiarestado(); // llamamos al método de la clase
            actualizarinterfaz(); // actualizamos el dom al instante
        }
    }
});

// listeners para ejecutar el filtrado en tiempo real al escribir o seleccionar
inputbuscar.addEventListener('input', actualizarinterfaz);
selectcategoria.addEventListener('change', actualizarinterfaz);

// carga inicial al abrir la página
document.addEventListener('DOMContentLoaded', actualizarinterfaz);