class MetodoPago {
    #id; #nombre; #descripcion; #comision;
    activo;

    constructor(id, nombre, descripcion, comision = 0, activo = true) {
        this.#id = id;
        this.#nombre = nombre;
        this.#descripcion = descripcion;
        this.#comision = comision;
        this.activo = activo;
    }

    #tieneComision() { return this.#comision > 0; }
    get nombre() { return this.#nombre; }

    mostrarDatos() {
        return `Método: ${this.#nombre}<br>Descripción: ${this.#descripcion}<br>Comisión: ${(this.#comision * 100).toFixed(1)}%<br>Tiene comisión: ${this.#tieneComision()}<br>Activo: ${this.activo}`;
    }
}
