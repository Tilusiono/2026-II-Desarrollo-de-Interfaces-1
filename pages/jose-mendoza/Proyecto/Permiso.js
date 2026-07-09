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
        aprobado=false
    ){
        this.#fechaInicio = fechaInicio;
        this.#fechaFin = fechaFin;
        this.#motivo = motivo;
        this.aprobado = aprobado;
    }

    // setter

    getFechaInicio(){
        return this.#fechaInicio
    }

    getFechaFIn(){
        return this.#fechaFin
    }

    getMotivo(){
        return this.#motivo
    }

    // getter

    setFechaInicio(fechaInicio){
        if(typeof fechaInicio !== "string"){
            throw new Error("Fecha Invalida");
        }
        this.#fechaInicio=fechaInicio
    }

    setFechaFin(fechaFin){
        if(typeof fechaFin !== "string"){
            throw new Error("Fecha Invalida");
        }
        this.#fechaFin=fechaFin
    }

    setMotivo(motivo){
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

    recordatorioPermiso(){
        let i = 1;

        do{
            console.log("Recordatorio " + i + ": El permiso sigue pendiente.");
            i++;
        }while(i <= 1);
    }

    mostrarPermiso(){
        return `
        Motivo : ${this.getMotivo()}
        Estado : ${this.aprobado ? "Aprobado" : "Pendiente / Rechazado"}
        `
    }

}