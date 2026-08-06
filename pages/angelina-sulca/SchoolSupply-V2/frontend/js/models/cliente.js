// ============================================
// CLASE PADRE: cliente
// ============================================

export class cliente {
    id;
    nombre;
    correo;
    telefono;
    direccion;
    fechaRegistro;
    #compras;
    #totalGastado;

    constructor(id, nombre, correo, telefono, direccion) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.direccion = direccion;
        this.fechaRegistro = new Date();
        this.#compras = [];
        this.#totalGastado = 0;
    }

    get compras() {
        return this.#compras;
    }

    get totalGastado() {
        return this.#totalGastado;
    }

    set telefono(nuevoTelefono) {
        if (nuevoTelefono.length >= 9) {
            this.telefono = nuevoTelefono;
        }
    }

    set direccion(nuevaDireccion) {
        this.direccion = nuevaDireccion;
    }

    obtenerDatos() {
        return "Cliente: " + this.nombre + " - Correo: " + this.correo;
    }

    agregarCompra(compra) {
        this.#compras.push(compra);
        this.#totalGastado = this.#totalGastado + compra.totalFinal;
        return this.#compras.length;
    }

    // 🔥 MÉTODO CON FOR PARA EL HISTORIAL
    obtenerResumenCompras() {
        let resumen = "=== HISTORIAL DE COMPRAS ===\n";
        for (let i = 0; i < this.#compras.length; i++) {
            let compra = this.#compras[i];
            resumen = resumen + `Compra #${i+1}: S/ ${compra.totalFinal.toFixed(2)} - ${compra.estado}\n`;
        }
        if (this.#compras.length === 0) {
            resumen = resumen + "No hay compras registradas\n";
        }
        return resumen;
    }

    validarCorreo() {
        return this.correo.includes("@") && this.correo.includes(".");
    }

    obtenerTipo() {
        return "Cliente";
    }

    obtenerDescripcion() {
        return "Cliente: " + this.nombre;
    }

    #validarTelefono() {
        return this.telefono.length >= 9;
    }
}