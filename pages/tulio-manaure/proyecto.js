// =================================================================
// parte 1: clase base abstracta (nivel 0)
// =================================================================

class Entidad {
  id; // 1 publica
  #fecha_registro; // 3 privadas
  #estado_activo;
  #usuario_creador;

  constructor(id, creador) {
    if (this.constructor === Entidad) {
      throw new Error("no se puede instanciar una clase abstracta");
    }
    this.id = id;
    this.#fecha_registro = "2026-06-29";
    this.#estado_activo = true;
    this.#usuario_creador = creador;
  }

  obtener_info_base() { // 2 metodos publicos
    this.#validar_acceso();
    return `id: ${this.id} | creado por: ${this.#usuario_creador}`;
  }

  mostrar_estado() {
    return `activo: ${this.#estado_activo}`;
  }

  #validar_acceso() { // 2 metodos privados
    return true;
  }

  #formatear_fecha() {
    return this.#fecha_registro.trim();
  }
}

// =================================================================
// parte 2: herencia nivel 1 - clase ser vivo
// =================================================================

class SerVivo extends Entidad {
  especie; // 1 publica
  #edad; // 3 privadas
  #peso;
  #habitad;

  constructor(id, creador, especie, edad, peso, habitad) {
    super(id, creador);
    this.especie = especie;
    this.#edad = edad;
    this.#peso = peso;
    this.#habitad = habitad;
  }

  obtener_info_base() { // 2 publicos (polimorfismo)
    return `${super.obtener_info_base()} | especie: ${this.especie}`;
  }

  obtener_detalles() {
    this.#crecer();
    return `edad: ${this.#edad} | habitad: ${this.#habitad}`;
  }

  #crecer() { // 2 privados
    this.#edad++;
  }

  #modificar_peso(nuevo) {
    this.#peso = nuevo;
  }
}

// =================================================================
// parte 3: herencia nivel 1 - clase producto
// =================================================================

class Producto extends Entidad {
  codigo; // 1 publica
  #precio_base; // 3 privadas
  #stock;
  #categoria;

  constructor(id, creador, codigo, precio, stock, cat) {
    super(id, creador);
    this.codigo = codigo;
    this.#precio_base = precio;
    this.#stock = stock;
    this.#categoria = cat;
  }

  obtener_info_base() { // 2 publicos
    return `${super.obtener_info_base()} | codigo: ${this.codigo}`;
  }

  calcular_total(cantidad) {
    if (this.#verificar_stock(cantidad)) {
      return cantidad * this.#aplicar_descuento();
    }
    return 0;
  }

  #verificar_stock(cant) { // 2 privados
    return this.#stock >= cant;
  }

  #aplicar_descuento() {
    return this.#precio_base * 0.90;
  }
}

// =================================================================
// parte 4: herencia nivel 1 - clase vehiculo
// =================================================================

class Vehiculo extends Entidad {
  placa; // 1 publica
  #marca; // 3 privadas
  #modelo;
  #encendido;

  constructor(id, creador, placa, marca, modelo) {
    super(id, creador);
    this.placa = placa;
    this.#marca = marca;
    this.#modelo = modelo;
    this.#encendido = false;
  }

  obtener_info_base() { // 2 publicos
    return `${super.obtener_info_base()} | placa: ${this.placa}`;
  }

  conducir() {
    this.#encender_motor();
    return `manejando vehiculo ${this.#marca}`;
  }

  #encender_motor() { // 2 privados
    this.#encendido = true;
  }

  #apagar_motor() {
    this.#encendido = false;
  }
}

// =================================================================
// parte 5: herencia nivel 2 - clase persona (hijo de ser_vivo)
// =================================================================

class Persona extends SerVivo {
  dni; // 1 publica
  #nombre; // 3 privadas
  #correo;
  #telefono;

  constructor(id, creador, especie, edad, peso, habitad, dni, nombre, correo, telefono) {
    super(id, creador, especie, edad, peso, habitad);
    this.dni = dni;
    this.#nombre = nombre;
    this.#correo = correo;
    this.#telefono = telefono;
  }

  obtener_info_base() { // 2 publicos
    return `${super.obtener_info_base()} | dni: ${this.dni} | nombre: ${this.#nombre}`;
  }

  enviar_notificacion(mensaje) {
    if (this.#validar_canal()) {
      return `enviado a ${this.#correo}: ${mensaje}`;
    }
    return "error";
  }

  #validar_canal() { // 2 privados
    return this.#correo.includes("@");
  }

  #formatear_nombre() {
    return this.#nombre.toLowerCase();
  }
}

// =================================================================
// parte 6: herencia nivel 2 - clase perro (hijo de ser_vivo)
// =================================================================

class Perro extends SerVivo {
  chip; // 1 publica
  #apodo; // 3 privadas
  #raza;
  #vacunado;

  constructor(id, creador, especie, edad, peso, habitad, chip, apodo, raza) {
    super(id, creador, especie, edad, peso, habitad);
    this.chip = chip;
    this.#apodo = apodo;
    this.#raza = raza;
    this.#vacunado = true;
  }

  obtener_info_base() { // 2 publicos
    return `${super.obtener_info_base()} | chip: ${this.chip}`;
  }

