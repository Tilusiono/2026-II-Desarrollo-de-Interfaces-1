import { AppError } from "../errors/AppError.js";
import Asistencia from "../models/Asistencia.js";
import { AsistenciaResponseDto } from "../dtos/AsistenciaDto.js";
import { AsistenciaRepository } from "../repositories/AsistenciaRepository.js";

export class AsistenciasService {

    constructor(asistenciaRepository = new AsistenciaRepository()) {
        this.asistenciaRepository = asistenciaRepository;
    }


    async crear(asistenciaRequestDto) {

        if (!asistenciaRequestDto.fecha) {
            throw new AppError(
                "La fecha de asistencia es obligatoria",
                400
            );
        }

        if (!asistenciaRequestDto.idEmpleado) {
            throw new AppError(
                "El empleado es obligatorio",
                400
            );
        }

        const estadosPermitidos = [
            "Presente",
            "Tardanza",
            "Justificado",
            "Falta"
        ];

        if (
            !estadosPermitidos.includes(
                asistenciaRequestDto.estado
            )
        ) {
            throw new AppError(
                "El estado de asistencia no es válido",
                400
            );
        }


        const asistenciaModel = new Asistencia(
            0,
            asistenciaRequestDto.fecha,
            asistenciaRequestDto.horaEntrada,
            asistenciaRequestDto.horaSalida,
            asistenciaRequestDto.horasTrabajadas,
            asistenciaRequestDto.estado || "Presente",
            asistenciaRequestDto.idEmpleado
        );


        const asistenciaCreadaModel =
            await this.asistenciaRepository.crear(
                asistenciaModel
            );

        return new AsistenciaResponseDto(
            asistenciaCreadaModel
        );

    }

    async listar() {
        const asistenciasModel = await this.asistenciaRepository.listar();
         return asistenciasModel.map(
             (asistenciaModel) => new AsistenciaResponseDto(asistenciaModel),
        );
    }

    async obtener(id) {
        const asistenciaModel = await this.asistenciaRepository.buscarPorId(id);
        if (!asistenciaModel) throw new AppError("Asistencia no encontrada", 404);
        return new AsistenciaResponseDto(asistenciaModel);
    }

    async reemplazar(id, asistenciaRequestDto) {
    const asistenciaExistenteModel =
      await this.asistenciaRepository.buscarPorId(id);
    if (!asistenciaExistenteModel)
      throw new AppError("Asistencia no encontrada", 404);

    const asistenciaModel = new Asistencia(
      id,
      asistenciaRequestDto.fecha,
      asistenciaRequestDto.horaEntrada,
      asistenciaRequestDto.horaSalida,
      asistenciaRequestDto.horasTrabajadas,
      asistenciaRequestDto.estado,
      asistenciaRequestDto.idEmpleado
    );

    const asistenciaActualizadaModel = await this.asistenciaRepository.reemplazar(
      id,
      asistenciaModel,
    );
    return new AsistenciaResponseDto(asistenciaActualizadaModel);
  }

//   PATH
  async actualizar(id, asistenciaRequestDto) {
    const asistenciaActualModel =
        await this.asistenciaRepository.buscarPorId(id);

    if (!asistenciaActualModel) {
        throw new AppError(
            "Asistencia no encontrada",
            404
        );
    }

    const conservarSiNoSeEnvia = (nuevoValor, valorActual) =>
        nuevoValor === undefined ? valorActual : nuevoValor;

    const asistenciaModel = new Asistencia(
        id,

        asistenciaRequestDto.fecha ??
            asistenciaActualModel.fecha,

        conservarSiNoSeEnvia(
            asistenciaRequestDto.horaEntrada,
            asistenciaActualModel.horaEntrada
        ),

        conservarSiNoSeEnvia(
            asistenciaRequestDto.horaSalida,
            asistenciaActualModel.horaSalida
        ),

        conservarSiNoSeEnvia(
            asistenciaRequestDto.horasTrabajadas,
            asistenciaActualModel.horasTrabajadas
        ),

        asistenciaRequestDto.estado ??
            asistenciaActualModel.estado,

        asistenciaRequestDto.idEmpleado ??
            asistenciaActualModel.idEmpleado
    );

    const asistenciaActualizadaModel =
        await this.asistenciaRepository.reemplazar(
            id,
            asistenciaModel
        );

    return new AsistenciaResponseDto(
        asistenciaActualizadaModel
    );
    }

    // BUSCAR

    async buscar(asistenciaConsultaDto) {
        const asistenciasModel = await this.asistenciaRepository.query(asistenciaConsultaDto);

    return asistenciasModel.map(
        (asistenciaModel) => new AsistenciaResponseDto(asistenciaModel),
    );
    }

    // QUERY SEARCH
    async query(asistenciaConsultaDto) {
        const asistenciasModel = await this.asistenciaRepository.query(asistenciaConsultaDto);

        return asistenciasModel.map(
            (asistenciaModel) => new AsistenciaResponseDto(asistenciaModel),
        );
    }

    // DELETE ELIMINAR
    async eliminar(identificador) {
    const asistenciaEliminadaModelo = await this.asistenciaRepository.eliminar(identificador);
    
    if (!asistenciaEliminadaModelo) {
      throw new AppError("Asistencia no encontrada", 404);
    }
    
    return new AsistenciaResponseDto(asistenciaEliminadaModelo);
  }
}


export const asistenciasService = new AsistenciasService();