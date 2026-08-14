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
        const imagenDatos = this.convertirImagen(servicioRequestDto.imagenBase46);

        const servicioModel = new Servicio(
            0,
            servicioRequestDto.codigo ?? servicioRequestDto.codigoService,
            servicioRequestDto.nombre,
            servicioRequestDto.categoria_id ?? servicioRequestDto.categoriaId,
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

    async validarCodigo(codigo, codigoOmitido) {
        const serviciosModel = await this.serviciosRepository.listar();
        const servicioRepetidoModel = serviciosModel.find(
            (servicioModel) =>
                normalizarTexto(servicioModel.codigo) === normalizarTexto(codigo) &&
                normalizarTexto(servicioModel.codigo) !== normalizarTexto(codigoOmitido)
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
            /^data:(image\/[a-zA-Z0-9\-\+]+);base64,(.+)$/
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
        const serviciosModel = await this.serviciosRepository.listar();
        return serviciosModel.map(
            (servicioModel) => new ServicioResponseDto(servicioModel)
        );
    }

    async obtener(id) {
        // Usamos buscarPorCodigo en lugar de buscarPorId para alinearlo con la tabla de servicios
        const servicioModel = await this.serviciosRepository.buscarPorCodigo(id);
        if (!servicioModel) throw new AppError("Servicio no encontrado", 404);
        return new ServicioResponseDto(servicioModel);
    }
    async actualizar(id, servicioRequestDto) {
    const servicioActualModel = await this.serviciosRepository.buscarPorId(id);
    if (!servicioActualModel) throw new AppError("Servicio no encontrado", 404);

    const codigo = servicioRequestDto.codigo ?? servicioActualModel.codigo;

    let imagen = servicioActualModel.imagen;
    let imagenMimeType = servicioActualModel.imagenMimeType;
    if (servicioRequestDto.imagenBase64 !== undefined) {
      const imagenDatos = this.convertirImagen(servicioRequestDto.imagenBase64);
      imagen = imagenDatos.imagen;
      imagenMimeType = imagenDatos.imagenMimeType;
    }

    const conservarSiNoSeEnvia = (nuevoValor, valorActual) =>
      nuevoValor === undefined ? valorActual : nuevoValor;

    const categoriaId = servicioRequestDto.categoriaId ?? servicioRequestDto.categoria_id ?? servicioActualModel.categoriaId;

    const servicioModel = new Servicio(
      id,
      codigo,
      servicioRequestDto.nombre ?? servicioActualModel.nombre,
      categoriaId,
      servicioRequestDto.capacidadMax ?? servicioActualModel.capacidadMax,
      servicioRequestDto.precio ?? servicioActualModel.precio,
      servicioRequestDto.duracionMinutos ?? servicioActualModel.duracionMinutos,
      conservarSiNoSeEnvia(servicioRequestDto.descripcion, servicioActualModel.descripcion),
      servicioRequestDto.activo ?? servicioActualModel.activo,
      conservarSiNoSeEnvia(servicioRequestDto.fechaVencimiento, servicioActualModel.fechaVencimiento),
      servicioRequestDto.horaRegistro ?? servicioActualModel.horaRegistro,
      servicioRequestDto.fechaHoraRegistro ?? servicioActualModel.fechaHoraRegistro,
      imagen,
      imagenMimeType
    );

    const servicioActualizadoModel = await this.serviciosRepository.reemplazar(
      id,
      servicioModel
    );
    return new ServicioResponseDto(servicioActualizadoModel);
  }
  async eliminar(id) {
    const servicioEliminadoModel = await this.serviciosRepository.eliminar(id);
    if (!servicioEliminadoModel)
      throw new AppError("Servicio no encontrado", 404);
    return new ServicioResponseDto(servicioEliminadoModel);
  }


}

export const serviciosService = new ServiciosService();