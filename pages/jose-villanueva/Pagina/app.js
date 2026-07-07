class Evento {
  constructor(id, nombre, fecha, ubicacion, categoria) {
    this.id = id;
    this.nombre = nombre;
    this.fecha = fecha;
    this.ubicacion = ubicacion;
    this.categoria = categoria;
    this.inscrito = false;
  }

  toggleInscripcion() {
    this.inscrito = !this.inscrito;
  }
}

class GestorEventos {
  constructor() {
    this.eventos = [];
    this.init();
  }

  init() {
    this.eventos = [
      new Evento(1, "España vs Austria", "2026-06-07", "Inglewood", "Deportes"),
      new Evento(2, "Alianza Lima vs Universitario", "2026-07-15", "La Victoria", "Deportes"),
      new Evento(3, "Barcelons vs Real Madrid", "2026-09-20", "España", "Deportes"),
      new Evento(4, "Gonzalo genek", "2026-06-30", "Lima", "Conciertos"),
      new Evento(5, "Armonia 10", "2026-09-30", "Lima", "Conciertos"),
      new Evento(6, "Darrell", "2027-01-15", "Lima", "Conciertos"),
    ];

    this.render();

    document.getElementById("filtro").addEventListener("input", (e) => {
      this.render(e.target.value);
    });
  }

  inscribir(id) {
    const evento = this.eventos.find(ev => ev.id === id);
    evento.toggleInscripcion();
    this.render();
  }

  getEventosFiltrados(texto) {
    if (!texto) return this.eventos;
    return this.eventos.filter(ev =>
      ev.nombre.toLowerCase().includes(texto.toLowerCase())
    );
  }

  render(filtro = "") {
    const lista = document.getElementById("lista-eventos");
    const mis = document.getElementById("mis-eventos");

    lista.innerHTML = "";
    mis.innerHTML = "";

    const eventos = this.getEventosFiltrados(filtro);

    eventos.forEach(ev => {
      const div = document.createElement("div");
      div.className = "evento";

      div.innerHTML = `
        <strong>${ev.nombre}</strong><br>
        📅 ${ev.fecha}<br>
        📍 ${ev.ubicacion}<br>
        🏷 ${ev.categoria}<br>
      `;

      const btn = document.createElement("button");

      if (!ev.inscrito) {
        btn.textContent = "Inscribirse";
        btn.className = "inscribir";
      } else {
        btn.textContent = "Cancelar";
        btn.className = "cancelar";
      }

      btn.addEventListener("click", () => this.inscribir(ev.id));
      div.appendChild(btn);

      lista.appendChild(div);

      if (ev.inscrito) {
        const clone = div.cloneNode(true);
        mis.appendChild(clone);
      }
    });
  }
}

new GestorEventos();