// ==========================================
// CLASE: Producto
// ==========================================
class Producto {
    #id;
    #nombre;
    #precio;

    constructor(id, nombre, precio) {
        this.#id = id;
        this.#nombre = nombre;
        this.#precio = precio;
    }

    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get precio() { return this.#precio; }
}

// ==========================================
// CLASE: DetalleCompra (Línea del carrito)
// ==========================================
class DetalleCompra {
    #producto; // Instancia de la clase Producto
    #cantidad;

    constructor(producto, cantidad) {
        this.#producto = producto;
        this.#cantidad = cantidad;
    }

    get producto() { return this.#producto; }
    get cantidad() { return this.#cantidad; }

    // Método para calcular el subtotal de esta línea
    calcularSubtotal() {
        return this.#producto.precio * this.#cantidad;
    }
}

// ==========================================
// CLASE: Pago
// ==========================================
class Pago {
    #id;
    #monto;
    #metodo;
    #fecha;

    constructor(id, monto, metodo) {
        this.#id = id;
        this.#monto = monto;
        this.#metodo = metodo; // Ej: 'Efectivo', 'Tarjeta'
        this.#fecha = new Date();
    }

    get id() { return this.#id; }
    get monto() { return this.#monto; }
    get metodo() { return this.#metodo; }
    get fecha() { return this.#fecha; }
}

// ==========================================
// CLASE: Compra (Gestor principal del flujo)
// ==========================================
class Compra {
    #id;
    #detalles; // Array que almacena instancias de DetalleCompra
    #estado;   // 'Pendiente', 'Pagado'
    #pago;     // Instancia de la clase Pago (inicia en null)

    constructor(id) {
        this.#id = id;
        this.#detalles = [];
        this.#estado = 'Pendiente';
        this.#pago = null;
    }

    get id() { return this.#id; }
    get detalles() { return this.#detalles; }
    get estado() { return this.#estado; }
    get pago() { return this.#pago; }

    // MÉTODO: Agregar una nueva compra / artículo al carrito
    agregarProducto(producto, cantidad) {
        if (this.#estado === 'Pagado') {
            throw new Error("No se pueden agregar productos a una compra ya pagada.");
        }
        
        // Creamos la línea de detalle y la agregamos al array
        const nuevoDetalle = new DetalleCompra(producto, cantidad);
        this.#detalles.push(nuevoDetalle);
        console.log(`+ Agregado: ${cantidad}x ${producto.nombre}`);
    }

    // MÉTODO: Calcular el total acumulado de la compra
    calcularTotal() {
        return this.#detalles.reduce((total, detalle) => total + detalle.calcularSubtotal(), 0);
    }

    // MÉTODO: Registrar el pago definitivo
    procesarPago(idPago, metodoPago) {
        if (this.#detalles.length === 0) {
            throw new Error("No se puede pagar una compra sin productos.");
        }
        
        const totalAPagar = this.calcularTotal();
        
        // Creamos e instanciamos el objeto Pago
        this.#pago = new Pago(idPago, totalAPagar, metodoPago);
        this.#estado = 'Pagado';
        
        console.log(`\n=== PAGO REGISTRADO EXITOSAMENTE ===`);
        console.log(`ID Pago: ${this.#pago.id}`);
        console.log(`Método: ${this.#pago.metodo}`);
        console.log(`Total Liquidado: $${this.#pago.monto.toFixed(2)}`);
        console.log(`Fecha: ${this.#pago.fecha.toLocaleString()}`);
    }
}

// ==========================================
// PRUEBA DE EJECUCIÓN (Simulación en Caja)
// ==========================================

// 1. Creamos el catálogo de productos disponibles
const pan = new Producto('PROD01', 'Pan Integral', 2.50);
const leche = new Producto('PROD02', 'Leche Entera', 4.20);

// 2. Iniciamos una nueva transacción de compra
const miCompra = new Compra('COMP-001');

console.log("--- Registrando artículos ---");
// El cajero agrega productos de forma sucesiva (Bucle de compra)
miCompra.agregarProducto(pan, 3);   // 3 * 2.50 = 7.50
miCompra.agregarProducto(leche, 2); // 2 * 4.20 = 8.40

// 3. Consultamos el total antes de pagar
console.log(`\nSubtotal actual en caja: $${miCompra.calcularTotal().toFixed(2)}`); // Debe dar 15.90

// 4. El cliente decide pagar con Tarjeta
miCompra.procesarPago('PAG-999', 'Tarjeta de Crédito');
