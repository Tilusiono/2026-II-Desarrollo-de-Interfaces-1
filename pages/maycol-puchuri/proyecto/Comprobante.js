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
    get tipoDocumento() { return this.#tipoDocumento; }
}