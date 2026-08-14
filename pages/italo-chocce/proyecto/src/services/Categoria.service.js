import { AppError } from "../errors/AppError.js";
import Categoria from "../models/Categoria.js";
import { CategoriaResponseDto } from "../dtos/Categoria.dto.js";
import { CategoriaRepository } from "../repositories/CategoriaRepository.js";
import { normalizarTexto } from "../utils/texto.js";

export class CategoriaService {
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

  async listar() {
    const categoriasModel = await this.categoriaRepository.listar();
    return categoriasModel.map(
      (categoriaModel) => new CategoriaResponseDto(categoriaModel)
    );
  }

  async obtener(id) {
    const categoriaModel = await this.categoriaRepository.buscarPorId(id);
    if (!categoriaModel) throw new AppError("Categoría no encontrada", 404);
    return new CategoriaResponseDto(categoriaModel);
  }
  async actualizar(id, categoriaRequestDto) {
    const categoriaActualModel = await this.categoriaRepository.buscarPorId(id);
    if (!categoriaActualModel) throw new AppError("Categoría no encontrada", 404);

    const conservarSiNoSeEnvia = (nuevoValor, valorActual) =>
      nuevoValor === undefined ? valorActual : nuevoValor;

    const categoriaModel = new Categoria(
      id,
      categoriaRequestDto.nombre ?? categoriaActualModel.nombre,
      conservarSiNoSeEnvia(categoriaRequestDto.descripcion, categoriaActualModel.descripcion),
      categoriaRequestDto.activo ?? categoriaActualModel.activo,
      categoriaRequestDto.horaRegistro ?? categoriaActualModel.horaRegistro,
      categoriaRequestDto.fechaHoraRegistro ?? categoriaActualModel.fechaHoraRegistro
    );

    const categoriaActualizadaModel = await this.categoriaRepository.reemplazar(
      id,
      categoriaModel
    );
    return new CategoriaResponseDto(categoriaActualizadaModel);
  }  
    async eliminar(id) {
    const categoriaEliminadaModel = await this.categoriaRepository.eliminar(id);
    if (!categoriaEliminadaModel)
      throw new AppError("Categoría no encontrada", 404);
    return new CategoriaResponseDto(categoriaEliminadaModel);
  }


}

export const categoriaService = new CategoriaService();