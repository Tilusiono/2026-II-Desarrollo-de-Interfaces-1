import { AppError } from "../errors/AppError.js";
import TarjetaGrafica from "../models/TarjetaGrafica.js";
import { TarjetaGraficaResponseDto } from "../dtos/TarjetaGraficaDto.js";
import { TarjetaGraficaRepository } from "../repositories/TarjetaGraficaRepository.js";
import { normalizarTexto } from "../utils/texto.js";

export class TarjetasGraficasService {
  constructor(tarjetaGraficaRepository = new TarjetaGraficaRepository()) {
    this.tarjetaGraficaRepository = tarjetaGraficaRepository;
  }

  async listar() {
    const tarjetasGraficasModel = await this.tarjetaGraficaRepository.listar();
    return tarjetasGraficasModel.map(
      (tarjetaGraficaModel) => new TarjetaGraficaResponseDto(tarjetaGraficaModel),
    );
  }

  async obtener(id) {
    const tarjetaGraficaModel = await this.tarjetaGraficaRepository.buscarPorId(id);
    if (!tarjetaGraficaModel) throw new AppError("Tarjeta gráfica no encontrada", 404);
    return new TarjetaGraficaResponseDto(tarjetaGraficaModel);
  }

  async crear(tarjetaGraficaRequestDto) {
    await this.validarCodigo(tarjetaGraficaRequestDto.codigo);
    const imagenDatos = this.convertirImagen(tarjetaGraficaRequestDto.imagenBase64);

    const tarjetaGraficaModel = new TarjetaGrafica(
      0,
      tarjetaGraficaRequestDto.codigo,
      tarjetaGraficaRequestDto.modelo,
      tarjetaGraficaRequestDto.fabricante,
      tarjetaGraficaRequestDto.memoriaGb,
      tarjetaGraficaRequestDto.precio,
      tarjetaGraficaRequestDto.frecuenciaMhz,
      tarjetaGraficaRequestDto.descripcion,
      tarjetaGraficaRequestDto.registro,
      tarjetaGraficaRequestDto.fechaLanzamiento,
      tarjetaGraficaRequestDto.horaRegistro,
      tarjetaGraficaRequestDto.fechaHoraRegistro,
      imagenDatos.imagen,
      imagenDatos.imagenMimeType,
    );

    const tarjetaGraficaCreadoModel =
      await this.tarjetaGraficaRepository.crear(tarjetaGraficaModel);
    return new TarjetaGraficaResponseDto(tarjetaGraficaCreadoModel);
  }

  async reemplazar(id, tarjetaGraficaRequestDto) {
    const tarjetaGraficaExistenteModel =
      await this.tarjetaGraficaRepository.buscarPorId(id);
    if (!tarjetaGraficaExistenteModel)
      throw new AppError("Tarjeta gráfica no encontrada", 404);
    await this.validarCodigo(tarjetaGraficaRequestDto.codigo, id);

    const imagenDatos = this.convertirImagen(tarjetaGraficaRequestDto.imagenBase64);
    const tarjetaGraficaModel = new TarjetaGrafica(
      id,
      tarjetaGraficaRequestDto.codigo,
      tarjetaGraficaRequestDto.modelo,
      tarjetaGraficaRequestDto.fabricante,
      tarjetaGraficaRequestDto.memoriaGb,
      tarjetaGraficaRequestDto.precio,
      tarjetaGraficaRequestDto.frecuenciaMhz,
      tarjetaGraficaRequestDto.descripcion,
      tarjetaGraficaRequestDto.registro,
      tarjetaGraficaRequestDto.fechaLanzamiento,
      tarjetaGraficaRequestDto.horaRegistro,
      tarjetaGraficaRequestDto.fechaHoraRegistro,
      imagenDatos.imagen,
      imagenDatos.imagenMimeType,
    );

    const tarjetaGraficaActualizadoModel =
      await this.tarjetaGraficaRepository.reemplazar(id, tarjetaGraficaModel);
    return new TarjetaGraficaResponseDto(tarjetaGraficaActualizadoModel);
  }

