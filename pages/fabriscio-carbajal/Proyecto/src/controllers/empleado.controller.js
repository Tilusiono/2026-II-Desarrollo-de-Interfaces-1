import { empleadoService } from "../services/empleado.service.js";

export class EmpleadoController {
  constructor(empleadoServiceActual = empleadoService) {
    this.empleadoService = empleadoServiceActual;
  }

  // POST
  async crear(empleadoRequestDto, response) {
    const empleadoResponseDto =
      await this.empleadoService.crear(empleadoRequestDto);
    response.status(201).json({
      mensaje: "Empleado creado",
      empleadoResponseDto,
    });
  }

  // GET ALL
  async listar(response) {
    const empleados = await this.empleadoService.listar();
    response.json({
      total: empleados.length,
      empleados, //con el html
    });
  }

  // GET BY ID  
  async obtener(id, response) {
    const empleado = await this.empleadoService.obtener(id);
    response.json({ empleado }); //con el html
  }

  // PUT
  async modificarControlador(id, empleadoRequestDto, response) {
    const empleadoResponseDto = await this.empleadoService.modificarService(
      id,
      empleadoRequestDto,
    );
    response.json({
      mensaje: "Empleado reemplazado",
      empleadoResponseDto,
    });
  }

  // PATCH
  async modificarParcialControlador(id, empleadoRequestDto, response) {
    const empleadoResponseDto = await this.empleadoService.modificarParcialService(
      id,
      empleadoRequestDto,
    );
    response.json({
      mensaje: "Empleado actualizado parcialmente",
      empleadoResponseDto,
    });
  }

  // GET - SEARCH
  async buscar(empleadoConsultaDto, response) {
    const empleadosResponseDto =
      await this.empleadoService.buscar(empleadoConsultaDto);
    response.json({
      total: empleadosResponseDto.length,
      empleadoConsultaDto,
      empleadosResponseDto,
    });
  }

  // QUERY - SEARCH
  async consultar(empleadoConsultaDto, response) {
    const empleadoResponseDto =
      await this.empleadoService.buscar(empleadoConsultaDto);
    response.json({
      metodo: "QUERY",
      total: empleadoResponseDto.length,
      empleadoConsultaDto,
      empleadoResponseDto,
    });
  }



}

export const empleadoController = new EmpleadoController(empleadoService);
