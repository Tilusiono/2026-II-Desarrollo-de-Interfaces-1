class Comprobante {
    id_comprobante;
    venta;
    fecha_emision;
    igv;
    total;
    constructor(id_comp, ven, fec_emis, igv, tot) {
        this.id_comprobante = id_comp;
        this.venta = ven;
        this.fecha_emision = fec_emis;
        this.igv = igv;
        this.total = tot;
    }
}

// falta