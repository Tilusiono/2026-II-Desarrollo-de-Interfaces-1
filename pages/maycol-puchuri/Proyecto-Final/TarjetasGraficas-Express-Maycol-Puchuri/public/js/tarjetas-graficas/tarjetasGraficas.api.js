import { TarjetaGraficaResponseDto } from "./tarjetaGrafica.dto.js";

const RUTA_TARJETAS_GRAFICAS = "/api/tarjetas-graficas";

function crearParametros(tarjetaGraficaConsultaDto) {
  const parametros = new URLSearchParams();

  for (const campo in tarjetaGraficaConsultaDto) {
    const valor = tarjetaGraficaConsultaDto[campo];
    if (valor !== "" && valor !== undefined && valor !== null) {
      parametros.set(campo, valor);
    }
  }

  return parametros;
}

async function enviarPeticion(ruta, metodo = "GET", tarjetaGraficaRequestDto) {
  const opciones = { method: metodo };

  if (tarjetaGraficaRequestDto) {
    opciones.headers = { "Content-Type": "application/json" };
    opciones.body = JSON.stringify(tarjetaGraficaRequestDto);
  }

  const respuestaHttp = await fetch(ruta, opciones);
  const respuesta = await respuestaHttp.json();

  if (!respuestaHttp.ok) {
    throw new Error(respuesta.errores?.join(". ") || respuesta.mensaje);
  }

  return respuesta;
}

function crearTarjetasGraficasResponseDto(respuesta) {
  respuesta.tarjetasGraficasResponseDto = respuesta.tarjetasGraficasResponseDto.map(
    (tarjetaGrafica) => new TarjetaGraficaResponseDto(tarjetaGrafica),
  );
  return respuesta;
}

function crearTarjetaGraficaResponseDto(respuesta) {
  respuesta.tarjetaGraficaResponseDto = new TarjetaGraficaResponseDto(
    respuesta.tarjetaGraficaResponseDto,
  );
  return respuesta;
}

export const tarjetasGraficasApi = {
  async listar() {
    const respuesta = await enviarPeticion(RUTA_TARJETAS_GRAFICAS);
    return crearTarjetasGraficasResponseDto(respuesta);
  },

  async buscar(tarjetaGraficaConsultaDto) {
    const parametros = crearParametros(tarjetaGraficaConsultaDto);
    const respuesta = await enviarPeticion(
      `${RUTA_TARJETAS_GRAFICAS}/buscar?${parametros}`,
    );
    return crearTarjetasGraficasResponseDto(respuesta);
  },

  async consultar(tarjetaGraficaConsultaDto) {
    const parametros = crearParametros(tarjetaGraficaConsultaDto);
    const respuesta = await enviarPeticion(
      `${RUTA_TARJETAS_GRAFICAS}/consulta?${parametros}`,
      "QUERY",
    );
    return crearTarjetasGraficasResponseDto(respuesta);
  },

  async obtener(id) {
    const respuesta = await enviarPeticion(
      `${RUTA_TARJETAS_GRAFICAS}/${Number(id)}`,
    );
    return new TarjetaGraficaResponseDto(respuesta.tarjetaGraficaResponseDto);
  },

  async crear(tarjetaGraficaRequestDto) {
    const respuesta = await enviarPeticion(
      RUTA_TARJETAS_GRAFICAS,
      "POST",
      tarjetaGraficaRequestDto,
    );
    return crearTarjetaGraficaResponseDto(respuesta);
  },

  async reemplazar(id, tarjetaGraficaRequestDto) {
    const respuesta = await enviarPeticion(
      `${RUTA_TARJETAS_GRAFICAS}/${Number(id)}`,
      "PUT",
      tarjetaGraficaRequestDto,
    );
    return crearTarjetaGraficaResponseDto(respuesta);
  },

  async actualizar(id, tarjetaGraficaRequestDto) {
    const respuesta = await enviarPeticion(
      `${RUTA_TARJETAS_GRAFICAS}/${Number(id)}`,
      "PATCH",
      tarjetaGraficaRequestDto,
    );
    return crearTarjetaGraficaResponseDto(respuesta);
  },

  async eliminar(id) {
    const respuesta = await enviarPeticion(
      `${RUTA_TARJETAS_GRAFICAS}/${Number(id)}`,
      "DELETE",
    );
    return crearTarjetaGraficaResponseDto(respuesta);
  },
};
