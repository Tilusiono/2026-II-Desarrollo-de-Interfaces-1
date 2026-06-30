// =====================================================
// SISTEMA DE EMPRENDIMIENTO - TIENDA DE COMPUTADORAS
// =====================================================

// 1. Categoría
class Categoria {
    constructor(nombre, descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    mostrarCategoria() {
        return `${this.nombre}: ${this.descripcion}`;
    }
}

// 2. Proveedor
class Proveedor {
    constructor(nombreEmpresa, ruc, telefono, direccion) {
        this.nombreEmpresa = nombreEmpresa;
        this.ruc = ruc;
        this.telefono = telefono;
        this.direccion = direccion;
    }

    mostrarProveedor() {
        return `${this.nombreEmpresa} | RUC: ${this.ruc} | Tel: ${this.telefono}`;
    }
}

// 3. Persona
class Persona {
    constructor(nombreCompleto, telefono, correo) {
        this.nombreCompleto = nombreCompleto;
        this.telefono = telefono;
        this.correo = correo;
    }

    mostrarDatos() {
        return `${this.nombreCompleto} | Tel: ${this.telefono} | Correo: ${this.correo}`;
    }
}

// 4. Cliente
class Cliente extends Persona {
    constructor(idCliente, nombreCompleto, telefono, correo, direccion) {
        super(nombreCompleto, telefono, correo);
        this.idCliente = idCliente;
        this.direccion = direccion;
        this.historialCompras = [];
    }

    agregarCompra(venta) {
        this.historialCompras.push(venta);
    }
}

// 5. Empleado
class Empleado extends Persona {
    constructor(idEmpleado, nombreCompleto, telefono, correo, cargo, sueldo) {
        super(nombreCompleto, telefono, correo);
        this.idEmpleado = idEmpleado;
        this.cargo = cargo;
        this.sueldo = sueldo;
    }

    mostrarEmpleado() {
        return `${this.nombreCompleto} | Cargo: ${this.cargo} | Sueldo: S/ ${this.sueldo}`;
    }
}

// 6. Garantía
class Garantia {
    constructor(meses, descripcion) {
        this.meses = meses;
        this.descripcion = descripcion;
    }

    mostrarGarantia() {
        return `${this.meses} meses de garantía - ${this.descripcion}`;
    }
}

// 7. Producto
class Producto {
    constructor(codigo, nombre, marca, categoria, proveedor, precioCompra, precioVenta, stock, garantia) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.marca = marca;
        this.categoria = categoria;
        this.proveedor = proveedor;
        this.precioCompra = this.validarPrecio(precioCompra);
        this.precioVenta = this.validarPrecio(precioVenta);
        this.stock = this.validarStock(stock);
        this.garantia = garantia;
    }

    validarPrecio(precio) {
        if (precio < 0) {
            throw new Error("El precio no puede ser negativo.");
        }

        return precio;
    }

    validarStock(stock) {
        if (stock < 0) {
            throw new Error("El stock no puede ser negativo.");
        }

        return stock;
    }

    aumentarStock(cantidad) {
        if (cantidad <= 0) {
            throw new Error("La cantidad debe ser mayor que 0.");
        }

        this.stock += cantidad;
    }

    reducirStock(cantidad) {
        if (cantidad <= 0) {
            throw new Error("La cantidad debe ser mayor que 0.");
        }

        if (cantidad > this.stock) {
            throw new Error(`No hay suficiente stock de ${this.nombre}.`);
        }

        this.stock -= cantidad;
    }

    calcularGananciaUnitaria() {
        return this.precioVenta - this.precioCompra;
    }

    mostrarProducto() {
        return `${this.codigo} - ${this.nombre} ${this.marca} | S/ ${this.precioVenta} | Stock: ${this.stock}`;
    }
}

// 8. Inventario
class Inventario {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        const existe = this.productos.find(p => p.codigo === producto.codigo);

        if (existe) {
            throw new Error("Ya existe un producto con ese código.");
        }

        this.productos.push(producto);
    }

    buscarProducto(codigo) {
        return this.productos.find(producto => producto.codigo === codigo);
    }

    listarProductos() {
        console.log("\n===== INVENTARIO DE PRODUCTOS =====");

        this.productos.forEach(producto => {
            console.log(producto.mostrarProducto());
        });
    }

    listarProductosBajoStock(minimo) {
        return this.productos.filter(producto => producto.stock <= minimo);
    }
}

// 9. Detalle de Venta
class DetalleVenta {
    constructor(producto, cantidad) {
        if (cantidad <= 0) {
            throw new Error("La cantidad debe ser mayor que 0.");
        }

        this.producto = producto;
        this.cantidad = cantidad;
        this.precioUnitario = producto.precioVenta;
        this.subtotal = this.calcularSubtotal();
    }

    calcularSubtotal() {
        return this.precioUnitario * this.cantidad;
    }

    mostrarDetalle() {
        return `${this.producto.nombre} x${this.cantidad} = S/ ${this.subtotal.toFixed(2)}`;
    }
}

// 10. Venta
class Venta {
    constructor(idVenta, cliente, empleado, metodoPago) {
        this.idVenta = idVenta;
        this.cliente = cliente;
        this.empleado = empleado;
        this.metodoPago = metodoPago;
        this.detalles = [];
        this.fecha = new Date();
        this.estado = "Pendiente";
    }

    agregarProducto(producto, cantidad) {
        producto.reducirStock(cantidad);

        const detalle = new DetalleVenta(producto, cantidad);
        this.detalles.push(detalle);
    }

