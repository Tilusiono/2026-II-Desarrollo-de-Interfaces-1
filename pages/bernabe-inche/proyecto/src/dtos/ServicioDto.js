export class ServicioRequestDto {
  constructor(requestBody = {}) {
    this.codigo = requestBody.codigo;
    this.nombre = requestBody.nombre;
    this.tipoServicio = requestBody.tipoServicio;
    this.precio = requestBody.precio;
    this.duracionMinutos = requestBody.duracionMinutos;
    this.fechaInicio = requestBody.fechaInicio;
    this.descripcion = requestBody.descripcion;
    this.activo = requestBody.activo;
    this.horaRegistro = requestBody.horaRegistro;
    this.fechaHoraRegistro = requestBody.fechaHoraRegistro;
    this.imagenBase64 = requestBody.imagenBase64;
  }
}

export class ServicioConsultaDto {
  constructor(queryParams = {}) {
    this.texto = queryParams.texto;
    this.tipoServicio = queryParams.tipoServicio;
    this.activo = queryParams.activo;
    this.precioMin = queryParams.precioMin;
    this.precioMax = queryParams.precioMax;
  }
}

export class ServicioResponseDto {
  constructor(servicioModel) {
    this.id = servicioModel.id;
    this.codigo = servicioModel.codigo;
    this.nombre = servicioModel.nombre;
    this.tipoServicio = servicioModel.tipoServicio;
    this.precio = servicioModel.precio;
    this.duracionMinutos = servicioModel.duracionMinutos;
    this.fechaInicio = servicioModel.fechaInicio;
    this.descripcion = servicioModel.descripcion;
    this.activo = servicioModel.activo;
    this.horaRegistro = servicioModel.horaRegistro;
    this.fechaHoraRegistro = servicioModel.fechaHoraRegistro;
    this.imagenMimeType = servicioModel.imagenMimeType;

    this.imagenBase64 = servicioModel.imagen
      ? `data:${servicioModel.imagenMimeType};base64,${Buffer.from(
          servicioModel.imagen,
        ).toString("base64")}`
      : null;
  }
}