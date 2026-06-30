class Periferico extends Articulo {
    inalambrico;
    #tipoConexion;
    #color;
    #rgb;

    constructor(id, codigoRef, nombreArticulo, precioBase, stockActual, tipoConexion, color, rgb, inalambrico = true) {
        super(id, codigoRef, nombreArticulo, precioBase, stockActual);
        this.#tipoConexion = tipoConexion;
        this.#color = color;
        this.#rgb = rgb;
        this.inalambrico = inalambrico;
    }

    #validarConexion() {
        return this.inalambrico ? "Batería" : "Cableado";
    }

    #consumoEnergia() {
        return this.#rgb ? "Alto consumo" : "Bajo consumo";
    }

    probarIluminacion() {
        const consumo = this.#consumoEnergia();
        return this.#rgb ? `RGB encendido en color ${this.#color} (${consumo})` : "Sin iluminación";
    }

    obtenerDetalles() { 
        return `Periférico ${this.#color} | Conexión: ${this.#validarConexion()}`;
    }
}