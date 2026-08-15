import { perifericosService } from "../services/perifericos.service.js";




export class PerifericosController {
  constructor(perifericosServiceActual = perifericosService) {
    this.perifericosService = perifericosServiceActual;
  }

//POST
  async crear(perifericosRequestDto, response) {
    const perifericosResponseDto =
      await this.perifericosService.crear(perifericosRequestDto);
    response.status(201).json({
      mensaje: "Periférico creado",
      perifericosResponseDto,
    });
  }


// GET ALL
  async listar(response) {
    const perifericosResponseDto = await this.perifericosService.listar();
    response.json({
      total: perifericosResponseDto.length,
      perifericosResponseDto,
    });
  }


// GET BY ID  
  async obtener(id, response) {
    const perifericosResponseDto = await this.perifericosService.obtener(id);
    response.json({ perifericosResponseDto });
  }

}

export const perifericosController = new PerifericosController(perifericosService);