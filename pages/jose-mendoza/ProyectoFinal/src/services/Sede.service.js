import { AppError } from "../errors/AppError.js";
import { Sede } from "../models/Sede.js";
import { SedeResponseDto } from "../dtos/SedeDto.js";
import { SedeRepository } from "../repositories/SedeRepository.js";
import { normalizarTexto } from "../utils/texto.js";

export class SedesService {

    constructor(sedeRepository = new SedeRepository()) {
        this.sedeRepository = sedeRepository;
    }


    async crear(sedeRequestDto) {

        await this.validarNombre(sedeRequestDto.nombre);

        const sedeModel = new Sede(
            0,
            sedeRequestDto.nombre,
            sedeRequestDto.direccion,
            sedeRequestDto.telefono,
            sedeRequestDto.capacidad,
            sedeRequestDto.estado,
            sedeRequestDto.horaApertura,
            sedeRequestDto.fechaInauguracion
        );

        const sedeCreadaModel =
            await this.sedeRepository.crear(sedeModel);

        return new SedeResponseDto(
            sedeCreadaModel
        );

    }


    async validarNombre(nombre, idOmitido) {

        const sedesModel =
            await this.sedeRepository.listar();

        const sedeRepetidaModel = sedesModel.find(
            (sedeModel) =>
                normalizarTexto(sedeModel.getNombre()) ===
                normalizarTexto(nombre) &&
                Number(sedeModel.getIdSede()) !==
                Number(idOmitido)
        );

        if (sedeRepetidaModel) {

            throw new AppError(
                "El nombre de la sede ya existe",
                409
            );

        }

    }

    async listar() {
        const sedesModel = await this.sedeRepository.listar();
        return sedesModel.map(
            (sedeModel) => new SedeResponseDto(sedeModel),
        );
    }

    async obtener(id) {
        const sedeModel = await this.sedeRepository.buscarPorId(id);
        if (!sedeModel) throw new AppError("Sede no encontrada", 404);
        return new SedeResponseDto(sedeModel);
    }

    async reemplazar(id, sedeRequestDto) {
    const sedeExistenteModel =
      await this.sedeRepository.buscarPorId(id);
    if (!sedeExistenteModel)
      throw new AppError("Sede no encontrada", 404);

    const sedeModel = new Sede(
      id,
      sedeRequestDto.nombre,
      sedeRequestDto.direccion,
      sedeRequestDto.telefono,
      sedeRequestDto.capacidad,
      sedeRequestDto.estado,
      sedeRequestDto.horaApertura,
      sedeRequestDto.fechaInauguracion
    );

    const sedeActualizadaModel = await this.sedeRepository.reemplazar(
      id,
      sedeModel,
    );
    return new SedeResponseDto(sedeActualizadaModel);
  }

    async actualizar(id, sedeRequestDto) {
    const sedeActualModel = await this.sedeRepository.buscarPorId(id);
    if (!sedeActualModel) throw new AppError("Sede no encontrada", 404);

    const conservarSiNoSeEnvia = (nuevoValor, valorActual) =>
      nuevoValor === undefined ? valorActual : nuevoValor;

    const sedeModel = new Sede(
      id,
      sedeRequestDto.nombre ?? sedeActualModel.getNombre(),
      conservarSiNoSeEnvia(
        sedeRequestDto.direccion,
        sedeActualModel.getDireccion()
      ),
      conservarSiNoSeEnvia(
        sedeRequestDto.telefono,
        sedeActualModel.getTelefono()
      ),
      sedeRequestDto.capacidad ?? sedeActualModel.getCapacidad(),
      sedeRequestDto.estado ?? sedeActualModel.getEstado(),
      conservarSiNoSeEnvia(
        sedeRequestDto.horaApertura,
        sedeActualModel.getHoraApertura()
      ),
      conservarSiNoSeEnvia(
        sedeRequestDto.fechaInauguracion,
        sedeActualModel.getFechaInauguracion()
      )
    );

    const sedeActualizadaModel = await this.sedeRepository.reemplazar(
      id,
      sedeModel,
    );
    return new SedeResponseDto(sedeActualizadaModel);
  }

    async buscar(sedeConsultaDto) {
    const sedesModel =
        await this.sedeRepository.query(sedeConsultaDto);

    return sedesModel.map(
        (sedeModel) => new SedeResponseDto(sedeModel),
    );
  }

   async query(sedeConsultaDto) {
    const sedesModel = await this.sedeRepository.query(sedeConsultaDto);

    return sedesModel.map(
      (sedeModel) => new SedeResponseDto(sedeModel),
    );
    }
}


export const sedesService = new SedesService();