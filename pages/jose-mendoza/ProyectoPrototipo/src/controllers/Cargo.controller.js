import { cargosService } from "../services/Cargo.service.js";

export class CargosController {
  constructor(cargosServiceActual = cargosService) {
    this.cargosService = cargosServiceActual;
  }

  async crear(cargoRequestDto, response) {
    const cargoResponseDto =
      await this.cargosService.crear(cargoRequestDto);
      
    response.status(201).json({
      mensaje: "Cargo creado",
      cargoResponseDto,
    });
  }

  async listar(response) {
    const cargosResponseDto = await this.cargosService.listar();
    response.json({
      total: cargosResponseDto.length,
      cargosResponseDto,
    });
  }

  async obtener(id, response) {
    const cargoResponseDto = await this.cargosService.obtener(id);
    response.json({ cargoResponseDto });
  }

  async reemplazar(id, cargoRequestDto, response) {
    const cargoResponseDto = await this.cargosService.reemplazar(
      id,
      cargoRequestDto,
    );
    response.json({
      mensaje: "Cargo reemplazado",
      cargoResponseDto,
    });
  }

  async actualizar(id, cargoRequestDto, response) {
    const cargoResponseDto =
        await this.cargosService.actualizar(
            id,
            cargoRequestDto,
        );

    response.json({
        mensaje: "Cargo actualizado",
        cargoResponseDto,
    });
  }

  // BUSCAR

  async buscar(cargoConsultaDto, response) {
    const cargosResponseDto =
        await this.cargosService.buscar(cargoConsultaDto);

    response.json({
        total: cargosResponseDto.length,
        cargoConsultaDto,
        cargosResponseDto,
    });
  }

  // QUERY SEARCH 

  async consultar(cargoConsultaDto, response) {
    const cargosResponseDto =
      await this.cargosService.query(cargoConsultaDto);
    response.json({
      metodo: "QUERY",
      total: cargosResponseDto.length,
      cargoConsultaDto,
      cargosResponseDto,
    });
  }
  // DELETE ELIMINAR
  async eliminar(identificador, response) {
    const cargoResponseDto = await this.cargosService.eliminar(identificador);
    
    response.json({
      mensaje: "Cargo eliminado",
      cargoResponseDto,
    });
  }
}

export const cargosController = new CargosController(cargosService);