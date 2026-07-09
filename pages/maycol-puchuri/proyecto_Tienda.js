class Persona {
  #id;
  #nombre;

  constructor(id, nombre) {
    this.#id = id;
    this.#nombre = nombre;
  }

  get id() { return this.#id; }
  set id(nuevoId) { this.#id = nuevoId; }

  get nombre() { return this.#nombre; }
  set nombre(nuevoNombre) { this.#nombre = nuevoNombre; }
}

class Cliente extends Persona {
  #documento;
  #email;

  constructor(id, nombre, documento, email) {
    super(id, nombre);
    this.#documento = documento;
    this.#email = email;
  }

  get documento() { return this.#documento; }
  set documento(nuevoDocumento) { this.#documento = nuevoDocumento; }

  get email() { return this.#email; }
  set email(nuevoEmail) { this.#email = nuevoEmail; }
}

class Cajero extends Persona {
  #cajaAsignada; 
  #turno;

  constructor(id, nombre, cajaAsignada, turno) {
    super(id, nombre);
    this.#cajaAsignada = cajaAsignada;
    this.#turno = turno;
  }

  get cajaAsignada() { return this.#cajaAsignada; }
  set cajaAsignada(nuevaCaja) { this.#cajaAsignada = nuevaCaja; }

  get turno() { return this.#turno; }
  set turno(nuevoTurno) { this.#turno = nuevoTurno; }

  // <--- [SOLICITADO: 1. Método Público]
  rotarTurno() {
    if (this.#turno === 'Mañana') this.#turno = 'Tarde';
    else if (this.#turno === 'Tarde') this.#turno = 'Noche';
  }
}

class Categoria {
  #id;
  #nombre;
  #descripcion;

  constructor(id, nombre, descripcion) {
    this.#id = id;
    this.#nombre = nombre;
    this.#descripcion = descripcion;
  }

  get id() { return this.#id; }
  set id(nuevoId) { this.#id = nuevoId; }

  get nombre() { return this.#nombre; }
  set nombre(nuevoNombre) { this.#nombre = nuevoNombre; }

  get descripcion() { return this.#descripcion; }
  set descripcion(nuevaDescripcion) { this.#descripcion = nuevaDescripcion; }
}

class Inventario {
  #producto;
  #stockActual;
  #stockMinimo;

  constructor(producto, stockInicial, stockMinimo) {
    this.#producto = producto;
    this.#stockActual = stockInicial;
    this.#stockMinimo = stockMinimo;
  }

  get producto() { return this.#producto; }
  set producto(nuevoProducto) { this.#producto = nuevoProducto; }

  get stockActual() { return this.#stockActual; }
  set stockActual(cantidad) {
    if (cantidad < 0) throw new Error("El stock no puede ser negativo.");
    this.#stockActual = cantidad;
  }

  get stockMinimo() { return this.#stockMinimo; }
  set stockMinimo(cantidad) {
    if (cantidad < 0) throw new Error("El stock mínimo no puede ser negativo.");
    this.#stockMinimo = cantidad;
  }

  descontarStock(cantidad) {
    if (cantidad > this.#stockActual) {
      throw new Error(`Stock insuficiente para ${this.#producto.nombre}`);
    }
    this.#stockActual -= cantidad;
  }

  agregarStock(cantidad) {
    if (cantidad < 0) throw new Error("No puedes agregar stock negativo.");
    this.#stockActual += cantidad;
  }
}

class Proveedor {
  #id;
  #razonSocial;
  #ruc;
  #telefono;

  constructor(id, razonSocial, ruc, telefono) {
    this.#id = id;
    this.#razonSocial = razonSocial;
    this.#ruc = ruc;
    this.#telefono = telefono;
  }

  get id() { return this.#id; }
  set id(nuevoId) { this.#id = nuevoId; }

  get razonSocial() { return this.#razonSocial; }
  set razonSocial(nuevaRazon) { this.#razonSocial = nuevaRazon; }

  get ruc() { return this.#ruc; }
  set ruc(nuevoRuc) { this.#ruc = nuevoRuc; }

  get telefono() { return this.#telefono; }
  set telefono(nuevoTelefono) { this.#telefono = nuevoTelefono; }
}

class Almacen {
  #id;
  #ubicacion;
  #capacidadMaxima;

  constructor(id, ubicacion, capacidadMaxima) {
    this.#id = id;
    this.#ubicacion = ubicacion;
    this.#capacidadMaxima = capacidadMaxima;
  }

  get id() { return this.#id; }
  set id(nuevoId) { this.#id = nuevoId; }

  get ubicacion() { return this.#ubicacion; }
  set ubicacion(nuevaUbicacion) { this.#ubicacion = nuevaUbicacion; }

  get capacidadMaxima() { return this.#capacidadMaxima; }
  set capacidadMaxima(nuevaCapacidad) {
    if (nuevaCapacidad < 0) throw new Error("La capacidad no puede ser negativa.");
    this.#capacidadMaxima = nuevaCapacidad;
  }
}

class Descuento {
  #codigo;
  #porcentaje;
  #activo;

  constructor(codigo, porcentaje) {
    this.#codigo = codigo;
    this.#porcentaje = porcentaje;
    this.#activo = true;
  }

  get codigo() { return this.#codigo; }
  set codigo(nuevoCodigo) { this.#codigo = nuevoCodigo; }

  get porcentaje() { return this.#porcentaje; }
  set porcentaje(nuevoPorcentaje) {
    if (nuevoPorcentaje < 0 || nuevoPorcentaje > 100) {
      throw new Error("El porcentaje debe estar entre 0 y 100.");
    }
    this.#porcentaje = nuevoPorcentaje;
  }

  get activo() { return this.#activo; }
  set activo(estado) { this.#activo = Boolean(estado); }

  aplicar(montoTotal) {
    if (!this.#activo) return montoTotal;
    return montoTotal - (montoTotal * (this.#porcentaje / 100));
  }
}

class Impuesto {
  #nombre;
  #tasa;

  constructor(nombre, tasa) {
    this.#nombre = nombre;
    this.#tasa = tasa;
  }

  get nombre() { return this.#nombre; }
  set nombre(nuevoNombre) { this.#nombre = nuevoNombre; }

  get tasa() { return this.#tasa; }
  set tasa(nuevaTasa) {
    if (nuevaTasa < 0) throw new Error("La tasa de impuesto no puede ser negativa.");
    this.#tasa = nuevaTasa;
  }

  calcularImpuesto(montoBase) {
    return montoBase * this.#tasa;
  }
}


export class Comprobante {
  numeroSerie; 
  tipoDocumento;
  compra;
  cliente;

  constructor(numeroSerie, tipoDocumento, compra, cliente) {
    this.#verificarCompraPagada(compra); // Uso del método privado
    this.numeroSerie = numeroSerie;
    this.tipoDocumento = tipoDocumento;
    this.compra = compra;
    this.cliente = cliente;
  }
  
  #verificarCompraPagada(compra) {
    if (compra.estado !== 'Pagado') {
      throw new Error("No se puede emitir un comprobante de una compra no pagada.");
    }
  }
}

export class Tienda {
  id;
  nombre;
  direccion; 

  constructor(id, nombre, direccion) {
    this.id = id;
    this.nombre = nombre;
    this.direccion = direccion;
  }
}

// PRUEBA DE EJECUCIÓN (Simulación en Caja)
// ==========================================

// 1. Creamos el catálogo de productos disponibles
const pan = new Producto('PROD01', 'Pan Integral', 2.50);
const leche = new Producto('PROD02', 'Leche Entera', 4.20);

// 2. Iniciamos una nueva transacción de compra
const miCompra = new Compra('COMP-001');

console.log("--- Registrando artículos ---");
// El cajero agrega productos de forma sucesiva (Bucle de compra)
miCompra.agregarProducto(pan, 3);   // 3 * 2.50 = 7.50
miCompra.agregarProducto(leche, 2); // 2 * 4.20 = 8.40

// 3. Consultamos el total antes de pagar
console.log(`\nSubtotal actual en caja: $${miCompra.calcularTotal().toFixed(2)}`); // Debe dar 15.90

// 4. El cliente decide pagar con Tarjeta
miCompra.procesarPago('PAG-999', 'Tarjeta de Crédito');