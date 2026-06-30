import { Empleado } from "./Empleado.js";

export class Jefe extends Empleado{
    // variables privadas
    #bonificacion;
    #cantidadEmpleados;
    #nivel;

    // variable publica
    areaResponsable;

    constructor(
        // CLASEPERSONA
        dni="",
        nombre="",
        telefono="",
        estado="",
        // CLASEEMEPLEADO
        cod_empleado="",
        cargo="",
        salarioBase=0,
        fechaIngreso=new Date(),
        // CLASEJEFE
        bonificacion=0,
        cantidadEmpleados=0,
        nivel=0,
        areaResponsable=""
    ){

        // LO QUE SE VA A HEREDAR DE LA CLASE PADRE
        super(
            dni,
            nombre,
            telefono,
            estado,
            cod_empleado,
            cargo,
            salarioBase,
            fechaIngreso
        );
        this.#bonificacion = bonificacion;
        this.#cantidadEmpleados = cantidadEmpleados;
        this.#nivel = nivel;
        this.areaResponsable = areaResponsable;
    }


    // getter

    getBonificacion(){
        return this.#bonificacion;
    }

    getCantidadEmpleados(){
        return this.#cantidadEmpleados;
    }

    getNivel(){
        return this.#nivel
    }

    // setter

    setBonificacion(bonificacion){
        if(typeof bonificacion !== "number" ){
            throw new Error("Bonificacion Invalida");
        }
        this.#bonificacion=bonificacion;
    }

    setCantidadEmpleados(cantidadEmpleados){
        if(typeof cantidadEmpleados !== "number"){
            throw new Error("Cantidad Invalida");
        }
        this.#cantidadEmpleados=cantidadEmpleados;
    }

    setNivel(nivel){
        if(typeof nivel !== "number" ){
            throw new Error("Nivel Invalido");
        }
        this.#nivel=nivel;
    }

    // metodo

    aprobarPermiso(permiso){
        permiso.aprobar();
    }

    rechazarPermiso(permiso){
        permiso.rechazar();
    }

    asignarEmpleadoSector(sector,empleado){
        return sector.agregarEmpleado(empleado);
    }

    mostrarInformacion() {
        return `
        DNI: ${this.getDni()}
        Nombre: ${this.getNombre()}
        Teléfono: ${this.getTelefono()}
        Estado: ${this.estado}
        Código: ${this.getCod_Empleado()}
        Cargo: ${this.getCargo()}
        Salario: ${this.getSalarioBase()}
        Fecha Ingreso: ${this.fechaIngreso.toLocaleDateString()} 
        Bonificación: ${this.getBonificacion()}
        Nivel: ${this.getNivel()}
        `;
    }
}