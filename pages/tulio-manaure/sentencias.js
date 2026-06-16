//1
let numero = 8;

if (numero > 0) {
    console.log("El número es positivo");
}



//2
let nota = 11;

if (nota >= 13) {
    console.log("Aprobado");
} else {
    console.log("Desaprobado");
}

//3
let numero = 7;

if (numero % 2 === 0) {
    console.log("Número par");
} else {
    console.log("Número impar");
}

//4
let temperatura = 28;

if (temperatura >= 35) {
    console.log("Hace mucho calor");
} else if (temperatura >= 20) {
    console.log("Clima agradable");
} else {
    console.log("Hace frío");
}

//5
let nota = 18;

if (nota >= 18) {
    console.log("Excelente");
} else if (nota >= 13) {
    console.log("Aprobado");
} else {
    console.log("Desaprobado");
}

//6
let edad = 17;

let mensaje = edad >= 18
    ? "Mayor de edad"
    : "Menor de edad";

console.log(mensaje);

//7
let mes = "diciembre";

switch (mes) {

    case "enero":
        console.log("Inicio de año");
        break;

    case "julio":
        console.log("Mitad de año");
        break;

    case "diciembre":
        console.log("Fin de año");
        break;

    default:
        console.log("Mes no registrado");
}