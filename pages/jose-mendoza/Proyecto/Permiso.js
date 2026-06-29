export class Permiso{
    // variable privada

    #fechaInicio;
    #fechaFin;
    #motivo;
    
    // variable publica
    aprobado;

    constructor(
        fechaInicio ="",
        fechaFin="",
        motivo="",
        aprobado=""
    ){
        this.#fechaInicio = fechaInicio;
        this.#fechaFin = fechaFin;
        this.#motivo = motivo;
        this.aprobado = aprobado;
    }

    // setter

    setFechaInicio(){
        return this.#fechaInicio
    }

    setFechaFIn(){
        return this.#fechaFin
    }

    setMotivo(){
        return this.#motivo
    }

    // getter

    getFechaInicio(fechaInicio){
        if(typeof fechaInicio !== "string"){
            throw new Error("Fecha Invalida");
        }
        this.#fechaInicio=fechaInicio
    }

    getFechaFin(fechaFin){
        if(typeof fechaFin !== "string"){
            throw new Error("Fecha Invalida");
        }
        this.#fechaFin=fechaFin
    }

    getMotivo(motivo){
        if(typeof motivo !== "string"){
            throw new Error("Motivo Invalido");
        }
        this.#motivo=motivo
    }

    // metodos

    aprobar(){
        this.aprobado = true;
    }

    rechazar(){
        this.aprobado = false;
    }

    mostrarPermiso(){
        return `
        Motivo : ${this.getMotivo()}
        Estado : ${this.aprobado ? "Aprobado" : "Pendiente / Rechazado"}
        `
    }

}