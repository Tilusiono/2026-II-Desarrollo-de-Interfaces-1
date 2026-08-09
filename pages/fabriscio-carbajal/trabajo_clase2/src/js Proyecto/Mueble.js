import Producto from "./Producto.js";

class Mueble extends Producto {
    tipoMadera;     // pino, roble, cedro y nogal
    
    constructor(id, nom, prec, inv, tp_madr) {
        super(id, nom, prec, inv)

        this.tipoMadera = tp_madr;
    }

    mostrarDatos() {
        super.mostrarDatos();
            
        console.log( `Tipo de madera: ${this.tipoMadera}`)  
    }
}

export default Mueble 