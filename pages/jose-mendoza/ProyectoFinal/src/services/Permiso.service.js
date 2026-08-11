import { AppError } from "../errors/AppError.js";
import { Permiso } from "../models/Permiso.js";
import { PermisoResponseDto } from "../dtos/PermisoDto.js";
import { PermisoRepository } from "../repositories/PermisoRepository.js";

export class PermisosService {

    constructor(permisoRepository = new PermisoRepository()) {
        this.permisoRepository = permisoRepository;
    }


    async crear(permisoRequestDto) {

        if (!permisoRequestDto.tipoPermiso) {
            throw new AppError(
                "El tipo de permiso es obligatorio",
                400
            );
        }

        if (!permisoRequestDto.fechaInicio) {
            throw new AppError(
                "La fecha de inicio es obligatoria",
                400
            );
        }

        if (!permisoRequestDto.idEmpleado) {
            throw new AppError(
                "El empleado es obligatorio",
                400
            );
        }


        const permisoModel = new Permiso(
            0,
            permisoRequestDto.tipoPermiso,
            permisoRequestDto.fechaInicio,
            permisoRequestDto.fechaFin,
            permisoRequestDto.motivo,
            permisoRequestDto.estado,
            permisoRequestDto.idEmpleado
        );


        const permisoCreadoModel =
            await this.permisoRepository.crear(
                permisoModel
            );

        return new PermisoResponseDto(
            permisoCreadoModel
        );

    }

    async listar() {
        const permisosModel = await this.permisoRepository.listar();
        return permisosModel.map(
             (permisoModel) => new PermisoResponseDto(permisoModel),
        );
    }

    async obtener(id) {
        const permisoModel = await this.permisoRepository.buscarPorId(id);
        if (!permisoModel) throw new AppError("Permiso no encontrado", 404);
        return new PermisoResponseDto(permisoModel);
    }

    async reemplazar(id, permisoRequestDto) {
    const permisoExistenteModel =
      await this.permisoRepository.buscarPorId(id);
    if (!permisoExistenteModel)
      throw new AppError("Permiso no encontrado", 404);

    const permisoModel = new Permiso(
      id,
      permisoRequestDto.tipoPermiso,
      permisoRequestDto.fechaInicio,
      permisoRequestDto.fechaFin,
      permisoRequestDto.motivo,
      permisoRequestDto.estado,
      permisoRequestDto.idEmpleado
    );

    const permisoActualizadoModel = await this.permisoRepository.reemplazar(
      id,
      permisoModel,
    );
    return new PermisoResponseDto(permisoActualizadoModel);
  }

  async actualizar(id, permisoRequestDto) {
    const permisoActualModel = await this.permisoRepository.buscarPorId(id);
    if (!permisoActualModel) throw new AppError("Permiso no encontrado", 404);

    const conservarSiNoSeEnvia = (nuevoValor, valorActual) =>
      nuevoValor === undefined ? valorActual : nuevoValor;

    const permisoModel = new Permiso(
      id,
      permisoRequestDto.tipoPermiso ?? permisoActualModel.getTipoPermiso(),
      permisoRequestDto.fechaInicio ?? permisoActualModel.getFechaInicio(),
      permisoRequestDto.fechaFin ?? permisoActualModel.getFechaFin(),
      conservarSiNoSeEnvia(
        permisoRequestDto.motivo,
        permisoActualModel.getMotivo()
      ),
      permisoRequestDto.estado ?? permisoActualModel.getEstado(),
      permisoRequestDto.idEmpleado ?? permisoActualModel.getIdEmpleado()
    );

    const permisoActualizadoModel = await this.permisoRepository.reemplazar(
      id,
      permisoModel,
    );
    return new PermisoResponseDto(permisoActualizadoModel);
  }

  // BUSCAR

  async buscar(permisoConsultaDto) {
    const permisosModel =
        await this.permisoRepository.query(permisoConsultaDto);

    return permisosModel.map(
        (permisoModel) => new PermisoResponseDto(permisoModel),
    );
  }

  // QUERY SEARCH
    async query(permisoConsultaDto) {
    const permisosModel =
        await this.permisoRepository.query(permisoConsultaDto);

    return permisosModel.map(
        (permisoModel) => new PermisoResponseDto(permisoModel),
    );
    }
}


export const permisosService = new PermisosService();