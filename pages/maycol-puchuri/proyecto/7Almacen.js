
class Almacen {
  #id;
  #ubicacion;
  #capacidadMaxima;
  #espacioOcupado; // 
  
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

  // --- NUEVO GETTER Y SETTER ---
  get espacioOcupado() { return this.#espacioOcupado; }
  set espacioOcupado(nuevoEspacio) {
    if (nuevoEspacio < 0) throw new Error("El espacio ocupado no puede ser negativo.");
    if (nuevoEspacio > this.#capacidadMaxima) throw new Error("El espacio ocupado supera la capacidad máxima.");
    this.#espacioOcupado = nuevoEspacio;
  }

  // --- NUEVOS MÉTODOS ---

  // 1. Método para calcular cuánto espacio queda disponible
  obtenerEspacioDisponible() {
    return this.#capacidadMaxima - this.#espacioOcupado;
  }

  // 2. Método para registrar el ingreso de mercancía
  ingresarCarga(cantidad) {
    if (cantidad <= 0) throw new Error("La cantidad a ingresar debe ser mayor a 0.");
    if (cantidad > this.obtenerEspacioDisponible()) {
      throw new Error(`Capacidad insuficiente. Solo quedan ${this.obtenerEspacioDisponible()} espacios.`);
    }
    this.#espacioOcupado += cantidad;
  }

  // 3. Método para registrar la salida de mercancía
  retirarCarga(cantidad) {
    if (cantidad <= 0) throw new Error("La cantidad a retirar debe ser mayor a 0.");
    if (cantidad > this.#espacioOcupado) {
      throw new Error(`No puedes retirar más de lo que hay. Espacio ocupado actual: ${this.#espacioOcupado}.`);
    }
    this.#espacioOcupado -= cantidad;
  }

  // 4. Método para auditar el estado del almacén rápidamente
  obtenerEstado() {
    const porcentajeLleno = ((this.#espacioOcupado / this.#capacidadMaxima) * 100).toFixed(1);
    return `🏢 Almacén #${this.#id} (${this.#ubicacion}) | Ocupación: ${porcentajeLleno}% (${this.#espacioOcupado}/${this.#capacidadMaxima})`;
  }

  
  toJSON() {
    return {
      id: this.#id,
      ubicacion: this.#ubicacion,
      capacidadMaxima: this.#capacidadMaxima,
      espacioOcupado: this.#espacioOcupado,
      espacioDisponible: this.obtenerEspacioDisponible() 
    };
  }
}