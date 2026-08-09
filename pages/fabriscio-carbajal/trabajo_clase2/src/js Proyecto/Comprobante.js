class Comprobante {
    id_comprobante;
    venta;
    cliente;
    constructor(id_comp, vent, clt) {
        this.id_comprobante = id_comp;
        this.venta = vent;
        this.cliente = clt;

        const ahora = new Date(); // acceder a la fecha 

        this.dia = ahora.toLocaleDateString() // accede al dia mes y año actual

        this.hora = ahora.toLocaleTimeString() // accede a la hora del dia actual
    }

    mostrarInformación(){
        console.log("====================================================");
        console.log("                     VIVAMUEBLE                     ");
        console.log("====================================================");
        console.log(`Cliente    : ${this.cliente.getNombre()}`); // muestra datos que lleva una boleta
        console.log(`Fecha      : ${this.dia}`);
        console.log(`Hora       : ${this.hora}`);
        console.log(`N° de venta: ${this.id_comprobante}`);
        console.log("====================================================");
        console.log();
        console.log(this.venta);
        console.log("====================================================");
        console.log("  ¡Gracias por su compra, esperamos verlo pronto!   ");
        console.log("====================================================");
    }
}

export default Comprobante