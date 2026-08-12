export class EmpleadoRequestDto {
    constructor(requestBody = {}) {

        // herencia de padre persona
        this.dni = requestBody.dni;
        this.nombres = requestBody.nombres;
        this.apellidos = requestBody.apellidos;
        this.telefono = requestBody.telefono;
        this.correo = requestBody.correo;
        this.direccion = requestBody.direccion;
        // ----------------
        this.idEmpleado = requestBody.idEmpleado;
        this.fechaIngreso = requestBody.fechaIngreso;
        this.salario = requestBody.salario;
        this.estado = requestBody.estado; 
        this.idTipoEmpleado = requestBody.idTipoEmpleado;
        this.idCargo = requestBody.idCargo;
        this.idArea = requestBody.idArea;
        this.idSede = requestBody.idSede;

    }

}


export class EmpleadoConsultaDto {
    constructor(queryParams = {}) {

        this.texto = queryParams.texto;
        this.dni = queryParams.dni;
        this.nombres = queryParams.nombres;
        this.apellidos = queryParams.apellidos;
        this.estado = queryParams.estado;
        this.idTipoEmpleado = queryParams.idTipoEmpleado;
        this.idCargo = queryParams.idCargo;
        this.idArea = queryParams.idArea;
        this.idSede = queryParams.idSede;

    }

}


export class EmpleadoResponseDto {
    constructor(empleadoModel) {

        this.dni = empleadoModel.getDni ? empleadoModel.getDni() : empleadoModel.dni;
        this.nombres = empleadoModel.getNombres ? empleadoModel.getNombres() : empleadoModel.nombres;
        this.apellidos = empleadoModel.getApellidos ? empleadoModel.getApellidos() : empleadoModel.apellidos;
        this.telefono = empleadoModel.getTelefono ? empleadoModel.getTelefono() : empleadoModel.telefono;
        this.correo = empleadoModel.getCorreo ? empleadoModel.getCorreo() : empleadoModel.correo;
        this.direccion = empleadoModel.getDireccion ? empleadoModel.getDireccion() : empleadoModel.direccion;
        
        // heredados
        this.idEmpleado = empleadoModel.getIdEmpleado ? empleadoModel.getIdEmpleado() : empleadoModel.idEmpleado;
        this.fechaIngreso = empleadoModel.getFechaIngreso ? empleadoModel.getFechaIngreso() : empleadoModel.fechaIngreso;
        this.salario = empleadoModel.getSalario ? empleadoModel.getSalario() : empleadoModel.salario;
        
        // para conciderar los activos y inactivos
        const estadoVal = empleadoModel.getEstado ? empleadoModel.getEstado() : empleadoModel.estado;
        this.estado = Number(estadoVal) === 1 ? "Activo" : "Inactivo";
        
        this.idTipoEmpleado = empleadoModel.getIdTipoEmpleado ? empleadoModel.getIdTipoEmpleado() : empleadoModel.idTipoEmpleado;
        this.idCargo = empleadoModel.getIdCargo ? empleadoModel.getIdCargo() : empleadoModel.idCargo;
        this.idArea = empleadoModel.getIdArea ? empleadoModel.getIdArea() : empleadoModel.idArea;
        this.idSede = empleadoModel.getIdSede ? empleadoModel.getIdSede() : empleadoModel.idSede;
        this.nombreTipoEmpleado = empleadoModel.nombreTipoEmpleado || "Sin Tipo";
        this.nombreArea = empleadoModel.nombreArea || "Sin Área";
        this.nombreCargo = empleadoModel.nombreCargo || "Sin Cargo";
    }
}