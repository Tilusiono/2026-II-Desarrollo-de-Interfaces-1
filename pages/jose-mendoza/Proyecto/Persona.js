
export class Persona{
    // variables privadas
    #dni;
    #nombre;
    #telefono;

    // variable publica
    estado;

    constructor(
        dni="", 
        nombre="", 
        telefono = "", 
        estado="",
    ){

        // creamos esto para que no se cree una instancia, 
        // ya que esta clase se conoce como el  padre de Empleado y jefe(no es concreta)
        if(new.target === Persona){
            throw new Error("No se Puede crear una instancia de persona");            
        }
        this.#dni = dni;
        this.#nombre = nombre;
        this.#telefono = telefono;
        this.estado = estado;
    }

    // encapsulamiento 

    // 1-getter
    getDni(){
        return this.#dni;
    }

    getNombre(){
        return this.#nombre
    }

    getTelefono(){
        return this.#telefono
    }

    // 2-Setter

    setDni(dni){
        if(typeof dni !== "string"){
            throw new Error("DNI Invalido ");
        }
        this.#dni=dni;
    }

    setNombre(nombre){
        if(typeof nombre !== "string" ){
            throw new Error ("Nombre Invalido ");
        }
        this.#nombre=nombre;
    }

    setTelefono(telefono){
        if(typeof telefono !== "string"){
            throw new Error ("Telefono Invalido ");
        }
        this.#telefono=telefono;
    }

    // metodos

    mostrarInformacion(){
        return `
        DNI : ${this.getDni()}
        Nombre : ${this.getNombre()}
        Telefono : ${this.getTelefono()}
        Estado : ${this.estado}
        `;
    }
}