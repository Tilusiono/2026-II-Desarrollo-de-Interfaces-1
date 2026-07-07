// =======================
// MOLDE (CLASE BASE)
// =======================
class Molde {
    constructor(nombre) {
        this.nombre = nombre;
    }

    getNombre() {
        return this.nombre;
    }

    // 
    setNombre(nuevoNombre) {
        if (this.#validarNombre(nuevoNombre)) {
            this.nombre = this.#MayuculaNombre(nuevoNombre);
        }
    }

    //  privado
   #validarNombre(nombre) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre);
    }

    #MayuculaNombre(nombre) {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
    }

}


// =======================
// PRODUCTO
// =======================
class Producto extends Molde {
    #id;
    #stock;
    #disponible;

    constructor(iditem, nombre, precio, stock, disponible) {
        super(nombre);

        this.#iditem = iditem;
        this.precio = precio;
        this.#stock = stock;
        this.#disponible = disponible;
    }

    getId() {
        return this.#id;
    }

    getStock() {
        return this.#stock;
    }

    getDisponible() {
        return this.#disponible;
    }
    
    setDisponible(estado) {
        this.#disponible = estado;
    }

    obtenerInfo() {
        return `${this.nombre} - S/ ${this.precio}`;
    }

    // PRIVADA
    #validarNombre(nombre) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre);
    }

    #actualizarDisponibilidad() {
    this.#disponible = this.#stock > 0;
    }
}


// =======================
// BEBIDA
// =======================
class Bebida extends Producto {
    constructor(id, nombre, precio, stock, disponible, tamano, tipo) {
        super(id, nombre, precio, stock, disponible);

        this.tamano = tamano; // chico, mediano, grande
        this.tipo = tipo;     // caliente o fría
    }

    obtenerInfo() {
        return `${this.nombre} (${this.tamano}) - ${this.tipo} - S/ ${this.precio}`;
    }

    // PRIVADO

    #validarTamano(tamano) {
    return ["Chico", "Mediano", "Grande"].includes(tamano);
    }

    #validarTipo(tipo) {
    return ["Caliente", "Fría"].includes(tipo);
    }
}


// =======================
// CLIENTE
// =======================
class Cliente extends Molde {
    #compras;
    #totalGastado;

    constructor(nombre, correo, telefono, direccion) {
        super(nombre);

        this.correo = correo;
        this.telefono = telefono;
        this.direccion = direccion;

        this.#compras = [];
        this.#totalGastado = 0;
    }

    getCompras() {
        return this.#compras;
    }

    getTotalGastado() {
        return this.#totalGastado;
    }

   agregarCompra(compra) {
    this.#compras.push(compra);
    this.#actualizarTotalGastado(compra);
    }

    obtenerDatos() {
        return `Cliente: ${this.nombre} - ${this.correo}`;
    }


    // PRIVADO

    #validarCorreo(correo) {
    return correo.includes("@") && correo.includes(".");
    }

    #actualizarTotalGastado(compra) {
    this.#totalGastado += compra.calcularTotal();
    }
}

// =======================
// COMPRA
// =======================
class Compra {
    constructor(id, cliente) {
        this.id = id;
        this.cliente = cliente;
        this.productos = [];
        this.total = 0;
        this.fecha = new Date();
    }

    agregarProducto(producto) {
        this.productos.push(producto);
        this.total += producto.precio;
    }

    calcularTotal() {
        return this.total;
    }

    // PRIVADO
    #calcularSubtotal() {
    let subtotal = 0;

    this.productos.forEach(producto => {
        subtotal += producto.precio;
    });

    return subtotal;

    }

    #actualizarTotal() {
    this.total = this.#calcularSubtotal();
    }
}


// =======================
// EMPLEADO
// =======================
class Empleado extends Molde {
    constructor(nombre, cargo, sueldo, turno) {
        super(nombre);

        this.cargo = cargo;
        this.sueldo = sueldo;
        this.turno = turno; // mañana, tarde, noche
    }

    obtenerInfo() {
        return `Empleado: ${this.nombre} - ${this.cargo} (${this.turno})`;
    }

