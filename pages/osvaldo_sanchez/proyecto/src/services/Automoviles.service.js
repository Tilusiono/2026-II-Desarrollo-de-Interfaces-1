// ...existing code...
import { AppError } from "../errors/AppError.js";
import { normalizarTexto } from "../utils/texto.js";

import Automoviles from "../models/Automoviles.js";
import {
  AutomovilesResponseDto,
  AutomovilesRequestDto,
} from "../dtos/AutomovilesDto.js";
import { AutomovilesRepository } from "../repositories/AutomovilesRepository.js";

export class AutomovilesService {
  constructor(automovilesRepository = new AutomovilesRepository()) {
    this.automovilesRepository = automovilesRepository;
  }

  async crear(automovilesRequestDto) {
    await this.validarCodigo(automovilesRequestDto.codigo);

    const imagenDatos = this.convertirImagen(automovilesRequestDto.imagenBase64);

    const automovilesModel = new Automoviles(
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

    const automovilesCreadoModel =
      await this.automovilesRepository.crear(automovilesModel);

    return new AutomovilesResponseDto(automovilesCreadoModel);
  }

  async validarCodigo(codigo, idOmitido) {
    const automovilesModelList = await this.automovilesRepository.listar();

    const automovilesRepetidoModel = automovilesModelList.find(
      (automovilesModel) =>
        normalizarTexto(automovilesModel.codigo) === normalizarTexto(codigo) &&
        Number(automovilesModel.id) !== Number(idOmitido),
    );

    if (automovilesRepetidoModel) {
      throw new AppError("El código de Automoviles ya existe", 409);
    }
  }

  convertirImagen(imagenBase64) {
    if (imagenBase64 === null || imagenBase64 === "" || imagenBase64 === undefined) {
      return { imagen: null, imagenMimeType: null };
    }

    const coincidencia = String(imagenBase64).match(
      /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/
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

// no quiere agg data de tienda.sqlite