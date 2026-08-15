import { AppError } from "../errors/AppError.js";
import { ProductoResponseDto } from "../dtos/ProductoDto.js";
import { callbackAPromesa } from "../utils/callbackToPromise.js";
import { traducirErrorBaseDatos } from "./databaseError.js";

export class ProductosService {
  constructor(repository) {
    this.repository = repository;
  }

  async listar(queryDto = {}) {
    const products = await callbackAPromesa(() => this.repository.listar(queryDto));
    return products.map((product) => new ProductoResponseDto(product));
  }

  async obtener(id) {
    const product = await Promise.resolve(this.repository.obtenerPorId(id));
    if (!product) throw new AppError("Producto no encontrado", 404, null, "PRODUCT_NOT_FOUND");
    return new ProductoResponseDto(product);
  }

  async crear(dto) {
    try {
      const product = await Promise.resolve().then(() => this.repository.crear(dto));
      return new ProductoResponseDto(product);
    } catch (error) {
      throw traducirErrorBaseDatos(error, "producto");
    }
  }

  async reemplazar(id, dto) {
    try {
      const product = await Promise.resolve(this.repository.reemplazar(id, dto));
      if (!product) throw new AppError("Producto no encontrado", 404, null, "PRODUCT_NOT_FOUND");
      return new ProductoResponseDto(product);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw traducirErrorBaseDatos(error, "producto");
    }
  }

  async actualizar(id, dto) {
    try {
      const product = await Promise.resolve(this.repository.actualizar(id, dto));
      if (!product) throw new AppError("Producto no encontrado", 404, null, "PRODUCT_NOT_FOUND");
      return new ProductoResponseDto(product);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw traducirErrorBaseDatos(error, "producto");
    }
  }

  async eliminar(id) {
    const product = await Promise.resolve(this.repository.eliminar(id));
    if (!product) throw new AppError("Producto no encontrado", 404, null, "PRODUCT_NOT_FOUND");
    return new ProductoResponseDto(product);
  }
}
