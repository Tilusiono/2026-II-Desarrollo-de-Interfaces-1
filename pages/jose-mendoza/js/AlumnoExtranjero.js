import Alumno from "./Alumno.js";

class AlumnoExtranjero extends Alumno {
  // Propiedades privadas
  #paisOrigen;
  #numeroPasaporte;

  // Propiedades públicas
  idioma;
  sede;

  constructor(
    id,
    nombre,
    apellido,
    edad,
    telefono,
    fechaNacimiento,
    paisOrigen,
    numeroPasaporte,
    idioma,
    sede,
  ) {
    super(id, nombre, apellido, edad, telefono, fechaNacimiento);

    this.#paisOrigen = paisOrigen;
    this.#numeroPasaporte = numeroPasaporte;

    this.idioma = idioma;
    this.sede = sede;
  }

  // Métodos privados

  #validarPasaporte() {
    return this.#numeroPasaporte.length >= 8;
  }

  #obtenerPais() {
    return this.#paisOrigen.toUpperCase();
  }

  // Métodos públicos

  mostrarDatos() {
    return `Alumno Extranjero
    Nombre: ${this.getNombre()}
    País: ${this.#obtenerPais()}
    Pasaporte válido: ${this.#validarPasaporte()}
    `;
  }

  cambiarIdioma(nuevoIdioma) {
    this.idioma = nuevoIdioma;
  }

    registrarEntrada(fechaHora, materia) {

        console.log(
            `${this.getNombre()} (Alumno) registró su entrada (${fechaHora.toLocaleString()}) para la clase de ${materia}.`
        );

    }

    registrarSalida(fechaHora,condicion ,nota) {

        console.log(
            `${this.getNombre()} (Alumno) registró su salida (${fechaHora.toLocaleString()}). Estado: ${condicion} | Nota de clase: ${nota}`
        );

    }
}
export default AlumnoExtranjero;
