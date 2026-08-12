class Asistencia {
    #idAsistencia;
    #fecha;
    #horaEntrada;
    #horaSalida
    #horasTrabajadas;
    #estado;
    #idEmpleado;    
  constructor(
    idAsistencia,
    fecha,
    horaEntrada = null,
    horaSalida = null,
    horasTrabajadas = null,
    estado = "Presente",
    idEmpleado = null
  ) {
    this._idAsistencia = idAsistencia;
    this._fecha = fecha;
    this._horaEntrada = horaEntrada;
    this._horaSalida = horaSalida;
    this._horasTrabajadas = horasTrabajadas;
    this._estado = estado;
    this._idEmpleado = idEmpleado;
  }

  // Getters & Setters
  get idAsistencia() {
    return this._idAsistencia;
  }

  set idAsistencia(idAsistencia) {
    this._idAsistencia = idAsistencia;
  }

  get fecha() {
    return this._fecha;
  }

  set fecha(fecha) {
    this._fecha = fecha;
  }

  get horaEntrada() {
    return this._horaEntrada;
  }

  set horaEntrada(horaEntrada) {
    this._horaEntrada = horaEntrada;
  }

  get horaSalida() {
    return this._horaSalida;
  }

  set horaSalida(horaSalida) {
    this._horaSalida = horaSalida;
  }

  get horasTrabajadas() {
    return this._horasTrabajadas;
  }

  set horasTrabajadas(horasTrabajadas) {
    this._horasTrabajadas = horasTrabajadas;
  }

  get estado() {
    return this._estado;
  }

  set estado(estado) {
    this._estado = estado;
  }

  get idEmpleado() {
    return this._idEmpleado;
  }

  set idEmpleado(idEmpleado) {
    this._idEmpleado = idEmpleado;
  }
}

export default Asistencia;