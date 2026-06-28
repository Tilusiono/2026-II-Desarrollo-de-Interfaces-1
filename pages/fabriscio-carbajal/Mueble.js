import Producto from "./Producto";

class Mueble extends Producto {
    tipoMadera;

    constructor(id, nom, prec, inv, tp_madr) {
        super(id, nom, prec, inv)

        this.tipoMadera = tp_madr;
    }

    mostrarDatos() {
        super.mostrarDatos();
            
        return `
        Tipo de madera: ${this.tipoMadera}
        `    
    }
}

export default Mueble 