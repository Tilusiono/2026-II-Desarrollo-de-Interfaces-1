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