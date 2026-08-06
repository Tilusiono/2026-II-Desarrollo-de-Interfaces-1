import { AppError } from "../errors/AppError.js";
import { normalizarTexto } from "../utils/texto.js";


import Servicio from "../models/Servicio.js";
import {ServicioRequestDto,ServicioResponseDto,} from "../dtos/servicio.dto.js";
import { ServicioRepository } from "../repositories/ServicioRepository.js";


export class ServiciosService {
    
  constructor(servicioRepository = new ServicioRepository()) {
    this.servicioRepository = servicioRepository;
  }

  /** @param {ServicioRequestDto} servicioRequestDto */
  async crear(servicioRequestDto ) {
    await this.validarCodigo(servicioRequestDto.codigo);
    const imagenDatos = this.convertirImagen(servicioRequestDto.imagenBase64);

    const servicioModel = new Servicio(
      0,
      servicioRequestDto.codigo,
      servicioRequestDto.nombre,
      servicioRequestDto.tipoServicio,
      servicioRequestDto.precio,
      servicioRequestDto.duracionMinutos,
      servicioRequestDto.fechaInicio,
      servicioRequestDto.descripcion,
      servicioRequestDto.activo,
      servicioRequestDto.horaRegistro,
      servicioRequestDto.fechaHoraRegistro,
      imagenDatos.imagen,
      imagenDatos.imagenMimeType,
    );

    const servicioCreadoModel =
      await this.servicioRepository.crear(servicioModel);
    return new ServicioResponseDto(servicioCreadoModel);
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

export const serviciosService = new ServiciosService();
