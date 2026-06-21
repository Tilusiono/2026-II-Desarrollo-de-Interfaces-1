class Persona {
  #edad;

  constructor(nombre, edad) {
    this.nombre = nombre;
    this.#edad = edad;
  }

  getEdad() {
    return this.#edad;
  }
}

class Estudiante {
  #promedio;

  constructor(nombre, promedio) {
    this.nombre = nombre;
    this.#promedio = promedio;
  }

  getPromedio() {
    return this.#promedio;
  }
}

class Profesor {
  #salario;

  constructor(nombre, salario) {
    this.nombre = nombre;
    this.#salario = salario;
  }
}

class Curso {
  #codigo;

  constructor(nombre, codigo) {
    this.nombre = nombre;
    this.#codigo = codigo;
  }
}

class Libro {
  #precio;

  constructor(titulo, precio) {
    this.titulo = titulo;
    this.#precio = precio;
  }
}

class Biblioteca {
  #cantidadLibros;

  constructor(nombre, cantidadLibros) {
    this.nombre = nombre;
    this.#cantidadLibros = cantidadLibros;
  }
}

class Producto {
  #stock;

  constructor(nombre, stock) {
    this.nombre = nombre;
    this.#stock = stock;
  }
}

class Cliente {
  #dni;

  constructor(nombre, dni) {
    this.nombre = nombre;
    this.#dni = dni;
  }
}

class Vehiculo {
  #placa;

  constructor(marca, placa) {
    this.marca = marca;
    this.#placa = placa;
  }
}

class Empresa {
  #ruc;

  constructor(nombre, ruc) {
    this.nombre = nombre;
    this.#ruc = ruc;
  }
}