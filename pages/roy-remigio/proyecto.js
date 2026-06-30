import AlumnoNacional from "./AlumnoNacional.js";
import AlumnoExtranjero from "./AlumnoExtranjero.js";
import AlumnoIntercambio from "./AlumnoIntercambio.js";
import IAsistencia from "./IAsistencia.js";
import Profesor from "./Profesor.js";
import Materia from "./Materia.js";
import Curso from "./Curso.js";
import Aula from "./Aula.js";
import Calificacion from "./Calificacion.js";
import Asistencia from "./Asistencia.js";
import Evaluacion from "./Evaluacion.js";
import Libreta from "./Libreta.js";
import Directorio from "./Directorio.js";


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

alumnoIntercambio.registrarEntrada( new Date());
alumnoIntercambio.registrarSalida( new Date(new Date().setHours(new Date().getHours() + 3)));

alumnoNacional.registrarEntrada( new Date());
alumnoNacional.registrarSalida(  new Date(new Date().setHours(new Date().getHours() + 4)));

alumnoExtranjero.registrarEntrada( new Date());
alumnoExtranjero.registrarSalida( new Date(new Date().setHours(new Date().getHours() + 5)));



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
profesor.registrarEntrada(new Date());
profesor.registrarSalida(new Date(new Date().setHours(new Date().getHours() + 5)));

// Ejemplos de las nuevas clases con 4 parámetros
console.log("\n=== NUEVAS CLASES ===\n");

const materia = new Materia("Desarrollo de Interfaces", "DI2026", 5, "Medio");
console.log(materia.mostrarDatos());

const curso = new Curso("Interfaces Web", "IW-101", 30, "Lunes 8:00-10:00");
console.log(curso.mostrarDatos());

const aula = new Aula("101", 35, "A", 1);
console.log(aula.mostrarDatos());

const calificacion = new Calificacion(1, "DI2026", 9.5, new Date());
console.log(calificacion.mostrarDatos());

const asistencia = new Asistencia(1, new Date(), "Presente", "Llegó puntual");
console.log(asistencia.mostrarDatos());

const evaluacion = new Evaluacion("Examen Parcial", "Escrita", 30, new Date("2024-07-01"));
console.log(evaluacion.mostrarDatos());

const libreta = new Libreta(1, 2024, "1", "Activa");
console.log(libreta.mostrarDatos());

const directorio = new Directorio("Bernabe Inche", "999888777", "fbinche@idat.pe", "Profesor");
console.log(directorio.mostrarDatos());

