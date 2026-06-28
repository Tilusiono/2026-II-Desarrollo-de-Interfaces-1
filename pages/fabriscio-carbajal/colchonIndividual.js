import Colchon from "./Colchon";

class ColchonIndividual extends Colchon{
    color;

    constructor(id, nom, prec, inv, plz, comd, colr){
        super(id, nom, prec, inv, plz, comd);

        this.color = colr;
    }

    mostrarDatos(){
        super.mostrarDatos();

        return `
        Color: ${this.color}
        `
    }
}

export default ColchonIndividual