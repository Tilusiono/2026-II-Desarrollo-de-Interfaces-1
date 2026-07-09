class Impuesto {
  #nombre;
  #tasa;
  #region;      // 1. NUEVO ATRIBUTO PRIVADO
  #montoExento; 

  // Actualizamos el constructor con valores por defecto para los nuevos atributos
  constructor(nombre, tasa, region = "Nacional", montoExento = 0) {
    this.#nombre = nombre;
    this.#tasa = tasa;
    this.#region = region;
    this.#montoExento = montoExento;
  }

  // --- GETTERS Y SETTERS ORIGINALES ---
  get nombre() { return this.#nombre; }
  set nombre(nuevoNombre) { this.#nombre = nuevoNombre; }

  get tasa() { return this.#tasa; }
  set tasa(nuevaTasa) {
    if (nuevaTasa < 0) throw new Error("La tasa de impuesto no puede ser negativa.");
    this.#tasa = nuevaTasa;
  }

  // --- NUEVOS GETTERS Y SETTERS ---
  get region() { return this.#region; }
  set region(nuevaRegion) { this.#region = nuevaRegion; }

  get montoExento() { return this.#montoExento; }
  set montoExento(nuevoMontoExento) {
    if (nuevoMontoExento < 0) throw new Error("El monto exento no puede ser negativo.");
    this.#montoExento = nuevoMontoExento;
  }

  // --- MÉTODOS ACTUALIZADOS Y NUEVOS ---

  // Método original actualizado: ahora respeta el umbral de exención
  calcularImpuesto(montoBase) {
    // Si el monto de la compra no supera el monto exento, el impuesto es 0
    if (montoBase <= this.#montoExento) {
      return 0;
    }
    return montoBase * this.#tasa;
  }

  // 1. Método para calcular el costo total (Monto Base + Impuesto)
  calcularTotalConImpuesto(montoBase) {
    return montoBase + this.calcularImpuesto(montoBase);
  }

  // 2. Método para mostrar la información del impuesto en texto
  obtenerResumen() {
    // Multiplicamos por 100 para mostrar la tasa en formato porcentaje amigable (ej: 0.18 -> 18%)
    const porcentaje = (this.#tasa * 100).toFixed(2);
    const exentoTexto = this.#montoExento > 0 ? ` (Exento hasta $${this.#montoExento})` : "";
    
    return `[${this.#region}] ${this.#nombre}: ${porcentaje}%${exentoTexto}`;
  }

  // 3. Método para exportar a JSON (imprescindible por el uso de campos privados '#')
  toJSON() {
    return {
      nombre: this.#nombre,
      tasa: this.#tasa,
      tasaPorcentaje: `${(this.#tasa * 100)}%`, // Dato extra calculado para comodidad de la API
      region: this.#region,
      montoExento: this.#montoExento
    };
  }
}