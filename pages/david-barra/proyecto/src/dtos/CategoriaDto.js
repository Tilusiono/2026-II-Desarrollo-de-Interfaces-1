export class CategoriaRequestDto {
  constructor(requestBody = {}) {
    this.codigo = requestBody.codigo;
    this.nombre = requestBody.nombre;
    this.tipo = requestBody.tipo;
    this.cantidadProductos = requestBody.cantidadProductos;
    this.presupuesto = requestBody.presupuesto;
    this.pesoPromedio = requestBody.pesoPromedio;
    this.descripcion = requestBody.descripcion;
    this.activo = requestBody.activo;
    this.fechaLimite = requestBody.fechaLimite;
    this.horaRegistro = requestBody.horaRegistro;
    this.fechaHoraRegistro = requestBody.fechaHoraRegistro;
    this.imagenBase64 = requestBody.imagenBase64;
    this.observaciones = requestBody.observaciones;
  }
}

export class CategoriaConsultaDto {
  constructor(queryParams = {}) {
    this.texto = queryParams.texto;
    this.tipo = queryParams.tipo;
    this.activo = queryParams.activo;
    this.presupuestoMin = queryParams.presupuestoMin;
    this.presupuestoMax = queryParams.presupuestoMax;
  }
}

export class CategoriaResponseDto {
  constructor(categoriaModel) {
    this.id = categoriaModel.id;
    this.codigo = categoriaModel.codigo;
    this.nombre = categoriaModel.nombre;
    this.tipo = categoriaModel.tipo;
    this.cantidadProductos = categoriaModel.cantidadProductos;
    this.presupuesto = categoriaModel.presupuesto;
    this.pesoPromedio = categoriaModel.pesoPromedio;
    this.descripcion = categoriaModel.descripcion;
    this.activo = categoriaModel.activo;
    this.fechaLimite = categoriaModel.fechaLimite;
    this.horaRegistro = categoriaModel.horaRegistro;
    this.fechaHoraRegistro = categoriaModel.fechaHoraRegistro;
    this.observaciones = categoriaModel.observaciones;
    this.imagenMimeType = categoriaModel.imagenMimeType;
    this.imagenBase64 = categoriaModel.imagen
      ? `data:${categoriaModel.imagenMimeType};base64,${Buffer.from(
          categoriaModel.imagen,
        ).toString("base64")}`
      : null;
  }
}