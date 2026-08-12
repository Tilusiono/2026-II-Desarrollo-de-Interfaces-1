export class AsistenciaRequestDto {
  constructor(requestBody = {}) {
    this.idAsistencia = requestBody.idAsistencia;
    this.fecha = requestBody.fecha;
    this.horaEntrada = requestBody.horaEntrada;
    this.horaSalida = requestBody.horaSalida;
    this.horasTrabajadas = requestBody.horasTrabajadas;
    this.estado = requestBody.estado;
    this.idEmpleado = requestBody.idEmpleado;
  }
}

export class AsistenciaConsultaDto {
  constructor(queryParams = {}) {
        this.texto = queryParams.texto;
        this.fecha = queryParams.fecha;
        this.estado = queryParams.estado;
        this.idEmpleado = queryParams.idEmpleado;
  }
}

export class AsistenciaResponseDto {
  constructor(asistenciaModel) {
        this.idAsistencia = asistenciaModel.idAsistencia;
        this.fecha = asistenciaModel.fecha;
        this.horaEntrada = asistenciaModel.horaEntrada;
        this.horaSalida = asistenciaModel.horaSalida;
        this.horasTrabajadas = asistenciaModel.horasTrabajadas;
        this.estado = asistenciaModel.estado;
        this.idEmpleado = asistenciaModel.idEmpleado;
  }
}
