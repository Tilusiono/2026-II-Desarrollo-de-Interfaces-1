import Mueble from "./Mueble.js";   

class Armario extends Mueble{
    columnas;
    cajones;

    constructor(id, nom, prec, inv, tp_madr, col, cajns){
        super(id, nom, prec, inv, tp_madr)

        this.columnas = col
        this.cajones = cajns
    }

    mostrarDatos(){
        super.mostrarDatos();

        console.log(`Columnas: ${this.columnas} \nCajones: ${this.cajones}\n`)
    }
}
   
export default Armario