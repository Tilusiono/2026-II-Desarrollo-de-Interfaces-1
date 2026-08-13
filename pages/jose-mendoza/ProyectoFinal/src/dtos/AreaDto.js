export class AreaRequestDto {
    constructor(requestBody = {}) {
        this.idArea = requestBody.idArea;
        this.nombre = requestBody.nombre;
        this.descripcion = requestBody.descripcion;
        this.capacidad = requestBody.capacidad;
        this.idSede = requestBody.idSede;
        this.idJefe = requestBody.idJefe;
    }
}

export class AreaConsultaDto {
    constructor(queryParams = {}) {
        this.texto = queryParams.texto;
        this.nombre = queryParams.nombre;
        this.idSede = queryParams.idSede;
        this.idJefe = queryParams.idJefe;
    }
}

export class AreaResponseDto {
    constructor(areaModel) {
        this.idArea = areaModel.idArea;
        this.nombre = areaModel.nombre;
        this.descripcion = areaModel.descripcion;
        this.capacidad = areaModel.capacidad;
        this.idSede = areaModel.idSede;
        this.idJefe = areaModel.idJefe;

        this.nombreSede = areaModel.nombreSede || "Sin Sede";
        this.jefe = areaModel.nombreJefe || "Sin Asignar";
    }
}