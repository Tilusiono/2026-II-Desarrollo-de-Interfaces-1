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
} else if (monto >= 100) {
    console.log("Tiene un descuento del 3%");
} else {
    console.log("No tiene descuentos");
}

/// sintaxis

let monto = 120;

let mensaje =
    monto >= 100
        ? "Promoción de descuento aplicada"
        : "Sin promoción de descuento";

console.log(mensaje);

/// switch

/// switch

let metodoPago = "Yape";

switch (metodoPago) {
    case "Efectivo":
        console.log("Pago realizado en efectivo");
        break;

    case "Tarjeta":
        console.log("Pago realizado con tarjeta");
        break;

    case "Yape":
        console.log("Pago realizado mediante Yape");
        break;

    case "Plin":
        console.log("Pago realizado mediante Plin");
        break;

    default:
        console.log("Método de pago no válido");
}