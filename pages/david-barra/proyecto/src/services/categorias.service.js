import { AppError } from "../errors/AppError.js";
import { normalizarTexto } from "../utils/texto.js";

import Categoria from "../models/Categoria.js";
import { CategoriaRequestDto,CategoriaResponseDto } from "../dtos/CategoriaDto.js";
import { CategoriaRepository } from "../repositories/CategoriaRepository.js";


export class CategoriasService {
  constructor(categoriaRepository = new CategoriaRepository()) {
    this.categoriaRepository = categoriaRepository;
  }
  /**@param {CategoriaRequestDto} categoriaRequestDto */
  async crear(categoriaRequestDto) {
    await this.validarCodigo(categoriaRequestDto.codigo);
    const imagenDatos = this.convertirImagen(categoriaRequestDto.imagenBase64);

    const categoriaModel = new Categoria(
      0,
      categoriaRequestDto.codigo,
      categoriaRequestDto.nombre,
      categoriaRequestDto.tipo,
      categoriaRequestDto.cantidadProductos,
      categoriaRequestDto.presupuesto,
      categoriaRequestDto.pesoPromedio,
      categoriaRequestDto.descripcion,
      categoriaRequestDto.activo,
      categoriaRequestDto.fechaLimite,
      categoriaRequestDto.horaRegistro,
      categoriaRequestDto.fechaHoraRegistro,
      imagenDatos.imagen,
      imagenDatos.imagenMimeType,
    );

    const categoriaCreadoModel =
      await this.categoriaRepository.crear(categoriaModel);
    return new CategoriaResponseDto(categoriaCreadoModel);
  }

  async validarCodigo(codigo, idOmitido) {
    const categoriasModel = await this.categoriaRepository.listar();
    const categoriaRepetidoModel = categoriasModel.find(
      (categoriaModel) =>
        normalizarTexto(categoriaModel.codigo) === normalizarTexto(codigo) &&
        Number(categoriaModel.id) !== Number(idOmitido),
    );

    if (categoriaRepetidoModel) {
      throw new AppError("El código de categoría ya existe", 409);
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
    const categorias = await this.categoriaRepository.listar();
    return categorias.map(
      (xd) => new CategoriaResponseDto(xd),
    );
  }
//para uno 
  async obtener(id) {
    const categoria = await this.categoriaRepository.buscarPorId(id);
    if (!categoria) throw new AppError("Categoría no encontrada", 404);
    return new CategoriaResponseDto(categoria);
  }
//modificar todo
  async modificarCategoria(id, categoriaRequestDto) {
    const categoriaExistenteModel =
      await this.categoriaRepository.buscarPorId(id);
    if (!categoriaExistenteModel)
      throw new AppError("Categoría no encontrada", 404);
    await this.validarCodigo(categoriaRequestDto.codigo, id);

    const imagenDatos = this.convertirImagen(categoriaRequestDto.imagenBase64);
    const categoriaModel = new Categoria(
      id,
      categoriaRequestDto.codigo,
      categoriaRequestDto.nombre,
      categoriaRequestDto.tipo,
      categoriaRequestDto.cantidadProductos,
      categoriaRequestDto.presupuesto,
      categoriaRequestDto.pesoPromedio,
      categoriaRequestDto.descripcion,
      categoriaRequestDto.activo,
      categoriaRequestDto.fechaLimite,
      categoriaRequestDto.horaRegistro,
      categoriaRequestDto.fechaHoraRegistro,
      imagenDatos.imagen,
      imagenDatos.imagenMimeType,
    );

    const categoriaActualizadaModel = await this.categoriaRepository.modificarRespositorio(
      id,
      categoriaModel,
    );
    return new CategoriaResponseDto(categoriaActualizadaModel);
  }

//modificar parcialmente(solo los campos que se envien)
  async modificarParcialCategoria(id, categoriaRequestDto) {
    const categoriaActualModel = await this.categoriaRepository.buscarPorId(id);
    if (!categoriaActualModel) throw new AppError("Categoría no encontrada", 404);

    const codigo = categoriaRequestDto.codigo ?? categoriaActualModel.codigo;
    await this.validarCodigo(codigo, id);

    let imagen = categoriaActualModel.imagen;
    let imagenMimeType = categoriaActualModel.imagenMimeType;
    if (categoriaRequestDto.imagenBase64 !== undefined) {
      const imagenDatos = this.convertirImagen(categoriaRequestDto.imagenBase64);
      imagen = imagenDatos.imagen;
      imagenMimeType = imagenDatos.imagenMimeType;
    }

    const conservarSiNoSeEnvia = (nuevoValor, valorActual) =>
      nuevoValor === undefined ? valorActual : nuevoValor;

    const categoriaModel = new Categoria(
      id,
      codigo,
      categoriaRequestDto.nombre ?? categoriaActualModel.nombre,
      categoriaRequestDto.tipo ?? categoriaActualModel.tipo,
      categoriaRequestDto.cantidadProductos ?? categoriaActualModel.cantidadProductos,
      categoriaRequestDto.presupuesto ?? categoriaActualModel.presupuesto,
      categoriaRequestDto.pesoPromedio ?? categoriaActualModel.pesoPromedio,
      conservarSiNoSeEnvia(categoriaRequestDto.descripcion,categoriaActualModel.descripcion,),
      categoriaRequestDto.activo ?? categoriaActualModel.activo,
      conservarSiNoSeEnvia(categoriaRequestDto.fechaVencimiento,categoriaActualModel.fechaVencimiento,),
      categoriaRequestDto.horaRegistro ?? categoriaActualModel.horaRegistro,
      categoriaRequestDto.fechaHoraRegistro ?? categoriaActualModel.fechaHoraRegistro,
      imagen,
      imagenMimeType,
    );

    const categoriaActualizadaModel = await this.categoriaRepository.modificarRespositorio(
      id,
      categoriaModel,
    );
    return new CategoriaResponseDto(categoriaActualizadaModel);
  }

//Buscar
  async buscar(productoConsultaDto) {
    const productosModel =
      await this.productoRepository.query(productoConsultaDto);
    return productosModel.map(
      (productoModel) => new ProductoResponseDto(productoModel),
    );
  }


}

export const categoriasService = new CategoriasService();
