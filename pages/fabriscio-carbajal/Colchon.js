import Producto from "./Producto";

class Colchon extends Producto{
    plaza;
    comodidad; //dividido en suave, normal y rigido

    constructor(id, nom, prec, inv, plz, comd){
        super(id, nom, prec, inv);

        this.plaza = plz;
        this.comodidad = comd;
    }

    mostrarDatos(){
        super.mostrarDatos();

        return `
        Plaza: ${this.plaza}
        Comodidad: ${this.comodidad}
        `
    }
}

export default Colchon
