import { productosService } from "../services/productos.service.js";

export class ProductosController {
  constructor(productosServiceActual = productosService) {
    this.productosService = productosServiceActual;
  }

  async crear(productoRequestDto, response) {
    const productoResponseDto =
      await this.productosService.crear(productoRequestDto);
    response.status(201).json({
      mensaje: "Producto creado",
      productoResponseDto,
    });
  }
    async listar(response) {
    const productosResponseDto = await this.productosService.listar();
    response.json({
      total: productosResponseDto.length,
      productosResponseDto,
    });
  }

  async obtener(id, response) {
    const productoResponseDto = await this.productosService.obtener(id);
    response.json({ productoResponseDto });
  }

  // delete
    async eliminar(id, response) {
    const productoResponseDto = await this.productosService.eliminar(id);
    response.json({
      mensaje: "Producto eliminado",
      productoResponseDto,
    });
  }


   
}

export const productosController = new ProductosController(productosService);
