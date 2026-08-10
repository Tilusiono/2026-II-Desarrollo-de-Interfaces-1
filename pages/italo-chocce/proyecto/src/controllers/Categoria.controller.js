import { categoriaService } from "../services/Categoria.service.js";

export class CategoriaController {
  constructor(categoriaServiceActual = categoriaService) {
    this.categoriaService = categoriaServiceActual;
  }

  async crear(categoriaRequestDto, response) {
    const categoriaResponseDto =
      await this.categoriaService.crear(categoriaRequestDto);
    response.status(201).json({
      mensaje: "Categoría creada",
      categoriaResponseDto,
    });
  }

  async listar(response) {
    const categoriasResponseDto = await this.categoriaService.listar();
    response.json({
      total: categoriasResponseDto.length,
      categoriasResponseDto,
    });
  }

  async obtener(id, response) {
    const categoriaResponseDto = await this.categoriaService.obtener(id);
    response.json({ categoriaResponseDto });
  }
}

export const categoriaController = new CategoriaController(categoriaService);