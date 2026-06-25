HEAD
class Persona {
  #edad; 

  constructor(nombre, edad) {
    this.nombre = nombre; 
    this.#edad = edad;
  }

  #esMayorDeEdad() {
    return this.#edad >= 18;
  }

  mostrarInformacion() {
    
    let estado = this.#esMayorDeEdad() ? "Mayor de edad" : "Menor de edad";
    return `${this.nombre} tiene ${this.#edad} años y es ${estado}.`;
  }
}

class Estudiante {
  #promedio; 

  constructor(nombre, promedio) {
    this.nombre = nombre; 
    this.#promedio = promedio;
  }

  #evaluarEstado() {

    return this.#promedio >= 13 ? "Aprobado" : "Desaprobado";
  }

  obtenerReporte() {
    return `Estudiante: ${this.nombre}, Estado: ${this.#evaluarEstado()}`;
  }
}

class Profesor {
  #salario; 

  constructor(nombre, salario) {
    this.nombre = nombre; 
    this.#salario = salario;
  }

  #calcularBono() {
    return this.#salario * 0.10; 
  }

  obtenerSalarioTotal() {
    let total = this.#salario + this.#calcularBono();
    return `Profesor ${this.nombre} recibe un total de $${total}.`;
  }
}

class Curso {
  #codigo; 

  constructor(nombre, codigo) {
    this.nombre = nombre; 
    this.#codigo = codigo;
  }

  #formatearCodigo() {
    return `CUR-${this.#codigo}`;
  }

  obtenerDetalles() {
    return `Curso: ${this.nombre} | Código Interno: ${this.#formatearCodigo()}`;
  }
}

class Libro {
  #precio; 

  constructor(titulo, precio) {
    this.titulo = titulo; 
    this.#precio = precio;
  }

  #calcularIGV() {
    return this.#precio * 0.18; 
  }

  obtenerPrecioFinal() {
    let precioFinal = this.#precio + this.#calcularIGV();
    return `El libro "${this.titulo}" cuesta $${precioFinal.toFixed(2)} (IGV incluido).`;
  }
}

class Biblioteca {
  #cantidadLibros; 

  constructor(nombre, cantidadLibros) {
    this.nombre = nombre; 
    this.#cantidadLibros = cantidadLibros;
  }

  #evaluarCapacidad() {
    
    if (this.#cantidadLibros > 10000) return "Biblioteca Grande";
    return "Biblioteca Pequeña/Mediana";
  }

  mostrarEstado() {
    return `${this.nombre} es una ${this.#evaluarCapacidad()} con ${this.#cantidadLibros} libros.`;
  }
}

class Producto {
  #stock; 

  constructor(nombre, stock) {
    this.nombre = nombre; 
    this.#stock = stock;
  }

  #hayStockBajo() {
    return this.#stock < 10;
  }

  revisarInventario() {
    // If / Else implícito: necesitan 2 casos para ser verdes
    if (this.#hayStockBajo()) {
      return `¡Alerta! Poco stock de ${this.nombre} (Quedan ${this.#stock}).`;
    }
    return `Stock adecuado para ${this.nombre}.`;
  }
}

class Cliente {
  #dni; 

  constructor(nombre, dni) {
    this.nombre = nombre; 
    this.#dni = String(dni); 
  }

  #validarDNI() {
    return this.#dni.length === 8;
  }

  registrar() {
    // If / Else: necesitan 2 casos para ser verdes
    if (this.#validarDNI()) {
      return `Cliente ${this.nombre} registrado con éxito.`;
    } else {
      return "Error: El DNI debe tener 8 dígitos.";
    }
  }
}

class Vehiculo {
  #placa; 

  constructor(marca, placa) {
    this.marca = marca; 
    this.#placa = String(placa); 
  }

  #ocultarPlacaParcialmente() {
    let placaVisible = this.#placa.substring(0, 3) + "-XXX";
    return placaVisible;
  }

  mostrarDatosVehiculo() {
    return `Vehículo marca ${this.marca}, Placa: ${this.#ocultarPlacaParcialmente()}`;
  }
}

class Empresa {
  #ruc; 

