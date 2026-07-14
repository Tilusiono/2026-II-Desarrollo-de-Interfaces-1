import Persona from "./Persona.js";

// ---------
// EMPLEADO
// ---------
class Empleado extends Persona {
    constructor(nombre,apellido_paterno, apellido_materno, cargo, sueldo, turno) {
        super(nombre,apellido_paterno,apellido_materno);
        this.apellido_paterno = apellido_paterno;
        this.apellido_materno = apellido_materno;
        this.cargo = cargo;
        this.sueldo = sueldo;
        this.turno = turno; // mañana, tarde, noche
    }

    obtenerInfo() {
        return `Empleado: ${this.nombre} - ${this.cargo} (${this.turno})`;
    }

    subirSueldo(porcentaje) {
        this.sueldo += this.sueldo * (porcentaje / 100);
    }

    // PRIVADO
    #validarSueldo(sueldo) {
    return typeof sueldo === "number" && sueldo > 0;
    }

    #validarTurno(turno) {
    return ["Mañana", "Tarde", "Noche"].includes(turno);
    }
}
