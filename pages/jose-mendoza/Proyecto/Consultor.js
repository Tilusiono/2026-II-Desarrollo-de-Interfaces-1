import { Persona } from "./Persona.js";

export class Consultor extends Persona{

    #empresa;

    constructor(
        dni="",
        nombre="",
        telefono="",
        estado="",
        empresa=""
    ){
        super(dni,nombre,telefono,estado);
        this.#empresa=empresa;
    }

    // Getter
    getEmpresa(){
        return this.#empresa;
    }

    // Setter
    setEmpresa(empresa){
        if(typeof empresa !== "string"){
            throw new Error("Empresa inválida");
        }
        this.#empresa=empresa;
    }

    registrarVisita(motivo){
        return `El consultor ${this.getNombre()} vino a ${motivo}.`;
    } 

    clasificarConsulta(tipo){
        switch(tipo){
            case "Tecnologia":
                return "Consulta de Tecnologia";
            case "Seguridad":
                return "Consulta de Seguridad";
            case "Base de Datos":
                return "Consulta de Base de Datos";
            default:
                return "Consulta General";
        }
    }

    // Método
    mostrarInformacion(){
        return `
        ${super.mostrarInformacion()}
        Empresa: ${this.#empresa}
        `;
    }
}