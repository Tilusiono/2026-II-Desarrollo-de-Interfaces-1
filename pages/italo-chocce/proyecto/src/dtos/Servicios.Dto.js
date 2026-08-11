export class ServicioRequestDto {
  constructor(requestBody = {}) {
    this.codigo = requestBody.codigo;
    this.nombre = requestBody.nombre;
    this.categoria_id = requestBody.categoria_id;
    this.capacidadMax = requestBody.capacidadMax;
    this.precio = requestBody.precio;
    this.duracionMinutos = requestBody.duracionMinutos;
    this.descripcion = requestBody.descripcion;
    this.activo = requestBody.activo;
    this.fechaVencimiento = requestBody.fechaVencimiento;
    this.horaRegistro = requestBody.horaRegistro;
    this.fechaHoraRegistro = requestBody.fechaHoraRegistro;
    this.imagenBase64 = requestBody.imagenBase64;
  }
}

export class ServicioConsultaDto {
  constructor(queryParams = {}) {
    this.texto = queryParams.texto;
    this.categoriaId = queryParams.categoriaId;
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
    this.categoria_id = servicioModel.categoria_id;
    this.capacidadMax = servicioModel.capacidadMax;
    this.precio = servicioModel.precio;
    this.duracionMinutos = servicioModel.duracionMinutos;
    this.descripcion = servicioModel.descripcion;
    this.activo = servicioModel.activo;
    this.fechaVencimiento = servicioModel.fechaVencimiento;
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