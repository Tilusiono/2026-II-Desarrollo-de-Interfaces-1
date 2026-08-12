import { AppError } from "../errors/AppError.js";
import Area from "../models/Area.js";
import { AreaResponseDto } from "../dtos/AreaDto.js";
import { AreaRepository } from "../repositories/AreaRepository.js";
import { normalizarTexto } from "../utils/texto.js";

export class AreasService {

    constructor(areaRepository = new AreaRepository()) {
        this.areaRepository = areaRepository;
    }


    async crear(areaRequestDto) {

        await this.validarNombre(areaRequestDto.nombre);

        const areaModel = new Area(
            0,
            areaRequestDto.nombre,
            areaRequestDto.descripcion,
            areaRequestDto.capacidad,
            areaRequestDto.idSede,
            areaRequestDto.idJefe
        );

        const areaCreadoModel =
            await this.areaRepository.crear(areaModel);

        return new AreaResponseDto(areaCreadoModel);

    }


    async validarNombre(nombre, idOmitido) {

        const areasModel =
            await this.areaRepository.listar();

        const areaRepetidaModel = areasModel.find(
            (areaModel) =>
                normalizarTexto(areaModel.nombre) ===
                normalizarTexto(nombre) &&
                Number(areaModel.idArea) !== Number(idOmitido)
        );

        if (areaRepetidaModel) {

            throw new AppError(
                "El nombre del área ya existe",
                409
            );

        }

    }

    async listar() {
        const areasModel = await this.areaRepository.listar();
        return areasModel.map(
            (areaModel) => new AreaResponseDto(areaModel),
        );
    }

    async obtener(id) {
        const areaModel = await this.areaRepository.buscarPorId(id);
        if (!areaModel) throw new AppError("Área no encontrada", 404);
        return new AreaResponseDto(areaModel);
    }

    async reemplazar(id, areaRequestDto) {
    const areaExistenteModel =
      await this.areaRepository.buscarPorId(id);
    if (!areaExistenteModel)
      throw new AppError("Área no encontrada", 404);

    const areaModel = new Area(
      id,
      areaRequestDto.nombre,
      areaRequestDto.descripcion,
      areaRequestDto.capacidad,
      areaRequestDto.idSede,
      areaRequestDto.idJefe
    );

    const areaActualizadaModel = await this.areaRepository.reemplazar(
      id,
      areaModel,
    );
    return new AreaResponseDto(areaActualizadaModel);
  }

    //   PATH
    
   async actualizar(id, areaRequestDto) {
    const areaActualModel =
        await this.areaRepository.buscarPorId(id);

    if (!areaActualModel) {
        throw new AppError("Área no encontrada", 404);
    }

    const conservarSiNoSeEnvia = (nuevoValor, valorActual) =>
        nuevoValor === undefined ? valorActual : nuevoValor;

    const areaModel = new Area(
        id,

        areaRequestDto.nombre ??
            areaActualModel.nombre,

        conservarSiNoSeEnvia(
            areaRequestDto.descripcion,
            areaActualModel.descripcion
        ),

        areaRequestDto.capacidad ??
            areaActualModel.capacidad,

        areaRequestDto.idSede ??
            areaActualModel.idSede,

        areaRequestDto.idJefe ??
            areaActualModel.idJefe
    );

    const areaActualizadaModel =
        await this.areaRepository.reemplazar(
            id,
            areaModel
        );

    return new AreaResponseDto(areaActualizadaModel);
    }
    // BUSCAR 


    async buscar(areaConsultaDto) {
    const areasModel =
        await this.areaRepository.query(areaConsultaDto);

    return areasModel.map(
        (areaModel) => new AreaResponseDto(areaModel),
    );
    }
    
    // QUERY SEARCH
    async query(areaConsultaDto) {
        const areasModel =
            await this.areaRepository.query(areaConsultaDto);

        return areasModel.map(
            (areaModel) => new AreaResponseDto(areaModel),
        );
    }

    // DELETE ELIMINAR
    async eliminar(identificador) {
    const areaEliminadaModelo = await this.areaRepository.eliminar(identificador);
    
    if (!areaEliminadaModelo) {
      throw new AppError("Área no encontrada", 404);
    }
    
    return new AreaResponseDto(areaEliminadaModelo);
  }
}
export const areasService = new AreasService();