import { perifericosService } from "../services/perifericos.service.js";




export class PerifericosController {
  constructor(perifericosServiceActual = perifericosService) {
    this.perifericosService = perifericosServiceActual;
  }

  async crear(perifericosRequestDto, response) {
    const perifericosResponseDto =
      await this.perifericosService.crear(perifericosRequestDto);
    response.status(201).json({
      mensaje: "Periférico creado",
      perifericosResponseDto,
    });
  }
}

export const perifericosController = new PerifericosController(perifericosService);