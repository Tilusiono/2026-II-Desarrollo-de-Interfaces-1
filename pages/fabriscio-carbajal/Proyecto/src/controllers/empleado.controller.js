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


}

export const empleadoController = new EmpleadoController(empleadoService);
