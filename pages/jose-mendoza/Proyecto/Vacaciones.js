class Vacaciones{
    // variable privada
    #diasDisponibles;
    #fechaInicio;
    #fechaFin;

    // variable publica
    estado;

    constructor(
        diasDisponibles=0,
        fechaInicio="",
        fechaFin="",
        estado=""
    ){
        this.#diasDisponibles = diasDisponibles;
        this.#fechaInicio = fechaInicio;
        this.#fechaFin = fechaFin;
        this.estado = estado;
    }

    // getter

    getDiasDisponibles(){
        return this.#diasDisponibles
    }

    getFechaInicio(){
        return this.#fechaInicio
    }

    getFechaFin(){
        return this.#fechaFin
    }
    
    // setter

    setDiasDisponible(diasDisponible){
        if(typeof diasDisponible !== "number"){
            throw new Error("Dias Invalidos");
        }
        this.#diasDisponibles=diasDisponible
    }

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

    // metodos

    solicitarVacaciones(dias) {
        this.setDiasDisponibles(
            this.getDiasDisponibles() - dias);
    }

    descontarDias(dias) {
        this.setDiasDisponibles(
            this.getDiasDisponibles() - dias);
    }

    consultarDiasDisponibles() {
        return this.getDiasDisponibles();
    }
}