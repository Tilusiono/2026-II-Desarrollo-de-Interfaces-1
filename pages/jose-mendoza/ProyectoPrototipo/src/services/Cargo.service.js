import { AppError } from "../errors/AppError.js";
import { Cargo } from "../models/Cargo.js";
import { CargoResponseDto } from "../dtos/CargoDto.js";
import { CargoRepository } from "../repositories/CargoRepository.js";
import { normalizarTexto } from "../utils/texto.js";

export class CargosService {

    constructor(cargoRepository = new CargoRepository()) {
        this.cargoRepository = cargoRepository;
    }


    async crear(cargoRequestDto) {
        
        console.log("Datos que llegaron al servicio:", cargoRequestDto);
        await this.validarNombre(cargoRequestDto.nombre);

        const cargoModel = new Cargo(
            0,
            cargoRequestDto.nombre,
            cargoRequestDto.descripcion,
            cargoRequestDto.sueldoBase
        );

        const cargoCreadoModel =
            await this.cargoRepository.crear(cargoModel);

        return new CargoResponseDto(cargoCreadoModel);

    }


    async validarNombre(nombre, idOmitido) {

        const cargosModel =
            await this.cargoRepository.listar();

        const cargoRepetidoModel = cargosModel.find(
            (cargoModel) =>
                normalizarTexto(cargoModel.getNombre()) ===
                normalizarTexto(nombre) &&
                Number(cargoModel.getIdCargo()) !==
                Number(idOmitido)
        );

        if (cargoRepetidoModel) {

            throw new AppError(
                "El nombre del cargo ya existe",
                409
            );

        }

    }

    async listar() {
        const cargosModel = await this.cargoRepository.listar();
        return cargosModel.map(
            (cargoModel) => new CargoResponseDto(cargoModel),
        );
    }

    async obtener(id) {
        const cargoModel = await this.cargoRepository.buscarPorId(id);
        if (!cargoModel) throw new AppError("Cargo no encontrado", 404);
         return new CargoResponseDto(cargoModel);
    }

    async reemplazar(id, cargoRequestDto) {
    const cargoExistenteModel =
      await this.cargoRepository.buscarPorId(id);
    if (!cargoExistenteModel)
      throw new AppError("Cargo no encontrado", 404);

    const cargoModel = new Cargo(
      id,
      cargoRequestDto.nombre,
      cargoRequestDto.descripcion,
      cargoRequestDto.sueldoBase
    );

    const cargoActualizadoModel = await this.cargoRepository.reemplazar(
      id,
      cargoModel,
    );
    return new CargoResponseDto(cargoActualizadoModel);
  }

  async actualizar(id, cargoRequestDto) {
    const cargoActualModel =
        await this.cargoRepository.buscarPorId(id);

    if (!cargoActualModel) {
        throw new AppError("Cargo no encontrado", 404);
    }

    const conservarSiNoSeEnvia = (nuevoValor, valorActual) =>
        nuevoValor === undefined ? valorActual : nuevoValor;

    const cargoModel = new Cargo(
        id,
        cargoRequestDto.nombre ?? cargoActualModel.getNombre(),
        conservarSiNoSeEnvia(
            cargoRequestDto.descripcion,
            cargoActualModel.getDescripcion()
        ),
        cargoRequestDto.sueldoBase ??
            cargoActualModel.getSueldoBase()
    );

    const cargoActualizadoModel =
        await this.cargoRepository.reemplazar(
            id,
            cargoModel
        );

    return new CargoResponseDto(cargoActualizadoModel);
  }

    //   BUSCAR

    async buscar(cargoConsultaDto) {
    const cargosModel =
        await this.cargoRepository.query(cargoConsultaDto);

    return cargosModel.map(
        (cargoModel) => new CargoResponseDto(cargoModel),
    );
    }

    // QUERY SEARCH 
    async query(cargoConsultaDto) {
        const cargosModel =
            await this.cargoRepository.query(cargoConsultaDto);

        return cargosModel.map(
            (cargoModel) => new CargoResponseDto(cargoModel),
        );
    }


    // DELETE ELIMINAR
  async eliminar(identificador) {
    const cargoEliminadoModelo = await this.cargoRepository.eliminar(identificador);
    
    if (!cargoEliminadoModelo) {
      throw new AppError("Cargo no encontrado", 404);
    }
    
    return new CargoResponseDto(cargoEliminadoModelo);
  }
}

export const cargosService = new CargosService();