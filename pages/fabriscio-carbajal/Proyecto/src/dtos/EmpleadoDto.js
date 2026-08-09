export class EmpleadoRequestDto {
  constructor(requestBody = {}) {
    this.nombre = requestBody.nombre;
    this.apellidoPaterno = requestBody.apellidoPaterno;
    this.dni = requestBody.dni;
    this.telefono = requestBody.telefono;
    this.salario = requestBody.salario;
    this.direccion = requestBody.direccion;
    this.horaIngreso = requestBody.horaIngreso;
    this.horaSalida = requestBody.horaSalida;
    this.disponible = requestBody.disponible;
    this.fechaIngreso = requestBody.fechaIngreso;
    this.fechaNacimiento = requestBody.fechaNacimiento;
  }
}

export class EmpleadoConsultaDto {
  constructor(queryParams = {}) {
    this.nombre = queryParams.nombre;
    this.disponible = queryParams.disponible;
    this.salarioMin = queryParams.salarioMin;
    this.salarioMax = queryParams.salarioMax;
    this.fechaIngreso = queryParams.fechaIngreso;
  }
}

export class EmpleadoResponseDto {
  constructor(empleadoModel) {
    this.id = empleadoModel.id;
    this.nombre = empleadoModel.nombre;
    this.apellidoPaterno = empleadoModel.apellidoPaterno;
    this.dni = empleadoModel.dni;
    this.telefono = empleadoModel.telefono;
    this.salario = empleadoModel.salario;
    this.direccion = empleadoModel.direccion;
    this.horaIngreso = empleadoModel.horaIngreso;
    this.horaSalida = empleadoModel.horaSalida;
    this.disponible = empleadoModel.disponible;
    this.fechaIngreso = empleadoModel.fechaIngreso;
    this.fechaNacimiento = empleadoModel.fechaNacimiento;
  }
}