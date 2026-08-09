import { AppError } from "../errors/AppError.js";
import { normalizarTexto } from "../utils/texto.js";


import Servicio from "../models/Servicio.js";
import {ServicioRequestDto,ServicioResponseDto,} from "../dtos/servicioDto.js";
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

    async listar() {
      const servicios = await this.servicioRepository.listar();
      return servicios.map(
        (x) => new ServicioResponseDto(x),
      );
    }

    async obtener(id) {
      const servicio = await this.servicioRepository.buscarPorId(id);
      if (!servicio) throw new AppError("Servicio no encontrado", 404);
      return new ServicioResponseDto(servicio);
    }
  //modificar todo
    async modificarService(id, servicioRequestDto) {
    const servicioExistenteModel =
      await this.servicioRepository.buscarPorId(id);
    if (!servicioExistenteModel)
      throw new AppError("Servicio no encontrado", 404);
    await this.validarCodigo(servicioRequestDto.codigo, id);

    const imagenDatos = this.convertirImagen(servicioRequestDto.imagenBase64);
    const servicioModel = new Servicio(
      id,
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

    const servicioActualizadoModel = await this.servicioRepository.modificarRepositorio(
      id,
      servicioModel,
    );

    return new ServicioResponseDto(servicioActualizadoModel);
  }

  // modificar parcial
  async modificarParcialService(id, servicioRequestDto) {
    const servicioActualModel = await this.servicioRepository.buscarPorId(id);
    if (!servicioActualModel) throw new AppError("Servicio no encontrado", 404);

    const codigo = servicioRequestDto.codigo ?? servicioActualModel.codigo;
    await this.validarCodigo(codigo, id);

    let imagen = servicioActualModel.imagen;
    let imagenMimeType = servicioActualModel.imagenMimeType;
    if (servicioRequestDto.imagenBase64 !== undefined) {
      const imagenDatos = this.convertirImagen(servicioRequestDto.imagenBase64);
      imagen = imagenDatos.imagen;
      imagenMimeType = imagenDatos.imagenMimeType;
    }

    const conservarSiNoSeEnvia = (nuevoValor, valorActual) =>
      nuevoValor === undefined ? valorActual : nuevoValor;

    const servicioModel = new Servicio(
      id,
      codigo,
      servicioRequestDto.nombre ?? servicioActualModel.nombre,
      servicioRequestDto.tipoServicio ?? servicioActualModel.tipoServicio,
      servicioRequestDto.precio ?? servicioActualModel.precio,
      conservarSiNoSeEnvia(servicioRequestDto.duracionMinutos, servicioActualModel.duracionMinutos),
      conservarSiNoSeEnvia(servicioRequestDto.fechaInicio,servicioActualModel.fechaInicio),
      conservarSiNoSeEnvia(servicioRequestDto.descripcion,servicioActualModel.descripcion),
      servicioRequestDto.activo ?? servicioActualModel.activo,
      conservarSiNoSeEnvia(servicioRequestDto.horaRegistro,servicioActualModel.horaRegistro),
      conservarSiNoSeEnvia(servicioRequestDto.fechaHoraRegistro,servicioActualModel.fechaHoraRegistro),
      imagen,
      imagenMimeType,
    );

    const servicioActualizadoModel = await this.servicioRepository.modificarRepositorio(
      id,
      servicioModel,
    );
    return new ServicioResponseDto(servicioActualizadoModel);
  }

  async buscar(servicioConsultaDto) {
    const serviciosModel =
      await this.servicioRepository.query(servicioConsultaDto);
    return serviciosModel.map(
      (servicioModel) => new ServicioResponseDto(servicioModel),
    );
  }

  async eliminar(id) {
    const servicioEliminadoModel = await this.servicioRepository.eliminar(id);
    if (!servicioEliminadoModel)
        throw new AppError("Servicio no encontrado", 404);
    return new ServicioResponseDto(servicioEliminadoModel);
  }

}

export const serviciosService = new ServiciosService();
