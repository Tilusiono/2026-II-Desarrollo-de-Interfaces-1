class Profesor extends Persona {
  #especialidad;
  #codigoDocente;
  #salario; 

  sede;
  correo;
  departamento; 
  tipoContrato; 
  gradosAcademicos;

  constructor(
    id,
    nombre,
    apellido,
    edad,
    telefono,
    fechaNacimiento,
    especialidad,
    codigoDocente,
    sede,
    correo,
    departamento,   
    tipoContrato,  
    salario,          
    gradosAcademicos  
  ) {
    super(id, nombre, apellido, edad, telefono, fechaNacimiento);

    this.#especialidad = especialidad;
    this.#codigoDocente = codigoDocente;
    this.sede = sede;
    this.correo = correo;
    
    // Asignación de los nuevos parámetros
    this.departamento = departamento;
    this.tipoContrato = tipoContrato;
    this.#salario = salario;
    this.gradosAcademicos = gradosAcademicos;
  }

  mostrarDatos() {

    return `
    Profesor: ${this.getNombre()}
    Especialidad: ${this.#especialidad}
    Departamento: ${this.departamento}
    Sede: ${this.sede}
    Correo: ${this.correo}
    Tipo de Contrato: ${this.tipoContrato}
    `;
  }

  registrarEntrada(fechaHora) {
    console.log(
      `${this.getNombre()} profesor registró su entrada (${fechaHora.toLocaleString()})`,
    );
  }

  registrarSalida(fechaHora) {
    console.log(
      `${this.getNombre()} profesor registró su salida (${fechaHora.toLocaleString()})`,
    );
  }

  getSalario() {
    return this.#salario;
  }
}

export default Profesor;