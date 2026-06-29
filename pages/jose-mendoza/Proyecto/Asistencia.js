export class Asistencia{
    // variables privadas
    #fecha;
    #horaEntrada;
    #horaSalida;

    // variable publica
    estado;
    constructor(
        fecha = new Date(),
        horaEntrada ="",
        horaSalida ="",
        estado=""
    ){
        this.#fecha = fecha;
        this.#horaEntrada = horaEntrada;
        this.#horaSalida = horaSalida;
        this.estado = estado;
    }

    // getter

    getFecha(){
        return this.#fecha
    }
    
    getHoraEntrada(){
        return this.#horaEntrada
    }

    getHoraSalida(){
        return this.#horaSalida
    }

    // setter

    setFecha(fecha){
        if(!(fecha instanceof Date)){
            throw new Error("Fecha Invalida");
        }
        this.#fecha=fecha
    }

    setHoraEntrada(horaEntrada){
        if(typeof horaEntrada !== "string"){
            throw new Error("Hora Invalida");
        }
        this.#horaEntrada=horaEntrada
    }

    setHoraSalida(horaSalida){
        if(typeof horaSalida !== "string"){
            throw new Error("Hora Invalida");
        }
        this.#horaSalida=horaSalida
    }

    // metodos

    registrarEntrada(hora){
        this.setHoraEntrada(hora);
    }

    registrarSalida(hora){
        this.setHoraSalida(hora);
    }

    verificacionAsistencia(){
        return this.getHoraEntrada() && this.getHoraSalida()
    }

}