class Garantia {
    #id; #codigoGarantia; #mesesCobertura; #condiciones;
    producto; estado;

    constructor(id, codigoGarantia, mesesCobertura, condiciones, producto, estado = "Activa") {
        this.#id = id;
        this.#codigoGarantia = codigoGarantia;
        this.#mesesCobertura = mesesCobertura;
        this.#condiciones = condiciones;
        this.producto = producto;
        this.estado = estado;
    }

    #validarCobertura() { return this.#mesesCobertura >= 12; }
    #obtenerCodigo() { return this.#codigoGarantia.toUpperCase(); }

    mostrarDatos() {
        return `Garantía: ${this.#obtenerCodigo()}<br>Producto: ${this.producto}<br>Cobertura: ${this.#mesesCobertura} meses<br>Cobertura amplia: ${this.#validarCobertura()}<br>Estado: ${this.estado}<br>Condiciones: ${this.#condiciones}`;
    }
}
