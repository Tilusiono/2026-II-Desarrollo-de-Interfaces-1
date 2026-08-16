import { AppError } from "../errors/AppError.js";
import { normalizarTexto } from "../utils/texto.js";


import Perifericos from "../models/Perifericos.js";
import { PerifericosResponseDto, PerifericosRequestDto } from "../dtos/PerifericosDto.js";
import { PerifericosRepository } from "../repositories/PerifericosRepository.js";


export class PerifericosService {
  constructor(perifericosRepository = new PerifericosRepository()) {
    this.perifericosRepository = perifericosRepository;
  }

  async crear(perifericosRequestDto) {
    await this.validarCodigo(perifericosRequestDto.codigo);
    const imagenDatos = this.convertirImagen(perifericosRequestDto.imagenBase64);

    const perifericosModel = new Perifericos(
      0,
      perifericosRequestDto.codigo,
      perifericosRequestDto.tipo,
      perifericosRequestDto.marca,
      perifericosRequestDto.modelo,
      perifericosRequestDto.tipoConexion,
      perifericosRequestDto.color,
      perifericosRequestDto.precio,
      perifericosRequestDto.stock,
      perifericosRequestDto.horaRegistro,
      perifericosRequestDto.fechaHoraRegistro,
    );

    const perifericosCreadoModel =
      await this.perifericosRepository.crear(perifericosModel);
    return new PerifericosResponseDto(perifericosCreadoModel);
  }

  async validarCodigo(codigo, idOmitido) {
    const perifericosModel = await this.perifericosRepository.listar();
    const perifericosRepetidoModel = perifericosModel.find(
      (perifericosModel) =>
        normalizarTexto(perifericosModel.codigo) === normalizarTexto(codigo) &&
        Number(perifericosModel.id) !== Number(idOmitido),
    );

    if (perifericosRepetidoModel) {
      throw new AppError("El código de producto ya existe", 409);
    }
  }

  convertirImagen(imagenBase64) {
    if (imagenBase64 === null || imagenBase64 === "") {
      return { imagen: null, imagenMimeType: null };
    }

    if (imagenBase64 === undefined) {
      return { imagen: null, imagenMimeType: null };
    }

    const coincidencia = String(imagenBase64).match(
      /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/,
    );
    if (!coincidencia) {
      throw new AppError("La imagen Base64 no es válida", 400);
    }

    return {
      imagen: Buffer.from(coincidencia[2], "base64"),
      imagenMimeType: coincidencia[1],
    };
  }

  async listar() {
    const perifericosModel = await this.perifericosRepository.listar();
    return perifericosModel.map(
      (perifericosModel) => new PerifericosResponseDto(perifericosModel),
    );
  }

  async obtener(id) {
    const perifericosModel = await this.perifericosRepository.buscarPorId(id);
    if (!perifericosModel) throw new AppError("Periférico no encontrado", 404);
    return new PerifericosResponseDto(perifericosModel);
  }

  async modificar(id, perifericosRequestDto) {
    const perifericoExistenteModel =
      await this.perifericosRepository.buscarPorId(id);
    if (!perifericoExistenteModel)
      throw new AppError("Periferico no encontrado", 404);
    await this.validarCodigo(perifericosRequestDto.codigo, id);

    const imagenDatos = this.convertirImagen(perifericosRequestDto.imagenBase64);
    const perifericosModel = new Perifericos(
      id,
      perifericosRequestDto.codigo,
      perifericosRequestDto.tipo,
      perifericosRequestDto.marca,
      perifericosRequestDto.modelo,
      perifericosRequestDto.tipoConexion,
      perifericosRequestDto.color,
      perifericosRequestDto.precio,
      perifericosRequestDto.stock,
      perifericosRequestDto.horaRegistro,
      perifericosRequestDto.fechaHoraRegistro,
    );

    const perifericoActualizadoModel = await this.perifericosRepository.modificar(
      id,
      perifericosModel,
    );
    return new PerifericosResponseDto(perifericoActualizadoModel);
  }

}

export const perifericosService = new PerifericosService();