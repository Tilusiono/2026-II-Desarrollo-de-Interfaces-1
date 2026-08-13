export const elementos = {
  formulario: document.querySelector("#form-tarjetaGrafica"),
  tabla: document.querySelector("#tabla-tarjetasGraficas tbody"),
  titulo: document.querySelector("#titulo-form"),
  guardar: document.querySelector("#btn-guardar"),
  cancelar: document.querySelector("#btn-cancelar"),
  buscar: document.querySelector("#buscar"),
  fabricante: document.querySelector("#filtro-fabricante"),
  registro: document.querySelector("#filtro-registro"),
  precioMin: document.querySelector("#precio-min"),
  precioMax: document.querySelector("#precio-max"),
  total: document.querySelector("#total-resultados"),
  mensaje: document.querySelector("#mensaje"),
  cargando: document.querySelector("#cargando"),
  plantilla: document.querySelector("#plantilla-tarjetaGrafica"),
};

export function renderizarTarjetasGraficas(tarjetasGraficas) {
  elementos.total.textContent = `${tarjetasGraficas.length} resultado(s)`;

  if (!tarjetasGraficas.length) {
    mostrarFilaVacia("No se encontraron tarjetas gráficas.");
    return;
  }

  elementos.tabla.replaceChildren();
  for (const tarjetaGrafica of tarjetasGraficas) {
    elementos.tabla.appendChild(crearFilaTarjetaGrafica(tarjetaGrafica));
  }
}

export function cargarFormulario(tarjetaGrafica) {
  const campos = elementos.formulario.elements;
  campos.id.value = tarjetaGrafica.id;
  campos.codigo.value = tarjetaGrafica.codigo;
  campos.modelo.value = tarjetaGrafica.modelo;
  campos.fabricante.value = tarjetaGrafica.fabricante;
  campos.memoriaGb.value = tarjetaGrafica.memoriaGb;
  campos.precio.value = tarjetaGrafica.precio;
  campos.frecuenciaMhz.value = tarjetaGrafica.frecuenciaMhz ?? "";
  campos.descripcion.value = tarjetaGrafica.descripcion ?? "";
  campos.registro.checked = tarjetaGrafica.registro;
  campos.fechaLanzamiento.value = tarjetaGrafica.fechaLanzamiento ?? "";
  campos.horaRegistro.value = tarjetaGrafica.horaRegistro;
  campos.fechaHoraRegistro.value = tarjetaGrafica.fechaHoraRegistro
    ? String(tarjetaGrafica.fechaHoraRegistro).slice(0, 16)
    : "";

  elementos.titulo.textContent = "Editar tarjeta gráfica";
  cambiarBotonGuardar("bi-check-circle", "Actualizar con PUT");
  elementos.cancelar.classList.remove("d-none");
  elementos.formulario.scrollIntoView({ behavior: "smooth" });
}

export function limpiarFormulario() {
  elementos.formulario.reset();
  elementos.formulario.elements.id.value = "";
  elementos.formulario.elements.registro.checked = true;
  elementos.formulario.classList.remove("was-validated");
  elementos.titulo.textContent = "Registrar nueva tarjeta gráfica";
  cambiarBotonGuardar("bi-plus-circle", "Registrar con POST");
  elementos.cancelar.classList.add("d-none");
}

export function mostrarCarga(activa) {
  elementos.cargando.classList.toggle("d-none", !activa);
}

function crearFilaTarjetaGrafica(tarjetaGrafica) {
  const fragmento = elementos.plantilla.content.cloneNode(true);
  fragmento.querySelector(".tarjetaGrafica-id").textContent = `#${tarjetaGrafica.id}`;
  fragmento.querySelector(".tarjetaGrafica-modelo").textContent = tarjetaGrafica.modelo;
  fragmento.querySelector(".tarjetaGrafica-codigo").textContent = tarjetaGrafica.codigo;
  fragmento.querySelector(".tarjetaGrafica-fabricante").textContent =
    tarjetaGrafica.fabricante;
  fragmento.querySelector(".tarjetaGrafica-memoriaGb").textContent =
    tarjetaGrafica.memoriaGb;
  fragmento.querySelector(".tarjetaGrafica-precio").textContent =
    `S/ ${Number(tarjetaGrafica.precio).toFixed(2)}`;

  const imagen = fragmento.querySelector(".tarjetaGrafica-imagen");
  if (tarjetaGrafica.imagenBase64) {
    imagen.src = tarjetaGrafica.imagenBase64;
    imagen.alt = tarjetaGrafica.modelo;
  } else {
    imagen.remove();
  }

  configurarEstado(fragmento, tarjetaGrafica.registro);
  fragmento.querySelectorAll("[data-accion]").forEach((boton) => {
    boton.dataset.id = tarjetaGrafica.id;
  });
  return fragmento;
}

function configurarEstado(fragmento, registro) {
  const estado = fragmento.querySelector(".tarjetaGrafica-estado");
  estado.textContent = registro ? "Registrado" : "No registrado";
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
