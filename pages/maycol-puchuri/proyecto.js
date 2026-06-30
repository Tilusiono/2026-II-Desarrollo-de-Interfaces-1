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
// CLASE 1: Cliente
// ==========================================
class Cliente {
    #id;
    #nombre;
    #documento; 
    #email;

    constructor(id, nombre, documento, email) {
        this.#id = id;
        this.#nombre = nombre;
        this.#documento = documento;
        this.#email = email;
    }

    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get documento() { return this.#documento; }
    get email() { return this.#email; }
}

// ==========================================
// CLASE 2: Cajero
// ==========================================
class Cajero {
    #id;
    #nombre;
    #cajaAsignada; 
    #turno;        

    constructor(id, nombre, cajaAsignada, turno) {
        this.#id = id;
        this.#nombre = nombre;
        this.#cajaAsignada = cajaAsignada;
        this.#turno = turno;
    }

    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get cajaAsignada() { return this.#cajaAsignada; }
    get turno() { return this.#turno; }
}

// ==========================================
// CLASE 3: Categoria
// ==========================================
class Categoria {
    #id;
    #nombre;
    #descripcion;

    constructor(id, nombre, descripcion) {
        this.#id = id;
        this.#nombre = nombre;
        this.#descripcion = descripcion;
    }

    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get descripcion() { return this.#descripcion; }
}

// ==========================================
// CLASE 4: Inventario
// ==========================================
class Inventario {
    #producto;    
    #stockActual;
    #stockMinimo; 

    constructor(producto, stockInicial, stockMinimo) {
        this.#producto = producto;
        this.#stockActual = stockInicial;
        this.#stockMinimo = stockMinimo;
    }

    get producto() { return this.#producto; }
    get stockActual() { return this.#stockActual; }

    descontarStock(cantidad) {
        if (cantidad > this.#stockActual) {
            throw new Error(`Stock insuficiente para ${this.#producto.nombre}`);
        }
        this.#stockActual -= cantidad;
    }

    agregarStock(cantidad) {
        this.#stockActual += cantidad;
    }
}

// ==========================================
// CLASE 5: Comprobante
// ==========================================
class Comprobante {
    #numeroSerie;
    #tipoDocumento; 
    #compra;        
    #cliente;       

    constructor(numeroSerie, tipoDocumento, compra, cliente) {
        if (compra.estado !== 'Pagado') {
            throw new Error("No se puede emitir un comprobante de una compra no pagada.");
        }
        this.#numeroSerie = numeroSerie;
        this.#tipoDocumento = tipoDocumento;
        this.#compra = compra;
        this.#cliente = cliente;
    }

    get numeroSerie() { return this.#numeroSerie; }
    get tipoDocumento() { return this.#tipoDocumento; }
}

// ==========================================
// CLASE 6: Proveedor
// ==========================================
class Proveedor {
    #id;
    #razonSocial;
    #ruc;
    #telefono;

    constructor(id, razonSocial, ruc, telefono) {
        this.#id = id;
        this.#razonSocial = razonSocial;
        this.#ruc = ruc;
        this.#telefono = telefono;
    }

    get id() { return this.#id; }
    get razonSocial() { return this.#razonSocial; }
    get ruc() { return this.#ruc; }
    get telefono() { return this.#telefono; }
}

// ==========================================
// CLASE 7: Almacen
// ==========================================
class Almacen {
    #id;
    #ubicacion;
    #capacidadMaxima;

    constructor(id, ubicacion, capacidadMaxima) {
        this.#id = id;
        this.#ubicacion = ubicacion;
        this.#capacidadMaxima = capacidadMaxima;
    }

    get id() { return this.#id; }
    get ubicacion() { return this.#ubicacion; }
    get capacidadMaxima() { return this.#capacidadMaxima; }
}

// ==========================================
// CLASE 8: Descuento
// ==========================================
class Descuento {
    #codigo;
    #porcentaje;
    #activo;

    constructor(codigo, porcentaje) {
        this.#codigo = codigo;
        this.#porcentaje = porcentaje;
        this.#activo = true;
    }

    get codigo() { return this.#codigo; }
    get porcentaje() { return this.#porcentaje; }
    get activo() { return this.#activo; }

    aplicar(montoTotal) {
        if (!this.#activo) return montoTotal;
        return montoTotal - (montoTotal * (this.#porcentaje / 100));
    }
}

// ==========================================
// CLASE 9: Impuesto
// ==========================================
class Impuesto {
    #nombre;
    #tasa; 

    constructor(nombre, tasa) {
        this.#nombre = nombre;
        this.#tasa = tasa;
    }

    get nombre() { return this.#nombre; }
    get tasa() { return this.#tasa; }

    calcularImpuesto(montoBase) {
        return montoBase * this.#tasa;
    }
}

// ==========================================
// CLASE 10: Tienda
// ==========================================
class Tienda {
    #id;
    #nombre;
    #direccion;

    constructor(id, nombre, direccion) {
        this.#id = id;
        this.#nombre = nombre;
        this.#direccion = direccion;
    }

    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get direccion() { return this.#direccion; }
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