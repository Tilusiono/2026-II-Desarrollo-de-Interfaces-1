// CLASE 5: Comprobante
// ==========================================
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