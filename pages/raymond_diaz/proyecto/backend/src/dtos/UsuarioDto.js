import { aBooleano, normalizarTexto } from "../utils/text.js";

export class UsuarioRequestDto {
  constructor(body = {}) {
    if (Object.hasOwn(body, "documento")) this.documento = normalizarTexto(body.documento);
    if (Object.hasOwn(body, "nombres")) this.nombres = normalizarTexto(body.nombres);
    if (Object.hasOwn(body, "apellidos")) this.apellidos = normalizarTexto(body.apellidos);
    if (Object.hasOwn(body, "correo")) this.correo = normalizarTexto(body.correo)?.toLowerCase();
    if (Object.hasOwn(body, "telefono")) this.telefono = normalizarTexto(body.telefono) || null;
    if (Object.hasOwn(body, "direccion")) this.direccion = normalizarTexto(body.direccion) || null;
    if (Object.hasOwn(body, "rol")) this.rol = normalizarTexto(body.rol)?.toLowerCase();
    if (Object.hasOwn(body, "activo")) this.activo = aBooleano(body.activo);
  }
}

export class UsuarioConsultaDto {
  constructor(query = {}) {
    this.texto = normalizarTexto(query.texto) || "";
    this.rol = normalizarTexto(query.rol)?.toLowerCase() || "";
    this.activo = aBooleano(query.activo, null);
  }
}

export class UsuarioResponseDto {
  constructor(usuario) {
    Object.assign(this, usuario.toJSON());
  }
}
