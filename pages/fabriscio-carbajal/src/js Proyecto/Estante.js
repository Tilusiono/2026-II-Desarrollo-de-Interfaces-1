import Mueble from "./Mueble.js";

class Estante extends Mueble{
    filas;

    constructor(id, nom, prec, inv, tp_madr, fls){
        super(id, nom, prec, inv, tp_madr)

        this.filas = fls;
    }

    mostrarDatos() {
        super.mostrarDatos();

        console.log(`Filas: ${this.filas}\n`)
    }
}

export default Estante