import { AppError } from "../errors/AppError.js";
import { normalizarTexto } from "../utils/texto.js";


import Perifericos from "../models/Perifericos.js";
import { PerifericosResponseDto } from "../dtos/PerifericosDto.js";
import { PerifericosRepository } from "../repositories/PerifericosRepository.js";


export class PerifericosService {
  constructor(perifericosRepository = new PerifericosRepository()) {
    this.perifericosRepository = perifericosRepository;
  }

  async crear(PerifericosRequestDto) {
    await this.validarCodigo(PerifericosRequestDto.codigo);
    const imagenDatos = this.convertirImagen(PerifericosRequestDto.imagenBase64);

    const perifericosModel = new Perifericos(
      0,
      PerifericosRequestDto.codigo,
      PerifericosRequestDto.nombre,
      PerifericosRequestDto.categoria,
      PerifericosRequestDto.stock,
      PerifericosRequestDto.precio,
      PerifericosRequestDto.peso,
      PerifericosRequestDto.descripcion,
      PerifericosRequestDto.activo,
      PerifericosRequestDto.fechaVencimiento,
      PerifericosRequestDto.horaRegistro,
      PerifericosRequestDto.fechaHoraRegistro,
      imagenDatos.imagen,
      imagenDatos.imagenMimeType,
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
}

export const perifericosService = new PerifericosService();