import { AppError } from "../errors/AppError.js";
import { normalizarTexto } from "../utils/texto.js";


import Producto from "../models/Producto.js";
import { ProductoResponseDto } from "../dtos/ProductoDto.js";
import { ProductoRepository } from "../repositories/ProductoRepository.js";


export class ProductosService {
    
  constructor(productoRepository = new ProductoRepository()) {
    this.productoRepository = productoRepository;
  }

  async crear(productoRequestDto) {
    await this.validarCodigo(productoRequestDto.codigo);
    const imagenDatos = this.convertirImagen(productoRequestDto.imagenBase64);

    const productoModel = new Producto(
      0,
      productoRequestDto.codigo,
      productoRequestDto.nombre,
      productoRequestDto.categoria,
      productoRequestDto.stock,
      productoRequestDto.precio,
      productoRequestDto.peso,
      productoRequestDto.descripcion,
      productoRequestDto.activo,
      productoRequestDto.fechaVencimiento,
      productoRequestDto.horaRegistro,
      productoRequestDto.fechaHoraRegistro,
      imagenDatos.imagen,
      imagenDatos.imagenMimeType,
    );

    const productoCreadoModel =
      await this.productoRepository.crear(productoModel);
    return new ProductoResponseDto(productoCreadoModel);
  }

  async validarCodigo(codigo, idOmitido) {
    const productosModel = await this.productoRepository.listar();
    const productoRepetidoModel = productosModel.find(
      (productoModel) =>
        normalizarTexto(productoModel.codigo) === normalizarTexto(codigo) &&
        Number(productoModel.id) !== Number(idOmitido),
    );

    if (productoRepetidoModel) {
      throw new AppError("El código de producto ya existe", 409);
    }
  }

  convertirImagen(imagenBase64) {
    if (imagenBase64 === null || imagenBase64 === "") {
      return { imagen: null, imagenMimeType: null };
    }

    if (imagenBase64 === undefined) {
      return { imagen: null, imagenMimeType: null };
    }

    const coincidencia = String(imagenBase64).match(
      /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/,
    );
    if (!coincidencia) {
      throw new AppError("La imagen Base64 no es válida", 400);
    }

    return {
      imagen: Buffer.from(coincidencia[2], "base64"),
      imagenMimeType: coincidencia[1],
    };
  }
}

export const productosService = new ProductosService();
