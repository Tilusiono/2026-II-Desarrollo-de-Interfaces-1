class Empleado {
  #id;
  #nombre;
  #apellidoPaterno;
  #dni;
  #telefono;

  constructor(
    id,
    nombre,
    apellidoPaterno,
    dni,
    telefono,
    salario,
    direccion,
    horaIngreso,
    horaSalida,
    disponible,
    fechaIngreso,
    fechaNacimiento,
  ) {
    this.#id = Number(id);
    this.#nombre = nombre;
    this.#apellidoPaterno = apellidoPaterno;
    this.#dni = Number(dni);
    this.#telefono = telefono;
    this.salario = Number(salario);
    this.direccion = direccion ?? null;
    this.horaIngreso = horaIngreso;
    this.horaSalida = horaSalida;
    this.disponible = Boolean(disponible);
    this.fechaIngreso = fechaIngreso;
    this.fechaNacimiento = fechaNacimiento;
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    this.#id = Number(id);
  }

  get nombre() {
    return this.#nombre;
  }

  set nombre(nombre) {
    this.#nombre = nombre;
  }

  get apellidoPaterno() {
    return this.#apellidoPaterno;
  }

  set apellidoPaterno(apellidoPaterno) {
    this.#apellidoPaterno = apellidoPaterno;
  }

  get dni() {
    return this.#dni;
  }

  set dni(dni) {
    this.#dni = Number(dni);
  }

  get telefono() {
    return this.#telefono;
  }

  set telefono(telefono) {
    this.#telefono = telefono;
  }
}

export default Empleado;