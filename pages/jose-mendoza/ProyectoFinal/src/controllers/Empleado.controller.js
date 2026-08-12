import { empleadosService } from "../services/Empleado.service.js";

export class EmpleadosController {
  constructor(empleadosServiceActual = empleadosService) {
    this.empleadosService = empleadosServiceActual;
  }

  async crear(empleadoRequestDto, response) {
    const empleadoResponseDto =
      await this.empleadosService.crear(empleadoRequestDto);
      
    response.status(201).json({
      mensaje: "Empleado creado",
      empleadoResponseDto,
    });
  }
  async listar(response) {
    const empleadosResponseDto = await this.empleadosService.listar();
    response.json({
      total: empleadosResponseDto.length,
      empleadosResponseDto,
    });
  }

  async obtener(id, response) {
    const empleadoResponseDto = await this.empleadosService.obtener(id);
    response.json({ empleadoResponseDto });
  }

  // PUT REEMPLAZAR
  async reemplazar(id, empleadoRequestDto, response) {
    const empleadoResponseDto = await this.empleadosService.reemplazar(
      id,
      empleadoRequestDto,
    );
    response.json({
      mensaje: "Empleado reemplazado",
      empleadoResponseDto,
    });
  }

  async actualizar(id, empleadoRequestDto, response) {
    const empleadoResponseDto =
        await this.empleadosService.actualizar(
            id,
            empleadoRequestDto,
        );

    response.json({
        mensaje: "Empleado actualizado",
        empleadoResponseDto,
    });
  }

  // BUSCAR

  async buscar(empleadoConsultaDto, response) {
    const empleadosResponseDto =
        await this.empleadosService.buscar(empleadoConsultaDto);

    response.json({
        total: empleadosResponseDto.length,
        empleadoConsultaDto,
        empleadosResponseDto,
    });
  }


  // QUERY SEARCH

  async consultar(empleadoConsultaDto, respuesta) {
    const empleadosResponseDto =
      await this.empleadosService.query(empleadoConsultaDto);

    respuesta.json({
      metodo: "QUERY",
      total: empleadosResponseDto.length,
      empleadoConsultaDto,
      empleadosResponseDto,
    });
  }
  // DELETE ELIMINAR
  async eliminar(identificador, respuesta) {
    const empleadoRespuestaObjeto = await this.empleadosService.eliminar(identificador);
    
    respuesta.json({
      mensaje: "Empleado eliminado",
      empleadoRespuestaObjeto,
    });
  }
}

export const empleadosController = new EmpleadosController(empleadosService);