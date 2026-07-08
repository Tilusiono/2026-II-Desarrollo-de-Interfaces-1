import { Cliente } from "./2.Cliente.js";
import { ClientePremium } from "./3.ClientePremium.js";
import { ClienteFrecuente } from "./4.ClienteFrecuente.js";
import { Cajero } from "./5.Cajero.js";
import { Producto } from "./6.Producto.js";
import { Categoria } from "./7.Categoria.js";
import { Inventario } from "./8.Inventario.js";
import { Proveedor } from "./9.Proveedor.js";
import { CarritoCompra } from "./10.CarritoCompra.js";
import { Venta } from "./11.Venta.js";
import { DetalleVenta } from "./12.DetalleVenta.js";
import { Comprobante } from "./13.Comprobante.js";

/*
=====================================================
PRUEBAS
=====================================================
*/

let cliente1 = new Cliente(                                   // Crea una instancia de la clase Cliente
    1,                                                        // ID del cliente
    "Juan",                                                   // Nombre
    "Perez",                                                  // Apellido
    "999888777",                                              // Teléfono
    "juan@gmail.com",                                         // Correo
    "Lima"                                                    // Dirección
);

let cajero1 = new Cajero(                                     // Crea una instancia de la clase Cajero
    1,                                                        // ID del cajero
    "Ana",                                                    // Nombre
    "Lopez",                                                  // Apellido
    "987654321",                                              // Teléfono
    "ana@gmail.com",                                          // Correo
    1800,                                                     // Salario
    "Noche"                                                   // Turno asignado
);

let producto1 = new Producto(                                 // Crea una instancia de la clase Producto
    1,                                                        // ID del producto
    "Arroz Costeño",                                          // Nombre del producto
    5.50,                                                     // Precio unitario
    "Arroz Premium",                                          // Descripción
    50,                                                       // Stock disponible
    "Costeño"                                                 // Marca del producto
);

let categoria1 = new Categoria(                               // Crea una instancia de la clase Categoria
    1,                                                        // ID de la categoría
    "Abarrotes",                                              // Nombre de la categoría
    "Productos básicos",                                      // Descripción de la categoría
    150                                                       // Cantidad de productos registrados
);

console.log(cliente1.mostrarEstadoCliente());                 // Imprime si Juan es cliente nuevo o frecuente
console.log(cajero1.mostrarTurno());                          // Imprime si Ana trabaja turno diurno o nocturno
console.log(producto1.mostrarEstado());                       // Imprime la disponibilidad del Arroz Costeño
console.log(categoria1.mostrarCantidad());                    // Imprime la cantidad de productos en Abarrotes

let inventario1 = new Inventario(                             // Crea una instancia de la clase Inventario
    1,                                                        // ID del inventario
    10,                                                       // Cantidad disponible actual
    15,                                                       // Cantidad mínima permitida
    100,                                                      // Cantidad máxima permitida
    "Almacén A"                                               // Ubicación física del almacén
);

let proveedor1 = new Proveedor(                               // Crea una instancia de la clase Proveedor
    1,                                                        // ID del proveedor
    "Gloria",                                                 // Nombre del proveedor
    "999888777",                                              // Teléfono de contacto
    "ventas@gloria.com"                                       // Correo electrónico del proveedor
);

let carrito1 = new CarritoCompra(                             // Crea una instancia de la clase CarritoCompra
    1,                                                        // ID del carrito
    250,                                                      // Total acumulado en el carrito
    5                                                         // Cantidad de productos en el carrito
);

let venta1 = new Venta(                                       // Crea una instancia de la clase Venta
    1,                                                        // ID de la venta
    300,                                                      // Monto total de la venta
    "Tarjeta",                                                // Método de pago utilizado
    20,                                                       // Descuento aplicado
    18                                                        // Impuesto (IGV) aplicado
);

let detalle1 = new DetalleVenta(                              // Crea una instancia de la clase DetalleVenta
    1,                                                        // ID del detalle
    3,                                                        // Cantidad de unidades vendidas
    15,                                                       // Precio unitario del producto
    45                                                        // Subtotal (3 × 15 = 45)
);

let comprobante1 = new Comprobante(                           // Crea una instancia de la clase Comprobante
    1,                                                        // ID del comprobante
    "Factura",                                                // Tipo de comprobante emitido
    100,                                                      // Subtotal antes de impuestos
    18,                                                       // Monto del impuesto (IGV)
    118,                                                      // Total a pagar (100 + 18)
    "Pagado"                                                  // Estado de pago del comprobante
);

console.log(inventario1.mostrarEstadoStock());                // Imprime si el inventario está bajo o disponible
console.log(proveedor1.mostrarProveedor());                   // Imprime el nombre del proveedor y validez de su correo
console.log(carrito1.mostrarTotal());                         // Imprime el total del carrito o indica que está vacío
console.log(venta1.calcularTotal());                          // Imprime el total final de la venta con/sin descuento
console.log(detalle1.mostrarSubtotal());                      // Imprime el subtotal calculado del detalle de venta
console.log(comprobante1.mostrarEstadoPago());                // Imprime si el comprobante está pagado o pendiente