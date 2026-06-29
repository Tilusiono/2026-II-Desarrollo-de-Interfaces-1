class horasTrabajadas {
    // variables privadas
    #horasNormales;
    #horasExtras;
    #horasNocturnas;

    // variable publica
    totalHoras;

    constructor(
        horasNormales="",
        horasExtras="",
        horasNocturnas="",
        totalHoras="",
    ){
        this.#horasNormales = horasNormales;
        this.#horasExtras = horasExtras;
        this.#horasNocturnas = horasNocturnas;
        this.totalHoras = totalHoras;
    }

    // getter

    getHorasNormales(){
        return this.#horasNormales
    }

    getHorasExtras(){
        return this.#horasExtras
    }

    getHorasNocturnas(){
        return this.#horasNocturnas
    }

    // setter

    setHorasNormales(horasNormales){
        if(typeof horasNormales !== "string"){
            throw new Error("Hora Invalida");
        }
        this.#horasNormales=horasNormales
    }

    setHorasExtras(horasExtras){
        if(typeof horasExtras !== "string"){
            throw new Error("Hora Invalida")
        }
        this.#horasExtras=horasExtras
    }

    setHorasNocturnas(horasNocturnas){
        if(typeof horasNocturnas  !== "string"){
            throw new Error("Hora Invalida");
        }
        this.#horasNocturnas=horasNocturnas
    }

    // metodos

    calcularHorasNormales(){
        return this.getHorasNormales();
    }

    calcularHorasExtras(){
        return this.getHorasExtras();
    }

    calcularTotalHoras(){
        return this.getHorasNormales() + this.getHorasExtras() + this.getHorasNocturnas();
    }


}