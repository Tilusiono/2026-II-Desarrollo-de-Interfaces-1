import Mueble from "./Mueble";

class Estante extends Mueble{
    filas;

    constructor(id, nom, prec, inv, tp_madr, fl){
        super(id, nom, prec, inv, tp_madr)

        this.filas = fl;
    }

    mostrarDatos() {
        super.mostrarDatos();

        return `
        Filas = ${this.filas}
        `
    }
}

export default Mueble