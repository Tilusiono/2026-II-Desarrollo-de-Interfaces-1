import { Persona } from "./Persona.js";

export class Empleado extends Persona{
    // varible privadas
    #cod_empleado;
    #cargo;
    #salarioBase;
    #sector

    // variable publica
    fechaIngreso; 

    // colocamos que en el contructor se reciben
    // parametros heredados de la clase Persona 
    // y los parametros propios de la clase Empleado habiendo 8 parametros
    constructor(
        dni ="",
        nombre="",
        telefono="",
        estado="",
        cod_empleado="",
        cargo="",
        salarioBase=0,
        fechaIngreso = new Date(),
        sector

    ){
        // super nos sirve para poder llamar 
        // al constructor de la clase padre(clase persona), en este caso Persona
        super(dni, nombre, telefono, estado);

        this.#cod_empleado = cod_empleado;
        this.#cargo = cargo;
        this.#salarioBase = salarioBase;
        this.#sector = sector;
        this.fechaIngreso = fechaIngreso;
    }

    // getter

    getCod_Empleado(){
        return this.#cod_empleado
    }

    getCargo(){
        return this.#cargo
    }

    getSalarioBase(){
        return this.#salarioBase
    }

    getSector() {
        return this.#sector;
    }

    // setter

    setCod_Empleado(cod_empleado){
        if(typeof cod_empleado !== "string"){
            throw new Error("Codigo Invalido")
        }
        this.#cod_empleado=cod_empleado;
    }

    setCargo(cargo){
        if(typeof cargo !== "string"){
            throw new Error("Cargo Invalido");
        }
        this.#cargo=cargo
    }

    setSalarioBase(salarioBase){
        if(typeof salarioBase !== "number"){
            throw new Error ("Salario Invalido")
        }
        this.#salarioBase =salarioBase;
    }

    setSector(sector){
        if(typeof sector !== "number"){
            throw new Error("Sector Invalido");
        }
    }
    // metodo

    registrarAsistencia(){
        this.estado="Presente";
    }

    solicitarPermiso(permiso){
        return `${this.getNombre()} solicitó un permiso por ${permiso.getMotivo()}`;
    }

    solicitarVacaciones(){
        return "Solicitud de Vacaciones Enviado"
    }

    mostrarInformacion() {
        return `
        DNI: ${this.getDni()}
        Nombre: ${this.getNombre()}
        Teléfono: ${this.getTelefono()}
        Estado: ${this.estado}
        Código: ${this.getCod_Empleado()}
        Cargo: ${this.getCargo()}
        Salario: ${this.getSalarioBase()}
        Fecha de ingreso: ${this.fechaIngreso.toLocaleDateString()}
        Sector: ${this.getSector().getNombreSector()}
        `;
}
}