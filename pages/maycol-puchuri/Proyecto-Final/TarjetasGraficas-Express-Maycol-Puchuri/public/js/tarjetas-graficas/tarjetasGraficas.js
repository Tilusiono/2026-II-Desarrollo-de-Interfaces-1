import { mostrarMensaje, ocultarMensaje } from "../shared/mensajes.js";
import { debounce } from "../shared/reactivo.js";
import {
  TarjetaGraficaConsultaDto,
  TarjetaGraficaRequestDto,
} from "./tarjetaGrafica.dto.js";
import { confirmarEliminacion } from "./confirmacion.js";
import { tarjetasGraficasApi } from "./tarjetasGraficas.api.js";
import {
  cargarFormulario,
  elementos,
  limpiarFormulario,
  mostrarCarga,
  renderizarTarjetasGraficas,
} from "./tarjetasGraficas.ui.js";

let tarjetasGraficas = [];
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
elementos.fabricante.addEventListener("change", cargar);
elementos.registro.addEventListener("change", cargar);
elementos.precioMin.addEventListener("input", debounce(cargar));
elementos.precioMax.addEventListener("input", debounce(cargar));
elementos.tabla.addEventListener("click", manejarAccion);

async function cargar() {
  mostrarCarga(true);
  ocultarMensaje(elementos.mensaje);

  try {
    const tarjetaGraficaConsultaDto = new TarjetaGraficaConsultaDto({
      texto: elementos.buscar.value,
      fabricante: elementos.fabricante.value,
      registro: elementos.registro.value,
      precioMin: elementos.precioMin.value,
      precioMax: elementos.precioMax.value,
    });
    const respuesta = await tarjetasGraficasApi.consultar(tarjetaGraficaConsultaDto);
    tarjetasGraficas = respuesta.tarjetasGraficasResponseDto;
    renderizarTarjetasGraficas(tarjetasGraficas);
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

  const tarjetaGraficaRequestDto = new TarjetaGraficaRequestDto({
    codigo: campos.codigo.value.trim(),
    modelo: campos.modelo.value.trim(),
    fabricante: campos.fabricante.value,
    memoriaGb: Number(campos.memoriaGb.value),
    precio: Number(campos.precio.value),
    frecuenciaMhz:
      campos.frecuenciaMhz.value === ""
        ? null
        : Number(campos.frecuenciaMhz.value),
    descripcion: campos.descripcion.value.trim() || null,
    registro: campos.registro.checked,
    fechaLanzamiento: campos.fechaLanzamiento.value || null,
    horaRegistro: campos.horaRegistro.value,
    fechaHoraRegistro: campos.fechaHoraRegistro.value,
    imagenBase64,
  });

  const respuesta = id
    ? await tarjetasGraficasApi.reemplazar(Number(id), tarjetaGraficaRequestDto)
    : await tarjetasGraficasApi.crear(tarjetaGraficaRequestDto);

  mostrarMensaje(elementos.mensaje, respuesta.mensaje);
  cancelarEdicion();
  await cargar();
}

async function manejarAccion(evento) {
  const boton = evento.target.closest("[data-accion]");
  if (!boton) return;

  const tarjetaGrafica = tarjetasGraficas.find(
    (item) => Number(item.id) === Number(boton.dataset.id),
  );
  if (!tarjetaGrafica) return;

  if (boton.dataset.accion === "editar") {
    imagenActualBase64 = tarjetaGrafica.imagenBase64;
    cargarFormulario(tarjetaGrafica);
    return;
  }

  if (boton.dataset.accion === "estado") {
    await cambiarEstado(tarjetaGrafica);
    return;
  }

  await eliminar(tarjetaGrafica);
}

async function cambiarEstado(tarjetaGrafica) {
  try {
    const tarjetaGraficaRequestDto = new TarjetaGraficaRequestDto({
      registro: !tarjetaGrafica.registro,
    });
    const respuesta = await tarjetasGraficasApi.actualizar(
      tarjetaGrafica.id,
      tarjetaGraficaRequestDto,
    );
    mostrarMensaje(elementos.mensaje, respuesta.mensaje);
    await cargar();
  } catch (error) {
    mostrarError(error);
  }
}

async function eliminar(tarjetaGrafica) {
  const confirmado = await confirmarEliminacion(tarjetaGrafica.modelo);
  if (!confirmado) return;

  try {
    const respuesta = await tarjetasGraficasApi.eliminar(tarjetaGrafica.id);
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
