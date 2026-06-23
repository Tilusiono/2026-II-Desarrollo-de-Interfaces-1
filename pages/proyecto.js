// 1. Persona
class Persona {
  #nombre;
  #edad;

  constructor(nombre, edad) {
    this.#nombre = nombre;
    this.#edad = edad;
  }

  obtenerNombre() {
    return this.#nombre;
  }

  obtenerEdad() {
    return this.#edad;
  }
}

// 2. Perro
class Perro {
  #nombre;
  #raza;

  constructor(nombre, raza) {
    this.#nombre = nombre;
    this.#raza = raza;
  }

  obtenerNombre() {
    return this.#nombre;
  }

  obtenerRaza() {
    return this.#raza;
  }
}

// 3. Estudiante
class Estudiante {
  #nombre;
  #nota;

  constructor(nombre, nota) {
    this.#nombre = nombre;
    this.#nota = nota;
  }

  obtenerNombre() {
    return this.#nombre;
  }

  obtenerNota() {
    return this.#nota;
  }
}

// 4. Auto
class Auto {
  #marca;
  #velocidad;

  constructor(marca, velocidad) {
    this.#marca = marca;
    this.#velocidad = velocidad;
  }

  obtenerMarca() {
    return this.#marca;
  }

  obtenerVelocidad() {
    return this.#velocidad;
  }
}

// 5. CuentaBancaria
class CuentaBancaria {
  #titular;
  #saldo;

  constructor(titular, saldo) {
    this.#titular = titular;
    this.#saldo = saldo;
  }

  obtenerTitular() {
    return this.#titular;
  }

  obtenerSaldo() {
    return this.#saldo;
  }
}

// 6. Libro
class Libro {
  #titulo;
  #autor;

  constructor(titulo, autor) {
    this.#titulo = titulo;
    this.#autor = autor;
  }

  obtenerTitulo() {
    return this.#titulo;
  }

  obtenerAutor() {
    return this.#autor;
  }
}

// 7. Celular
class Celular {
  #marca;
  #imei;

  constructor(marca, imei) {
    this.#marca = marca;
    this.#imei = imei;
  }

  obtenerMarca() {
    return this.#marca;
  }

  obtenerImei() {
    return this.#imei;
  }
}

// 8. Producto
class Producto {
  #nombre;
  #precio;

  constructor(nombre, precio) {
    this.#nombre = nombre;
    this.#precio = precio;
  }

  obtenerNombre() {
    return this.#nombre;
  }

  obtenerPrecio() {
    return this.#precio;
  }
}

// 9. Pelicula
class Pelicula {
  #nombre;
  #duracion;

  constructor(nombre, duracion) {
    this.#nombre = nombre;
    this.#duracion = duracion;
  }

  obtenerNombre() {
    return this.#nombre;
  }

  obtenerDuracion() {
    return this.#duracion;
  }
}

// 10. Animal
class Animal {
  #nombre;
  #especie;

  constructor(nombre, especie) {
    this.#nombre = nombre;
    this.#especie = especie;
  }

  obtenerNombre() {
    return this.#nombre;
  }

  obtenerEspecie() {
    return this.#especie;
  }
}