import { automovilesService } from "../services/Automoviles.service.js";

export class AutomovilesController {
  constructor(automovilesServiceActual = automovilesService) {
    this.automovilesService = automovilesServiceActual;
  }

  async crear(automovilRequestDto, response) {
    const automovilResponseDto =
      await this.automovilesService.crear(automovilRequestDto);
    response.status(201).json({
      mensaje: "Automóvil creado",
      automovilResponseDto,
    });
  }
    async listar(response) {
    const automovilesResponseDto = await this.automovilesService.listar();
    response.json({
      total: automovilesResponseDto.length,
      automovilesResponseDto,
    });
  }

  async obtener(id, response) {
    const automovilResponseDto = await this.automovilesService.obtener(id);
    response.json({ automovilResponseDto });
  }

  // delete
    async eliminar(id, response) {
    const automovilResponseDto = await this.automovilesService.eliminar(id);
    response.json({
      mensaje: "Automóvil eliminado",
      automovilResponseDto,
    });
  }

}

export const automovilesController = new AutomovilesController(automovilesService);
