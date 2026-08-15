import { AppError } from "../errors/AppError.js"; 
import Cafenegro from "../models/Cafenegro.js"; 
import { CafenegroResponseDto } from "../dtos/CafenegroDto.js"; 
import { CafenegrosRepository } from "../repositories/CafenegroRepository.js"; 
import { normalizarTexto } from "../utils/texto.js"; 
 
export class CafenegroService { 
  constructor(cafenegroRepository = new CafenegrosRepository()) { 
    this.cafenegroRepository = cafenegroRepository; 
  } 
 
  async crear(CafenegroRequestDto) { 
    await this.validarCodigo(CafenegroRequestDto.codigo); 
 
    const imagenDatos = this.convertirImagen( 
      CafenegroRequestDto.imagenBase64 
    ); 
 
    const CafenegroModel = new Cafenegro( 
      0, 
      CafenegroRequestDto.codigo, 
      CafenegroRequestDto.nombre, 
      CafenegroRequestDto.categoria, 
      CafenegroRequestDto.precio, 
      CafenegroRequestDto.descripcion, 
      CafenegroRequestDto.activo, 
      CafenegroRequestDto.horaRegistro, 
      CafenegroRequestDto.fechaHoraRegistro, 
      imagenDatos.imagen, 
      imagenDatos.imagenMimeType, 
    ); 
 
    const CafenegroCreadoModel = 
      await this.cafenegroRepository.crear(CafenegroModel); 
 
    return new CafenegroResponseDto(CafenegroCreadoModel); 
  } 
 
  async validarCodigo(codigo, idOmitido) { 
    const cafenegroModel = await this.cafenegroRepository.listar(); 
 
    const CafenegroRepetidoModel = cafenegroModel.find( 
      (CafenegroModel) => 
        normalizarTexto(CafenegroModel.codigo) === normalizarTexto(codigo) && 
        Number(CafenegroModel.id) !== Number(idOmitido), 
    ); 
 
    if (CafenegroRepetidoModel) { 
      throw new AppError( 
        "El cÃ³digo de Cafenegro ya existe", 
        409 
      ); 
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
      throw new AppError( 
        "La imagen Base64 no es vÃ¡lida", 
        400 
      ); 
    } 
 
    return { 
      imagen: Buffer.from(coincidencia[2], "base64"), 
      imagenMimeType: coincidencia[1], 
    }; 
  }
  async listar() {
  const cafenegrosModel = await this.cafenegroRepository.listar();

  return cafenegrosModel.map(
    (cafenegroModel) => new CafenegroResponseDto(cafenegroModel),
  );
}

async obtener(id) {
  const cafenegroModel =
    await this.cafenegroRepository.buscarPorId(id);

  if (!cafenegroModel) {
    throw new AppError("Cafenegro no encontrado", 404);
  }

  return new CafenegroResponseDto(cafenegroModel);
}   async eliminar(id) {
    const cafenegroEliminadoModel = await this.cafenegroRepository.eliminar(id);
    if (!cafenegroEliminadoModel)
      throw new AppError("Cafenegro no encontrado", 404);
    return new CafenegroResponseDto(cafenegroEliminadoModel);
  }

} 
 
export const cafenegroService = new CafenegroService()