import { AppError } from "../errors/AppError.js";
import { normalizarTexto } from "../utils/texto.js";

import Automoviles from "../models/Automoviles.js";
import { automovilesResponseDto } from "../dtos/AutomovilesDto.js";
import { AutomovilesRepository } from "../repositories/AutomovilesRepository.js";

export class automovilesService  {
  constructor(AutomovilesRepository = new automovilesRepository()) {
    this.AutomovilesRepository = AutomovilesRepository;
  }

  async crear(automovilesRequestDto) {
    await this.validarCodigo(automovilesRequestDto.codigo);
    const imagenDatos = this.convertirImagen(automovilesRequestDto.imagenBase64);

    const AutomovilesModel = new automoviles(
      0,
      automovilesRequestDto.codigo,
      automovilesRequestDto.marca,
      automovilesRequestDto.modelo,
      automovilesRequestDto.anio,
      automovilesRequestDto.color,
      automovilesRequestDto.categoria,
      automovilesRequestDto.precio,
      automovilesRequestDto.kilometraje,
      automovilesRequestDto.descripcion,
      automovilesRequestDto.activo,
      automovilesRequestDto.horaRegistro,
      automovilesRequestDto.fechaHoraRegistro,
      automovilesRequestDto.imagen,
      automovilesRequestDto.imagenMimeType,
      imagenDatos.imagen,
      imagenDatos.imagenMimeType,
    );

    const AutomovilesCreadoModel =
      await this.AutomovilesRepository.crear(AutomovilesModel);
    return new AutomovilesResponseDto(AutomovilesCreadoModel);
  }

  async validarCodigo(codigo, idOmitido) {
    const AutomovilessModel = await this.AutomovilesRepository.listar();
    const AutomovilesRepetidoModel = AutomovilessModel.find(
      (AutomovilesModel) =>
        normalizarTexto(AutomovilesModel.codigo) === normalizarTexto(codigo) &&
        Number(AutomovilesModel.id) !== Number(idOmitido),
    );

    if (AutomovilesRepetidoModel) {
      throw new AppError("El código de Automoviles ya existe", 409);
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

export const automovilesService = new AutomovilesService();
