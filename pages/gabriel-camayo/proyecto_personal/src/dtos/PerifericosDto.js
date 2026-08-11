export class PerifericosRequestDto {
  constructor(requestBody = {}) {
    this.codigo = requestBody.codigo;
    this.tipo = requestBody.tipo;
    this.marca = requestBody.marca;
    this.modelo = requestBody.modelo;
    this.tipoConexion = requestBody.tipoConexion;
    this.color = requestBody.color;
    this.precio = requestBody.precio;
    this.stock = requestBody.stock;
    this.horaRegistro = requestBody.horaRegistro;
    this.fechaHoraRegistro = requestBody.fechaHoraRegistro;
  }
}

export class PerifericosConsultaDto {
  constructor(queryParams = {}) {
    this.texto = queryParams.texto;
    this.tipo = queryParams.tipo;
    this.marca = queryParams.marca;
    this.precioMin = queryParams.precioMin;
    this.precioMax = queryParams.precioMax;
  }
}

export class PerifericosResponseDto {
  constructor(perifericoModel) {
    this.id = perifericoModel.id;
    this.codigo = perifericoModel.codigo;
    this.tipo = perifericoModel.tipo;
    this.marca = perifericoModel.marca;
    this.modelo = perifericoModel.modelo;
    this.tipoConexion = perifericoModel.tipoConexion;
    this.color = perifericoModel.color;
    this.precio = perifericoModel.precio;
    this.stock = perifericoModel.stock;
    this.horaRegistro = perifericoModel.horaRegistro;
    this.fechaHoraRegistro = perifericoModel.fechaHoraRegistro;
  }
}