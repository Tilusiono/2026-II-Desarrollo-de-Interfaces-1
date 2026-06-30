class Articulo extends EntidadTienda {
    enOferta;
    #nombreArticulo;
    #precioBase;
    #stockActual;

    constructor(id, codigoRef, nombreArticulo, precioBase, stockActual, enOferta = false) {
        super(id, codigoRef);
        this.#nombreArticulo = nombreArticulo;
        this.#precioBase = precioBase;
        this.#stockActual = stockActual;
        this.enOferta = enOferta;
    }

    #calcularImpuesto() {
        return this.#precioBase * 0.18;
    }

    #tieneStockCritico() {
        return this.#stockActual < 5;
    }

    calcularPrecioFinal() {
        const impuesto = this.#calcularImpuesto();
        const descuento = this.enOferta ? 0.10 : 0;
        return (this.#precioBase + impuesto) * (1 - descuento);
    }

    obtenerDetalles() { 
        return `Artículo: ${this.#nombreArticulo} | Stock crítico: ${this.#tieneStockCritico()}`;
    }
}