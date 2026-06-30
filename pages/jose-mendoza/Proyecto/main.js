import {Empleado} from  "./Empleado.js"
import { Jefe } from "./Jefe.js";
import { Permiso } from "./Permiso.js";
import { Sector } from "./Sector.js";
import { Pago } from "./Pago.js";
import { Reporte } from "./Reporte.js";
import { Asistencia } from "./Asistencia.js";
import { Feriado } from "./Feriado.js"
import { horasTrabajadas } from "./HorasTrabajadas.js"
// creacion de objetos

// feriado
const feriado1 = new Feriado(
    "Dia de la Bandera",
    "7 Junio",
    "Conmemoracion Patriotica"
)
// activar el feriado
feriado1.registrarFeriado();
console.log("Feriados ")
console.log(feriado1.mostrarFeriado());


// sector1 es para todo o puede haber mas sectores
const sector1 = new Sector(
    "1",
    "Tecnologia y Sistemas",
    "Piso 3 ",
    "Activo"
);

// ---------jefe
const jefe1= new Jefe(
    "87654321",
    "Carlos Pérez",
    "999888777",
    "Activo",
    "JEF001",
    "Gerente de Base de Datos",
    4500,
    new Date("2026-09-12"),
    sector1,
    800,
    32,
    2,
    "Senior"
);
console.log("---Jefe----")
console.log(jefe1.mostrarInformacion());

// asistencia
const jefeasistencia1= new Asistencia(
    new Date(),
    "5: 00 AM",
    "3:00 PM" 
)
// entrada y salida
console.log("----Control de Entrada y Salida----")
console.log(jefeasistencia1.mostrarInformacion())

jefeasistencia1.registrarEntrada(jefe1.getNombre(),new Date())
jefeasistencia1.registrarSalida(jefe1.getNombre(),new Date(new Date().setHours(new Date().getHours() + 5)))

//  horas trabajas
const horas2 = new horasTrabajadas(8, 4, 2);
console.log("---- Horas Trabajadas ----");
console.log(horas2.mostrarHoras());


// pago
const pago2= new Pago(4500, 300, 200);
console.log("----Pago Jefe-----")
console.log("Pago Total :",pago2.calcularPago())


// ---------empleado
const empleado1= new Empleado(
    "12345678",
    "José Mendoza",
    "987654321",
    "Activo",
    "EMP001",
    "Programador",
    2500,
    new Date("2005-05-15"),
    sector1
);
console.log("----Empleado------")
console.log(empleado1.mostrarInformacion());

empleado1.registrarAsistencia();
console.log("Estado :", empleado1.estado)

// asistencia
const empleadoAsistencia1= new Asistencia(
    new Date("2025-02-12"),
    "6: 00 AM",
    "4:00 PM" 
)
// entrada y salida
console.log("----Control de Entrada y Salida----")
console.log(empleadoAsistencia1.mostrarInformacion())
empleadoAsistencia1.registrarEntrada(empleado1.getNombre())
empleadoAsistencia1.registrarSalida(empleado1.getNombre())

//  horas trabajas
const horas1 = new horasTrabajadas(8, 2, 1);
console.log("---- Horas Trabajadas ----");
console.log(horas1.mostrarHoras());

// objetos de pago
const pago1= new Pago(2500, 500, 100);
console.log("----Pago Empleado-----")
console.log("Pago Total :",pago1.calcularPago())

// permiso
const permiso1 = new Permiso(
    "01/07/2026",
    "15/07/2026",
    "Vacaciones anuales"
);

// solicitan el permiso
console.log("Solicitando Permiso :")
console.log(empleado1.solicitarPermiso(permiso1));
// jefe aprueba el permiso
jefe1.aprobarPermiso(permiso1);
// enseña el permiso
console.log(permiso1.mostrarPermiso());


// aqui ponemos la interaccion de los obsjetos
// remover a empleado de su sector de trabajo
console.log("Remover Empleado :")
console.log(sector1.eliminarEmpleado(empleado1));


// aqui el reporte
const reporte1=new Reporte();

console.log("----Reporte 1 ----")
console.log(reporte1.generarReporteEmpleado(jefe1));
console.log()

