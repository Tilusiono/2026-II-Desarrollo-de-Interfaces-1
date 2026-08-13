import { productoService } from "../services/productos.service.js";

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
}

export const automovilesController = new AutomovilesController(automovilesService);
