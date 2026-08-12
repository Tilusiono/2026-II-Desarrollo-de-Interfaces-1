export class ComponenteRequestDto {
  constructor({
    codigo,
    modelo,
    arquitectura,
    nucleos,
    precio,
    frecuenciaGhz,
    descripcion,
    registro,
    fechaLanzamiento,
    horaRegistro,
    fechaHoraRegistro,
    imagenBase64,
  } = {}) {
    this.codigo = codigo;
    this.modelo = modelo;
    this.arquitectura = arquitectura;
    this.nucleos = nucleos;
    this.precio = precio;
    this.frecuenciaGhz = frecuenciaGhz;
    this.descripcion = descripcion;
    this.registro = registro;
    this.fechaLanzamiento = fechaLanzamiento;
    this.horaRegistro = horaRegistro;
    this.fechaHoraRegistro = fechaHoraRegistro;
    this.imagenBase64 = imagenBase64;
  }
}

export class ComponenteConsultaDto {
  constructor({ texto, arquitectura, registro, precioMin, precioMax } = {}) {
    this.texto = texto;
    this.arquitectura = arquitectura;
    this.registro = registro;
    this.precioMin = precioMin;
    this.precioMax = precioMax;
  }
}

export class ComponenteResponseDto {
  constructor(componente) {
    this.id = componente.id;
    this.codigo = componente.codigo;
    this.modelo = componente.modelo;
    this.arquitectura = componente.arquitectura;
    this.nucleos = componente.nucleos;
    this.precio = componente.precio;
    this.frecuenciaGhz = componente.frecuenciaGhz;
    this.descripcion = componente.descripcion;
    this.registro = componente.registro;
    this.fechaLanzamiento = componente.fechaLanzamiento;
    this.horaRegistro = componente.horaRegistro;
    this.fechaHoraRegistro = componente.fechaHoraRegistro;
    this.imagenMimeType = componente.imagenMimeType;
    this.imagenBase64 = componente.imagenBase64;
  }
}
