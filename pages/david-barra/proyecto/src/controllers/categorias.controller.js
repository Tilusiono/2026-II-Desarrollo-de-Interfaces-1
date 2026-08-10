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

//get all (+ de 1)
  async listar(response) {
    const categorias = await this.categoriasService.listar();
    response.json({
      total: categorias.length,
      categorias,
    });
  }
// get by id (uno)
  async obtener(id, response) {
    const categoria = await this.categoriasService.obtener(id);
    response.json({ categoria });
  }

//PUT
  async modificarControlador(id, categoriaRequestDto, response) {
    const categoriaResponseDto = await this.categoriasService.modificarCategoria(
      id,
      categoriaRequestDto,
    );
    response.json({
      mensaje: "Categoría modificada",
      categoriaResponseDto,
    });
  }


}

export const categoriasController = new CategoriasController(categoriasService);