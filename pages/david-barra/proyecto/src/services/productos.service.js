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
  
  async listar() {
    const productosModel = await this.productoRepository.listar();
    return productosModel.map(
      (productoModel) => new ProductoResponseDto(productoModel),
    );
  }

  async obtener(id) {
    const productoModel = await this.productoRepository.buscarPorId(id);
    if (!productoModel) throw new AppError("Producto no encontrado", 404);
    return new ProductoResponseDto(productoModel);
  }
//modificar todo
  async reemplazar(id, productoRequestDto) {
    const productoExistenteModel =
      await this.productoRepository.buscarPorId(id);
    if (!productoExistenteModel)
      throw new AppError("Producto no encontrado", 404);
    await this.validarCodigo(productoRequestDto.codigo, id);

    const imagenDatos = this.convertirImagen(productoRequestDto.imagenBase64);
    const productoModel = new Producto(
      id,
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

    const productoActualizadoModel = await this.productoRepository.reemplazar(
      id,
      productoModel,
    );
    return new ProductoResponseDto(productoActualizadoModel);
  }

//modificar parcialmente(solo los campos que se envien)
  async actualizar(id, productoRequestDto) {
    const productoActualModel = await this.productoRepository.buscarPorId(id);
    if (!productoActualModel) throw new AppError("Producto no encontrado", 404);

    const codigo = productoRequestDto.codigo ?? productoActualModel.codigo;
    await this.validarCodigo(codigo, id);

    let imagen = productoActualModel.imagen;
    let imagenMimeType = productoActualModel.imagenMimeType;
    if (productoRequestDto.imagenBase64 !== undefined) {
      const imagenDatos = this.convertirImagen(productoRequestDto.imagenBase64);
      imagen = imagenDatos.imagen;
      imagenMimeType = imagenDatos.imagenMimeType;
    }

    const conservarSiNoSeEnvia = (nuevoValor, valorActual) =>
      nuevoValor === undefined ? valorActual : nuevoValor;

    const productoModel = new Producto(
      id,
      codigo,
      productoRequestDto.nombre ?? productoActualModel.nombre,
      productoRequestDto.categoria ?? productoActualModel.categoria,
      productoRequestDto.stock ?? productoActualModel.stock,
      productoRequestDto.precio ?? productoActualModel.precio,
      conservarSiNoSeEnvia(productoRequestDto.peso, productoActualModel.peso),
      conservarSiNoSeEnvia(
        productoRequestDto.descripcion,
        productoActualModel.descripcion,
      ),
      productoRequestDto.activo ?? productoActualModel.activo,
      conservarSiNoSeEnvia(
        productoRequestDto.fechaVencimiento,
        productoActualModel.fechaVencimiento,
      ),
      productoRequestDto.horaRegistro ?? productoActualModel.horaRegistro,
      productoRequestDto.fechaHoraRegistro ??
        productoActualModel.fechaHoraRegistro,
      imagen,
      imagenMimeType,
    );

    const productoActualizadoModel = await this.productoRepository.reemplazar(
      id,
      productoModel,
    );
    return new ProductoResponseDto(productoActualizadoModel);
  }
//Buscar
  async buscar(productoConsultaDto) {
    const productosModel =
      await this.productoRepository.query(productoConsultaDto);
    return productosModel.map(
      (productoModel) => new ProductoResponseDto(productoModel),
    );
  }
  
//DELETE
  async eliminar(id) {
    const productoEliminadoModel = await this.productoRepository.eliminar(id);
    if (!productoEliminadoModel)
      throw new AppError("Producto no encontrado", 404);
    return new ProductoResponseDto(productoEliminadoModel);
  }


}

export const productosService = new ProductosService();
