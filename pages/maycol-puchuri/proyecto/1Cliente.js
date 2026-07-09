class Cliente extends Persona {
  #documento;
  #email;
  #puntosFidelidad;
  #tipoCliente;

  // Se actualiza el constructor para recibir los nuevos atributos
  // Nota: Les pongo un valor por defecto (0 y 'Regular') por si no se envían al crearlo
  constructor(id, nombre, documento, email, puntosFidelidad = 0, tipoCliente = 'Regular') {
    super(id, nombre); // Llama al constructor de Persona
    this.#documento = documento;
    this.#email = email;
    this.#puntosFidelidad = puntosFidelidad;
    this.#tipoCliente = tipoCliente;
  }

  // --- Getters y Setters originales ---
  get documento() { return this.#documento; }
  set documento(nuevoDocumento) { this.#documento = nuevoDocumento; }

  get email() { return this.#email; }
  set email(nuevoEmail) { this.#email = nuevoEmail; }

  // --- Getters y Setters de los nuevos atributos ---
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

  // --- Nuevos métodos ---

  // Método para sumar puntos e incluso subir de categoría al cliente
  acumularPuntos(puntos) {
    this.#puntosFidelidad += puntos;
    
    // Si supera los 1000 puntos, lo ascendemos a VIP automáticamente
    if (this.#puntosFidelidad >= 1000 && this.#tipoCliente !== 'VIP') {
      this.#tipoCliente = 'VIP';
      return `¡Felicidades! Se han sumado ${puntos} puntos. Ahora tienes ${this.#puntosFidelidad} puntos y eres un cliente VIP.`;
    }
    
    return `Se han sumado ${puntos} puntos. Total actual: ${this.#puntosFidelidad} puntos.`;
  }

  // Método que simula una compra y calcula cuántos puntos gana
  realizarCompra(montoTotal) {
    // Digamos que gana 1 punto por cada $10 gastados
    const puntosGanados = Math.floor(montoTotal / 10);
    this.acumularPuntos(puntosGanados);
    
    return `Compra de $${montoTotal} realizada con éxito. Ganaste ${puntosGanados} puntos de fidelidad.`;
  }

  // Método para ver un resumen del cliente (usa this.nombre que viene de la clase padre Persona)
  obtenerResumen() {
    return `Cliente: ${this.nombre} | Tipo: ${this.#tipoCliente} | Puntos: ${this.#puntosFidelidad}`;
  }
}