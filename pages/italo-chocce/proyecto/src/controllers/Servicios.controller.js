import { serviciosService } from "../services/Servicios.service.js";

export class ServiciosController {
  constructor(serviciosServiceActual = serviciosService) {
    this.serviciosService = serviciosServiceActual;
  }

  async crear(servicioRequestDto, response) {
    const servicioResponseDto =
      await this.serviciosService.crear(servicioRequestDto);
    response.status(201).json({
      mensaje: "Servicio creado",
      servicioResponseDto,
    });
  }
  async listar(req, res) {
    const serviciosResponseDto = await this.servicioService.listar();
    res.json({
      total: serviciosResponseDto.length,
      serviciosResponseDto,
    });
  }

  async obtener(req, res) {
    const servicioResponseDto = await this.servicioService.obtener(req.params.id);
    res.json({ servicioResponseDto });
  }
}

export const serviciosController = new ServiciosController(serviciosService);