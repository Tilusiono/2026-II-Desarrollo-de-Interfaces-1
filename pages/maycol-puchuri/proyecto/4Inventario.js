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