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

    // set modifica
    setNombre(nuevoNombre) {
        if (nuevoNombre !== "") {
            this.nombre = nuevoNombre;
        }
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

    setStock(nuevoStock) {
        if (nuevoStock >= 0) {
            this.#stock = nuevoStock;
        }
    }

    setDisponible(estado) {
        this.#disponible = estado;
    }

    obtenerInfo() {
        return `${this.nombre} - S/ ${this.precio}`;
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
        this.#totalGastado += compra.calcularTotal();
    }

    obtenerDatos() {
        return `Cliente: ${this.nombre} - ${this.correo}`;
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
}

// =======================
// DEMO DEL SISTEMA
// =======================

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
