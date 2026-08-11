import { AppError } from "../errors/AppError.js";
import { TipoEmpleado } from "../models/TipoEmpleado.js";
import { TipoEmpleadoResponseDto } from "../dtos/TipoEmpleadoDto.js";
import { TipoEmpleadoRepository } from "../repositories/TipoEmpleadoRepository.js";
import { normalizarTexto } from "../utils/texto.js";

export class TiposEmpleadoService {

    constructor(
        tipoEmpleadoRepository = new TipoEmpleadoRepository()
    ) {
        this.tipoEmpleadoRepository = tipoEmpleadoRepository;
    }


    async crear(tipoEmpleadoRequestDto) {

        await this.validarNombre(
            tipoEmpleadoRequestDto.nombre
        );

        const tipoEmpleadoModel = new TipoEmpleado(
            0,
            tipoEmpleadoRequestDto.nombre
        );

        const tipoEmpleadoCreadoModel =
            await this.tipoEmpleadoRepository.crear(
                tipoEmpleadoModel
            );

        return new TipoEmpleadoResponseDto(
            tipoEmpleadoCreadoModel
        );

    }


    async validarNombre(nombre, idOmitido) {

        const tiposEmpleadoModel =
            await this.tipoEmpleadoRepository.listar();

        const tipoEmpleadoRepetidoModel =
            tiposEmpleadoModel.find(
                (tipoEmpleadoModel) =>
                    normalizarTexto(
                        tipoEmpleadoModel.getNombre()
                    ) === normalizarTexto(nombre) &&
                    Number(
                        tipoEmpleadoModel.getIdTipoEmpleado()
                    ) !== Number(idOmitido)
            );

        if (tipoEmpleadoRepetidoModel) {

            throw new AppError(
                "El tipo de empleado ya existe",
                409
            );

        }

    }

    async listar() {
        const tipoEmpleadoModel = await this.tipoEmpleadoRepository.listar();
        return tipoEmpleadoModel.map(
             (tipoEmpleadoModel) => new TipoEmpleadoResponseDto(tipoEmpleadoModel),
        );
    }

    async obtener(id) {
        const tipoEmpleadoModel = await this.tipoEmpleadoRepository.buscarPorId(id);
        if (!tipoEmpleadoModel) throw new AppError("Tipo de empleado no encontrado", 404);
        return new TipoEmpleadoResponseDto(tipoEmpleadoModel);
    }

    
    async reemplazar(id, tipoEmpleadoRequestDto) {
  
        const tipoEmpleadoExistenteModel =
        await this.tipoEmpleadoRepository.buscarPorId(id);
      
        if (!tipoEmpleadoExistenteModel)
        throw new AppError("Tipo de empleado no encontrado", 404);

        const tipoEmpleadoModel = new TipoEmpleado(
        id,
        tipoEmpleadoRequestDto.nombre
    );

        const tipoEmpleadoActualizadoModel = await this.tipoEmpleadoRepository.reemplazar(
            id,
            tipoEmpleadoModel,
    );
  
        return new TipoEmpleadoResponseDto(tipoEmpleadoActualizadoModel);
  }

    async actualizar(id, tipoEmpleadoRequestDto) {
        const tipoEmpleadoActualModel = await this.tipoEmpleadoRepository.buscarPorId(id);
        if (!tipoEmpleadoActualModel) throw new AppError("Tipo de empleado no encontrado", 404);

        const tipoEmpleadoModel = new TipoEmpleado(
            id,
            tipoEmpleadoRequestDto.nombre ?? tipoEmpleadoActualModel.getNombre()
        );

        const tipoEmpleadoActualizadoModel = await this.tipoEmpleadoRepository.reemplazar(
        id,
        tipoEmpleadoModel,
        );
        return new TipoEmpleadoResponseDto(tipoEmpleadoActualizadoModel);
  }

    //   BUSCAR
    async buscar(tipoEmpleadoConsultaDto) {
        const tiposEmpleadoModel =
            await this.tipoEmpleadoRepository.query(tipoEmpleadoConsultaDto);

        return tiposEmpleadoModel.map(
            (tipoEmpleadoModel) => new TipoEmpleadoResponseDto(tipoEmpleadoModel),
    );
    }

    // QUERY SEARCH
    async query(tipoEmpleadoConsultaDto) {
        const tiposEmpleadoModel =
            await this.tipoEmpleadoRepository.query(tipoEmpleadoConsultaDto);

        return tiposEmpleadoModel.map(
            (tipoEmpleadoModel) => new TipoEmpleadoResponseDto(tipoEmpleadoModel),
        );
    }
}


export const tipoEmpleadoService = new TiposEmpleadoService();