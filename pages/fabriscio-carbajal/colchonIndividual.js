import Colchon from "./Colchon.js";

class ColchonIndividual extends Colchon{
    color;

    constructor(id, nom, prec, inv, plz, comd, colr){
        super(id, nom, prec, inv, plz, comd);

        this.color = colr;
    }

    mostrarDatos(){
        super.mostrarDatos();

        console.log(`Color: ${this.color}\n`)
    }
}

export default ColchonIndividual