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

    registrarEntrada(fechahora){
        console.log(
            `${this.getNombre()} Registro su entrada a las (${fechahora.toLocaleString()})`
        )
    }

    registrarSalida(fechahora){
        console.log(
            `${this.getNombre()} Registro su Salida a las (${fechahora.toLocaleString()})`
        )
    }

    verificacionAsistencia(){
        return this.getHoraEntrada() && this.getHoraSalida()
    }

    mostrarInformacion() {
        return `
            Fecha        : ${this.getFecha().toLocaleDateString()}
            Hora Entrada : ${this.getHoraEntrada()}
            Hora Salida  : ${this.getHoraSalida()}
            `;
    }
}