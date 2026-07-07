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