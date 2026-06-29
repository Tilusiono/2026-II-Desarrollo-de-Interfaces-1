export class Pago{
    // varible privadas
    #salario;
    #descuento;
    #bonificacion;
    
    // variable publica
    totalPagar;


    constructor(
        salario =0,
        descuento=0,
        bonificacion=0,
        totalPagar=0
    ){
        this.#salario=salario;
        this.#descuento=descuento;
        this.#bonificacion=bonificacion;
        this.totalPagar=totalPagar;
    }

    // getter

    getSalario(){
        return this.#salario
    }

    getDescuento(){
        return this.#descuento
    }

    getBonificacion(){
        return this.#bonificacion
    }

    // setter

    setSalario(salario){
        if(typeof salario !== "number"){
            throw new Error("Salario Invalido");
        }
        this.#salario=salario
    }

    setDescuento(descuento){
        if(typeof descuento !== "number"){
            throw new Error("Descuento Invalido");
        }
        this.#descuento=descuento
    }

    setBonificacion(bonificacion){
        if(typeof bonificacion !== "number"){
            throw new Error("Bonificacion Invalida");
        }
        this.#bonificacion=bonificacion
    }

    // metodo


    calcularPago() {
    return this.getSalario()
         + this.getBonificacion()
         - this.getDescuento();
    }

    aplicarBonificacion(monto) {
        this.setBonificacion(monto);
    }

    aplicarDescuento(monto) {
        this.setDescuento(monto);
    }

}