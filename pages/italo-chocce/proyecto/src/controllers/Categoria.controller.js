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
  async listar(req, res) {
    const categoriasResponseDto = await this.categoriaService.listar();
    res.json({
      total: categoriasResponseDto.length,
      categoriasResponseDto,
    });
  }

  async obtener(req, res) {
    const categoriaResponseDto = await this.categoriaService.obtener(req.params.id);
    res.json({ categoriaResponseDto });
  }
}

export const categoriaController = new CategoriaController(categoriaService);