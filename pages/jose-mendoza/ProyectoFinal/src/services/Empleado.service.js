import { AppError } from "../errors/AppError.js";
import { Empleado } from "../models/Empleado.js";
import { EmpleadoResponseDto } from "../dtos/EmpleadoDto.js";
import { EmpleadoRepository } from "../repositories/EmpleadoRepository.js";
import { normalizarTexto } from "../utils/texto.js";

export class EmpleadosService {

    constructor(empleadoRepository = new EmpleadoRepository()) {
        this.empleadoRepository = empleadoRepository;
    }


    async crear(empleadoRequestDto) {

        await this.validarDni(empleadoRequestDto.dni);

        const estadoNumerico = empleadoRequestDto.estado === "Activo" ? 1 : 0;

        const empleadoModel = new Empleado(
            0,
            empleadoRequestDto.dni,
            empleadoRequestDto.nombres,
            empleadoRequestDto.apellidos,
            empleadoRequestDto.telefono,
            empleadoRequestDto.correo,
            empleadoRequestDto.direccion,
            empleadoRequestDto.fechaIngreso,
            empleadoRequestDto.salario,
            estadoNumerico,
            empleadoRequestDto.idTipoEmpleado,
            empleadoRequestDto.idCargo,
            empleadoRequestDto.idArea,
            empleadoRequestDto.idSede
        );

        const empleadoCreadoModel =
            await this.empleadoRepository.crear(empleadoModel);

        return new EmpleadoResponseDto(
            empleadoCreadoModel
        );

    }


    async validarDni(dni, idOmitido) {

        const empleadosModel =
            await this.empleadoRepository.listar();

        const empleadoRepetidoModel = empleadosModel.find(
            (empleadoModel) =>
                normalizarTexto(empleadoModel.getDni()) ===
                normalizarTexto(dni) &&
                Number(empleadoModel.getIdEmpleado()) !==
                Number(idOmitido)
        );

        if (empleadoRepetidoModel) {

            throw new AppError(
                "El DNI del empleado ya existe",
                409
            );

        }

    }

    async listar() {
        const empleadosModel = await this.empleadoRepository.listar();
        return empleadosModel.map(
            (empleadoModel) => new EmpleadoResponseDto(empleadoModel),
        );
    }

    async obtener(id) {
        const empleadoModel = await this.empleadoRepository.buscarPorId(id);
        if (!empleadoModel) throw new AppError("Empleado no encontrado", 404);
        return new EmpleadoResponseDto(empleadoModel);
    } 

    async reemplazar(id, empleadoRequestDto) {
        const empleadoExistenteModel =
            await this.empleadoRepository.buscarPorId(id);
        if (!empleadoExistenteModel)
            throw new AppError("Empleado no encontrado", 404);

        const estadoNumerico = empleadoRequestDto.estado === "Activo" || empleadoRequestDto.estado === 1 ? 1 : 0;

        const empleadoModel = new Empleado(
            id,
            empleadoRequestDto.dni,
            empleadoRequestDto.nombres,
            empleadoRequestDto.apellidos,
            empleadoRequestDto.telefono,
            empleadoRequestDto.correo,
            empleadoRequestDto.direccion,
            empleadoRequestDto.fechaIngreso,
            empleadoRequestDto.salario,
            estadoNumerico,
            empleadoRequestDto.idTipoEmpleado,
            empleadoRequestDto.idCargo,
            empleadoRequestDto.idArea,
            empleadoRequestDto.idSede
        );

        const empleadoActualizadoModel = await this.empleadoRepository.reemplazar(
            id,
            empleadoModel,
        );
        return new EmpleadoResponseDto(empleadoActualizadoModel);
    }


    async actualizar(id, empleadoRequestDto) {
    const empleadoActualModel = await this.empleadoRepository.buscarPorId(id);
    if (!empleadoActualModel) throw new AppError("Empleado no encontrado", 404);

    const conservarSiNoSeEnvia = (nuevoValor, valorActual) =>
      nuevoValor === undefined ? valorActual : nuevoValor;

    let estadoNumerico = empleadoActualModel.getEstado();
    if (empleadoRequestDto.estado !== undefined) {
      estadoNumerico =
        empleadoRequestDto.estado === "Activo" || empleadoRequestDto.estado === 1
          ? 1
          : 0;
    }

    const empleadoModel = new Empleado(
      id,
      empleadoRequestDto.dni ?? empleadoActualModel.getDni(),
      empleadoRequestDto.nombres ?? empleadoActualModel.getNombres(),
      empleadoRequestDto.apellidos ?? empleadoActualModel.getApellidos(),
      conservarSiNoSeEnvia(
        empleadoRequestDto.telefono,
        empleadoActualModel.getTelefono()
      ),
      conservarSiNoSeEnvia(
        empleadoRequestDto.correo,
        empleadoActualModel.getCorreo()
      ),
      conservarSiNoSeEnvia(
        empleadoRequestDto.direccion,
        empleadoActualModel.getDireccion()
      ),
      empleadoRequestDto.fechaIngreso ?? empleadoActualModel.getFechaIngreso(),
      empleadoRequestDto.salario ?? empleadoActualModel.getSalario(),
      estadoNumerico,
      empleadoRequestDto.idTipoEmpleado ?? empleadoActualModel.getIdTipoEmpleado(),
      empleadoRequestDto.idCargo ?? empleadoActualModel.getIdCargo(),
      empleadoRequestDto.idArea ?? empleadoActualModel.getIdArea(),
      empleadoRequestDto.idSede ?? empleadoActualModel.getIdSede()
    );

    const empleadoActualizadoModel = await this.empleadoRepository.reemplazar(
      id,
      empleadoModel,
    );
    return new EmpleadoResponseDto(empleadoActualizadoModel);
    }

    // BUSCAR
    
    async buscar(empleadoConsultaDto) {
    const empleadosModel =
        await this.empleadoRepository.query(empleadoConsultaDto);

    return empleadosModel.map(
        (empleadoModel) => new EmpleadoResponseDto(empleadoModel),
    );
    }

    // QUERY SEARCH
    async query(empleadoConsultaDto) {
        const empleadosModel =
            await this.empleadoRepository.query(empleadoConsultaDto);

        return empleadosModel.map(
            (empleadoModel) => new EmpleadoResponseDto(empleadoModel),
        );
    }
}


export const empleadosService = new EmpleadosService();