//1
let bateria = 12;

if (bateria < 15) {
    console.log("Activando modo de ahorro de energía.");
}

//2
let llueve = true;

if (llueve) {
    console.log("Llevar paraguas.");
} else {
    console.log("Llevar lentes de sol.");
}

if (velocidad > 120) {
    console.log("Infracción grave.");
} else if (velocidad > 100) {
    console.log("Advertencia por velocidad alta.");
} else {
    console.log("Velocidad permitida.");
}

//3
let tipoSuscripcion = "Premium";

switch (tipoSuscripcion) {
    case "Basic":
        console.log("Acceso a contenido estándar.");
        break;
    case "Premium":
        console.log("Acceso a contenido 4K y sin anuncios.");
        break;
    default:
        console.log("Acceso limitado (Invitado).");
}

//4
let pesoMaleta = 24; // en kg

if (pesoMaleta <= 10) {
    console.log("Maleta de mano gratis.");
} else if (pesoMaleta > 10 && pesoMaleta <= 23) {
    console.log("Maleta documentada estándar. Costo: $30.");
} else {
    console.log("Equipaje con sobrepeso. Costo: $100.");
}

//5
let tieneEntrada = true;
let edad = 16;

if (tieneEntrada) {
    if (edad >= 18) {
        console.log("Puedes pasar al concierto.");
    } else {
        console.log("Tienes entrada, pero eres menor de edad. No puedes pasar.");
    }
} else {
    console.log("No puedes pasar porque no tienes entrada.");
}

//6
let score = 450;

switch (true) {
    case (score >= 800):
        console.log("Nivel: Leyenda");
        break;
    case (score >= 500 && score < 800):
        console.log("Nivel: Maestro");
        break;
    case (score >= 200 && score < 500):
        console.log("Nivel: Avanzado");
        break;
    default:
        console.log("Nivel: Principiante");
}

//7
let codigoRespuesta = 404;

switch (codigoRespuesta) {
    case 200:
    case 201:
        console.log("Conexión exitosa. Datos cargados.");
        break;
    case 401:
        console.log("No autorizado. Token expirado.");
        break;
    case 404:
        console.log("Error: El recurso no fue encontrado.");
        break;
    case 500:
        console.log("Error en el servidor. Intenta más tarde.");
        break;
    default:
        console.log("Código de estado desconocido.");
}