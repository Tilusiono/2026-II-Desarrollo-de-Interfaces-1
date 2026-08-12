export class PersonaRequestDto {

    constructor(requestBody = {}) {
        this.dni = requestBody.dni;
        this.nombres = requestBody.nombres;
        this.apellidos = requestBody.apellidos;
        this.telefono = requestBody.telefono;
        this.correo = requestBody.correo;
        this.direccion = requestBody.direccion;

    }

}


export class PersonaConsultaDto {

    constructor(queryParams = {}) {
        this.texto = queryParams.texto;
        this.dni = queryParams.dni;
        this.nombres = queryParams.nombres;
        this.apellidos = queryParams.apellidos;

    }

}


export class PersonaResponseDto {

    constructor(personaModel) {
        this.dni = personaModel.getDni();
        this.nombres = personaModel.getNombres();
        this.apellidos = personaModel.getApellidos();
        this.telefono = personaModel.getTelefono();
        this.correo = personaModel.getCorreo();
        this.direccion = personaModel.getDireccion();
        this.nombreCompleto = personaModel.obtenerNombreCompleto();

    }

}