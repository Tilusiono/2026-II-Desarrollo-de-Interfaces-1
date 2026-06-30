export class Feriado{
    // variable privada
    #nombre;
    #fecha;
    #tipo;

    // varible publica
    activo;

    constructor(
        nombre="",
        fecha="",
        tipo="",
        activo=false
    ){
        this.#nombre=nombre
        this.#fecha=fecha
        this.#tipo=tipo
        this.activo=activo
    }

    // getter

    getNombre(){
        return this.#nombre
    }

    getFecha(){
        return this.#fecha
    }

    getTipo(){
        return this.#tipo
    }

    // setter

    setNombre(nombre){
        if(typeof nombre !== "string"){
            throw new Error("Nombre Invalido");
        }
        this.#nombre=nombre
    }

    setFecha(fecha){
        if(typeof fecha !== "string" ){
            throw new Error("Fecha Invalida")
        }
        this.#fecha=fecha
    }

    setTipo(tipo){
        if(typeof tipo !== "string"){
            throw new Error("Tipo Invalido");
        }
        this.#tipo=tipo
    }
    
    // metodos

    registrarFeriado() {
    this.activo = true;
    }

    consultarFeriado() {
        return this.getFecha();
    }

    mostrarFeriado() {
        return `
            Nombre :${this.getNombre()}
            Fecha  : ${this.getFecha()}
            Tipo   : ${this.getTipo()}
            Activo : ${this.activo}`;
}

}