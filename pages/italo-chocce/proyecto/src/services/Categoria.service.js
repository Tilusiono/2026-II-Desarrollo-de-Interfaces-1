import { AppError } from "../errors/AppError.js";
import Categoria from "../models/Categoria.js";


import { CategoriaResponseDto } from "../dtos/Categorias.dto.js";
import { CategoriaRepository } from "../repositories/CategoriaRepository.js";
import { normalizarTexto } from "../utils/texto.js";

export class CategoriasService {
  constructor(categoriaRepository = new CategoriaRepository()) {
    this.categoriaRepository = categoriaRepository;
  }

  async crear(categoriaRequestDto) {
    await this.validarId(categoriaRequestDto.id);

    const categoriaModel = new Categoria(
      categoriaRequestDto.id,
      categoriaRequestDto.nombre,
      categoriaRequestDto.descripcion,
      categoriaRequestDto.activo,
      categoriaRequestDto.horaRegistro,
      categoriaRequestDto.fechaHoraRegistro
    );

    const categoriaCreadaModel = await this.categoriaRepository.crear(categoriaModel);
    return new CategoriaResponseDto(categoriaCreadaModel);
  }

  async validarId(id, idOmitido) {
    const categoriasModel = await this.categoriaRepository.listar();
    const categoriaRepetidaModel = categoriasModel.find(
      (catModel) =>
        normalizarTexto(catModel.id) === normalizarTexto(id) &&
        normalizarTexto(catModel.id) !== normalizarTexto(idOmitido)
    );

    if (categoriaRepetidaModel) {
      throw new AppError("El código ID de categoría ya existe", 409);
    }
  }
}

export const categoriasService = new CategoriasService();