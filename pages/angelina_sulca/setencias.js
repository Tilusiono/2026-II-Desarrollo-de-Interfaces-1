///sistema de ventas de una bodega

///if

let monto = 120;

if (monto > 100) {
    console.log("Es mayor de 100 soles");
}

/// if - else

let monto = 120;

if (monto >= 100 ) {
    console.log("Tiene un descuento del 3%");
} else {
    console.log("No tiene descuento");
}

/// if - else if - else
    
let monto = 120;

if (monto >= 300) {
    console.log("Tiene un descuento de el 5%");
} else if (nota >= 100) {
    console.log("Tiene un descuento del 3%");
} else {
    console.log("No tiene descuentos");
}

/// sintaxis

let monto = 120;

let mensaje =
    monto >= 300
        ? "Promoción de descuento aplicada"
        : "Sin promoción de descuento";

console.log(mensaje);

/// switch
