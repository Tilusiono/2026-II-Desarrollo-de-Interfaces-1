import { vacacionesService } from "../services/Vacaciones.service.js";

export class VacacionesController {
  constructor(vacacionesServiceActual = vacacionesService) {
    this.vacacionesService = vacacionesServiceActual;
  }

  async crear(vacacionRequestDto, response) {
    const vacacionResponseDto =
      await this.vacacionesService.crear(vacacionRequestDto);
      
    response.status(201).json({
      mensaje: "Vacación creada",
      vacacionResponseDto,
    });
  }

  async listar(response) {
    const vacacionesResponseDto = await this.vacacionesService.listar();
    response.json({
      total: vacacionesResponseDto.length,
      vacacionesResponseDto,
    });
  }

  async obtener(id, response) {
    const vacacionResponseDto = await this.vacacionesService.obtener(id);
    response.json({ vacacionResponseDto });
  }

  // PUT REEMPLAZAR
  async reemplazar(id, vacacionesRequestDto, response) {
    const vacacionesResponseDto = await this.vacacionesService.reemplazar(
      id,
      vacacionesRequestDto,
    );
    response.json({
      mensaje: "Vacaciones reemplazadas",
      vacacionesResponseDto,
    });
  }


  async actualizar(id, vacacionesRequestDto, response) {
    const vacacionesResponseDto = await this.vacacionesService.actualizar(
      id,
      vacacionesRequestDto,
    );
    
    response.json({
      mensaje: "Vacaciones actualizadas",
      vacacionesResponseDto,
    });
  }

  // BUSCAR

  async buscar(vacacionesConsultaDto, response) {
    const vacacionesResponseDto =
        await this.vacacionesService.buscar(vacacionesConsultaDto);

    response.json({
        total: vacacionesResponseDto.length,
        vacacionesConsultaDto,
        vacacionesResponseDto,
    });
  }


  // QUERY SEARCH

  async consultar(vacacionesConsultaDto, response) {
    const dto = vacacionesConsultaDto ?? {};
    const vacacionesResponseDto =
      await this.vacacionesService.query(dto);
    response.json({
      metodo: "QUERY",
      total: vacacionesResponseDto.length,
      vacacionesConsultaDto: dto,
      vacacionesResponseDto,
    });
  }
}

export const vacacionesController = new VacacionesController(vacacionesService);