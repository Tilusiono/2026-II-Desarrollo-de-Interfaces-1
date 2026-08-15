import { AppError } from "../errors/AppError.js";
import { UsuarioResponseDto } from "../dtos/UsuarioDto.js";
import { callbackAPromesa } from "../utils/callbackToPromise.js";
import { traducirErrorBaseDatos } from "./databaseError.js";

export class UsuariosService {
  constructor(repository) {
    this.repository = repository;
  }

  async listar(queryDto = {}) {
    const users = await callbackAPromesa(() => this.repository.listar(queryDto));
    return users.map((user) => new UsuarioResponseDto(user));
  }

  async obtener(id) {
    const user = await Promise.resolve(this.repository.obtenerPorId(id));
    if (!user) throw new AppError("Usuario no encontrado", 404, null, "USER_NOT_FOUND");
    return new UsuarioResponseDto(user);
  }

  async crear(dto) {
    try {
      return new UsuarioResponseDto(await Promise.resolve(this.repository.crear(dto)));
    } catch (error) {
      throw traducirErrorBaseDatos(error, "usuario");
    }
  }

  async reemplazar(id, dto) {
    try {
      const user = await Promise.resolve(this.repository.reemplazar(id, dto));
      if (!user) throw new AppError("Usuario no encontrado", 404, null, "USER_NOT_FOUND");
      return new UsuarioResponseDto(user);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw traducirErrorBaseDatos(error, "usuario");
    }
  }

  async actualizar(id, dto) {
    try {
      const user = await Promise.resolve(this.repository.actualizar(id, dto));
      if (!user) throw new AppError("Usuario no encontrado", 404, null, "USER_NOT_FOUND");
      return new UsuarioResponseDto(user);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw traducirErrorBaseDatos(error, "usuario");
    }
  }

  async eliminar(id) {
    const user = await Promise.resolve(this.repository.eliminar(id));
    if (!user) throw new AppError("Usuario no encontrado", 404, null, "USER_NOT_FOUND");
    return new UsuarioResponseDto(user);
  }
}
