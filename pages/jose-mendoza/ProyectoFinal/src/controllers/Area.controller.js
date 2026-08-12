import { areasService } from "../services/Area.service.js";

export class AreaController {
  constructor(areasServiceActual = areasService) {
    this.areasService = areasServiceActual;
  }

  async crear(areaRequestDto, response) {
    const areaResponseDto =
      await this.areasService.crear(areaRequestDto);
      
    response.status(201).json({
      mensaje: "Área creada",
      areaResponseDto,
    });
  }

    async listar(response) {
    const areasResponseDto = await this.areasService.listar();
    response.json({
      total: areasResponseDto.length,
      areasResponseDto,
    });
  }

  async obtener(id, response) {
    const areaResponseDto = await this.areasService.obtener(id);
    response.json({ areaResponseDto });
 }


//  PUT REEMPLAZAR
    async reemplazar(id, areaRequestDto, response) {
      const areaResponseDto = await this.areasService.reemplazar(
        id,
         areaRequestDto,
      );
      response.json({
        mensaje: "Área reemplazada",
        areaResponseDto,
      });
  }

  
  async actualizar(id, areaRequestDto, response) {
    const areaResponseDto = await this.areasService.actualizar(
        id,
        areaRequestDto,
    );

    response.json({
        mensaje: "Área actualizada",
        areaResponseDto,
    });
  }

  // BUSCAR
  async buscar(areaConsultaDto, response) {
    const areasResponseDto =
        await this.areasService.buscar(areaConsultaDto);

    response.json({
        total: areasResponseDto.length,
        areaConsultaDto,
        areasResponseDto,
    });
  }

  // QUERY - SEARCH
  async consultar(areaConsultaDto, response) {
    const areasResponseDto =
      await this.areasService.query(areaConsultaDto); 

    response.json({
      metodo: "QUERY",
      total: areasResponseDto.length,
      areaConsultaDto,
      areasResponseDto,
    });
  }

  // DELETE ELIMINAR
  async eliminar(identificador, response) {
    const areaResponseDto = await this.areasService.eliminar(identificador);
    
    response.json({
      mensaje: "Área eliminada",
      areaResponseDto,
    });
  }
}

export const areaController = new AreaController(areasService);