import {categoriasService } from "../services/categorias.service.js";

export class CategoriasController {
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

export const categoriasController = new CategoriasController(categoriasService);