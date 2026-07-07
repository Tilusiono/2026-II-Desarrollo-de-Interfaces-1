import ComponentePC from './ComponentePC.js';

class PlacaBase extends ComponentePC {
    soportaOverclock; // 1 variable pública
    #formato;         // 3 variables privadas
    #ranurasRAM;
    #chipset;

    constructor(id, nombre, precioBase, tdp, socket, frecuencia, compatibleMac, formato, ranurasRAM, chipset, soportaOverclock = true) {
        // Llama al constructor de ComponentePC
        super(id, nombre, precioBase, tdp, socket, frecuencia, compatibleMac);
        this.#formato = formato;
        this.#ranurasRAM = ranurasRAM;
        this.#chipset = chipset;
        this.soportaOverclock = soportaOverclock;
    }

    // 2 métodos privados
    #calcularCapacidadRAM() {
        // Asumiendo que cada ranura soporta 32GB
        return this.#ranurasRAM * 32; 
    }

    #validarTamanioCaja() {
        return this.#formato === "ATX" ? "Requiere caja grande (Mid/Full Tower)" : "Cabe en cajas compactas";
    }

    // 2 métodos públicos
    probarExpansion() {
        const maximaRAM = this.#calcularCapacidadRAM();
        const espacio = this.#validarTamanioCaja();
        return `Soporta hasta ${maximaRAM}GB de RAM. ${espacio}`;
    }

    obtenerDetalles() { // Polimorfismo
        return `Placa Base ${this.#formato} | Chipset: ${this.#chipset} | Overclock: ${this.soportaOverclock}`;
    }
}

export default PlacaBase