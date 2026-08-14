import { serviciosService } from "../services/Servicios.service.js";

export class ServiciosController {
  constructor(serviciosServiceActual = serviciosService) {
    this.serviciosService = serviciosServiceActual;
  }

  async crear(req, response) {
    const servicioResponseDto =
      await this.serviciosService.crear(req.body ?? req);
    response.status(201).json({
      mensaje: "Servicio creado",
      servicioResponseDto,
    });
  }

  async listar(req, res) {
    const serviciosResponseDto = await this.serviciosService.listar();
    res.json({
      total: serviciosResponseDto.length,
      serviciosResponseDto,
    });
  }

  async obtener(req, res) {
    const servicioResponseDto = await this.servicioService.obtener(req.params.id);
    res.json({ servicioResponseDto });
  }
  async reemplazar(req, res) {
        const servicioResponseDto = await this.serviciosService.reemplazar(
            req.params.id,
            req.body ?? req
        );
        res.json({
            mensaje: "Servicio reemplazado",
            servicioResponseDto,
        });
    }
  async actualizar(req, res) {
    const servicioResponseDto = await this.serviciosService.actualizar(
      req.params.id,
      req.body ?? req,
    );
    res.json({
      mensaje: "Servicio actualizado",
      servicioResponseDto,
    });
  }
  async eliminar(req, res) {
    const servicioResponseDto = await this.serviciosService.eliminar(
      req.params.id,
    );
    res.json({
      mensaje: "Servicio eliminado",
      servicioResponseDto,
    });
  }
  

}

export const serviciosController = new ServiciosController(serviciosService);