import { productosService } from "../services/productos.service.js";

export class ProductoController {
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

export const productosController = new ProductoController(productosService);
