import { AppError } from "../errors/AppError.js";
import Servicio from "../models/Servicios.js";


import { ServicioResponseDto } from "../dtos/Servicios.dto.js";
import { ServiciosRepository } from "../repositories/ServiciosRepository.js";
import { normalizarTexto } from "../utils/texto.js";

export class ServiciosService {
  constructor(serviciosRepository = new ServiciosRepository()) {
    this.serviciosRepository = serviciosRepository;
  }

  async crear(servicioRequestDto) {
    await this.validarCodigo(servicioRequestDto.codigo);
    const imagenDatos = this.convertirImagen(servicioRequestDto.imagenBase64);

    const servicioModel = new Servicio(
      0,
      servicioRequestDto.codigo,
      servicioRequestDto.nombre,
      servicioRequestDto.categoriaId,
      servicioRequestDto.capacidadMax,
      servicioRequestDto.precio,
      servicioRequestDto.duracionMinutos,
      servicioRequestDto.descripcion,
      servicioRequestDto.activo,
      servicioRequestDto.fechaVencimiento,
      servicioRequestDto.horaRegistro,
      servicioRequestDto.fechaHoraRegistro,
      imagenDatos.imagen,
      imagenDatos.imagenMimeType
    );

    const servicioCreadoModel = await this.serviciosRepository.crear(servicioModel);
    return new ServicioResponseDto(servicioCreadoModel);
  }

  async validarCodigo(codigo, idOmitido) {
    const serviciosModel = await this.serviciosRepository.listar();
    const servicioRepetidoModel = serviciosModel.find(
      (servicioModel) =>
        normalizarTexto(servicioModel.codigo) === normalizarTexto(codigo) &&
        Number(servicioModel.id) !== Number(idOmitido)
    );

    if (servicioRepetidoModel) {
      throw new AppError("El código de servicio ya existe", 409);
    }
  }

  convertirImagen(imagenBase64) {
    if (imagenBase64 === null || imagenBase64 === "" || imagenBase64 === undefined) {
      return { imagen: null, imagenMimeType: null };
    }

    const coincidencia = String(imagenBase64).match(
      /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/
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