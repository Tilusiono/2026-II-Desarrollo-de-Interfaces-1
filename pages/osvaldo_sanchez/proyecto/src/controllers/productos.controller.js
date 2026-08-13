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
}

export const productosController = new ProductosController(productosService);
