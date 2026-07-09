class Persona {
  #id;
  #nombre;
  #edad;
  #correo;


  constructor(id, nombre, edad, correo) {
    this.#id = id;
    this.#nombre = nombre;
    this.#edad = edad;
    this.#correo = correo;
  }

 
  get id() { return this.#id; }
  set id(nuevoId) { this.#id = nuevoId; }

  get nombre() { return this.#nombre; }
  set nombre(nuevoNombre) { this.#nombre = nuevoNombre; }


  get edad() { return this.#edad; }
  set edad(nuevaEdad) { 

    if (nuevaEdad >= 0) {
      this.#edad = nuevaEdad; 
    } else {
      console.log("La edad no puede ser negativa.");
    }
  }

  get correo() { return this.#correo; }
  set correo(nuevoCorreo) { this.#correo = nuevoCorreo; }

  
  saludar() {
    return `Hola, mi nombre es ${this.#nombre}.`;
  }

  
  mostrarInfo() {
    return `ID: ${this.#id} | Nombre: ${this.#nombre} | Edad: ${this.#edad} | Correo: ${this.#correo}`;
  }
}

class Cliente extends Persona {
  #documento;
  #email;

  #puntosFidelidad;
  #tipoCliente;

  constructor(id, nombre, documento, email, puntosFidelidad = 0, tipoCliente = 'Regular') {
    super(id, nombre); 
    this.#documento = documento;
    this.#email = email;
    this.#puntosFidelidad = puntosFidelidad;
    this.#tipoCliente = tipoCliente;
  }

 
  get documento() { return this.#documento; }
  set documento(nuevoDocumento) { this.#documento = nuevoDocumento; }

  get email() { return this.#email; }
  set email(nuevoEmail) { this.#email = nuevoEmail; }

  get puntosFidelidad() { return this.#puntosFidelidad; }
  set puntosFidelidad(nuevosPuntos) { 
    if (nuevosPuntos >= 0) {
      this.#puntosFidelidad = nuevosPuntos; 
    } else {
      console.log("Los puntos no pueden ser negativos.");
    }
  }

  get tipoCliente() { return this.#tipoCliente; }
  set tipoCliente(nuevoTipo) { this.#tipoCliente = nuevoTipo; }

  acumularPuntos(puntos) {
    this.#puntosFidelidad += puntos;
    
    
    if (this.#puntosFidelidad >= 1000 && this.#tipoCliente !== 'VIP') {
      this.#tipoCliente = 'VIP';
      return `¡Felicidades! Se han sumado ${puntos} puntos. Ahora tienes ${this.#puntosFidelidad} puntos y eres un cliente VIP.`;
    }
    
    return `Se han sumado ${puntos} puntos. Total actual: ${this.#puntosFidelidad} puntos.`;
  }

  realizarCompra(montoTotal) {
    // Digamos que gana 1 punto por cada $10 gastados
    const puntosGanados = Math.floor(montoTotal / 10);
    this.acumularPuntos(puntosGanados);
    
    return `Compra de $${montoTotal} realizada con éxito. Ganaste ${puntosGanados} puntos de fidelidad.`;
  }


  obtenerResumen() {
    return `Cliente: ${this.nombre} | Tipo: ${this.#tipoCliente} | Puntos: ${this.#puntosFidelidad}`;
  }
}

class Cajero extends Persona {
  #cajaAsignada; 
  #turno;
 
  #dineroEnCaja;
  #estadoCaja;

  constructor(id, nombre, cajaAsignada, turno, dineroEnCaja = 0, estadoCaja = 'Cerrada') {
    super(id, nombre);
    this.#cajaAsignada = cajaAsignada;
    this.#turno = turno;
    this.#dineroEnCaja = dineroEnCaja;
    this.#estadoCaja = estadoCaja;
  }

  get cajaAsignada() { return this.#cajaAsignada; }
  set cajaAsignada(nuevaCaja) { this.#cajaAsignada = nuevaCaja; }

  get turno() { return this.#turno; }
  set turno(nuevoTurno) { this.#turno = nuevoTurno; }

  // --- Getters y Setters de los nuevos atributos ---
  get dineroEnCaja() { return this.#dineroEnCaja; }
  set dineroEnCaja(nuevoDinero) { 
    if (nuevoDinero >= 0) {
      this.#dineroEnCaja = nuevoDinero; 
    } else {
      console.log("El dinero en caja no puede ser negativo.");
    }
  }

  get estadoCaja() { return this.#estadoCaja; }
  set estadoCaja(nuevoEstado) { this.#estadoCaja = nuevoEstado; }


  rotarTurno() {
    if (this.#turno === 'Mañana') this.#turno = 'Tarde';
    else if (this.#turno === 'Tarde') this.#turno = 'Noche';
  }

  abrirCaja(montoInicial) {
    if (this.#estadoCaja === 'Abierta') {
      return `La caja ${this.#cajaAsignada} ya está abierta.`;
    }
    
    this.#dineroEnCaja = montoInicial;
    this.#estadoCaja = 'Abierta';
    return `El cajero ${this.nombre} ha abierto la caja ${this.#cajaAsignada} con un fondo de $${montoInicial}.`;
  }

  procesarCobro(montoCobrado) {
    if (this.#estadoCaja !== 'Abierta') {
      return `Error: No se puede cobrar. La caja ${this.#cajaAsignada} está ${this.#estadoCaja}.`;
    }

    this.#dineroEnCaja += montoCobrado;
    return `Cobro de $${montoCobrado} procesado. Dinero actual en caja: $${this.#dineroEnCaja}.`;
  }

  cerrarCaja() {
    if (this.#estadoCaja === 'Cerrada') {
      return `La caja ya se encontraba cerrada.`;
    }

    const totalEntregar = this.#dineroEnCaja;
    this.#estadoCaja = 'Cerrada';
    this.#dineroEnCaja = 0; // Se vacía la caja tras el cierre
    
    return `Corte de caja completado. El cajero ${this.nombre} debe entregar $${totalEntregar}. La caja está ahora cerrada.`;
  }
}

class Categoria {
  #id;
  #nombre;
  #descripcion;
  #activo; 

  constructor(id, nombre, descripcion, activo = true) {
    this.#id = id;
    this.#nombre = nombre;
    this.#descripcion = descripcion;
    this.#activo = activo;
  }


  get id() { return this.#id; }
  set id(nuevoId) { this.#id = nuevoId; }

  get nombre() { return this.#nombre; }
  set nombre(nuevoNombre) { this.#nombre = nuevoNombre; }

  get descripcion() { return this.#descripcion; }
  set descripcion(nuevaDescripcion) { this.#descripcion = nuevaDescripcion; }


  get activo() { return this.#activo; }
  set activo(nuevoEstado) { this.#activo = nuevoEstado; }


 
  alternarEstado() {
    this.#activo = !this.#activo;
    return this.#activo;
  }

  obtenerResumen() {
    const estado = this.#activo ? '🟢 Activa' : '🔴 Inactiva';
    return `${estado} | Categoría #${this.#id}: ${this.#nombre} - ${this.#descripcion}`;
  }
  toJSON() {
    return {
      id: this.#id,
      nombre: this.#nombre,
      descripcion: this.#descripcion,
      activo: this.#activo
    };
  }
}

class Inventario {
  #producto;
  #stockActual;
  #stockMinimo;
  #ubicacion; 

  // Actualizamos el constructor para incluir la ubicación (con un valor por defecto)
  constructor(producto, stockInicial, stockMinimo, ubicacion = "Almacén general") {
    this.#producto = producto;
    this.#stockActual = stockInicial;
    this.#stockMinimo = stockMinimo;
    this.#ubicacion = ubicacion;
  }

  // --- GETTERS Y SETTERS ORIGINALES ---
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

  // --- NUEVO GETTER Y SETTER ---
  get ubicacion() { return this.#ubicacion; }
  set ubicacion(nuevaUbicacion) { this.#ubicacion = nuevaUbicacion; }


  // --- MÉTODOS ORIGINALES ---
  descontarStock(cantidad) {
    if (cantidad > this.#stockActual) {
      // Usamos .nombre por si el producto es un objeto, o el producto en sí si es un texto
      const nombreProd = this.#producto.nombre || this.#producto;
      throw new Error(`Stock insuficiente para ${nombreProd}`);
    }
    this.#stockActual -= cantidad;
  }

  agregarStock(cantidad) {
    if (cantidad < 0) throw new Error("No puedes agregar stock negativo.");
    this.#stockActual += cantidad;
  }


  // --- NUEVOS MÉTODOS ---

  // 1. Método para verificar si hay que comprar más producto
  necesitaReponer() {
    return this.#stockActual <= this.#stockMinimo;
  }

  // 2. Método para auditar el estado del inventario rápidamente
  obtenerEstado() {
    const alerta = this.necesitaReponer() ? "⚠️ REQUIERE REPOSICIÓN" : "✅ Stock adecuado";
    const nombreProd = this.#producto.nombre || this.#producto;
    
    return `[Ubicación: ${this.#ubicacion}] ${nombreProd} - Stock: ${this.#stockActual} / Mínimo: ${this.#stockMinimo} | ${alerta}`;
  }

  // 3. Método para exportar a JSON (necesario por los atributos privados #)
  toJSON() {
    return {
      producto: this.#producto,
      stockActual: this.#stockActual,
      stockMinimo: this.#stockMinimo,
      ubicacion: this.#ubicacion,
      alertaReposicion: this.necesitaReponer() // Exportamos también si requiere compra
    };
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
  #espacioOcupado; 
  constructor(id, ubicacion, capacidadMaxima, espacioOcupado = 0) {
    this.#id = id;
    this.#ubicacion = ubicacion;
    this.#capacidadMaxima = capacidadMaxima;
    

    if (espacioOcupado > capacidadMaxima) {
      throw new Error("El espacio ocupado inicial supera la capacidad máxima.");
    }
    this.#espacioOcupado = espacioOcupado;
  }

  get id() { return this.#id; }
  set id(nuevoId) { this.#id = nuevoId; }

  get ubicacion() { return this.#ubicacion; }
  set ubicacion(nuevaUbicacion) { this.#ubicacion = nuevaUbicacion; }

  get capacidadMaxima() { return this.#capacidadMaxima; }
  set capacidadMaxima(nuevaCapacidad) {
    if (nuevaCapacidad < 0) throw new Error("La capacidad no puede ser negativa.");

    if (nuevaCapacidad < this.#espacioOcupado) {
       throw new Error("La nueva capacidad máxima no puede ser menor al espacio ya ocupado.");
    }
    this.#capacidadMaxima = nuevaCapacidad;
  }

  get espacioOcupado() { return this.#espacioOcupado; }
  set espacioOcupado(nuevoEspacio) {
    if (nuevoEspacio < 0) throw new Error("El espacio ocupado no puede ser negativo.");
    if (nuevoEspacio > this.#capacidadMaxima) throw new Error("El espacio ocupado supera la capacidad máxima.");
    this.#espacioOcupado = nuevoEspacio;
  }

  obtenerEspacioDisponible() {
    return this.#capacidadMaxima - this.#espacioOcupado;
  }
  ingresarCarga(cantidad) {
    if (cantidad <= 0) throw new Error("La cantidad a ingresar debe ser mayor a 0.");
    if (cantidad > this.obtenerEspacioDisponible()) {
      throw new Error(`Capacidad insuficiente. Solo quedan ${this.obtenerEspacioDisponible()} espacios.`);
    }
    this.#espacioOcupado += cantidad;
  }

  retirarCarga(cantidad) {
    if (cantidad <= 0) throw new Error("La cantidad a retirar debe ser mayor a 0.");
    if (cantidad > this.#espacioOcupado) {
      throw new Error(`No puedes retirar más de lo que hay. Espacio ocupado actual: ${this.#espacioOcupado}.`);
    }
    this.#espacioOcupado -= cantidad;
  }

  obtenerEstado() {
    const porcentajeLleno = ((this.#espacioOcupado / this.#capacidadMaxima) * 100).toFixed(1);
    return `🏢 Almacén #${this.#id} (${this.#ubicacion}) | Ocupación: ${porcentajeLleno}% (${this.#espacioOcupado}/${this.#capacidadMaxima})`;
  }

  // 5. Método para exportar a JSON (necesario por los atributos privados '#')
  toJSON() {
    return {
      id: this.#id,
      ubicacion: this.#ubicacion,
      capacidadMaxima: this.#capacidadMaxima,
      espacioOcupado: this.#espacioOcupado,
      espacioDisponible: this.obtenerEspacioDisponible() // Añadimos este dato calculado para la API/Frontend
    };
  }
}

class Descuento {
  #codigo;
  #porcentaje;
  #activo;
  #limiteUsos; 

  constructor(codigo, porcentaje, limiteUsos = Infinity) {
    this.#codigo = codigo;
    this.#porcentaje = porcentaje;
    this.#activo = true;
    this.#limiteUsos = limiteUsos;
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

  get limiteUsos() { return this.#limiteUsos; }
  set limiteUsos(nuevoLimite) {
    if (nuevoLimite < 0) throw new Error("El límite de usos no puede ser negativo.");
    this.#limiteUsos = nuevoLimite;
  }

  aplicar(montoTotal) {
    if (!this.esValido()) {
      return montoTotal; 
    }
    
   
    this.#limiteUsos--;
    
    if (this.#limiteUsos === 0) {
      this.#activo = false;
    }

    return montoTotal - (montoTotal * (this.#porcentaje / 100));
  }

  esValido() {
    return this.#activo && this.#limiteUsos > 0;
  }

  obtenerResumen() {
    const estado = this.esValido() ? "✅ Válido" : "❌ Inválido";
    const usosText = this.#limiteUsos === Infinity ? "Ilimitados" : this.#limiteUsos;
    
    return `[${estado}] Cupón: ${this.#codigo} | Descuento: ${this.#porcentaje}% | Usos restantes: ${usosText}`;
  }

  toJSON() {
    return {
      codigo: this.#codigo,
      porcentaje: this.#porcentaje,
      activo: this.#activo,
      limiteUsos: this.#limiteUsos === Infinity ? "Ilimitado" : this.#limiteUsos,
      esValidoParaUsar: this.esValido()
    };
  }
}

class Impuesto {
  #nombre;
  #tasa;
  #region;     
  #montoExento; 


  constructor(nombre, tasa, region = "Nacional", montoExento = 0) {
    this.#nombre = nombre;
    this.#tasa = tasa;
    this.#region = region;
    this.#montoExento = montoExento;
  }

  get nombre() { return this.#nombre; }
  set nombre(nuevoNombre) { this.#nombre = nuevoNombre; }

  get tasa() { return this.#tasa; }
  set tasa(nuevaTasa) {
    if (nuevaTasa < 0) throw new Error("La tasa de impuesto no puede ser negativa.");
    this.#tasa = nuevaTasa;
  }

  get region() { return this.#region; }
  set region(nuevaRegion) { this.#region = nuevaRegion; }

  get montoExento() { return this.#montoExento; }
  set montoExento(nuevoMontoExento) {
    if (nuevoMontoExento < 0) throw new Error("El monto exento no puede ser negativo.");
    this.#montoExento = nuevoMontoExento;
  }

  calcularImpuesto(montoBase) {

    if (montoBase <= this.#montoExento) {
      return 0;
    }
    return montoBase * this.#tasa;
  }

  calcularTotalConImpuesto(montoBase) {
    return montoBase + this.calcularImpuesto(montoBase);
  }

  obtenerResumen() {
  
    const porcentaje = (this.#tasa * 100).toFixed(2);
    const exentoTexto = this.#montoExento > 0 ? ` (Exento hasta $${this.#montoExento})` : "";
    
    return `[${this.#region}] ${this.#nombre}: ${porcentaje}%${exentoTexto}`;
  }

  
  toJSON() {
    return {
      nombre: this.#nombre,
      tasa: this.#tasa,
      tasaPorcentaje: `${(this.#tasa * 100)}%`, 
      region: this.#region,
      montoExento: this.#montoExento
    };
  }
}

class Comprobante {
  #numeroSerie;
  #tipoDocumento;
  #compra;
  #cliente;

  constructor(numeroSerie, tipoDocumento, compra, cliente) {
    if (compra.estado !== 'Pagado') {
      throw new Error("No se puede emitir un comprobante de una compra no pagada.");
    }
    this.#numeroSerie = numeroSerie;
    this.#tipoDocumento = tipoDocumento;
    this.#compra = compra;
    this.#cliente = cliente;
  }

  get numeroSerie() { return this.#numeroSerie; }
  set numeroSerie(nuevoNumero) { this.#numeroSerie = nuevoNumero; }

  get tipoDocumento() { return this.#tipoDocumento; }
  set tipoDocumento(nuevoTipo) { this.#tipoDocumento = nuevoTipo; }

  get compra() { return this.#compra; }
  set compra(nuevaCompra) {
    if (nuevaCompra.estado !== 'Pagado') {
      throw new Error("La nueva compra debe estar pagada.");
    }
    this.#compra = nuevaCompra;
  }

  get cliente() { return this.#cliente; }
  set cliente(nuevoCliente) { this.#cliente = nuevoCliente; }
}

class Tienda {
  #id;
  #nombre;
  #direccion;
  #telefono; 
  constructor(id, nombre, direccion, telefono = "Sin registrar") {
    this.#id = id;
    this.#nombre = nombre;
    this.#direccion = direccion;
    this.#telefono = telefono;
  }

  get id() { return this.#id; }
  set id(nuevoId) { this.#id = nuevoId; }

  get nombre() { return this.#nombre; }
  set nombre(nuevoNombre) { this.#nombre = nuevoNombre; }

  get direccion() { return this.#direccion; }
  set direccion(nuevaDireccion) { this.#direccion = nuevaDireccion; }

  // --- NUEVO GETTER Y SETTER ---
  get telefono() { return this.#telefono; }
  set telefono(nuevoTelefono) { 
    if (nuevoTelefono.trim() === "") throw new Error("El teléfono no puede estar vacío.");
    this.#telefono = nuevoTelefono; 
  }

  tieneDatosCompletos() {
    return (
      this.#nombre !== "" && 
      this.#direccion !== "" && 
      this.#telefono !== "Sin registrar"
    );
  }

  // 2. Método para mostrar una tarjeta de presentación de la tienda en texto
  obtenerInfo() {
    return `🏪 Tienda: ${this.#nombre}
📍 Dirección: ${this.#direccion}
📞 Teléfono: ${this.#telefono}`;
  }

  toJSON() {
    return {
      id: this.#id,
      nombre: this.#nombre,
      direccion: this.#direccion,
      telefono: this.#telefono,
      perfilCompletado: this.tieneDatosCompletos() // Agregamos este dato extra útil para la interfaz
    };
  }
}


const pan = new Producto('PROD01', 'Pan Integral', 2.50);
const leche = new Producto('PROD02', 'Leche Entera', 4.20);

const miCompra = new Compra('COMP-001');

console.log("--- Registrando artículos ---");

miCompra.agregarProducto(pan, 3);   // 3 * 2.50 = 7.50
miCompra.agregarProducto(leche, 2); // 2 * 4.20 = 8.40

// 3. Consultamos el total antes de pagar
console.log(`\nSubtotal actual en caja: $${miCompra.calcularTotal().toFixed(2)}`); // Debe dar 15.90

// 4. El cliente decide pagar con Tarjeta
miCompra.procesarPago('PAG-999', 'Tarjeta de Crédito');