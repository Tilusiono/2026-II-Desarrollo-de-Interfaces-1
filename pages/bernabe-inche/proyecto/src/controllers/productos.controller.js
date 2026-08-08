import { productosService } from "../services/productos.service.js";

export class ProductosController {
  constructor(productosServiceActual = productosService) {
    this.productosService = productosServiceActual;
  }
  // POST 
  async crear(productoRequestDto, response) {
    const productoResponseDto =
      await this.productosService.crear(productoRequestDto);
    response.status(201).json({
      mensaje: "Producto creado",
      productoResponseDto,
    });
  }
  // GET ALL
  async listar(response) {
    const productosResponseDto = await this.productosService.listar();
    response.json({
      total: productosResponseDto.length,
      productosResponseDto,
    });
  }

  // GET BY ID
  async obtener(id, response) {
    const productoResponseDto = await this.productosService.obtener(id);
    response.json({ productoResponseDto });
  }

}

export const productosController = new ProductosController(productosService);
