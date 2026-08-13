export class TarjetaGraficaRequestDto {
  constructor(requestBody = {}) {
    this.codigo = requestBody.codigo;
    this.modelo = requestBody.modelo;
    this.fabricante = requestBody.fabricante;
    this.memoriaGb = requestBody.memoriaGb;
    this.precio = requestBody.precio;
    this.frecuenciaMhz = requestBody.frecuenciaMhz;
    this.descripcion = requestBody.descripcion;
    this.registro = requestBody.registro;
    this.fechaLanzamiento = requestBody.fechaLanzamiento;
    this.horaRegistro = requestBody.horaRegistro;
    this.fechaHoraRegistro = requestBody.fechaHoraRegistro;
    this.imagenBase64 = requestBody.imagenBase64;
  }
}

export class TarjetaGraficaConsultaDto {
  constructor(queryParams = {}) {
    this.texto = queryParams.texto;
    this.fabricante = queryParams.fabricante;
    this.registro = queryParams.registro;
    this.precioMin = queryParams.precioMin;
    this.precioMax = queryParams.precioMax;
  }
}

export class TarjetaGraficaResponseDto {
  constructor(tarjetaGraficaModel) {
    this.id = tarjetaGraficaModel.id;
    this.codigo = tarjetaGraficaModel.codigo;
    this.modelo = tarjetaGraficaModel.modelo;
    this.fabricante = tarjetaGraficaModel.fabricante;
    this.memoriaGb = tarjetaGraficaModel.memoriaGb;
    this.precio = tarjetaGraficaModel.precio;
    this.frecuenciaMhz = tarjetaGraficaModel.frecuenciaMhz;
    this.descripcion = tarjetaGraficaModel.descripcion;
    this.registro = tarjetaGraficaModel.registro;
    this.fechaLanzamiento = tarjetaGraficaModel.fechaLanzamiento;
    this.horaRegistro = tarjetaGraficaModel.horaRegistro;
    this.fechaHoraRegistro = tarjetaGraficaModel.fechaHoraRegistro;
    this.imagenMimeType = tarjetaGraficaModel.imagenMimeType;
    this.imagenBase64 = tarjetaGraficaModel.imagen
      ? `data:${tarjetaGraficaModel.imagenMimeType};base64,${Buffer.from(
          tarjetaGraficaModel.imagen,
        ).toString("base64")}`
      : null;
  }
}
