export class CargoRequestDto {
  constructor(requestBody = {}) {
        this.idCargo = requestBody.idCargo;
        this.nombre = requestBody.nombre;
        this.descripcion = requestBody.descripcion;
        this.sueldoBase = requestBody.sueldoBase;
  }
}

export class CargoConsultaDto {
  constructor(queryParams = {}) {
        this.texto = queryParams.texto;
        this.nombre = queryParams.nombre;
  }
}

export class CargoResponseDto {
  constructor(cargoModel) {
        this.idCargo = cargoModel.getIdCargo();
        this.nombre = cargoModel.getNombre();
        this.descripcion = cargoModel.getDescripcion();
        this.sueldoBase = cargoModel.getSueldoBase();
  }
}
