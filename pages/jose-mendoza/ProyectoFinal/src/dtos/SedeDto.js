export class SedeRequestDto {

    constructor(requestBody = {}) {

        this.idSede = requestBody.idSede;
        this.nombre = requestBody.nombre;
        this.direccion = requestBody.direccion;
        this.telefono = requestBody.telefono;
        this.capacidad = requestBody.capacidad;
        // CONVERSIÓN DE ENTRADA: Si envían "Activo", lo guarda como 1. Si no, como 0.
        this.estado = requestBody.estado === "Activo" ? 1 : 0;
        this.horaApertura = requestBody.horaApertura;
        this.fechaInauguracion = requestBody.fechaInauguracion;

    }

}

export class SedeConsultaDto {

    constructor(queryParams = {}) {

        this.texto = queryParams.texto;
        this.nombre = queryParams.nombre;
        this.estado = queryParams.estado;

    }

}

export class SedeResponseDto {

    constructor(sedeModel) {

        this.idSede = sedeModel.getIdSede();
        this.nombre = sedeModel.getNombre();
        this.direccion = sedeModel.getDireccion();
        this.telefono = sedeModel.getTelefono();
        this.capacidad = sedeModel.getCapacidad();
        // CONVERSIÓN DE SALIDA: Si la BD tiene 1, devuelve "Activo". Si tiene 0, "Inactivo".
        this.estado = Number(sedeModel.getEstado()) === 1 ? "Activo" : "Inactivo";
        this.horaApertura = sedeModel.getHoraApertura();
        this.fechaInauguracion = sedeModel.getFechaInauguracion();

    }

}