import { permisosService } from "../services/Permiso.service.js";

export class PermisosController {
  constructor(permisosServiceActual = permisosService) {
    this.permisosService = permisosServiceActual;
  }

  async crear(permisoRequestDto, response) {
    const permisoResponseDto =
      await this.permisosService.crear(permisoRequestDto);
      
    response.status(201).json({
      mensaje: "Permiso creado",
      permisoResponseDto,
    });
  }
    async listar(response) {
    const permisosResponseDto = await this.permisosService.listar();
    response.json({
      total: permisosResponseDto.length,
      permisosResponseDto,
    });
  }

  async obtener(id, response) {
    const permisoResponseDto = await this.permisosService.obtener(id);
    response.json({ permisoResponseDto });
  }

  // PUT REEMPLAZAR
  async reemplazar(id, permisoRequestDto, response) {
    const permisoResponseDto = await this.permisosService.reemplazar(
      id,
      permisoRequestDto,
    );
    response.json({
      mensaje: "Permiso reemplazado",
      permisoResponseDto,
    });
  }

  async actualizar(id, permisoRequestDto, response) {
    const permisoResponseDto =
        await this.permisosService.actualizar(
            id,
            permisoRequestDto,
        );

    response.json({
        mensaje: "Permiso actualizado",
        permisoResponseDto,
    });
  }

  // BUSCAR

  async buscar(permisoConsultaDto, response) {
    const permisosResponseDto =
        await this.permisosService.buscar(permisoConsultaDto);

    response.json({
        total: permisosResponseDto.length,
        permisoConsultaDto,
        permisosResponseDto,
    });
  }

  // QUERY SEARCH

  async consultar(permisoConsultaDto, response) {
    const permisosResponseDto =
      await this.permisosService.query(permisoConsultaDto);
    response.json({
      metodo: "QUERY",
      total: permisosResponseDto.length,
      permisoConsultaDto,
      permisosResponseDto,
    });
  }

  
}

export const permisosController = new PermisosController(permisosService);