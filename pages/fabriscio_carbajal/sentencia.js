let tarea = true;

if (tarea == true) {
    console.log("Tienes tarea");
}

let edad = 16;

if (edad >= 18) {
    console.log("Es mayor de edad");
} else {
    console.log("Es menor de edad");
}

let turno = "Tarde";
if (turno == "Mañana") {
    console.log("Te levantas temprano para estudiar");
} else if (turno == "Tarde") {
    console.log("Vas caminando a estudiar por la tarde");
} else {
    console.log("Estudias de manera virtual");
}

let nota = 16;

resultado = nota >= 14 ? "Pasas de curso!" : "Repetiras la evaluacion la semana que sigue...";
console.log(resultado);


let lenguajeProgramacion = "Java";

switch (lenguajeProgramacion) {
    case "Python":
        console.log("Bueno para empezar a programar");
        break;
    case "JavaScript":
        console.log("Para desarrollo de paginas web");
        break;
    case "C++":
        console.log("Ejecucion de programas rapido");
        break;
    case "Java":
        console.log("Versatil al programar");
        break;
    default:
        console.log("Deberias empezar por un pseudolenguaje");
}