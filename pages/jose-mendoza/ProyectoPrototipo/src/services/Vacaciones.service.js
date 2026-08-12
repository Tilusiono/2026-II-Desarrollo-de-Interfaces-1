import { AppError } from "../errors/AppError.js";
import { Vacaciones } from "../models/Vacaciones.js";
import { VacacionesResponseDto } from "../dtos/VacacionesDto.js";
import { VacacionesRepository } from "../repositories/VacacionesRepository.js";
import { objetoContieneTexto } from "../utils/texto.js";
export class VacacionesService {

    constructor(
        vacacionesRepository = new VacacionesRepository()
    ) {
        this.vacacionesRepository = vacacionesRepository;
    }


    async crear(vacacionesRequestDto) {

        if (!vacacionesRequestDto.fechaInicio) {
            throw new AppError(
                "La fecha de inicio es obligatoria",
                400
            );
        }

        if (!vacacionesRequestDto.fechaFin) {
            throw new AppError(
                "La fecha de fin es obligatoria",
                400
            );
        }

        if (!vacacionesRequestDto.idEmpleado) {
            throw new AppError(
                "El empleado es obligatorio",
                400
            );
        }


        const vacacionesModel = new Vacaciones(
            0,
            vacacionesRequestDto.fechaInicio,
            vacacionesRequestDto.fechaFin,
            vacacionesRequestDto.cantidadDias,
            vacacionesRequestDto.estado,
            vacacionesRequestDto.observacion,
            vacacionesRequestDto.idEmpleado
        );


        const vacacionesCreadaModel =
            await this.vacacionesRepository.crear(
                vacacionesModel
            );

        return new VacacionesResponseDto(
            vacacionesCreadaModel
        );

    }

    async listar() {
        const vacacionesModel = await this.vacacionesRepository.listar();
        return vacacionesModel.map(
            (vacacionesModel) => new VacacionesResponseDto(vacacionesModel),
        );
    }

    async obtener(id) {
        const vacacionesModel = await this.vacacionesRepository.buscarPorId(id);
        if (!vacacionesModel) throw new AppError("Vacaciones no encontradas", 404);
        return new VacacionesResponseDto(vacacionesModel);
    }

    async reemplazar(id, vacacionesRequestDto) {
    const vacacionesExistenteModel =
      await this.vacacionesRepository.buscarPorId(id);
    if (!vacacionesExistenteModel)
      throw new AppError("Vacaciones no encontradas", 404);

    const vacacionesModel = new Vacaciones(
      id,
      vacacionesRequestDto.fechaInicio,
      vacacionesRequestDto.fechaFin,
      vacacionesRequestDto.cantidadDias, 
      vacacionesRequestDto.estado,       
      vacacionesRequestDto.observacion,  
      vacacionesRequestDto.idEmpleado
    );

    const vacacionesActualizadasModel = await this.vacacionesRepository.reemplazar(
      id,
      vacacionesModel,
    );
    return new VacacionesResponseDto(vacacionesActualizadasModel);
  }

    async actualizar(id, vacacionesRequestDto) {
        const vacacionesActualModel = await this.vacacionesRepository.buscarPorId(id);
            if (!vacacionesActualModel) throw new AppError("Vacaciones no encontradas", 404);

        const conservarSiNoSeEnvia = (nuevoValor, valorActual) =>
        nuevoValor === undefined ? valorActual : nuevoValor;

        const vacacionesModel = new Vacaciones(
            id,
            vacacionesRequestDto.fechaInicio ?? vacacionesActualModel.getFechaInicio(),
            vacacionesRequestDto.fechaFin ?? vacacionesActualModel.getFechaFin(),
            vacacionesRequestDto.cantidadDias ?? vacacionesActualModel.getCantidadDias(),
            vacacionesRequestDto.estado ?? vacacionesActualModel.getEstado(),
            conservarSiNoSeEnvia(
            vacacionesRequestDto.observacion,
            vacacionesActualModel.getObservacion()
        ),
        vacacionesRequestDto.idEmpleado ?? vacacionesActualModel.getIdEmpleado()
        );

        const vacacionesActualizadoModel = await this.vacacionesRepository.reemplazar(
            id,
            vacacionesModel,
        );
        return new VacacionesResponseDto(vacacionesActualizadoModel);
  }
    //   BUSCAR
    async buscar(vacacionesConsultaDto) {
        const vacacionesModel =
            await this.vacacionesRepository.query(vacacionesConsultaDto);

        return vacacionesModel.map(
            (vacacionesModel) => new VacacionesResponseDto(vacacionesModel),
    );
   }

    //    query

    async query(vacacionesConsultaDto) {
        const vacacionesModel =
            await this.vacacionesRepository.query(vacacionesConsultaDto);

        return vacacionesModel.map(
            (vacacionesModel) => new VacacionesResponseDto(vacacionesModel),
        );
    }

    // DELETE ELIMINAR
  async eliminar(identificador) {
    const vacacionEliminadaModelo = await this.vacacionesRepository.eliminar(identificador);
    
    if (!vacacionEliminadaModelo) {
      throw new AppError("Vacaciones no encontradas", 404);
    }
    
    return new VacacionesResponseDto(vacacionEliminadaModelo);
  }

}


export const vacacionesService = new VacacionesService();