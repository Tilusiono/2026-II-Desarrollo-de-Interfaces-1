export class Comprobante {

    tipoDocumento;

    #numeroDocumento;
    #fechaEmision;
    #estado;

    constructor(tipoDocumento, numeroDocumento, fechaEmision, estado) {

        if (new.target === Comprobante) {
            throw new Error("No se puede instanciar Comprobante.");
        }

        this.tipoDocumento = tipoDocumento;
        this.#numeroDocumento = numeroDocumento;
        this.#fechaEmision = fechaEmision;
        this.#estado = estado;
    }

    mostrarDatos() {
        console.log(this.tipoDocumento);
    }

    emitir() {
        console.log("Documento emitido.");
    }
}