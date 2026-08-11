export class AutomovilesRequestDto {
  constructor(requestBody = {}) {
    this.codigo = requestBody.codigo;
    this.marca = requestBody.marca;
    this.modelo = requestBody.modelo;
    this.anio = requestBody.anio;
    this.color = requestBody.color;
    this.categoria = requestBody.categoria;
    this.precio = requestBody.precio;
    this.kilometraje = requestBody.kilometraje;
    this.descripcion = requestBody.descripcion;
    this.activo = requestBody.activo;
    this.horaRegistro = requestBody.horaRegistro;
    this.fechaHoraRegistro = requestBody.fechaHoraRegistro;
    this.imagenBase64 = requestBody.imagenBase64;
  }
}

export class AutomovilesConsultaDto {
  constructor(queryParams = {}) {
    this.texto = queryParams.texto;
    this.marca = queryParams.marca;
    this.modelo = queryParams.modelo;
    this.categoria = queryParams.categoria;
    this.activo = queryParams.activo;
    this.precioMin = queryParams.precioMin;
    this.precioMax = queryParams.precioMax;
    this.anioMin = queryParams.anioMin;
    this.anioMax = queryParams.anioMax;
  }
}

export class AutomovilesResponseDto {
  constructor(automovilModel) {
    this.id = automovilModel.id;
    this.codigo = automovilModel.codigo;
    this.marca = automovilModel.marca;
    this.modelo = automovilModel.modelo;
    this.anio = automovilModel.anio;
    this.color = automovilModel.color;
    this.categoria = automovilModel.categoria;
    this.precio = automovilModel.precio;
    this.kilometraje = automovilModel.kilometraje;
    this.descripcion = automovilModel.descripcion;
    this.activo = automovilModel.activo;
    this.horaRegistro = automovilModel.horaRegistro;
    this.fechaHoraRegistro = automovilModel.fechaHoraRegistro;
    this.imagenMimeType = automovilModel.imagenMimeType;

    this.imagenBase64 = automovilModel.imagen
      ? `data:${automovilModel.imagenMimeType};base64,${Buffer.from(
          automovilModel.imagen,
        ).toString("base64")}`
      : null;
  }
}

