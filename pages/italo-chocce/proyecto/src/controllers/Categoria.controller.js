import { categoriaService } from "../services/Categoria.service.js";

export class CategoriaController {
  constructor(categoriasServiceActual = categoriasService) {
    this.categoriasService = categoriasServiceActual;
  }

  async crear(categoriaRequestDto, response) {
    const categoriaResponseDto =
      await this.categoriasService.crear(categoriaRequestDto);
    response.status(201).json({
      mensaje: "Categoría creada",
      categoriaResponseDto,
    });
  }
}

export const categoriaController = new CategoriaController(categoriaService);