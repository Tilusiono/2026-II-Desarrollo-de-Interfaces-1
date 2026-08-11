export class ProductoRequestDto {
  constructor(requestBody = {}) {
    this.codigo = requestBody.codigo;
    this.nombre = requestBody.nombre;
    this.categoria = requestBody.categoria;
    this.stock = requestBody.stock;
    this.precio = requestBody.precio;
    this.peso = requestBody.peso;
    this.descripcion = requestBody.descripcion;
    this.activo = requestBody.activo;
    this.fechaVencimiento = requestBody.fechaVencimiento;
    this.horaRegistro = requestBody.horaRegistro;
    this.fechaHoraRegistro = requestBody.fechaHoraRegistro;
    this.imagenBase64 = requestBody.imagenBase64;
  }
}

export class CategoriaConsultaDto {
  constructor(queryParams = {}) {
    this.texto = queryParams.texto;
    this.tipo = queryParams.tipo;
    this.activo = queryParams.activo;
    this.precioMin = queryParams.precioMin;
    this.precioMax = queryParams.precioMax;
    this.pesoMin = queryParams.pesoMin;
    this.pesoMax = queryParams.pesoMax;
  }
}

export class ProductoResponseDto {
  constructor(productoModel) {
    this.id = productoModel.id;
    this.codigo = productoModel.codigo;
    this.nombre = productoModel.nombre;
    this.categoria = productoModel.categoria;
    this.stock = productoModel.stock;
    this.precio = productoModel.precio;
    this.peso = productoModel.peso;
    this.descripcion = productoModel.descripcion;
    this.activo = productoModel.activo;
    this.fechaVencimiento = productoModel.fechaVencimiento;
    this.horaRegistro = productoModel.horaRegistro;
    this.fechaHoraRegistro = productoModel.fechaHoraRegistro;
    this.imagenMimeType = productoModel.imagenMimeType;
    this.imagenBase64 = productoModel.imagen
      ? `data:${productoModel.imagenMimeType};base64,${Buffer.from(
          productoModel.imagen,
        ).toString("base64")}`
      : null;
  }
}
