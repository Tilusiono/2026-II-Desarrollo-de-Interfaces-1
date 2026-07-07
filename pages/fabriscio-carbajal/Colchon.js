import Producto from "./Producto.js";

class Colchon extends Producto{
    plaza;
    comodidad; //dividido en suave, normal y rigido

    constructor(id, nom, prec, inv, plz, comd){
        super(id, nom, prec, inv);

        this.plaza = plz;
        this.comodidad = comd;
    }
    // heredan el getter ambos colchones
    getNombre(){
        return this.nombre
    }

    // heredan setter 
    setNombre(nuevoNombre){
        this.nombre = nuevoNombre
    }

    mostrarDatos(){
        super.mostrarDatos();

        console.log(`Plaza: ${this.plaza} \nComodidad: ${this.comodidad}`)
    }
}

export default Colchon
