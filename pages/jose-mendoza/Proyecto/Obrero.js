import { Empleado } from "./Empleado.js"

export class Obrero extends Empleado {
    #especialidad;
    
    constructor(
        dni = "",
        nombre = "",
        telefono = "",
        estado = "",
        cod_empleado = "",
        cargo = "",
        salarioBase = 0,
        fechaIngreso = new Date(),
        sector = "",
        especialidad = ""
    ) {
        super(dni, nombre, telefono, estado, cod_empleado, cargo, salarioBase, fechaIngreso, sector);
        this.#especialidad = especialidad;
    }

    getEspecialidad() {
        return this.#especialidad;
    }

    setEspecialidad(especialidad) {
        if (typeof especialidad !== "string") {
            throw new Error("La especialidad debe ser una cadena de texto.");
        }
        this.#especialidad = especialidad;
    }

    mostrarDatos(){
        return `
        ${super.mostrarInformacion()} 
        Especialidad: ${this.#especialidad}
        `;
    }
}