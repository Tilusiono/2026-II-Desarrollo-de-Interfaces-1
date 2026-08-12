export class ProcesadorRequestDto {
  constructor(requestBody = {}) {
    this.codigo = requestBody.codigo;
    this.modelo = requestBody.modelo;
    this.arquitectura = requestBody.arquitectura;
    this.nucleos = requestBody.nucleos;
    this.precio = requestBody.precio;
    this.frecuenciaGhz = requestBody.frecuenciaGhz;
    this.descripcion = requestBody.descripcion;
    this.registro = requestBody.registro;
    this.fechaLanzamiento = requestBody.fechaLanzamiento;
    this.horaRegistro = requestBody.horaRegistro;
    this.fechaHoraRegistro = requestBody.fechaHoraRegistro;
    this.imagenBase64 = requestBody.imagenBase64;
  }
}

export class ProcesadorConsultaDto {
  constructor(queryParams = {}) {
    this.texto = queryParams.texto;
    this.arquitectura = queryParams.arquitectura;
    this.registro = queryParams.registro;
    this.precioMin = queryParams.precioMin;
    this.precioMax = queryParams.precioMax;
  }
}

export class ProcesadorResponseDto {
  constructor(procesadorModel) {
    this.id = procesadorModel.id;
    this.codigo = procesadorModel.codigo;
    this.modelo = procesadorModel.modelo;
    this.arquitectura = procesadorModel.arquitectura;
    this.nucleos = procesadorModel.nucleos;
    this.precio = procesadorModel.precio;
    this.frecuenciaGhz = procesadorModel.frecuenciaGhz;
    this.descripcion = procesadorModel.descripcion;
    this.registro = procesadorModel.registro;
    this.fechaLanzamiento = procesadorModel.fechaLanzamiento;
    this.horaRegistro = procesadorModel.horaRegistro;
    this.fechaHoraRegistro = procesadorModel.fechaHoraRegistro;
    this.imagenMimeType = procesadorModel.imagenMimeType;
    this.imagenBase64 = procesadorModel.imagen
      ? `data:${procesadorModel.imagenMimeType};base64,${Buffer.from(
          procesadorModel.imagen,
        ).toString("base64")}`
      : null;
  }
}
