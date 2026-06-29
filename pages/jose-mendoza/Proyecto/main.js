import {Empleado} from  "./Empleado.js"
import { Jefe } from "./Jefe.js";
import { Permiso } from "./Permiso.js";
import { Sector } from "./Sector.js";
import { Pago } from "./Pago.js";
import { Reporte } from "./Reporte.js";
// creacion de objetos

const empleado1= new Empleado(
    "12345678",
    "José Mendoza",
    "987654321",
    "Activo",
    "EMP001",
    "Programador",
    2500,
    new Date("2005-05-15")
);


const jefe1= new Jefe(
    "87654321",
    "Carlos Pérez",
    "999888777",
    "Activo",
    "JEF001",
    "Gerente de Base de Datos",
    4500,
    new Date("2026-09-12"),
    800,
    32,
    2,
    "Senior"
);


const permiso1 = new Permiso("Vacaciones", "Descanso anual");
const sector1 = new Sector("Sistemas");



console.log("--------------------------------------------------")
console.log("----Empleado------")
console.log(empleado1.mostrarInformacion());
console.log("--------------------------------------------------")

empleado1.registrarAsistencia();
console.log("Estado :", empleado1.estado)

// objetos de pago

const pago1= new Pago(2500, 500, 100);

console.log("--------------------------------------------------")
console.log("----Pago Empleado-----")
console.log("Pago Total :",pago1.calcularPago())
console.log("--------------------------------------------------")





console.log("--------------------------------------------------")
console.log("---Jefe----")
console.log(jefe1.mostrarInformacion());
console.log("--------------------------------------------------")

jefe1.registrarAsistencia();
console.log("Estado :", empleado1.estado)

// objetos de pago

const pago2= new Pago(4500, 300, 200);

console.log("--------------------------------------------------")
console.log("----Pago Jefe-----")
console.log("Pago Total :",pago2.calcularPago())
console.log("--------------------------------------------------")

console.log("----Control de Entrada y Salida----")
jefe1.registrarEntrada(new Date())
jefe1.registrarSalida(new Date())

// aqui ponemos la interaccion de los obsjetos

jefe1.aprobarPermiso(permiso1);
console.log("Permiso Aprobado :",  permiso1.aprobado)

jefe1.asignarEmpleadoSector(sector1, empleado1);


// aqui el reporte
const reporte1=new Reporte();

console.log("--------------------------------------------------")
console.log("----Reporte 1 ----")
console.log(reporte1.generarReporteEmpleado(jefe1));
console.log()
console.log("--------------------------------------------------")
