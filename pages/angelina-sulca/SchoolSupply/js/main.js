// ============================================
// main.js - PUNTO DE ENTRADA
// ============================================

import { producto } from './models/producto.js';
import { escolar } from './models/escolar.js';
import { Papeleria } from './models/Papeleria.js';
import { Utiles } from './models/Utiles.js';
import { Jugueteria } from './models/Jugueteria.js';
import { cliente } from './models/cliente.js';
import { clienteunitario } from './models/clienteunitario.js';
import { clientepordocena } from './models/clientepordocena.js';
import { carrito } from './models/carrito.js';
import { descuento } from './models/descuento.js';
import { compra } from './models/compra.js';
import { Categoria } from './models/Categoria.js';
import { metodoPago } from './models/metodoPago.js';
import { proveedor } from './models/proveedor.js';
import { inventario } from './models/inventario.js';
import { detalleCompra } from './models/detalleCompra.js';

// ============================================
// CREAR PRODUCTOS DE PRUEBA (para do-while)
// ============================================

const productoPrueba1 = new Papeleria(
    1, "Cuaderno A4", "Norma", 9, 96, 100,
    3, "Comunicación", "Primaria",
    "Rayado", 80, "A4", "Azul", true
);

const productoPrueba2 = new Utiles(
    2, "Lapicero Retráctil", "Bic", 3, 30, 200,
    2, "Escritura", "Inicial",
    "Azul", "Plástico", "Escribir", true
);

// ============================================
// CLIENTES (exportados para ui.js)
// ============================================

export const cliente1 = new clienteunitario(
    1, "Ana Pérez", "ana@email.com", "987654321", "Av. Siempre Viva 123"
);

export const cliente2 = new clientepordocena(
    2, "Colegio San José", "colegio@email.com", "987654322", "Av. Principal 456"
);

// ============================================
// CARRITO, DESCUENTO
// ============================================

export const carrito1 = new carrito([], "Efectivo", 0, 0);
export const descuento1 = new descuento(0, 0, 0, 0, 0, 0);

// ============================================
// DEMOSTRACIÓN EN CONSOLA
// ============================================

console.log("=== SchoolSupply - Inicializado ===");
console.log(`Cliente Unitario: ${cliente1.obtenerDatos()}`);
console.log(`Cliente Por Docena: ${cliente2.obtenerDatos()}`);
console.log("✅ Módulos cargados correctamente");

// ============================================
// 🔥 DEMOSTRACIÓN DE DO-WHILE (CORREGIDO)
// ============================================

console.log("\n=== DEMOSTRACIÓN DE DO-WHILE ===");

let intentos = 0;
let carritoConProductos = false;

do {
    intentos++;
    console.log(`Intento ${intentos}: Agregando productos al carrito...`);
    
    // Agregar productos en cada intento
    if (intentos === 1) {
        carrito1.agregarItem(productoPrueba1, 2);
        console.log(`  → Agregados 2x ${productoPrueba1.nombre}`);
    } else if (intentos === 2) {
        carrito1.agregarItem(productoPrueba2, 3);
        console.log(`  → Agregados 3x ${productoPrueba2.nombre}`);
    }
    
    if (carrito1.items.length > 0) {
        carritoConProductos = true;
        console.log(`✅ Carrito tiene ${carrito1.items.length} producto(s) diferente(s)`);
    } else {
        console.log(`⏳ Carrito aún vacío, continuando...`);
    }
    
} while (!carritoConProductos && intentos < 5);

console.log(`✅ Se agregaron productos después de ${intentos} intento(s)`);
console.log(`📦 Total de items en carrito: ${carrito1.items.length}`);

// ============================================
// 🔥 DEMOSTRACIÓN DE SWITCH (CORREGIDO)
// ============================================

console.log("\n=== DEMOSTRACIÓN DE SWITCH ===");

// Crear una compra de prueba
const compraPrueba = new compra(cliente1, carrito1, descuento1, new Date(), "Pendiente");
console.log(`Estado original: ${compraPrueba.estado}`);

// Probar diferentes estados con switch (usando el método público)
const estadosPrueba = ["Confirmada", "Entregada", "Anulada", "EstadoInvalido"];
for (let i = 0; i < estadosPrueba.length; i++) {
    compraPrueba.estado = estadosPrueba[i];
    const textoEstado = compraPrueba.obtenerEstadoTexto(); // ✅ Ahora es público
    console.log(`Estado "${compraPrueba.estado}" → ${textoEstado}`);
}

console.log("\n✅ Demostraciones completadas");