  constructor(nombre, ruc) {
    this.nombre = nombre; 
    this.#ruc = String(ruc); 
  }

  #validarRUC() {
    // Operador AND (&&): Quokka evalúa si ambos caminos se probaron
    return this.#ruc.startsWith("20") && this.#ruc.length === 11;
  }

  verificarEstadoEmpresa() {
    if (this.#validarRUC()) {
      return `La empresa ${this.nombre} tiene un RUC válido.`;
    } else {
      return `La empresa ${this.nombre} tiene inconsistencias en su RUC.`;
    }
  }
}


new Persona("Ana", 25).mostrarInformacion(); 
new Persona("Luis", 15).mostrarInformacion(); 

// Estudiante (Aprobado y Desaprobado)
new Estudiante("Carlos", 15).obtenerReporte(); 
new Estudiante("Maria", 10).obtenerReporte(); 

// Profesor (Lineal)
new Profesor("Laura", 2000).obtenerSalarioTotal(); 

// Libro (Lineal)
new Libro("Clean Code", 40).obtenerPrecioFinal(); 

// Biblioteca (Grande y Pequeña)
new Biblioteca("Nacional", 15000).mostrarEstado(); 
new Biblioteca("Local", 5000).mostrarEstado(); 

// Producto (Stock bajo y adecuado)
new Producto("Laptops", 5).revisarInventario(); 
new Producto("Monitores", 20).revisarInventario(); 

// Cliente (DNI válido e inválido)
new Cliente("Luis", "12345678").registrar(); 
new Cliente("Pedro", "123").registrar(); 

// Vehículo (Lineal)
new Vehiculo("Toyota", "ABC-123").mostrarDatosVehiculo(); 

// Empresa (RUC válido e inválido)
new Empresa("TechCorp", "20123456789").verificarEstadoEmpresa(); 
new Empresa("FakeCorp", "10123").verificarEstadoEmpresa();

import AlumnoNacional from "./AlumnoNacional.js";
import AlumnoExtranjero from "./AlumnoExtranjero.js";
import AlumnoIntercambio from "./AlumnoIntercambio.js";
import IAsistencia from "./IAsistencia.js";
import Profesor from "./Profesor.js";


const alumnoNacional = new AlumnoNacional(
    1,
    "Daniel",
    "Inche",
    20,
    "999999999",
    new Date("2005-05-15"),
    "Lima",
    "2025001",
    "Sede Lima Centro",
    "Desarrollo de Sistemas"
);


const alumnoExtranjero = new AlumnoExtranjero(
    2,
    "Ana",
    "Mejia",
    22,
    "988888888",
    new Date("2003-01-10"),
    "Chile",
    "AB123456",
    "Español",
    "Sede San Isidro"
);



const alumnoIntercambio = new AlumnoIntercambio(
    3,
    "Dana",
    "Solano",
    21,
    "977777777",
    new Date("2004-03-08"),
    "Instituto Tecnológico de España",
    6,
    "Perú",
    "Intercambio Académico"
);

console.log(alumnoNacional.mostrarDatos());
console.log(alumnoExtranjero.mostrarDatos());
console.log(alumnoIntercambio.mostrarDatos());


alumnoIntercambio.setNombre("Diani")
console.trace(alumnoIntercambio)

alumnoIntercambio.registrarEntrada( new Date());
alumnoIntercambio.registrarSalida( new Date(new Date().setHours(new Date().getHours() + 3)));

alumnoNacional.registrarEntrada( new Date());
alumnoNacional.registrarSalida(  new Date(new Date().setHours(new Date().getHours() + 4)));

alumnoExtranjero.registrarEntrada( new Date());
alumnoExtranjero.registrarSalida( new Date(new Date().setHours(new Date().getHours() + 5)));



const profesor = new Profesor(
    1,
    "Bernabe",
    "Inche",32,
    "999888777",
    new Date("1993-03-08"),
    "Programación",
    "fbinche",
    "Sede ATE",
    "fbinche@idat.pe",
);

profesor.mostrarDatos();
profesor.registrarEntrada(new Date());
profesor.registrarSalida(new Date(new Date().setHours(new Date().getHours() + 5)));


