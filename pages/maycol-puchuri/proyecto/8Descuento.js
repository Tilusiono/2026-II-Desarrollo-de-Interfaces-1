class Descuento {
  #codigo;
  #porcentaje;
  #activo;
  #limiteUsos; // 1. NUEVO ATRIBUTO PRIVADO

  // Actualizamos el constructor para aceptar el límite de usos (por defecto será infinito)
  constructor(codigo, porcentaje, limiteUsos = Infinity) {
    this.#codigo = codigo;
    this.#porcentaje = porcentaje;
    this.#activo = true;
    this.#limiteUsos = limiteUsos;
  }

  // --- GETTERS Y SETTERS ORIGINALES ---
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

  // --- NUEVO GETTER Y SETTER ---
  get limiteUsos() { return this.#limiteUsos; }
  set limiteUsos(nuevoLimite) {
    if (nuevoLimite < 0) throw new Error("El límite de usos no puede ser negativo.");
    this.#limiteUsos = nuevoLimite;
  }

  // --- MÉTODOS ACTUALIZADOS Y NUEVOS ---

  // Método original actualizado para validar y consumir usos
  aplicar(montoTotal) {
    if (!this.esValido()) {
      return montoTotal; // Si no es válido, se cobra el total sin descuento
    }
    
    // Restamos un uso al aplicarlo
    this.#limiteUsos--;
    
    // Si se acabaron los usos, desactivamos el cupón automáticamente
    if (this.#limiteUsos === 0) {
      this.#activo = false;
    }

    return montoTotal - (montoTotal * (this.#porcentaje / 100));
  }

  // 1. Método para centralizar la lógica de validación
  esValido() {
    return this.#activo && this.#limiteUsos > 0;
  }

  // 2. Método para mostrar información del descuento rápidamente
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