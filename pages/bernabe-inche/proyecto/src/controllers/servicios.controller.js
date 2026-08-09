import { ServicioRequestDto } from "../dtos/servicioDto.js";
import { serviciosService } from "../services/servicios.service.js";

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

    // GET ALL
  async listar(response) {
    const servicios = await this.serviciosService.listar();
    response.json({
      total: servicios.length,
      servicios,
    });
  }

  // GET BY ID
  async obtener(id, response) {
    const servicio = await this.serviciosService.obtener(id);
    response.json({ servicio });
  }

    //PUT 
  async modificarControlador(id, servicioRequestDto, response) {
    const servicioResponseDto = await this.serviciosService.modificarService(
      id,
      servicioRequestDto,
    );
    response.json({
      mensaje: "Servicio modificado",
      servicioResponseDto,
    });
  }

   // PATCH
    async modificarParcialControlador(id, servicioRequestDto, response) {
    const servicioResponseDto = await this.serviciosService.modificarParcialService(
      id,
      servicioRequestDto,
    );
    response.json({
      mensaje: "Servicio modificado parcialmente",
      servicioResponseDto,
    });
  }
}

export const serviciosController = new ServiciosController(serviciosService);
