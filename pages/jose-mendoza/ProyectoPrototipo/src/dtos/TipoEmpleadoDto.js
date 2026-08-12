export class TipoEmpleadoRequestDto {

    constructor(requestBody = {}) {

        this.idTipoEmpleado = requestBody.idTipoEmpleado;
        this.nombre = requestBody.nombre;

    }

}


export class TipoEmpleadoConsultaDto {

    constructor(queryParams = {}) {

        this.texto = queryParams.texto;
        this.nombre = queryParams.nombre;

    }

}


export class TipoEmpleadoResponseDto {

    constructor(tipoEmpleadoModel) {

        this.idTipoEmpleado = tipoEmpleadoModel.getIdTipoEmpleado();
        this.nombre = tipoEmpleadoModel.getNombre();

    }

}