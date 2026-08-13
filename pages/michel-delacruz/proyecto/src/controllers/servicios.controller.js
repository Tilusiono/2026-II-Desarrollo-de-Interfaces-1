import { productosService } from "../services/productos.service.js";

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
}

export const serviciosController = new ServiciosController(serviciosService);
