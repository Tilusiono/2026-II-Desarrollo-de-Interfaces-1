import { tipoEmpleadoService } from "../services/TipoEmpleado.service.js";

export class TipoEmpleadoController {
  
  constructor(tipoEmpleadoServiceActual = tipoEmpleadoService) {
    this.tipoEmpleadoService = tipoEmpleadoServiceActual;
  }

  async crear(tipoEmpleadoRequestDto, response) {
    const tipoEmpleadoResponseDto = 
      await this.tipoEmpleadoService.crear(tipoEmpleadoRequestDto);
      
    response.status(201).json({
      mensaje: "Tipo de empleado creado",
      tipoEmpleadoResponseDto,
    });
  }

    async listar(response) {
        const tipoEmpleadosResponseDto = await this.tipoEmpleadoService.listar();
        response.json({
        total: tipoEmpleadosResponseDto.length,
        tipoEmpleadosResponseDto,
      });
  }

    async obtener(id, response) {
      const tipoEmpleadoResponseDto = await this.tipoEmpleadoService.obtener(id);
      response.json({ tipoEmpleadoResponseDto });
  }

  // PUT REEMPLAZAR
  async reemplazar(id, tipoEmpleadoRequestDto, response) {
    const tipoEmpleadoResponseDto = await this.tipoEmpleadoService.reemplazar( 
      id,
      tipoEmpleadoRequestDto,
    );
    
    response.json({
      mensaje: "Tipo de empleado reemplazado",
      tipoEmpleadoResponseDto,
    });
  }


  async actualizar(id, tipoEmpleadoRequestDto, response) {
    const tipoEmpleadoResponseDto = await this.tipoEmpleadoService.actualizar(
      id,
      tipoEmpleadoRequestDto,
    );
    
    response.json({
      mensaje: "Tipo de empleado actualizado",
      tipoEmpleadoResponseDto,
    });
  }

  // BUSCAR (Corregido)
    async buscar(tipoEmpleadoConsultaDto, response) {
    const tiposEmpleadoResponseDto =
        await this.tipoEmpleadoService.buscar(tipoEmpleadoConsultaDto);

    response.json({
        total: tiposEmpleadoResponseDto.length,
        tipoEmpleadoConsultaDto,
        tiposEmpleadoResponseDto,
    });
  }

  // QUERY SEARCH

  async consultar(tipoEmpleadoConsultaDto, response) {
    const tipoEmpleadosResponseDto =
      await this.tipoEmpleadoService.query(tipoEmpleadoConsultaDto);
    response.json({
      metodo: "QUERY",
      total: tipoEmpleadosResponseDto.length,
      tipoEmpleadoConsultaDto,
      tipoEmpleadosResponseDto,
    });
  }
  // DELETE ELIMINAR (Corregido)
  async eliminar(identificador, response) {
    const tipoEmpleadoResponseDto = await this.tipoEmpleadoService.eliminar(identificador);
    
    response.json({
      mensaje: "Tipo de empleado eliminado",
      tipoEmpleadoResponseDto,
    });
  }
}

export const tipoEmpleadoController = new TipoEmpleadoController(tipoEmpleadoService);