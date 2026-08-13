import { tarjetasGraficasService } from "../services/tarjetasGraficas.service.js";

export class TarjetasGraficasController {
  constructor(tarjetasGraficasServiceActual = tarjetasGraficasService) {
    this.tarjetasGraficasService = tarjetasGraficasServiceActual;
  }

  async listar(response) {
    const tarjetasGraficasResponseDto = await this.tarjetasGraficasService.listar();
    response.json({
      total: tarjetasGraficasResponseDto.length,
      tarjetasGraficasResponseDto,
    });
  }

  async obtener(id, response) {
    const tarjetaGraficaResponseDto = await this.tarjetasGraficasService.obtener(id);
    response.json({ tarjetaGraficaResponseDto });
  }

  async crear(tarjetaGraficaRequestDto, response) {
    const tarjetaGraficaResponseDto =
      await this.tarjetasGraficasService.crear(tarjetaGraficaRequestDto);
    response.status(201).json({
      mensaje: "Tarjeta gráfica creada",
      tarjetaGraficaResponseDto,
    });
  }

  async reemplazar(id, tarjetaGraficaRequestDto, response) {
    const tarjetaGraficaResponseDto = await this.tarjetasGraficasService.reemplazar(
      id,
      tarjetaGraficaRequestDto,
    );
    response.json({
      mensaje: "Tarjeta gráfica reemplazada",
      tarjetaGraficaResponseDto,
    });
  }

  async actualizar(id, tarjetaGraficaRequestDto, response) {
    const tarjetaGraficaResponseDto = await this.tarjetasGraficasService.actualizar(
      id,
      tarjetaGraficaRequestDto,
    );
    response.json({
      mensaje: "Tarjeta gráfica actualizada",
      tarjetaGraficaResponseDto,
    });
  }

  async buscar(tarjetaGraficaConsultaDto, response) {
    const tarjetasGraficasResponseDto = await this.tarjetasGraficasService.buscar(
      tarjetaGraficaConsultaDto,
    );
    response.json({
      total: tarjetasGraficasResponseDto.length,
      tarjetaGraficaConsultaDto,
      tarjetasGraficasResponseDto,
    });
  }

  async consultar(tarjetaGraficaConsultaDto, response) {
    const tarjetasGraficasResponseDto = await this.tarjetasGraficasService.buscar(
      tarjetaGraficaConsultaDto,
    );
    response.json({
      metodo: "QUERY",
      total: tarjetasGraficasResponseDto.length,
      tarjetaGraficaConsultaDto,
      tarjetasGraficasResponseDto,
    });
  }

  async eliminar(id, response) {
    const tarjetaGraficaResponseDto = await this.tarjetasGraficasService.eliminar(id);
    response.json({
      mensaje: "Tarjeta gráfica eliminada",
      tarjetaGraficaResponseDto,
    });
  }
}

export const tarjetasGraficasController = new TarjetasGraficasController(
  tarjetasGraficasService,
);
