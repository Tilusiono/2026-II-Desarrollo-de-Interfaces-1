// realizar de cada sentencia un ejemplo pero de un mismo tema
// Guardamos en una variable el día que queremos evaluar
let dia = "miércoles";


// ==================== IF ====================

// Verifica si el día es lunes
if (dia === "lunes") {

    // Muestra un mensaje si la condición es verdadera
    console.log("Hoy es lunes");
}


// ==================== IF - ELSE ====================

// Verifica si el día es sábado o domingo
if (dia === "sábado" || dia === "domingo") {

    // Se ejecuta si la condición es verdadera
    console.log("Es fin de semana");

} else {

    // Se ejecuta si la condición es falsa
    console.log("Es día laboral");
}


// ==================== IF - ELSE IF - ELSE ====================

// Comprueba si el día es lunes
if (dia === "lunes") {

    // Mensaje para lunes
    console.log("Inicio de semana");

}
// Si no es lunes, verifica si es martes
else if (dia === "martes") {

    // Mensaje para martes
    console.log("Segundo día de la semana");

}
// Si no es martes, verifica si es miércoles
else if (dia === "miércoles") {

    // Mensaje para miércoles
    console.log("Mitad de semana");

}
// Si no es miércoles, verifica si es jueves
else if (dia === "jueves") {

    // Mensaje para jueves
    console.log("Ya casi termina la semana");

}
// Si no es jueves, verifica si es viernes
else if (dia === "viernes") {

    // Mensaje para viernes
    console.log("Fin de semana cerca");

}
// Si no es viernes, verifica si es sábado
else if (dia === "sábado") {

    // Mensaje para sábado
    console.log("Primer día del fin de semana");

}
// Si no es sábado, verifica si es domingo
else if (dia === "domingo") {

    // Mensaje para domingo
    console.log("Último día del fin de semana");

}
// Se ejecuta si ninguna condición anterior es verdadera
else {

    // Mensaje para valores no válidos
    console.log("Día no válido");
}


// ==================== OPERADOR TERNARIO ====================

// Evalúa si el día es sábado o domingo
let mensaje = (dia === "sábado" || dia === "domingo")

    // Valor que se asigna si la condición es verdadera
    ? "Es fin de semana"

    // Valor que se asigna si la condición es falsa
    : "Es día laboral";

// Muestra el resultado almacenado en la variable mensaje
console.log(mensaje);


// ==================== SWITCH ====================

// Evalúa el valor de la variable dia
switch (dia) {

    // Caso para lunes
    case "lunes":
        console.log("Lunes");
        break; // Detiene la ejecución del switch

    // Caso para martes
    case "martes":
        console.log("Martes");
        break;

    // Caso para miércoles
    case "miércoles":
        console.log("Miércoles");
        break;

    // Caso para jueves
    case "jueves":
        console.log("Jueves");
        break;

    // Caso para viernes
    case "viernes":
        console.log("Viernes");
        break;

    // Caso para sábado
    case "sábado":
        console.log("Sábado");
        break;

    // Caso para domingo
    case "domingo":
        console.log("Domingo");
        break;

    // Se ejecuta si ningún caso coincide
    default:
        console.log("Día no válido");
}