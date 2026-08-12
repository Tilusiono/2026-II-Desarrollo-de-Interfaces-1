import { ComponenteResponseDto } from "./procesador.dto.js";

const RUTA_PROCESADORES = "/api/procesadores";
const CLAVE_API_POR_DEFECTO = "API_KEY";

function crearParametros(componenteConsultaDto) {
  const parametros = new URLSearchParams();
  for (const campo in componenteConsultaDto) {
    const valor = componenteConsultaDto[campo];
    if (valor !== "" && valor !== undefined && valor !== null) {
      parametros.set(campo, valor);
    }
  }
  return parametros;
}

function obtenerClaveEscritura() {
  return sessionStorage.getItem("apiKey") || CLAVE_API_POR_DEFECTO;
}

async function enviarPeticion(ruta, metodo = "GET", componenteRequestDto) {
  const opciones = { method: metodo, headers: {} };

  if (["POST", "PUT", "PATCH", "DELETE"].includes(metodo)) {
    opciones.headers["x-api-key"] = obtenerClaveEscritura();
  }

  if (componenteRequestDto) {
    opciones.headers["Content-Type"] = "application/json";
    opciones.body = JSON.stringify(componenteRequestDto);
  }

  const respuestaHttp = await fetch(ruta, opciones);
  const respuesta = await respuestaHttp.json();

  if (!respuestaHttp.ok) {
    throw new Error(respuesta.errores?.join(". ") || respuesta.mensaje || "Error de API");
  }
  return respuesta;
}

function crearProcesadoresResponseDto(respuesta) {
  respuesta.procesadoresResponseDto = respuesta.procesadoresResponseDto.map(
    (componente) => new ComponenteResponseDto(componente),
  );
  return respuesta;
}

function crearComponenteResponseDto(respuesta) {
  respuesta.procesadorResponseDto = new ComponenteResponseDto(respuesta.procesadorResponseDto);
  return respuesta;
}

export const procesadoresApi = {
  async listar() {
    return crearProcesadoresResponseDto(await enviarPeticion(RUTA_PROCESADORES));
  },
  async buscar(componenteConsultaDto) {
    const parametros = crearParametros(componenteConsultaDto);
    return crearProcesadoresResponseDto(await enviarPeticion(`${RUTA_PROCESADORES}/buscar?${parametros}`));
  },
  async consultar(componenteConsultaDto) {
    const parametros = crearParametros(componenteConsultaDto);
    return crearProcesadoresResponseDto(await enviarPeticion(`${RUTA_PROCESADORES}/consulta?${parametros}`, "QUERY"));
  },
  async estadisticas() {
    return enviarPeticion(`${RUTA_PROCESADORES}/estadisticas`);
  },
  async obtener(id) {
    const respuesta = await enviarPeticion(`${RUTA_PROCESADORES}/${Number(id)}`);
    return new ComponenteResponseDto(respuesta.procesadorResponseDto);
  },
  async crear(componenteRequestDto) {
    return crearProcesadorResponseDto(await enviarPeticion(RUTA_PROCESADORES, "POST", componenteRequestDto));
  },
  async reemplazar(id, componenteRequestDto) {
    return crearProcesadorResponseDto(await enviarPeticion(`${RUTA_PROCESADORES}/${Number(id)}`, "PUT", componenteRequestDto));
  },
  async actualizar(id, componenteRequestDto) {
    return crearProcesadorResponseDto(await enviarPeticion(`${RUTA_PROCESADORES}/${Number(id)}`, "PATCH", componenteRequestDto));
  },
  async eliminar(id) {
    return crearComponenteResponseDto(await enviarPeticion(`${RUTA_PROCESADORES}/${Number(id)}`, "DELETE"));
  },
};
