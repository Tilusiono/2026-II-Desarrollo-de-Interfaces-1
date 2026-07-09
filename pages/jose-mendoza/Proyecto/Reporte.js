import { Empleado } from "./Empleado.js";
import { Pago } from "./Pago.js";
import { Asistencia } from "./Asistencia.js";

export class Reporte{
    // varible privada
    #fecha;
    #tipo;
    #descripcion

    // varible publica

    generado;

    constructor(
        fecha=new Date(),
        tipo="",
        descripcion="",
        generado=""
    ){
        this.#fecha=fecha
        this.#tipo=tipo
        this.#descripcion=descripcion
        this.generado=generado
    }

    // getter

    getFecha(){
        return this.#fecha
    }

    getTipo(){
        return this.#tipo
    }

    getDescripcion(){
        return this.#descripcion
    }

    // setter

    setFecha(fecha){
        if(!(fecha instanceof Date)){
            throw new Error("Fecha Invalida");
        }
        this.#fecha=fecha
    }

    setTipo(tipo){
        if(typeof tipo !== "string"){
            throw new Error("Tipo Invalida");
        }
        this.#tipo=tipo
    }

    setDescripcion(descripcion){
        if(typeof descripcion !== "string"){
            throw new Error("Descripcion Invalida");
        }
        this.#descripcion=descripcion
    }

    // metodos

    contarEmpleados(cantidad){
        for(let i = 1; i <= cantidad; i++){
           console.log("Empleado " + i);
        }
    }
    generarReporteEmpleado(empleado) {
        return empleado.mostrarInformacion();
    }

    generarReporteAsistencia(asistencia) {
        return asistencia.verificarAsistencia();
    }

    generarReportePagos(pago) {
        return pago.calcularPago();
    }
    
}