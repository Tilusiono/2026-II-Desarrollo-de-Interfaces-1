import  {asistenciasService}  from "../services/Asistencia.service.js";

export class AsistenciaController {
  constructor(asistenciaServiceActual = asistenciasService) {
    this.asistenciasService = asistenciaServiceActual;
  }

  async crear(asistenciaRequestDto, response) {
    const asistenciaResponseDto =
      await this.asistenciasService.crear(asistenciaRequestDto);
      
    response.status(201).json({
      mensaje: "Asistencia creada",
      asistenciaResponseDto,
    });
  }

    async listar(response) {
    const asistenciasResponseDto = await this.asistenciasService.listar();
    response.json({
      total: asistenciasResponseDto.length,
      asistenciasResponseDto,
    });
  }

  async obtener(id, response) {
    const asistenciaResponseDto = await this.asistenciasService.obtener(id);
    response.json({ asistenciaResponseDto });
  }
  // PUT REEMPLAZAR
  async reemplazar(id, asistenciaRequestDto, response) {
    const asistenciaResponseDto = await this.asistenciasService.reemplazar(
      id,
      asistenciaRequestDto,
    );
    response.json({
      mensaje: "Asistencia reemplazada",
      asistenciaResponseDto,
    });
  }

  async actualizar(id, asistenciaRequestDto, response) {
    const asistenciaResponseDto =
        await this.asistenciasService.actualizar(
            id,
            asistenciaRequestDto,
        );

    response.json({
        mensaje: "Asistencia actualizada",
        asistenciaResponseDto,
    });
  }

  // BUSCAR

  async buscar(asistenciaConsultaDto, response) {
    const asistenciasResponseDto =
        await this.asistenciasService.buscar(asistenciaConsultaDto);

    response.json({
        total: asistenciasResponseDto.length,
        asistenciaConsultaDto,
        asistenciasResponseDto,
    });
  }

  // QUERY SEARCH
  async consultar(asistenciaConsultaDto, response) {
    const asistenciasResponseDto =
      await this.asistenciasService.query(asistenciaConsultaDto);
    response.json({
      metodo: "QUERY",
      total: asistenciasResponseDto.length,
      asistenciaConsultaDto,
      asistenciasResponseDto,
    });
  }
}

export const asistenciaController = new AsistenciaController(asistenciasService);