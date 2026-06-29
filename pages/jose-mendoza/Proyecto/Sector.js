export class Sector{
    // variable privada
    #idSector;
    #nombreSector;
    #ubicacion;
    // variable publica
    activo;

    constructor(
        idSector="",
        nombreSector="",
        ubicacion="",
        activo=""
    ){
        this.#idSector = idSector;
        this.#nombreSector = nombreSector;
        this.#ubicacion = ubicacion;
        this.activo = activo;
    }

    // getter

    getIdSector(){
        return this.#idSector
    }

    getNombreSector(){
        return this.#nombreSector
    }
    
    getUbicacion(){
        return this.#ubicacion
    }

    // setter

    setIdSector(idSector){
        if(typeof idSector!=="string" ){
            throw new Error("Codigo Invalido");
        }
        this.#idSector=idSector
    }

    setNombreSector(nombreSector){
        if(typeof nombreSector !== "string"){
            throw new Error("Nombre Invalido");
        }
        this.#nombreSector=nombreSector
    }

    setUbicacion(ubicacion){
        if(typeof ubicacion !== "string"){
            throw new Error("Ubicacion Invalida");
        }
        this.#ubicacion=ubicacion
    }

    // metodos

    agregarEmpleado(empleado){
        return `Empleado ${empleado.getNombre()} agregar al sector ${this.getNombreSector()}.`
    }

    eliminarEmpleado(empleado){
        return `Empleado ${empleado.getNombre()} eliminado del sector ${this.getNombreSector()}`
    }

    mostrarSector(){
        return `
        Sector : ${this.getNombreSector()}
        Ubicacion : ${this.getUbicacion()}
        `
    }
}