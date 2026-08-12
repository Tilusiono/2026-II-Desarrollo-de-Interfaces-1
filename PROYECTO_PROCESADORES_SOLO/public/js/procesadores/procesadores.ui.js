export const elementos = {
  formulario: document.querySelector("#form-componente"),
  tabla: document.querySelector("#tabla-componentes tbody"),
  titulo: document.querySelector("#titulo-form"),
  guardar: document.querySelector("#btn-guardar"),
  cancelar: document.querySelector("#btn-cancelar"),
  buscar: document.querySelector("#buscar"),
  arquitectura: document.querySelector("#filtro-arquitectura"),
  registro: document.querySelector("#filtro-registro"),
  precioMin: document.querySelector("#precio-min"),
  precioMax: document.querySelector("#precio-max"),
  total: document.querySelector("#total-resultados"),
  mensaje: document.querySelector("#mensaje"),
  cargando: document.querySelector("#cargando"),
  plantilla: document.querySelector("#plantilla-componente"),
  resumenTotal: document.querySelector("#resumen-total"),
  resumenRegistrados: document.querySelector("#resumen-registros"),
  resumenNucleos: document.querySelector("#resumen-nucleos"),
  resumenValor: document.querySelector("#resumen-valor"),
  resumenFrecuencia: document.querySelector("#resumen-frecuencia"),
};

export function renderizarComponentes(componentes) {
  elementos.total.textContent = `${componentes.length} resultado(s)`;
  if (!componentes.length) {
    mostrarFilaVacia("No se encontraron componentes con estos filtros.");
    return;
  }
  elementos.tabla.replaceChildren();
  for (const componente of componentes) {
    elementos.tabla.appendChild(crearFilaComponente(componente));
  }
}

export function renderizarEstadisticas(estadisticas) {
  elementos.resumenTotal.textContent = estadisticas.total;
  elementos.resumenRegistrados.textContent = estadisticas.registrados;
  elementos.resumenNucleos.textContent = estadisticas.totalNucleos;
  elementos.resumenValor.textContent = `S/ ${Number(estadisticas.valorTotal).toFixed(2)}`;
  elementos.resumenFrecuencia.textContent = Number(estadisticas.frecuenciaPromedio).toFixed(2);
}

export function cargarFormulario(procesador) {
  const campos = elementos.formulario.elements;
  campos.id.value = procesador.id;
  campos.codigo.value = procesador.codigo;
  campos.modelo.value = procesador.modelo;
  campos.arquitectura.value = procesador.arquitectura;
  campos.nucleos.value = procesador.nucleos;
  campos.precio.value = procesador.precio;
  campos.frecuenciaGhz.value = procesador.frecuenciaGhz ?? "";
  campos.descripcion.value = procesador.descripcion ?? "";
  campos.registro.checked = procesador.registro;
  campos.fechaLanzamiento.value = procesador.fechaLanzamiento ?? "";
  campos.horaRegistro.value = procesador.horaRegistro;
  campos.fechaHoraRegistro.value = procesador.fechaHoraRegistro
    ? String(procesador.fechaHoraRegistro).slice(0, 16)
    : "";
  elementos.titulo.textContent = "Editar componente";
  cambiarBotonGuardar("bi-check2", "Actualizar con PUT");
  elementos.cancelar.classList.remove("d-none");
  elementos.formulario.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function limpiarFormulario() {
  elementos.formulario.reset();
  elementos.formulario.elements.id.value = "";
  elementos.formulario.elements.registro.checked = true;
  elementos.formulario.classList.remove("was-validated");
  elementos.titulo.textContent = "Registrar componente";
  cambiarBotonGuardar("bi-plus-lg", "Registrar con POST");
  elementos.cancelar.classList.add("d-none");
}

export function mostrarCarga(activa) {
  elementos.cargando.classList.toggle("d-none", !activa);
}

function crearFilaComponente(procesador) {
  const fragmento = elementos.plantilla.content.cloneNode(true);
  fragmento.querySelector(".componente-id").textContent = `#${procesador.id}`;
  fragmento.querySelector(".componente-modelo").textContent = procesador.modelo;
  fragmento.querySelector(".componente-codigo").textContent = procesador.codigo;
  fragmento.querySelector(".componente-arquitectura").textContent = procesador.arquitectura;
  fragmento.querySelector(".componente-nucleos").textContent = procesador.nucleos;
  fragmento.querySelector(".componente-precio").textContent = `S/ ${Number(procesador.precio).toFixed(2)}`;

  const imagen = fragmento.querySelector(".componente-imagen");
  if (procesador.imagenBase64) {
    imagen.src = procesador.imagenBase64;
    imagen.alt = `Imagen de ${procesador.modelo}`;
  } else {
    imagen.replaceWith(crearSinImagen());
  }

  configurarEstado(fragmento, procesador.registro);
  fragmento.querySelectorAll("[data-accion]").forEach((boton) => {
    boton.dataset.id = procesador.id;
  });
  return fragmento;
}

function crearSinImagen() {
  const span = document.createElement("span");
  span.className = "text-secondary small";
  span.textContent = "Sin imagen";
  return span;
}

function configurarEstado(fragmento, registro) {
  const estado = fragmento.querySelector(".componente-estado");
  estado.textContent = registro ? "Activo" : "Inactivo";
  estado.classList.add(registro ? "status-success" : "status-muted");
}

function mostrarFilaVacia(texto) {
  const fila = document.createElement("tr");
  const celda = document.createElement("td");
  celda.colSpan = 8;
  celda.className = "empty-state";
  celda.textContent = texto;
  fila.appendChild(celda);
  elementos.tabla.replaceChildren(fila);
}

function cambiarBotonGuardar(icono, texto) {
  const elementoIcono = document.createElement("i");
  elementoIcono.className = `bi ${icono} me-1`;
  elementos.guardar.replaceChildren(elementoIcono, texto);
}
