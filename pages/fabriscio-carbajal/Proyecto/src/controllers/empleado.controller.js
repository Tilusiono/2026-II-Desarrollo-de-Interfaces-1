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
      empleados,
    });
  }

  // GET BY ID  
  async obtener(id, response) {
    const empleado = await this.empleadoService.obtener(id);
    response.json({ empleado });
  }

}

export const empleadoController = new EmpleadoController(empleadoService);
