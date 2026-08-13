export class TarjetaGraficaRequestDto {
  constructor({
    codigo,
    modelo,
    fabricante,
    memoriaGb,
    precio,
    frecuenciaMhz,
    descripcion,
    registro,
    fechaLanzamiento,
    horaRegistro,
    fechaHoraRegistro,
    imagenBase64,
  } = {}) {
    this.codigo = codigo;
    this.modelo = modelo;
    this.fabricante = fabricante;
    this.memoriaGb = memoriaGb;
    this.precio = precio;
    this.frecuenciaMhz = frecuenciaMhz;
    this.descripcion = descripcion;
    this.registro = registro;
    this.fechaLanzamiento = fechaLanzamiento;
    this.horaRegistro = horaRegistro;
    this.fechaHoraRegistro = fechaHoraRegistro;
    this.imagenBase64 = imagenBase64;
  }
}

export class TarjetaGraficaConsultaDto {
  constructor({ texto, fabricante, registro, precioMin, precioMax } = {}) {
    this.texto = texto;
    this.fabricante = fabricante;
    this.registro = registro;
    this.precioMin = precioMin;
    this.precioMax = precioMax;
  }
}

export class TarjetaGraficaResponseDto {
  constructor(tarjetaGrafica) {
    this.id = tarjetaGrafica.id;
    this.codigo = tarjetaGrafica.codigo;
    this.modelo = tarjetaGrafica.modelo;
    this.fabricante = tarjetaGrafica.fabricante;
    this.memoriaGb = tarjetaGrafica.memoriaGb;
    this.precio = tarjetaGrafica.precio;
    this.frecuenciaMhz = tarjetaGrafica.frecuenciaMhz;
    this.descripcion = tarjetaGrafica.descripcion;
    this.registro = tarjetaGrafica.registro;
    this.fechaLanzamiento = tarjetaGrafica.fechaLanzamiento;
    this.horaRegistro = tarjetaGrafica.horaRegistro;
    this.fechaHoraRegistro = tarjetaGrafica.fechaHoraRegistro;
    this.imagenMimeType = tarjetaGrafica.imagenMimeType;
    this.imagenBase64 = tarjetaGrafica.imagenBase64;
  }
}
