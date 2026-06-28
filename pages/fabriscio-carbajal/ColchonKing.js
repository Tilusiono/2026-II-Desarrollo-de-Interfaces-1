import Colchon from "./Colchon";

class ColchonKing extends Colchon{
    pesoMaximo;

    constructor(id, nom, prec, inv, plz, comd, psmax){
        super(id, nom, prec, inv, plz, comd);

        this.pesoMaximo = psmax;
    }

    mostrarDatos(){
        super.mostrarDatos();

        return `
        Peso Máximo: ${this.pesoMaximo}
        `
    }
}

export default ColchonKing
