import Mueble from "./Mueble";   

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

        return `
        Columnas: ${this.columnas}
        Cajones: ${this.cajones}
        `
    }
}
   
export default Armario