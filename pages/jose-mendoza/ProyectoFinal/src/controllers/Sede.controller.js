import { sedesService } from "../services/Sede.service.js";

export class SedesController {
  constructor(sedesServiceActual = sedesService) {
    this.sedesService = sedesServiceActual;
  }

  async crear(sedeRequestDto, response) {
    const sedeResponseDto =
      await this.sedesService.crear(sedeRequestDto);
      
    response.status(201).json({
      mensaje: "Sede creada",
      sedeResponseDto,
    });
  }
  async listar(response) {
    const sedesResponseDto = await this.sedesService.listar();
    response.json({
      total: sedesResponseDto.length,
      sedesResponseDto,
    });
  }

  async obtener(id, response) {
    const sedeResponseDto = await this.sedesService.obtener(id);
    response.json({ sedeResponseDto });
  }

  // put reemplazar
  async reemplazar(id, sedeRequestDto, response) {
    const sedeResponseDto = await this.sedesService.reemplazar(
      id,
      sedeRequestDto,
    );
    response.json({
      mensaje: "Sede reemplazada",
      sedeResponseDto,
    });
  }


  async actualizar(id, sedeRequestDto, response) {
    const sedeResponseDto =
        await this.sedesService.actualizar(
            id,
            sedeRequestDto,
        );

    response.json({
        mensaje: "Sede actualizada",
        sedeResponseDto,
    });
  }

  // BUSCAR
  async buscar(sedeConsultaDto, response) {
    const sedesResponseDto =
        await this.sedesService.buscar(sedeConsultaDto);

    response.json({
        total: sedesResponseDto.length,
        sedeConsultaDto,
        sedesResponseDto,
    });
  }

  // QUERY SEARCH

  async consultar(sedeConsultaDto, response) {
    const dto = sedeConsultaDto ?? {};
    const sedesResponseDto = await this.sedesService.query(dto);
    
    response.json({
      metodo: "QUERY",
      total: sedesResponseDto.length,
      sedeConsultaDto: dto,
      sedesResponseDto,
    });
  }
}

export const sedesController = new SedesController(sedesService);