// =================================================================
// SISTEMA DE CONTROL DE STOCK Y LOGÍSTICA - BODEGA
// =================================================================

// /// if (Validación simple de stock)
let stockArroz = 8;

if (stockArroz < 10) {
    console.log("Alerta: Stock bajo en almacén");
}

// /// if - else (Estado del producto)
let stockLeche = 0;

if (stockLeche > 0) {
    console.log("Producto disponible para la venta");
} else {
    console.log("Producto agotado: Colocar cartel de Sin Stock");
}

// /// if - else if - else (Prioridad de pedido al proveedor)
let stockAceite = 15;

if (stockAceite === 0) {
    console.log("Pedido URGENTE: Llamar al proveedor de inmediato");
} else if (stockAceite <= 5) {
    console.log("Pedido REGULAR: Incluir en la lista de la semana");
} else {
    console.log("Stock óptimo: No es necesario comprar más");
}

// /// sintaxis (Ternario: Verificación rápida de vencimiento)
let diasParaVencer = 4;

let estadoProducto =
    diasParaVencer <= 3
        ? "Rematar producto por vencer"
        : "Venta a precio normal";

console.log(estadoProducto);

// /// switch (Categoría de productos para ubicación)
let tipoProducto = "Lácteos";

switch (tipoProducto) {
    case "Abarrotes":
        console.log("Ubicar en el Pasillo 1 (Arroz, azúcar, fideos)");
        break;

    case "Lácteos":
        console.log("Ubicar en la Vitrina Refrigerada");
        break;

    case "Bebidas":
        console.log("Ubicar en la Heladera de gaseosas y cervezas");
        break;

    case "Limpieza":
        console.log("Ubicar en el Estante del fondo");
        break;

    default:
        console.log("Categoría nueva: Asignar pasillo temporal");
}
