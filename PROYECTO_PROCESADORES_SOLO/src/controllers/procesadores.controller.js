import { procesadoresService } from "../services/procesadores.service.js";

export class ProcesadoresController {
  constructor(procesadoresServiceActual = procesadoresService) {
    this.procesadoresService = procesadoresServiceActual;
  }

  async listar(response) {
    const procesadoresResponseDto = await this.procesadoresService.listar();
    response.json({ total: procesadoresResponseDto.length, procesadoresResponseDto });
  }

  listarConCallback(response, next) {
    this.procesadoresService.listarConCallback((error, datos) => {
      if (error) return next(error);
      return response.json({ metodo: "callback", total: datos.length, procesadoresResponseDto: datos });
    });
  }

  async listarConPromesa(response) {
    const datos = await this.procesadoresService.listarConPromesa();
    response.json({ metodo: "promise", total: datos.length, procesadoresResponseDto: datos });
  }

  async obtener(id, response) {
    const procesadorResponseDto = await this.procesadoresService.obtener(id);
    response.json({ procesadorResponseDto });
  }

  async buscar(procesadorConsultaDto, response) {
    const procesadoresResponseDto = await this.procesadoresService.buscar(procesadorConsultaDto);
    response.json({ total: procesadoresResponseDto.length, procesadorConsultaDto, procesadoresResponseDto });
  }

  async consultar(procesadorConsultaDto, response) {
    const procesadoresResponseDto = await this.procesadoresService.buscar(procesadorConsultaDto);
    response.json({ metodo: "QUERY", total: procesadoresResponseDto.length, procesadorConsultaDto, procesadoresResponseDto });
  }

  async estadisticas(response) {
    const estadisticas = await this.procesadoresService.estadisticas();
    response.json({ metodo: "worker_thread", estadisticas });
  }

  async historial(id, response) {
    const historial = await this.procesadoresService.historial(id);
    response.json({ total: historial.length, historial });
  }

  async crear(procesadorRequestDto, response) {
    const procesadorResponseDto = await this.procesadoresService.crear(procesadorRequestDto);
    response.status(201).json({ mensaje: "Procesador creado", procesadorResponseDto });
  }

  async reemplazar(id, procesadorRequestDto, response) {
    const procesadorResponseDto = await this.procesadoresService.reemplazar(id, procesadorRequestDto);
    response.json({ mensaje: "Procesador reemplazado", procesadorResponseDto });
  }

  async actualizar(id, procesadorRequestDto, response) {
    const procesadorResponseDto = await this.procesadoresService.actualizar(id, procesadorRequestDto);
    response.json({ mensaje: "Procesador actualizado", procesadorResponseDto });
  }

  async eliminar(id, response) {
    const procesadorResponseDto = await this.procesadoresService.eliminar(id);
    response.json({ mensaje: "Procesador eliminado", procesadorResponseDto });
  }
}

export const procesadoresController = new ProcesadoresController(procesadoresService);