    calcularTotal() {
        return this.detalles.reduce((total, detalle) => total + detalle.subtotal, 0);
    }

    finalizarVenta() {
        if (this.detalles.length === 0) {
            throw new Error("No se puede finalizar una venta sin productos.");
        }

        this.estado = "Finalizada";
        this.cliente.agregarCompra(this);
    }

    mostrarBoleta() {
        console.log("\n==================================");
        console.log(`BOLETA DE VENTA #${this.idVenta}`);
        console.log("==================================");
        console.log(`Cliente: ${this.cliente.nombreCompleto}`);
        console.log(`Empleado: ${this.empleado.nombreCompleto}`);
        console.log(`Método de pago: ${this.metodoPago}`);
        console.log(`Fecha: ${this.fecha.toLocaleString()}`);
        console.log("----------------------------------");

        this.detalles.forEach(detalle => {
            console.log(detalle.mostrarDetalle());
        });

        console.log("----------------------------------");
        console.log(`TOTAL: S/ ${this.calcularTotal().toFixed(2)}`);
        console.log(`Estado: ${this.estado}`);
        console.log("==================================");
    }
}

// 11. TiendaComputo
class TiendaComputo {
    constructor(nombreTienda, direccion) {
        this.nombreTienda = nombreTienda;
        this.direccion = direccion;
        this.inventario = new Inventario();
        this.clientes = [];
        this.empleados = [];
        this.ventas = [];
    }

    registrarCliente(cliente) {
        this.clientes.push(cliente);
    }

    registrarEmpleado(empleado) {
        this.empleados.push(empleado);
    }

    registrarProducto(producto) {
        this.inventario.agregarProducto(producto);
    }

    registrarVenta(venta) {
        this.ventas.push(venta);
    }

    calcularIngresosTotales() {
        return this.ventas
            .filter(venta => venta.estado === "Finalizada")
            .reduce((total, venta) => total + venta.calcularTotal(), 0);
    }

    generarReporteVentas() {
        console.log("\n===== REPORTE DE VENTAS =====");
        console.log(`Tienda: ${this.nombreTienda}`);
        console.log(`Dirección: ${this.direccion}`);
        console.log(`Ventas realizadas: ${this.ventas.length}`);
        console.log(`Ingresos totales: S/ ${this.calcularIngresosTotales().toFixed(2)}`);

        console.log("\nProductos con bajo stock:");

        const bajoStock = this.inventario.listarProductosBajoStock(5);

        if (bajoStock.length === 0) {
            console.log("No hay productos con bajo stock.");
        } else {
            bajoStock.forEach(producto => {
                console.log(`- ${producto.nombre} | Stock: ${producto.stock}`);
            });
        }
    }
}

// =====================================================
// EJEMPLO DE USO
// =====================================================

const tienda = new TiendaComputo(
    "Raymond Tech Store",
    "Av. Principal 123 - Lima"
);

// Categorías
const categoriaMouse = new Categoria(
    "Mouse",
    "Dispositivos de entrada para computadora"
);

const categoriaTeclado = new Categoria(
    "Teclado",
    "Teclados mecánicos, gamer y de oficina"
);

const categoriaMonitor = new Categoria(
    "Monitor",
    "Pantallas para PC, gaming y trabajo"
);

// Proveedor
const proveedor1 = new Proveedor(
    "CompuMayoristas SAC",
    "20123456789",
    "987654321",
    "Lima, Perú"
);

// Garantías
const garantiaMouse = new Garantia(
    12,
    "Cubre fallas de fábrica"
);

const garantiaTeclado = new Garantia(
    18,
    "Cubre defectos de teclas y placa interna"
);

const garantiaMonitor = new Garantia(
    24,
    "Cubre problemas de pantalla y energía"
);

// Productos
const mouseGamer = new Producto(
    "P001",
    "Mouse Gamer RGB",
    "Logitech",
    categoriaMouse,
    proveedor1,
    65,
    110,
    20,
    garantiaMouse
);

const tecladoMecanico = new Producto(
    "P002",
    "Teclado Mecánico",
    "Redragon",
    categoriaTeclado,
    proveedor1,
    120,
    190,
    10,
    garantiaTeclado
);

const monitorGaming = new Producto(
    "P003",
    "Monitor Gaming 144Hz",
    "AOC",
    categoriaMonitor,
    proveedor1,
    550,
    750,
    4,
    garantiaMonitor
);

// Cliente
const cliente1 = new Cliente(
    "C001",
    "Raymond Díaz",
    "123456789",
    "raymond@example.com",
    "Lima, Perú"
);

// Empleado
const empleado1 = new Empleado(
    "E001",
    "Carlos Mendoza",
    "987654321",
    "carlos@tienda.com",
    "Vendedor",
    1500
);

// Registro en tienda
tienda.registrarCliente(cliente1);
tienda.registrarEmpleado(empleado1);

tienda.registrarProducto(mouseGamer);
tienda.registrarProducto(tecladoMecanico);
tienda.registrarProducto(monitorGaming);

// Mostrar inventario inicial
tienda.inventario.listarProductos();

// Crear venta
const venta1 = new Venta(
    "V001",
    cliente1,
    empleado1,
    "Yape"
);

venta1.agregarProducto(mouseGamer, 2);
venta1.agregarProducto(tecladoMecanico, 1);
venta1.agregarProducto(monitorGaming, 1);

venta1.finalizarVenta();

// Registrar venta
tienda.registrarVenta(venta1);

// Mostrar boleta
venta1.mostrarBoleta();

// Mostrar reporte general
tienda.generarReporteVentas();

// Mostrar inventario actualizado
tienda.inventario.listarProductos();