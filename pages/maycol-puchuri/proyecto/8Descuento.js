// CLASE 8: Descuento
// ==========================================
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
