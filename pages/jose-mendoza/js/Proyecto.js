import AlumnoNacional from "./AlumnoNacional.js";
import AlumnoExtranjero from "./AlumnoExtranjero.js";
import AlumnoIntercambio from "./AlumnoIntercambio.js";
import IAsistencia from "./IAsistencia.js";
import Profesor from "./Profesor.js";


const alumnoNacional = new AlumnoNacional(
    1,
    "Daniel",
    "Inche",
    20,
    "999999999",
    new Date("2005-05-15"),
    "Lima",
    "2025001",
    "Sede Lima Centro",
    "Desarrollo de Sistemas"
);


const alumnoExtranjero = new AlumnoExtranjero(
    2,
    "Ana",
    "Mejia",
    22,
    "988888888",
    new Date("2003-01-10"),
    "Chile",
    "AB123456",
    "Español",
    "Sede San Isidro"
);



const alumnoIntercambio = new AlumnoIntercambio(
    3,
    "Dana",
    "Solano",
    21,
    "977777777",
    new Date("2004-03-08"),
    "Instituto Tecnológico de España",
    6,
    "Perú",
    "Intercambio Académico"
);

console.log(alumnoNacional.mostrarDatos());
console.log(alumnoExtranjero.mostrarDatos());
console.log(alumnoIntercambio.mostrarDatos());


alumnoIntercambio.setNombre("Diani")
console.trace(alumnoIntercambio)

alumnoIntercambio.registrarEntrada( new Date(), "Casa" );
alumnoIntercambio.registrarSalida( new Date(new Date().setHours(new Date().getHours() + 3)), 4, "buena");

alumnoNacional.registrarEntrada( new Date(),3);
alumnoNacional.registrarSalida(  new Date(new Date().setHours(new Date().getHours() + 4)),"Juegos Olimpicos", "SI");

alumnoExtranjero.registrarEntrada( new Date(),"Python");
alumnoExtranjero.registrarSalida( new Date(new Date().setHours(new Date().getHours() + 5)), "Medica", 12);



const profesor = new Profesor(
    1,
    "Bernabe",
    "Inche",32,
    "999888777",
    new Date("1993-03-08"),
    "Programación",
    "fbinche",
    "Sede ATE",
    "fbinche@idat.pe",
);

profesor.mostrarDatos();
profesor.registrarEntrada(new Date(), "Aula 102" , "Programacion");
profesor.registrarSalida(new Date(new Date().setHours(new Date().getHours() + 5)),4,"Introduccion a javascript");

