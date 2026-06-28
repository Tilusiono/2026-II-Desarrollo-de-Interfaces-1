class Venta {
    id_venta;
    cliente;
    cajero;
    total;
    fecha;



    constructor(id_ven, cli, caj, tot, fec) {
        this.id_venta = id_ven;
        this.cliente = cli;
        this.cajero = caj;
        this.total = tot;
        this.fecha = fec;
    }
}

// falta