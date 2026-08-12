import Alumno from "./Alumno.js";
class AlumnoIntercambio extends Alumno {
  // Propiedades privadas
  #institutoOrigen;
  #duracionMeses;

  // Propiedades públicas
  paisDestino;
  programaIntercambio;

  constructor(
    id,
    nombre,
    apellido,
    edad,
    telefono,
    fechaNacimiento,
    institutoOrigen,
    duracionMeses,
    paisDestino,
    programaIntercambio,
  ) {
    super(id, nombre, apellido, edad, telefono, fechaNacimiento);

    this.#institutoOrigen = institutoOrigen;
    this.#duracionMeses = duracionMeses;

    this.paisDestino = paisDestino;
    this.programaIntercambio = programaIntercambio;
  }

  // Métodos privados

  #esIntercambioLargo() {
    return this.#duracionMeses >= 6;
  }

  #obtenerInstituto() {
    return this.#institutoOrigen.toUpperCase();
  }

  // Métodos públicos

  mostrarDatos() {
    return `Alumno de Intercambio
    Nombre: ${this.getNombre()}
    Instituto de origen: ${this.#obtenerInstituto()}
    Intercambio largo: ${this.#esIntercambioLargo()}
    `;
  }

  cambiarPrograma(nuevoPrograma) {
    this.programaIntercambio = nuevoPrograma;
  }

  registrarEntrada(fechaHora, destino) {
    console.log(
      `${this.getNombre()} inició su intercambio (${fechaHora.toLocaleString()}) con destino a: ${destino}.`,
    );
  }

  registrarSalida(fechaHora,materiasAprobadas,experiencia) {
    console.log(
      `${this.getNombre()} terminó su intercambio (${fechaHora.toLocaleString()}) logrando aprobar ${materiasAprobadas} materias. Valoración: ${experiencia}.`,
    );
  }
}
export default AlumnoIntercambio;
