import { productosService } from "../services/productos.service.js";

export class ProductoController {
  constructor(productosServiceActual = productosService) {
    this.productosService = productosServiceActual;
  }
//post
  async crear(productoRequestDto, response) {
    const productoResponseDto =
      await this.productosService.crear(productoRequestDto);
    response.status(201).json({
      mensaje: "Producto creado",
      productoResponseDto,
    });
  }
//get all (+ de 1)
  async listar(response) {
    const productosResponseDto = await this.productosService.listar();
    response.json({
      total: productosResponseDto.length,
      productosResponseDto,
    });
  }
// get by id (uno)
  async obtener(id, response) {
    const productoResponseDto = await this.productosService.obtener(id);
    response.json({ productoResponseDto });
  }

//PUT
  async reemplazar(id, productoRequestDto, response) {
    const productoResponseDto = await this.productosService.reemplazar(
      id,
      productoRequestDto,
    );
    response.json({
      mensaje: "Producto reemplazado",
      productoResponseDto,
    });
  }

}

export const productosController = new ProductoController(productosService);
