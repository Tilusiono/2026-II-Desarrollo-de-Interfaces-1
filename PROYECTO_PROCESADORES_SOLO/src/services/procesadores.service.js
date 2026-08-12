import { AppError } from "../errors/AppError.js";
import Procesador from "../models/Procesador.js";
import { ProcesadorResponseDto } from "../dtos/ProcesadorDto.js";
import { ProcesadorRepository } from "../repositories/ProcesadorRepository.js";
import { normalizarTexto } from "../utils/texto.js";
import { calcularEstadisticasEnWorker } from "../utils/estadisticasWorker.js";

export class ProcesadoresService {
  constructor(procesadorRepository = new ProcesadorRepository()) {
    this.procesadorRepository = procesadorRepository;
  }

  async listar() {
    const procesadoresModel = await this.procesadorRepository.listar();
    return procesadoresModel.map(
      (procesadorModel) => new ProcesadorResponseDto(procesadorModel),
    );
  }

  listarConCallback(callback) {
    this.listar().then((datos) => callback(null, datos)).catch(callback);
  }

  listarConPromesa() {
    return new Promise((resolve, reject) => {
      this.listarConCallback((error, datos) => {
        if (error) return reject(error);
        return resolve(datos);
      });
    });
  }

  async obtener(id) {
    const procesadorModel = await this.procesadorRepository.buscarPorId(id);
    if (!procesadorModel) throw new AppError("Procesador no encontrado", 404);
    return new ProcesadorResponseDto(procesadorModel);
  }

  async buscar(procesadorConsultaDto) {
    const procesadoresModel = await this.procesadorRepository.query(
      procesadorConsultaDto,
    );
    return procesadoresModel.map(
      (procesadorModel) => new ProcesadorResponseDto(procesadorModel),
    );
  }

  async crear(procesadorRequestDto) {
    await this.validarCodigo(procesadorRequestDto.codigo);
    const imagenDatos = this.convertirImagen(procesadorRequestDto.imagenBase64);
    const procesadorModel = this.construirProcesador(
      0,
      procesadorRequestDto,
      imagenDatos,
    );
    const procesadorCreadoModel =
      await this.procesadorRepository.crear(procesadorModel);
    return new ProcesadorResponseDto(procesadorCreadoModel);
  }

  async reemplazar(id, procesadorRequestDto) {
    const existente = await this.procesadorRepository.buscarPorId(id);
    if (!existente) throw new AppError("Procesador no encontrado", 404);

    await this.validarCodigo(procesadorRequestDto.codigo, id);
    const imagenDatos = this.convertirImagen(procesadorRequestDto.imagenBase64);
    const procesadorModel = this.construirProcesador(
      id,
      procesadorRequestDto,
      imagenDatos,
    );
    const actualizado = await this.procesadorRepository.reemplazar(
      id,
      procesadorModel,
    );
    return new ProcesadorResponseDto(actualizado);
  }

  async actualizar(id, procesadorRequestDto) {
    const actual = await this.procesadorRepository.buscarPorId(id);
    if (!actual) throw new AppError("Procesador no encontrado", 404);

    const codigo = procesadorRequestDto.codigo ?? actual.codigo;
    await this.validarCodigo(codigo, id);

    let imagen = actual.imagen;
    let imagenMimeType = actual.imagenMimeType;
    if (procesadorRequestDto.imagenBase64 !== undefined) {
      const imagenDatos = this.convertirImagen(
        procesadorRequestDto.imagenBase64,
      );
      imagen = imagenDatos.imagen;
      imagenMimeType = imagenDatos.imagenMimeType;
    }

    const conservar = (nuevo, anterior) =>
      nuevo === undefined ? anterior : nuevo;

    const procesadorModel = new Procesador(
      id,
      codigo,
      procesadorRequestDto.modelo ?? actual.modelo,
      procesadorRequestDto.arquitectura ?? actual.arquitectura,
      procesadorRequestDto.nucleos ?? actual.nucleos,
      procesadorRequestDto.precio ?? actual.precio,
      conservar(procesadorRequestDto.frecuenciaGhz, actual.frecuenciaGhz),
      conservar(procesadorRequestDto.descripcion, actual.descripcion),
      procesadorRequestDto.registro ?? actual.registro,
      conservar(procesadorRequestDto.fechaLanzamiento, actual.fechaLanzamiento),
      procesadorRequestDto.horaRegistro ?? actual.horaRegistro,
      procesadorRequestDto.fechaHoraRegistro ?? actual.fechaHoraRegistro,
      imagen,
      imagenMimeType,
    );

    const actualizado = await this.procesadorRepository.reemplazar(
      id,
      procesadorModel,
    );
    return new ProcesadorResponseDto(actualizado);
  }

  async eliminar(id) {
    const eliminado = await this.procesadorRepository.eliminar(id);
    if (!eliminado) throw new AppError("Procesador no encontrado", 404);
    return new ProcesadorResponseDto(eliminado);
  }

  async historial(id) {
    await this.obtener(id);
    return this.procesadorRepository.obtenerHistorial(id);
  }

  async estadisticas() {
    const datos = await this.listar();
    return calcularEstadisticasEnWorker(datos);
  }

  construirProcesador(id, dto, imagenDatos) {
    return new Procesador(
      id,
      dto.codigo,
      dto.modelo,
      dto.arquitectura,
      dto.nucleos,
      dto.precio,
      dto.frecuenciaGhz,
      dto.descripcion,
      dto.registro,
      dto.fechaLanzamiento,
      dto.horaRegistro,
      dto.fechaHoraRegistro,
      imagenDatos.imagen,
      imagenDatos.imagenMimeType,
    );
  }

  async validarCodigo(codigo, idOmitido) {
    const existente = await this.procesadorRepository.buscarPorCodigo(codigo);
    if (
      existente &&
      normalizarTexto(existente.codigo) === normalizarTexto(codigo) &&
      Number(existente.id) !== Number(idOmitido)
    ) {
      throw new AppError("El código de procesador ya existe", 409);
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

export const procesadoresService = new ProcesadoresService();
