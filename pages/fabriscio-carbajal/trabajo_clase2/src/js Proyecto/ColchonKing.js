import Colchon from "./Colchon.js";

class ColchonKing extends Colchon{
    pesoMaximo;

    constructor(id, nom, prec, inv, plz, comd, psmax){
        super(id, nom, prec, inv, plz, comd);

        this.pesoMaximo = psmax;
    }

    mostrarDatos(){
        super.mostrarDatos();

        console.log(`Peso Máximo: ${this.pesoMaximo}\n`)
    }
}

export default ColchonKing
