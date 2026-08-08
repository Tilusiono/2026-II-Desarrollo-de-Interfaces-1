import { AppError } from "../errors/AppError.js";
import { normalizarTexto } from "../utils/texto.js";

import Categoria from "../models/Categoria.js";
import { CategoriaRequestDto,CategoriaResponseDto } from "../dtos/CategoriaDto.js";
import { CategoriaRepository } from "../repositories/CategoriaRepository.js";


export class CategoriasService {
  constructor(categoriaRepository = new CategoriaRepository()) {
    this.categoriaRepository = categoriaRepository;
  }
  /**@param {CategoriaRequestDto} categoriaRequestDto */
  async crear(categoriaRequestDto) {
    await this.validarCodigo(categoriaRequestDto.codigo);
    const imagenDatos = this.convertirImagen(categoriaRequestDto.imagenBase64);

    const categoriaModel = new Categoria(
      0,
      categoriaRequestDto.codigo,
      categoriaRequestDto.nombre,
      categoriaRequestDto.tipo,
      categoriaRequestDto.cantidadProductos,
      categoriaRequestDto.presupuesto,
      categoriaRequestDto.pesoPromedio,
      categoriaRequestDto.descripcion,
      categoriaRequestDto.activo,
      categoriaRequestDto.fechaLimite,
      categoriaRequestDto.horaRegistro,
      categoriaRequestDto.fechaHoraRegistro,
      imagenDatos.imagen,
      imagenDatos.imagenMimeType,
    );

    const categoriaCreadoModel =
      await this.categoriaRepository.crear(categoriaModel);
    return new CategoriaResponseDto(categoriaCreadoModel);
  }

  async validarCodigo(codigo, idOmitido) {
    const categoriasModel = await this.categoriaRepository.listar();
    const categoriaRepetidoModel = categoriasModel.find(
      (categoriaModel) =>
        normalizarTexto(categoriaModel.codigo) === normalizarTexto(codigo) &&
        Number(categoriaModel.id) !== Number(idOmitido),
    );

    if (categoriaRepetidoModel) {
      throw new AppError("El código de categoría ya existe", 409);
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

export const categoriasService = new CategoriasService();
