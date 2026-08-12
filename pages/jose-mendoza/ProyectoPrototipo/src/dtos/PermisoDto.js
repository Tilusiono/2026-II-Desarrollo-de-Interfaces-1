export class PermisoRequestDto {

    constructor(requestBody = {}) {

        this.idPermiso = requestBody.idPermiso;
        this.tipoPermiso = requestBody.tipoPermiso;
        this.fechaInicio = requestBody.fechaInicio;
        this.fechaFin = requestBody.fechaFin;
        this.motivo = requestBody.motivo;
        this.estado = requestBody.estado;
        this.idEmpleado = requestBody.idEmpleado;

    }

}


export class PermisoConsultaDto {

    constructor(queryParams = {}) {

        this.texto = queryParams.texto;
        this.tipoPermiso = queryParams.tipoPermiso;
        this.fechaInicio = queryParams.fechaInicio;
        this.fechaFin = queryParams.fechaFin;
        this.estado = queryParams.estado;
        this.idEmpleado = queryParams.idEmpleado;

    }

}


export class PermisoResponseDto {

    constructor(permisoModel) {

        this.idPermiso = permisoModel.getIdPermiso();
        this.tipoPermiso = permisoModel.getTipoPermiso();
        this.fechaInicio = permisoModel.getFechaInicio();
        this.fechaFin = permisoModel.getFechaFin();
        this.motivo = permisoModel.getMotivo();
        this.estado = permisoModel.getEstado();
        this.idEmpleado = permisoModel.getIdEmpleado();

    }

}