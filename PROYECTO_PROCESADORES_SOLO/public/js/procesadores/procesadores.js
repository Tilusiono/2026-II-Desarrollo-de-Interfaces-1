import { mostrarMensaje, ocultarMensaje } from "../shared/mensajes.js";
import { debounce } from "../shared/reactivo.js";
import {
  ComponenteConsultaDto,
  ComponenteRequestDto,
} from "./procesador.dto.js";
import { confirmarEliminacion } from "./confirmacion.js";
import { procesadoresApi } from "./procesadores.api.js";
import {
  cargarFormulario,
  elementos,
  limpiarFormulario,
  mostrarCarga,
  renderizarComponentes,
  renderizarEstadisticas,
} from "./procesadores.ui.js";

let componentes = [];
let imagenActualBase64 = null;

elementos.formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  elementos.formulario.classList.add("was-validated");

  if (!elementos.formulario.checkValidity()) return;

  try {
    await guardar();
  } catch (error) {
    mostrarError(error);
  }
});

elementos.cancelar.addEventListener("click", cancelarEdicion);
elementos.buscar.addEventListener("input", debounce(cargar));
elementos.arquitectura.addEventListener("change", cargar);
elementos.registro.addEventListener("change", cargar);
elementos.precioMin.addEventListener("input", debounce(cargar));
elementos.precioMax.addEventListener("input", debounce(cargar));
elementos.tabla.addEventListener("click", manejarAccion);

async function cargar() {
  mostrarCarga(true);
  ocultarMensaje(elementos.mensaje);

  try {
    const componenteConsultaDto = new ComponenteConsultaDto({
      texto: elementos.buscar.value,
      arquitectura: elementos.arquitectura.value,
      registro: elementos.registro.value,
      precioMin: elementos.precioMin.value,
      precioMax: elementos.precioMax.value,
    });
    const [respuesta, resumen] = await Promise.all([
      procesadoresApi.consultar(componenteConsultaDto),
      procesadoresApi.estadisticas(),
    ]);
    componentes = respuesta.procesadoresResponseDto;
    renderizarComponentes(componentes);
    renderizarEstadisticas(resumen.estadisticas);
  } catch (error) {
    mostrarError(error);
  } finally {
    mostrarCarga(false);
  }
}

async function guardar() {
  const campos = elementos.formulario.elements;
  const id = campos.id.value;
  const archivo = campos.imagen.files[0];
  const imagenBase64 = archivo
    ? await convertirArchivoBase64(archivo)
    : id
      ? imagenActualBase64
      : null;

  const componenteRequestDto = new ComponenteRequestDto({
    codigo: campos.codigo.value.trim(),
    modelo: campos.modelo.value.trim(),
    arquitectura: campos.arquitectura.value,
    nucleos: Number(campos.nucleos.value),
    precio: Number(campos.precio.value),
    frecuenciaGhz:
      campos.frecuenciaGhz.value === ""
        ? null
        : Number(campos.frecuenciaGhz.value),
    descripcion: campos.descripcion.value.trim() || null,
    registro: campos.registro.checked,
    fechaLanzamiento: campos.fechaLanzamiento.value || null,
    horaRegistro: campos.horaRegistro.value,
    fechaHoraRegistro: campos.fechaHoraRegistro.value,
    imagenBase64,
  });

  const respuesta = id
    ? await procesadoresApi.reemplazar(Number(id), componenteRequestDto)
    : await procesadoresApi.crear(componenteRequestDto);

  mostrarMensaje(elementos.mensaje, respuesta.mensaje);
  cancelarEdicion();
  await cargar();
}

async function manejarAccion(evento) {
  const boton = evento.target.closest("[data-accion]");
  if (!boton) return;

  const componente = componentes.find(
    (item) => Number(item.id) === Number(boton.dataset.id),
  );
  if (!componente) return;

  if (boton.dataset.accion === "editar") {
    imagenActualBase64 = componente.imagenBase64;
    cargarFormulario(componente);
    return;
  }

  if (boton.dataset.accion === "estado") {
    await cambiarEstado(componente);
    return;
  }

  await eliminar(componente);
}

async function cambiarEstado(componente) {
  try {
    const componenteRequestDto = new ComponenteRequestDto({
      registro: !componente.registro,
    });
    const respuesta = await procesadoresApi.actualizar(
      componente.id,
      componenteRequestDto,
    );
    mostrarMensaje(elementos.mensaje, respuesta.mensaje);
    await cargar();
  } catch (error) {
    mostrarError(error);
  }
}

async function eliminar(componente) {
  const confirmado = await confirmarEliminacion(componente.modelo);
  if (!confirmado) return;

  try {
    const respuesta = await procesadoresApi.eliminar(componente.id);
    mostrarMensaje(elementos.mensaje, respuesta.mensaje);
    await cargar();
  } catch (error) {
    mostrarError(error);
  }
}

function convertirArchivoBase64(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.addEventListener("load", () => resolve(lector.result), {
      once: true,
    });
    lector.addEventListener("error", () => reject(lector.error), {
      once: true,
    });
    lector.readAsDataURL(archivo);
  });
}

function cancelarEdicion() {
  imagenActualBase64 = null;
  limpiarFormulario();
}

function mostrarError(error) {
  mostrarMensaje(elementos.mensaje, error.message, "error");
}

cargar();
