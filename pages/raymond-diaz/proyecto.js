class ProyectoVenta {
    #productos; #carrito; #vendedor; #proveedores;

    constructor(productos, vendedor, proveedores) {
        this.#productos = productos;
        this.#carrito = [];
        this.#vendedor = vendedor;
        this.#proveedores = proveedores;
    }

    obtenerCarrito() { return this.#carrito; }
    obtenerVendedor() { return this.#vendedor; }
    obtenerProveedores() { return this.#proveedores; }

    buscarProductoPorId(id) {
        return this.#productos.find(producto => producto.id === id);
    }

    filtrarProductos(textoBusqueda, categoriaSeleccionada) {
        return this.#productos.filter(producto => producto.coincideConBusqueda(textoBusqueda, categoriaSeleccionada));
    }

    agregarAlCarrito(idProducto) {
        const producto = this.buscarProductoPorId(idProducto);
        if (!producto) throw new Error("No se encontró el producto.");

        producto.reducirStock(1);
        const itemExistente = this.#carrito.find(item => item.producto.id === idProducto);

        if (itemExistente) itemExistente.cantidad += 1;
        else this.#carrito.push({ producto, cantidad: 1 });
    }

    quitarDelCarrito(idProducto) {
        const indice = this.#carrito.findIndex(item => item.producto.id === idProducto);
        if (indice === -1) return;

        const item = this.#carrito[indice];
        item.producto.aumentarStock(1);
        item.cantidad -= 1;

        if (item.cantidad === 0) this.#carrito.splice(indice, 1);
    }

    calcularSubtotal() {
        return this.#carrito.reduce((suma, item) => suma + item.producto.precio * item.cantidad, 0);
    }

    calcularIGV() { return this.calcularSubtotal() * 0.18; }
    calcularTotal() { return this.calcularSubtotal() + this.calcularIGV(); }

    finalizarVenta() {
        if (this.#carrito.length === 0) throw new Error("El carrito está vacío.");
        const total = this.calcularTotal();
        this.#carrito = [];
        return `Venta registrada por ${this.#vendedor.nombreCompleto}. Total pagado: S/ ${total.toFixed(2)}`;
    }
}

const proveedor1 = new Proveedor({ id: 1, empresa: "TecnoImport Perú", ruc: "20481234561", telefono: "987-654-321", correo: "ventas@tecnoimport.com" });
const proveedor2 = new Proveedor({ id: 2, empresa: "PC Componentes Lima", ruc: "20679854123", telefono: "956-222-111", correo: "contacto@pccomponentes.pe" });
const proveedor3 = new Proveedor({ id: 3, empresa: "Gaming Hardware SAC", ruc: "20555444333", telefono: "944-333-222", correo: "proveedores@gaminghardware.pe" });

const vendedor = new Vendedor({
    id: 1, nombre: "Raymond", apellido: "Díaz", edad: 18, telefono: "999-888-777",
    fechaNacimiento: new Date("2008-07-07"),
    codigoEmpleado: "EMP-001", correo: "ventaspc@tienda.com", sede: "Lima", area: "Ventas",
    cargo: "Asesor de ventas de equipos para PC", metaVentas: 2000
});

const clientes = [
    new ClienteNatural({
        id: 1, nombre: "Luis", apellido: "Ramírez", edad: 20, telefono: "987-111-222",
        fechaNacimiento: new Date("2006-05-12"),
        codigoCliente: "CLI-001", correo: "luisramirez@gmail.com", direccion: "Santa Anita - Lima",
        dni: "76543210", metodoPago: "Yape"
    }),
    new ClienteEmpresarial({
        id: 2, nombre: "María", apellido: "Torres", edad: 28, telefono: "955-444-333",
        fechaNacimiento: new Date("1998-03-18"),
        codigoCliente: "CLI-002", correo: "compras@torresdigital.pe", direccion: "Ate - Lima",
        ruc: "20678945123", razonSocial: "Soluciones Digitales Torres SAC",
        rubro: "Servicios informáticos", contactoEmpresa: "compras@torresdigital.pe"
    })
];

const garantias = [
    new Garantia(1, "GAR-RYZEN-12", 12, "Cubre fallas de fábrica.", "Ryzen 5 5600X"),
    new Garantia(2, "GAR-SSD-24", 24, "Cubre fallas internas del disco.", "SSD NVMe 1TB")
];

const metodosPago = [
    new MetodoPago(1, "Efectivo", "Pago directo en tienda.", 0),
    new MetodoPago(2, "Tarjeta", "Pago con tarjeta.", 0.03),
    new MetodoPago(3, "Yape / Plin", "Pago digital.", 0)
];

const inventario = new Inventario(1, "Almacén Principal - Lima", "Raymond Díaz");
inventario.registrarEntrada("Ryzen 5 5600X", 5);
inventario.registrarEntrada("SSD NVMe 1TB", 6);
inventario.registrarSalida("Mouse Gamer RGB", 1);

const comprobanteDemo = new Factura(1, "F001", "000123", "Factura", "Soluciones Digitales Torres SAC");

const productos = [
    new Procesador({ id: 1, nombre: "Ryzen 5 5600X", marca: "AMD", precio: 620, stock: 5, descripcion: "Procesador de alto rendimiento.", proveedor: proveedor1, nucleos: 6, frecuencia: "4.6 GHz" }),
    new MemoriaRAM({ id: 2, nombre: "Memoria RAM 16GB", marca: "Kingston", precio: 155, stock: 8, descripcion: "Memoria para mejorar el rendimiento.", proveedor: proveedor2, capacidad: "16GB", tipo: "DDR4" }),
    new Almacenamiento({ id: 3, nombre: "SSD NVMe 1TB", marca: "Western Digital", precio: 290, stock: 6, descripcion: "Unidad rápida para sistema y juegos.", proveedor: proveedor2, capacidad: "1TB", tipoDisco: "NVMe" }),
    new Periferico({ id: 4, nombre: "Mouse Gamer RGB", marca: "Logitech", precio: 120, stock: 10, descripcion: "Mouse con botones programables.", proveedor: proveedor3, tipoConexion: "USB" }),
    new Periferico({ id: 5, nombre: "Teclado Mecánico", marca: "Redragon", precio: 180, stock: 7, descripcion: "Teclado mecánico resistente.", proveedor: proveedor3, tipoConexion: "USB" }),
    new TarjetaGrafica({ id: 6, nombre: "RTX 4060", marca: "NVIDIA", precio: 1450, stock: 3, descripcion: "Tarjeta gráfica para gaming.", proveedor: proveedor1, memoriaVideo: "8GB GDDR6" })
];

const proyecto = new ProyectoVenta(productos, vendedor, [proveedor1, proveedor2, proveedor3]);

const datosVendedor = document.querySelector("#datosVendedor");
const listaClientes = document.querySelector("#listaClientes");
const listaProductos = document.querySelector("#listaProductos");
const listaCarrito = document.querySelector("#listaCarrito");
const listaGarantias = document.querySelector("#listaGarantias");
const listaMetodosPago = document.querySelector("#listaMetodosPago");
const datosInventario = document.querySelector("#datosInventario");
const datosFactura = document.querySelector("#datosFactura");
const listaProveedores = document.querySelector("#listaProveedores");
const busqueda = document.querySelector("#busqueda");
const categoria = document.querySelector("#categoria");
const subtotal = document.querySelector("#subtotal");
const igv = document.querySelector("#igv");
const total = document.querySelector("#total");
const finalizarVenta = document.querySelector("#finalizarVenta");
const mensajeVenta = document.querySelector("#mensajeVenta");

function formatearMoneda(valor) { return `S/ ${valor.toFixed(2)}`; }

function renderizarVendedor() {
    datosVendedor.innerHTML = proyecto.obtenerVendedor().mostrarDatos();
}

function renderizarClientes() {
    listaClientes.innerHTML = "";
    clientes.forEach(cliente => {
        const div = document.createElement("div");
        div.innerHTML = `<p>${cliente.mostrarDatos()}</p><hr>`;
        listaClientes.appendChild(div);
    });
}

function renderizarProductos() {
    const productosFiltrados = proyecto.filtrarProductos(busqueda.value.trim(), categoria.value);
    listaProductos.innerHTML = "";

    if (productosFiltrados.length === 0) {
        listaProductos.innerHTML = "<p>No se encontraron productos.</p>";
        return;
    }

    productosFiltrados.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Categoría: ${producto.categoria}</p>
            <p>Marca: ${producto.marca}</p>
            <p>Proveedor: ${producto.proveedor.empresa}</p>
            <p>Detalle: ${producto.obtenerDetalleTecnico()}</p>
            <p>${producto.descripcion}</p>
            <p>Precio: ${producto.obtenerPrecioFormateado()}</p>
            <p>Stock: ${producto.stock}</p>
            <button data-id="${producto.id}" ${producto.disponible ? "" : "disabled"}>
                ${producto.disponible ? "Agregar al carrito" : "Sin stock"}
            </button>
            <hr>
        `;
        listaProductos.appendChild(tarjeta);
    });
}

function renderizarCarrito() {
    const carrito = proyecto.obtenerCarrito();
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) listaCarrito.innerHTML = "<li>El carrito está vacío.</li>";
    else {
        carrito.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `${item.producto.nombre} x ${item.cantidad} <button data-id="${item.producto.id}">Quitar</button>`;
            listaCarrito.appendChild(li);
        });
    }

    subtotal.textContent = formatearMoneda(proyecto.calcularSubtotal());
    igv.textContent = formatearMoneda(proyecto.calcularIGV());
    total.textContent = formatearMoneda(proyecto.calcularTotal());
}

function renderizarModulosExtra() {
    listaGarantias.innerHTML = "";
    listaMetodosPago.innerHTML = "";

    garantias.forEach(garantia => {
        const p = document.createElement("p");
        p.innerHTML = garantia.mostrarDatos();
        listaGarantias.appendChild(p);
    });

    metodosPago.forEach(metodo => {
        const p = document.createElement("p");
        p.innerHTML = metodo.mostrarDatos();
        listaMetodosPago.appendChild(p);
    });

    datosInventario.innerHTML = inventario.mostrarDatos();
    datosFactura.innerHTML = comprobanteDemo.emitir(proyecto.calcularTotal());
}

function renderizarProveedores() {
    listaProveedores.innerHTML = "";
    proyecto.obtenerProveedores().forEach(proveedor => {
        const div = document.createElement("div");
        div.innerHTML = `<p>${proveedor.mostrarInfo()}</p><hr>`;
        listaProveedores.appendChild(div);
    });
}

function actualizarInterfaz() {
    renderizarVendedor();
    renderizarClientes();
    renderizarProductos();
    renderizarCarrito();
    renderizarModulosExtra();
    renderizarProveedores();
}

listaProductos.addEventListener("click", event => {
    const boton = event.target.closest("button");
    if (!boton) return;

    try {
        proyecto.agregarAlCarrito(Number(boton.dataset.id));
        mensajeVenta.textContent = "Producto agregado correctamente.";
        actualizarInterfaz();
    } catch (error) {
        mensajeVenta.textContent = error.message;
    }
});

listaCarrito.addEventListener("click", event => {
    const boton = event.target.closest("button");
    if (!boton) return;

    proyecto.quitarDelCarrito(Number(boton.dataset.id));
    mensajeVenta.textContent = "Producto quitado del carrito.";
    actualizarInterfaz();
});

busqueda.addEventListener("input", renderizarProductos);
categoria.addEventListener("change", renderizarProductos);

finalizarVenta.addEventListener("click", () => {
    try {
        mensajeVenta.textContent = proyecto.finalizarVenta();
        actualizarInterfaz();
    } catch (error) {
        mensajeVenta.textContent = error.message;
    }
});

actualizarInterfaz();
