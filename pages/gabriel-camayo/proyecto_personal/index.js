// Importamos solo las clases que vamos a instanciar directamente
import Teclado from './Teclado.js';
import Procesador from './Procesador.js';
import Vendedor from './Vendedor.js';
import Venta from './Venta.js';

const miTeclado = new Teclado(1, "Teclado Redragon", 150, "USB", "Negro", true, false, "Red", "TKL", "ES");
const miProcesador = new Procesador(2, "Ryzen 5 7600", 900, 65, "AM5", 5100, true, 6, 12, "Zen 4");
const miVendedor = new Vendedor(3, "Gabriel Camayo", "71234567", 1200, "Asesor", true, "Tarde", "Lima Centro", 120, 45);
const miVenta = new Venta(1001, 1050, "Yape", 50, 3, "Av. Arequipa 123", true);

// Probando el polimorfismo
const elementos = [miTeclado, miProcesador, miVendedor, miVenta];
elementos.forEach(el => console.log(el.obtenerDetalles()));

// Probando métodos específicos
console.log(miTeclado.testearTeclas());
console.log(miProcesador.mostrarRendimiento());
console.log(miVendedor.reportarProductividad());
console.log(miVenta.generarGuia());