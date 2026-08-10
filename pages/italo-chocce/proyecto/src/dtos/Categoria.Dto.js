export class CategoriaRequestDto {
  constructor(requestBody = {}) {
    this.id = requestBody.id; // Recordar que 'id' es el CHAR(3) tipo 'JUE', 'VIP', etc.
    this.nombre = requestBody.nombre;
    this.descripcion = requestBody.descripcion;
    this.activo = requestBody.activo;
    this.horaRegistro = requestBody.horaRegistro;
    this.fechaHoraRegistro = requestBody.fechaHoraRegistro;
  }
}

export class CategoriaConsultaDto {
  constructor(queryParams = {}) {
    this.texto = queryParams.texto;
    this.activo = queryParams.activo;
  }
}

export class CategoriaResponseDto {
  constructor(categoriaModel) {
    this.id = categoriaModel.id;
    this.nombre = categoriaModel.nombre;
    this.descripcion = categoriaModel.descripcion;
    this.activo = categoriaModel.activo;
    this.horaRegistro = categoriaModel.horaRegistro;
    this.fechaHoraRegistro = categoriaModel.fechaHoraRegistro;
  }
}