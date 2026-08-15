import { EntidadAuditable } from "./EntidadAuditable.js";

export class Usuario extends EntidadAuditable {
  #documento;
  #correo;

  constructor(data = {}) {
    super(data);
    this.#documento = data.documento;
    this.#correo = data.correo;
    this.nombres = data.nombres;
    this.apellidos = data.apellidos;
    this.telefono = data.telefono ?? null;
    this.direccion = data.direccion ?? null;
    this.rol = data.rol ?? "cliente";
    this.activo = data.activo ?? true;
  }

  get documento() { return this.#documento; }
  set documento(value) { this.#documento = value; }
  get correo() { return this.#correo; }
  set correo(value) { this.#correo = value; }
  get nombreCompleto() { return `${this.nombres} ${this.apellidos}`.trim(); }

  toJSON() {
    return {
      id: this.id,
      documento: this.#documento,
      nombres: this.nombres,
      apellidos: this.apellidos,
      nombreCompleto: this.nombreCompleto,
      correo: this.#correo,
      telefono: this.telefono,
      direccion: this.direccion,
      rol: this.rol,
      activo: this.activo,
      creadoEn: this.creadoEn,
      actualizadoEn: this.actualizadoEn,
    };
  }
}
