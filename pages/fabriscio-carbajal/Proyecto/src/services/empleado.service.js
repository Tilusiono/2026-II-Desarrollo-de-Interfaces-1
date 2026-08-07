import { AppError } from "../errors/AppError.js";
import { normalizarTexto } from "../utils/texto.js";


import Empleado from "../models/Empleado.js";
import { EmpleadoResponseDto } from "../dtos/EmpleadoDto.js";
import { EmpleadoRepository } from "../repositories/EmpleadoRepository.js";


export class EmpleadoService {
  constructor(empleadoRepository = new EmpleadoRepository()) {
    this.empleadoRepository = empleadoRepository;
  }

  async crear(empleadoRequestDto) {
    await this.validarCodigo(empleadoRequestDto.codigo);
    // const imagenDatos = this.convertirImagen(empleadoRequestDto.imagenBase64);

    const empleadoModel = new Empleado(
      0,
      empleadoRequestDto.nombre,
      empleadoRequestDto.apellidoPaterno,
      empleadoRequestDto.dni,
      empleadoRequestDto.telefono,
      empleadoRequestDto.salario,
      empleadoRequestDto.direccion,
      empleadoRequestDto.horaIngreso,
      empleadoRequestDto.horaSalida,
      empleadoRequestDto.disponible,
      empleadoRequestDto.fechaIngreso,
      empleadoRequestDto.fechaNacimiento,
      // imagenDatos.imagen,
      // imagenDatos.imagenMimeType,
    );

    const empleadoCreadoModel =
      await this.empleadoRepository.crear(empleadoModel);
    return new EmpleadoResponseDto(empleadoCreadoModel);
  }

  async validarCodigo(codigo, idOmitido) {
    const empleadoModel = await this.empleadoRepository.listar();
    const empleadoRepetidoModel = empleadoModel.find(
      (empleadoModel) =>
        normalizarTexto(empleadoModel.codigo) === normalizarTexto(codigo) &&
        Number(empleadoModel.id) !== Number(idOmitido),
    );

    if (empleadoRepetidoModel) {
      throw new AppError("El código de empleado ya existe", 409);
    }
  }

/*  convertirImagen(imagenBase64) {
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
  }*/
}

export const empleadoService = new EmpleadoService();
