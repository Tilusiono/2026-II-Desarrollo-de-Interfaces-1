import Persona from "./Persona.js";

class Profesor extends Persona {
  #especialidad;
  #codigoDocente;
  #producto;
  #hijos;

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
    producto = null,
    hijos = 0,
  ) {
    super(id, nombre, apellido, edad, telefono, fechaNacimiento);

    this.#especialidad = especialidad;
    this.#codigoDocente = codigoDocente;
    this.sede = sede;
    this.correo = correo;
    this.#producto = producto;
    this.#hijos = hijos;
  }

  mostrarDatos() {
    return `
    Profesor: ${this.getNombre()}
    Especialidad: ${this.#especialidad}
    Sede: ${this.sede}
    Correo: ${this.correo}
    Producto: ${this.#producto ?? "Sin producto"}
    Hijos: ${this.#hijos}
    `;
  }

  tieneProducto() {
    return this.#producto !== null && this.#producto !== "";
  }

  tieneDosHijos() {
    return this.#hijos === 2;
  }

  verificarCondiciones() {
    return this.tieneProducto() && this.tieneDosHijos();
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