    subirSueldo(porcentaje) {
        this.sueldo += this.sueldo * (porcentaje / 100);
    }

    // PRIVADO
    #validarSueldo(sueldo) {
    return typeof sueldo === "number" && sueldo > 0;
    }

    #validarTurno(turno) {
    return ["Mañana", "Tarde", "Noche"].includes(turno);
    }
}

// =======================
// CATEGORIA
// =======================
class Categoria extends Molde {
    #productos;

    constructor(nombre, descripcion) {
        super(nombre);

        this.descripcion = descripcion;
        this.#productos = [];
    }

    agregarProducto(producto) {
        this.#productos.push(producto);
    }

    obtenerProductos() {
        return this.#productos;
    }

    obtenerInfo() {
        return `Categoría: ${this.nombre} - ${this.descripcion}`;
    }

    // PRIVADO
    #validarDescripcion(descripcion) {
    return descripcion.trim() !== "";
    }

    #contarProductos() {
    return this.#productos.length;
    }
}

// =======================
// PAGO
// =======================
class Pago {
    constructor(metodo, monto) {
        this.metodo = metodo; // Yape, efectivo, tarjeta
        this.monto = monto;
        this.estado = "pendiente";
        this.fecha = new Date();
    }

    procesarPago() {
        if (this.monto > 0) {
            this.estado = "completado";
            return true;
        }
        return false;
    }

    obtenerInfo() {
        return `Pago: ${this.metodo} - S/ ${this.monto} - ${this.estado}`;
    }

    #validarMonto(monto) {
    return typeof monto === "number" && monto > 0;
    }

    #cambiarEstado() {
    this.estado = "completado";
    }
}

// =======================
// INVENTARIO
// =======================
class Inventario {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
    }

    eliminarProducto(id) {
        this.productos = this.productos.filter(p => p.getId() !== id);
    }

    buscarProducto(nombre) {
        return this.productos.find(p => p.getNombre() === nombre);
    }

    mostrarInventario() {
        return this.productos;
    }

    #contarProductos() {
    return this.productos.length;
    }

    #verificarExistencia(id) {
    return this.productos.some(producto => producto.getId() === id);
    }


}


// Productos
const cafe1 = new Bebida(1, "Cappuccino", 12, 20, true, "Grande", "Caliente");
const cafe2 = new Bebida(2, "Latte", 10, 15, true, "Mediano", "Caliente");

// Cliente
const cliente1 = new Cliente("Carlos Ramírez", "carlos@email.com", "987654321", "Lima");

// Compra
const compra1 = new Compra(1, cliente1);
compra1.agregarProducto(cafe1);
compra1.agregarProducto(cafe2);

// Asignar compra al cliente
cliente1.agregarCompra(compra1);

// Pago
const pago1 = new Pago("Yape", compra1.total);
pago1.procesarPago();

// Inventario
const inventario = new Inventario();
inventario.agregarProducto(cafe1);
inventario.agregarProducto(cafe2);

// Mostrar resultados
console.log(compra1);
console.log(cliente1.obtenerDatos());
console.log(pago1.obtenerInfo());
console.log(inventario.mostrarInventario());



// prueva

class Factura {
    #numero;
    #igv;
    #fecha;
    #compra;


    constructor(numero, compra, igv, fecha) {
        this.#compra = compra;      

        this.#numero = numero;     // Privada
        this.#igv = igv;           // Privada
        this.fecha = fecha;       
    }

    // Getters
    getNumero() {
        return this.#numero;
    }

    getIGV() {
        return this.#igv;
    }

    getCompra() {
        return this.#compra;
    }

    // Métodos privados
    #calcularSubtotal() {
        return this.#compra.calcularTotal() / (1 + this.#igv);
    }

    #calcularIGV() {
        return this.#compra.calcularTotal() - this.#calcularSubtotal();
    }

    obtenerFactura() {
        return `

Factura N°: ${this.#numero}
Fecha: ${this.#fecha}
Total: S/ ${this.#compra.calcularTotal().toFixed(2)}
IGV: S/ ${this.#calcularIGV().toFixed(2)}
`;
    }
}
