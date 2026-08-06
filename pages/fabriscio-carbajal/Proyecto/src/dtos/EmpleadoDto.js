export class VendedorRequestDto {
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

export class VendedorConsultaDto {
  constructor(queryParams = {}) {
    this.texto = queryParams.texto;
    this.disponible = queryParams.disponible;
    this.salarioMin = queryParams.salarioMin;
    this.salarioMax = queryParams.salarioMax;
    this.fechaIngreso = queryParams.fechaIngreso;
  }
}

export class VendedorResponseDto {
  constructor(vendedorModel) {
    this.id = vendedorModel.id;
    this.nombre = vendedorModel.nombre;
    this.apellidoPaterno = vendedorModel.apellidoPaterno;
    this.dni = vendedorModel.dni;
    this.telefono = vendedorModel.telefono;
    this.salario = vendedorModel.salario;
    this.direccion = vendedorModel.direccion;
    this.horaIngreso = vendedorModel.horaIngreso;
    this.horaSalida = vendedorModel.horaSalida;
    this.disponible = vendedorModel.disponible;
    this.fechaIngreso = vendedorModel.fechaIngreso;
    this.fechaNacimiento = vendedorModel.fechaNacimiento;
  }
}