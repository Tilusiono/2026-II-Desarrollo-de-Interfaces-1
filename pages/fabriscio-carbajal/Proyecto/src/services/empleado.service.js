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
    await this.validarDni(empleadoRequestDto.dni);
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

  async validarDni(dni, idOmitido) {
    const empleadoModel = await this.empleadoRepository.listar();
    const empleadoRepetidoModel = empleadoModel.find(
      (empleadoModel) =>
        normalizarTexto(empleadoModel.dni) === normalizarTexto(dni) &&
        Number(empleadoModel.id) !== Number(idOmitido),
    );

    if (empleadoRepetidoModel) {
      throw new AppError("El dni de empleado ya existe", 409);
    }
  }

  // OBTENER TODOS LOS ELEMENTOS
  async listar() {
    const listaEmpleados = await this.empleadoRepository.listar();
    return listaEmpleados.map(
      (empl) => new EmpleadoResponseDto(empl),
    );
  }

  // OBTENER UNA PARTE DE LA TABLA
  async obtener(id) {
    const empleado = await this.empleadoRepository.buscarPorId(id);
    if (!empleado) throw new AppError("Empleado no encontrado", 404);
    return new EmpleadoResponseDto(empleado);
  }


  // modificar todo
  async modificarService(id, empleadoRequestDto) {
    const empleadoExistenteModel =
      await this.empleadoRepository.buscarPorId(id);
    if (!empleadoExistenteModel)
      throw new AppError("Empleado no encontrado", 404);
    await this.validarDni(empleadoRequestDto.dni, id); // !

    //const imagenDatos = this.convertirImagen(empleadoRequestDto.imagenBase64);
    const empleadoModel = new Empleado(
      id,
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
    );

    const empleadoActualizadoModel = await this.empleadoRepository.modificarRepositorio(
      id,
      empleadoModel,
    );
    return new EmpleadoResponseDto(empleadoActualizadoModel);
  }


  // modificar parcial
  async modificarParcialService(id, empleadoRequestDto) {
    const empleadoActualModel = await this.empleadoRepository.buscarPorId(id);
    if (!empleadoActualModel) throw new AppError("Empleado no encontrado", 404);

    const dni = empleadoRequestDto.dni ?? empleadoActualModel.dni;
    await this.validarDni(dni, id);

    //let imagen = empleadoActualModel.imagen;
    //let imagenMimeType = empleadoActualModel.imagenMimeType;

    //if (empleadoRequestDto.imagenBase64 !== undefined) {
    // const imagenDatos = this.convertirImagen(empleadoRequestDto.imagenBase64);
    //  imagen = imagenDatos.imagen;
    //  imagenMimeType = imagenDatos.imagenMimeType;
    //}

    const conservarSiNoSeEnvia = (nuevoValor, valorActual) =>
      nuevoValor === undefined ? valorActual : nuevoValor;

    const empleadoModel = new Empleado(
      id,
      empleadoRequestDto.nombre ?? empleadoActualModel.nombre,
      empleadoRequestDto.apellidoPaterno ?? empleadoActualModel.apellidoPaterno,
      dni,
      empleadoRequestDto.telefono ?? empleadoActualModel.telefono,
      conservarSiNoSeEnvia(empleadoRequestDto.salario, empleadoActualModel.salario),
      empleadoRequestDto.direccion ?? empleadoActualModel.direccion,
      conservarSiNoSeEnvia(empleadoRequestDto.horaIngreso, empleadoActualModel.horaIngreso),
      conservarSiNoSeEnvia(empleadoRequestDto.horaSalida,empleadoActualModel.horaSalida),
      empleadoRequestDto.disponible ?? empleadoActualModel.disponible,
      empleadoRequestDto.fechaIngreso ?? empleadoActualModel.fechaIngreso,
      empleadoRequestDto.fechaNacimiento ?? empleadoActualModel.fechaNacimiento,
    );

    const empleadoActualizadoModel = await this.empleadoRepository.modificarRepositorio(
      id,
      empleadoModel,
    );
    return new EmpleadoResponseDto(empleadoActualizadoModel);
  }

  // BUSCAR
  async buscar(empleadoConsultaDto) {
    const empleadoModel =
      await this.empleadoRepository.query(empleadoConsultaDto);
    return empleadoModel.map(
      (empleadoModel) => new ProductoResponseDto(empleadoModel),
    );
  }

}

export const empleadoService = new EmpleadoService();
