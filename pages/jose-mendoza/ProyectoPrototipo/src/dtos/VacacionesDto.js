export class VacacionesRequestDto {

    constructor(requestBody = {}) {

        this.idVacacion = requestBody.idVacacion;
        this.fechaInicio = requestBody.fechaInicio;
        this.fechaFin = requestBody.fechaFin;
        this.cantidadDias = requestBody.cantidadDias;
        this.estado = requestBody.estado;
        this.observacion = requestBody.observacion;
        this.idEmpleado = requestBody.idEmpleado;

    }

}


export class VacacionesConsultaDto {

    constructor(queryParams = {}) {

        this.texto = queryParams.texto;
        this.fechaInicio = queryParams.fechaInicio;
        this.fechaFin = queryParams.fechaFin;
        this.estado = queryParams.estado;
        this.idEmpleado = queryParams.idEmpleado;

    }

}


export class VacacionesResponseDto {

    constructor(vacacionesModel) {

        this.idVacacion = vacacionesModel.getIdVacacion();
        this.fechaInicio = vacacionesModel.getFechaInicio();
        this.fechaFin = vacacionesModel.getFechaFin();
        this.cantidadDias = vacacionesModel.getCantidadDias();
        this.estado = vacacionesModel.getEstado();
        this.observacion = vacacionesModel.getObservacion();
        this.idEmpleado = vacacionesModel.getIdEmpleado();

    }

}