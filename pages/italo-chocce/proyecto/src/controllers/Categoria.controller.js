import { categoriaService } from "../services/Categoria.service.js";

export class CategoriaController {
  constructor(categoriaServiceActual = categoriaService) {
    this.categoriaService = categoriaServiceActual;
  }

 async crear(request, response) {
    const categoriaResponseDto = 
    await this.categoriaService.crear(request.body);
    response.json({ categoriaResponseDto });
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
  async reemplazar(req, res) {
        const categoriaResponseDto = await this.categoriasService.reemplazar(
            req.params.id,
            req.body ?? req
        );
        res.json({
            mensaje: "Categoría reemplazada",
            categoriaResponseDto,
        });
      }
  async actualizar(req, res) {
    const categoriaResponseDto = await this.categoriaService.actualizar(
      req.params.id,
      req.body ?? req,
    );
    res.json({
      mensaje: "Categoría actualizada",
      categoriaResponseDto,
    });
  }
  async eliminar(req, res) {
    const categoriaResponseDto = await this.categoriaService.eliminar(
      req.params.id,
    );
    res.json({
      mensaje: "Categoría eliminada",
      categoriaResponseDto,
    });
  }

}
export const categoriaController = new CategoriaController(categoriaService);