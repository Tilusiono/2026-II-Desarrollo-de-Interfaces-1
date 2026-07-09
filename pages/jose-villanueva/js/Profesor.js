import Persona from "./Persona.js";

class Profesor extends Persona {
  #especialidad;
  #codigoDocente;

  sede;
  correo;

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
  ) {
    super(id, nombre, apellido, edad, telefono, fechaNacimiento);

    this.#especialidad = especialidad;
    this.#codigoDocente = codigoDocente;
    this.sede = sede;
    this.correo = correo;
  }

  mostrarDatos() {
    return `
    Profesor: ${this.getNombre()}
    Especialidad: ${this.#especialidad}
    Sede: ${this.sede}
    Correo: ${this.correo}
    `;
  }

  registrarEntrada(fechaHora, aula, curso) {
    console.log(
      `${this.getNombre()} profesor registró su entrada (${fechaHora.toLocaleString()}) - Aula: ${aula} - Curso: ${curso}`
    );
  }

  registrarSalida(fechaHora, aula, curso) {
    console.log(
      `${this.getNombre()} profesor registró su salida (${fechaHora.toLocaleString()}) - Aula: ${aula} - Curso: ${curso}`
    );
  }
} 

export default Profesor;