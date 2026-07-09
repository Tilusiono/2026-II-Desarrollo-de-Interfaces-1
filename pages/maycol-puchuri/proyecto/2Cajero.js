class Cajero extends Persona {
  #cajaAsignada; 
  #turno;
  #dineroEnCaja;
  #estadoCaja;

  // Actualizamos el constructor (asignamos valores por defecto a los nuevos atributos)
  constructor(id, nombre, cajaAsignada, turno, dineroEnCaja = 0, estadoCaja = 'Cerrada') {
    super(id, nombre);
    this.#cajaAsignada = cajaAsignada;
    this.#turno = turno;
    this.#dineroEnCaja = dineroEnCaja;
    this.#estadoCaja = estadoCaja;
  }

  // --- Getters y Setters originales ---
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

  // --- Métodos de la clase ---

  // [SOLICITADO ORIGINALMENTE]
  rotarTurno() {
    if (this.#turno === 'Mañana') this.#turno = 'Tarde';
    else if (this.#turno === 'Tarde') this.#turno = 'Noche';
  }

  // Nuevo: Inicia el día de trabajo con un monto base (sencillo/cambio)
  abrirCaja(montoInicial) {
    if (this.#estadoCaja === 'Abierta') {
      return `La caja ${this.#cajaAsignada} ya está abierta.`;
    }
    
    this.#dineroEnCaja = montoInicial;
    this.#estadoCaja = 'Abierta';
    return `El cajero ${this.nombre} ha abierto la caja ${this.#cajaAsignada} con un fondo de $${montoInicial}.`;
  }

  // Nuevo: Suma el dinero de una compra a la caja actual
  procesarCobro(montoCobrado) {
    if (this.#estadoCaja !== 'Abierta') {
      return `Error: No se puede cobrar. La caja ${this.#cajaAsignada} está ${this.#estadoCaja}.`;
    }

    this.#dineroEnCaja += montoCobrado;
    return `Cobro de $${montoCobrado} procesado. Dinero actual en caja: $${this.#dineroEnCaja}.`;
  }

  // Nuevo: Cierra el turno del cajero y muestra cuánto dinero debe entregar (corte de caja)
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