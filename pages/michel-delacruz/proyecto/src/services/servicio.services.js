import { AppError } from "../errors/AppError.js";
import Producto from "../models/Producto.js";
import { ProductoResponseDto } from "../dtos/ProductoDto.js";
import { ProductoRepository } from "../repositories/ProductoRepository.js";
import { normalizarTexto } from "../utils/texto.js";

export class ServiciosService {
  constructor(productoRepository = new ServicioRepository()) {
    this.productoRepository = productoRepository;
  }

  async crear(servicioRequestDto) {
    await this.validarCodigo(servicioRequestDto.codigo);
    const imagenDatos = this.convertirImagen(servicioRequestDto.imagenBase64);

    const servicioModel = new Servicio(
      0,
      servicioRequestDto.codigo,
      servicioRequestDto.nombre,
      servicioRequestDto.categoria,
      servicioRequestDto.precio,
      servicioRequestDto.descripcion,
      servicioRequestDto.activo,
      servicioRequestDto.horaRegistro,
      servicioRequestDto.fechaHoraRegistro,
      imagenDatos.imagen,
      imagenDatos.imagenMimeType,

      
    );

    const servicioCreadoModel =
      await this.servicioRepository.crear(servicioModel);
    return new servicioResponseDto(servicioCreadoModel);
  }

  async validarCodigo(codigo, idOmitido) {
    const serviciosModel = await this.servicioRepository.listar();
    const servicioRepetidoModel = serviciosModel.find(
      (servicioModel) =>
        normalizarTexto(servicioModel.codigo) === normalizarTexto(codigo) &&
        Number(servicioModel.id) !== Number(idOmitido),
    );

    if (servicioRepetidoModel) {
      throw new AppError("El código de servicio ya existe", 409);
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
