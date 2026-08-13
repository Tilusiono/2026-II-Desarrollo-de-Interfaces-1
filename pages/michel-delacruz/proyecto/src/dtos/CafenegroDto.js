export class CafenegroRequestDto {
  constructor(requestBody = {}) {
    this.codigo = requestBody.codigo;
    this.nombre = requestBody.nombre;
    this.categoria = requestBody.categoria;
    this.precio = requestBody.precio;
    this.descripcion = requestBody.descripcion;
    this.activo = requestBody.activo;
    this.horaRegistro = requestBody.horaRegistro;
    this.fechaHoraRegistro = requestBody.fechaHoraRegistro;
    this.imagenBase64 = requestBody.imagenBase64;
  }
}

export class CafenegroConsultaDto {
  constructor(queryParams = {}) {
    this.texto = queryParams.texto;
    this.categoria = queryParams.categoria;
    this.activo = queryParams.activo;
    this.precioMin = queryParams.precioMin;
    this.precioMax = queryParams.precioMax;
  }
}

export class CafenegroResponseDto {
  constructor(CafenegroModel) {
    this.id = CafenegroModel.id;
    this.codigo = CafenegroModel.codigo;
    this.nombre = CafenegroModel.nombre;
    this.categoria = CafenegroModel.categoria;
    this.precio = CafenegroModel.precio;
    this.descripcion = CafenegroModel.descripcion;
    this.activo = CafenegroModel.activo;
    this.horaRegistro = CafenegroModel.horaRegistro;
    this.fechaHoraRegistro = CafenegroModel.fechaHoraRegistro;
    this.imagenMimeType = CafenegroModel.imagenMimeType;

    this.imagenBase64 = CafenegroModel.imagen
      ? `data:${CafenegroModel.imagenMimeType};base64,${Buffer.from(
          CafenegroModel.imagen,
        ).toString("base64")}`
      : null;
  }
}