  async actualizar(id, tarjetaGraficaRequestDto) {
    const tarjetaGraficaActualModel =
      await this.tarjetaGraficaRepository.buscarPorId(id);
    if (!tarjetaGraficaActualModel)
      throw new AppError("Tarjeta gráfica no encontrada", 404);

    const codigo = tarjetaGraficaRequestDto.codigo ?? tarjetaGraficaActualModel.codigo;
    await this.validarCodigo(codigo, id);

    let imagen = tarjetaGraficaActualModel.imagen;
    let imagenMimeType = tarjetaGraficaActualModel.imagenMimeType;
    if (tarjetaGraficaRequestDto.imagenBase64 !== undefined) {
      const imagenDatos = this.convertirImagen(
        tarjetaGraficaRequestDto.imagenBase64,
      );
      imagen = imagenDatos.imagen;
      imagenMimeType = imagenDatos.imagenMimeType;
    }

    const conservarSiNoSeEnvia = (nuevoValor, valorActual) =>
      nuevoValor === undefined ? valorActual : nuevoValor;

    const tarjetaGraficaModel = new TarjetaGrafica(
      id,
      codigo,
      tarjetaGraficaRequestDto.modelo ?? tarjetaGraficaActualModel.modelo,
      tarjetaGraficaRequestDto.fabricante ?? tarjetaGraficaActualModel.fabricante,
      tarjetaGraficaRequestDto.memoriaGb ?? tarjetaGraficaActualModel.memoriaGb,
      tarjetaGraficaRequestDto.precio ?? tarjetaGraficaActualModel.precio,
      conservarSiNoSeEnvia(
        tarjetaGraficaRequestDto.frecuenciaMhz,
        tarjetaGraficaActualModel.frecuenciaMhz,
      ),
      conservarSiNoSeEnvia(
        tarjetaGraficaRequestDto.descripcion,
        tarjetaGraficaActualModel.descripcion,
      ),
      tarjetaGraficaRequestDto.registro ?? tarjetaGraficaActualModel.registro,
      conservarSiNoSeEnvia(
        tarjetaGraficaRequestDto.fechaLanzamiento,
        tarjetaGraficaActualModel.fechaLanzamiento,
      ),
      tarjetaGraficaRequestDto.horaRegistro ?? tarjetaGraficaActualModel.horaRegistro,
      tarjetaGraficaRequestDto.fechaHoraRegistro ??
        tarjetaGraficaActualModel.fechaHoraRegistro,
      imagen,
      imagenMimeType,
    );

    const tarjetaGraficaActualizadoModel =
      await this.tarjetaGraficaRepository.reemplazar(id, tarjetaGraficaModel);
    return new TarjetaGraficaResponseDto(tarjetaGraficaActualizadoModel);
  }

  async buscar(tarjetaGraficaConsultaDto) {
    const tarjetasGraficasModel = await this.tarjetaGraficaRepository.query(
      tarjetaGraficaConsultaDto,
    );
    return tarjetasGraficasModel.map(
      (tarjetaGraficaModel) => new TarjetaGraficaResponseDto(tarjetaGraficaModel),
    );
  }

  async eliminar(id) {
    const tarjetaGraficaEliminadoModel =
      await this.tarjetaGraficaRepository.eliminar(id);
    if (!tarjetaGraficaEliminadoModel)
      throw new AppError("Tarjeta gráfica no encontrada", 404);
    return new TarjetaGraficaResponseDto(tarjetaGraficaEliminadoModel);
  }

  async validarCodigo(codigo, idOmitido) {
    const tarjetasGraficasModel = await this.tarjetaGraficaRepository.listar();
    const tarjetaGraficaRepetidoModel = tarjetasGraficasModel.find(
      (tarjetaGraficaModel) =>
        normalizarTexto(tarjetaGraficaModel.codigo) === normalizarTexto(codigo) &&
        Number(tarjetaGraficaModel.id) !== Number(idOmitido),
    );

    if (tarjetaGraficaRepetidoModel) {
      throw new AppError("El código de tarjeta gráfica ya existe", 409);
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

export const tarjetasGraficasService = new TarjetasGraficasService();