  hacer_sonido() {
    this.#ladrar();
    return `${this.#apodo} dice guau`;
  }

  #ladrar() { // 2 privados
    this.#mover_cola();
  }

  #mover_cola() {
    return true;
  }
}

// =================================================================
// parte 7: herencia nivel 2 - clase estudiante (hijo de persona)
// =================================================================

class Estudiante extends Persona {
  matricula; // 1 publica
  #nota1; // 3 privadas
  #nota2;
  #asistencia;

  constructor(id, creador, especie, edad, peso, habitad, dni, nombre, correo, telefono, matricula, n1, n2) {
    super(id, creador, especie, edad, peso, habitad, dni, nombre, correo, telefono);
    this.matricula = matricula;
    this.#nota1 = n1;
    this.#nota2 = n2;
    this.#asistencia = 100;
  }

  obtener_info_base() { // 2 publicos
    return `${super.obtener_info_base()} | matricula: ${this.matricula}`;
  }

  obtener_promedio() {
    let final = this.#calcular_media();
    return `promedio: ${final} | estado: ${this.#evaluar_estado(final)}`;
  }

  #calcular_media() { // 2 privados
    return (this.#nota1 + this.#nota2) / 2;
  }

  #evaluar_estado(nota) {
    return nota >= 10.5 ? "aprobado" : "desaprobado";
  }
}

// =================================================================
// parte 8: herencia nivel 2 - clase auto (hijo de vehiculo)
// =================================================================

class Auto extends Vehiculo {
  tipo_combustible; // 1 publica
  #kilometraje; // 3 privadas
  #puertas;
  #seguro_vencido;

  constructor(id, creador, placa, marca, modelo, combustible, puertas) {
    super(id, creador, placa, marca, modelo);
    this.tipo_combustible = combustible;
    this.#kilometraje = 0;
    this.#puertas = puertas;
    this.#seguro_vencido = false;
  }

  obtener_info_base() { // 2 publicos
    return `${super.obtener_info_base()} | combustible: ${this.tipo_combustible}`;
  }

  viajar(distancia) {
    if (this.#revisar_seguro()) {
      this.#incrementar_km(distancia);
      return `viaje de ${distancia} km realizado`;
    }
    return "error de seguro";
  }

  #incrementar_km(cant) { // 2 privados
    this.#kilometraje += cant;
  }

  #revisar_seguro() {
    return !this.#seguro_vencido;
  }
}

// =================================================================
// parte 9: clase libro (nivel 2) y cuenta bancaria (nivel 1)
// =================================================================

// 9. clase libro (hijo de producto - nivel 2)
class Libro extends Producto {
  isbn; // 1 publica
  #titulo; // 3 privadas
  #autor;
  #paginas;

  constructor(id, creador, codigo, precio, stock, cat, isbn, titulo, autor, paginas) {
    super(id, creador, codigo, precio, stock, cat);
    this.isbn = isbn;
    this.#titulo = titulo;
    this.#autor = autor;
    this.#paginas = paginas;
  }

  obtener_info_base() { // 2 publicos
    return `${super.obtener_info_base()} | isbn: ${this.isbn}`;
  }

  leer_sinopsis() {
    this.#abrir_libro();
    return `leyendo "${this.#titulo}" de ${this.#autor}`;
  }

  #abrir_libro() { // 2 privados
    this.#registrar_lectura();
  }

  #registrar_lectura() {
    return true;
  }
}

// 10. clase cuenta bancaria (hijo directo de entidad - nivel 1)
class CuentaBancaria extends Entidad {
  numero_cuenta; // 1 publica
  #titular; // 3 privadas
  #saldo;
  #pin;

  constructor(id, creador, numero, titular, saldo, pin) {
    super(id, creador);
    this.numero_cuenta = numero;
    this.#titular = titular;
    this.#saldo = saldo;
    this.#pin = pin;
  }

  obtener_info_base() { // 2 publicos
    return `${super.obtener_info_base()} | cuenta: ${this.numero_cuenta}`;
  }

  retirar(monto, pin_ingresado) {
    if (this.#validar_pin(pin_ingresado) && this.#fondos_suficientes(monto)) {
      this.#saldo -= monto;
      return `retiro exitoso. nuevo saldo: ${this.#saldo}`;
    }
    return "rechazado";
  }

  #validar_pin(ingreso) { // 2 privados
    return this.#pin === ingreso;
  }

  #fondos_suficientes(monto) {
    return this.#saldo >= monto;
  }
}

// =================================================================
// parte 10: ejecucion y pruebas en consola
// =================================================================

console.log("--- simulacion sistema poo ---");

// instanciar el estudiante (entidad -> ser_vivo -> persona -> estudiante)
const est = new Estudiante(
  1, "admin", "humano", 18, 70, "ciudad", 
  "77777777", "tulio", "tulio@correo.com", "999888777", 
  "mat-2026", 14, 18
);

console.log(est.obtener_info_base());
console.log(est.obtener_promedio());

// instanciar un libro (entidad -> producto -> libro)
const mi_libro = new Libro(
  2, "sistema", "prod-101", 50, 10, "educacion", 
  "111-222", "javascript avanzado", "autor x", 300
);

console.log(mi_libro.obtener_info_base());
console.log(mi_libro.leer_sinopsis());