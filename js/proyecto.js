class Producto {
    // 1. El "molde" para crear el producto
    constructor(nombre, precio, stockInicial) {
        this.nombre = nombre;
        this.precio = precio;
        this.stockEnAlmacen = stockInicial;
    }

    // 2. ACCIÓN REAL 1: Un cliente viene a comprar
    realizarVenta(cantidadQueSeQuierenLlevar) {
        console.log("\n🛒 INTENTO DE VENTA: Alguien quiere comprar " + cantidadQueSeQuierenLlevar + " unidad(es) de " + this.nombre);

        // ¿Tenemos suficiente en el almacén?
        if (cantidadQueSeQuierenLlevar <= this.stockEnAlmacen) {
            // Restamos lo que se vendió
            this.stockEnAlmacen = this.stockEnAlmacen - cantidadQueSeQuierenLlevar; 
            console.log("✅ ¡Venta exitosa! Gracias por tu compra.");
            console.log("📦 Stock actualizado: Nos quedan " + this.stockEnAlmacen + " unidades.");
        } else {
            // No hay suficiente
            console.log("❌ ¡Venta cancelada! No puedes llevarte " + cantidadQueSeQuierenLlevar + " unidades porque solo nos quedan " + this.stockEnAlmacen);
        }
    }

    // 3. ACCIÓN REAL 2: Llega el camión de los proveedores con más mercancía
    recibirMercancia(unidadesNuevas) {
        this.stockEnAlmacen = this.stockEnAlmacen + unidadesNuevas;
        console.log("\n🚚 REABASTECIMIENTO: Llegó el camión con " + unidadesNuevas + " " + this.nombre + " nuevos.");
        console.log("📦 Stock actualizado: Ahora tenemos " + this.stockEnAlmacen + " unidades en total.");
    }

    // 4. ACCIÓN REAL 3: El producto no se vende y hay que ponerlo en oferta
    aplicarDescuento(dineroAMenos) {
        this.precio = this.precio - dineroAMenos;
        console.log("\n🏷️ ¡REBAJAS!: Le bajamos $" + dineroAMenos + " al producto.");
        console.log("💰 Nuevo precio de " + this.nombre + ": $" + this.precio);
    }
}

// ========================================================
// EL ESCENARIO REAL (Para probar en la consola)
// ========================================================

// Abrimos la tienda con 5 iPhones 15 que cuestan $999 cada uno
const miTelefono = new Producto("iPhone 15", 999.00, 5);

// --- CLIENTE 1: Compra normal ---
// Se quiere llevar 2 teléfonos. Debería dejarlo porque tenemos 5.
miTelefono.realizarVenta(2); 

// --- CLIENTE 2: El exagerado ---
// Viene alguien y pide 10 teléfonos de golpe. 
// Como solo nos quedan 3 (teníamos 5 y vendimos 2), el sistema lo va a rebotar.
miTelefono.realizarVenta(10);

// --- SOLUCIÓN: Llega el camión ---
// Para no perder más clientes, recibimos 20 unidades más en el almacén.
miTelefono.recibirMercancia(20);

// --- CLIENTE 3: El cazador de ofertas ---
// Bajamos el precio del iPhone por una oferta especial.
miTelefono.aplicarDescuento(150.00);