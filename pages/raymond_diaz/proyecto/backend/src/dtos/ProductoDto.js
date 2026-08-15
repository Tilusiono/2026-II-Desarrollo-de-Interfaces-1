import { aBooleano, normalizarTexto } from "../utils/text.js";

export class ProductoRequestDto {
  constructor(body = {}) {
    if (Object.hasOwn(body, "codigo")) this.codigo = normalizarTexto(body.codigo)?.toUpperCase();
    if (Object.hasOwn(body, "nombre")) this.nombre = normalizarTexto(body.nombre);
    if (Object.hasOwn(body, "marca")) this.marca = normalizarTexto(body.marca);
    if (Object.hasOwn(body, "descripcion")) this.descripcion = normalizarTexto(body.descripcion) || null;
    if (Object.hasOwn(body, "precio")) this.precio = Number(body.precio);
    if (Object.hasOwn(body, "stock")) this.stock = Number(body.stock);
    if (Object.hasOwn(body, "categoriaId")) this.categoriaId = Number(body.categoriaId);
    if (Object.hasOwn(body, "proveedorId")) {
      this.proveedorId = body.proveedorId === null || body.proveedorId === "" ? null : Number(body.proveedorId);
    }
    if (Object.hasOwn(body, "activo")) this.activo = aBooleano(body.activo);
  }
}

export class ProductoConsultaDto {
  constructor(query = {}) {
    this.texto = normalizarTexto(query.texto) || "";
    this.categoriaId = query.categoriaId ? Number(query.categoriaId) : null;
    this.activo = aBooleano(query.activo, null);
    this.precioMin = query.precioMin === undefined || query.precioMin === "" ? null : Number(query.precioMin);
    this.precioMax = query.precioMax === undefined || query.precioMax === "" ? null : Number(query.precioMax);
    this.stockMin = query.stockMin === undefined || query.stockMin === "" ? null : Number(query.stockMin);
  }
}

export class ProductoResponseDto {
  constructor(producto) {
    Object.assign(this, producto.toJSON());
  }
}
