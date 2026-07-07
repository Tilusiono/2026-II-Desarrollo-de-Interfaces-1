// proyecto.js
// Aquí se controla el DOM, el carrito y la venta principal.

class ProyectoVenta {
    #productos;
    #carrito;
    #vendedor;
    #proveedores;

    constructor(productos, vendedor, proveedores) {
        this.#productos = productos;
        this.#carrito = [];
        this.#vendedor = vendedor;
        this.#proveedores = proveedores;
    }

    obtenerProductos() {
        return this.#productos;
    }

    obtenerCarrito() {
        return this.#carrito;
    }

    obtenerVendedor() {
        return this.#vendedor;
    }

    obtenerProveedores() {
        return this.#proveedores;
    }

    buscarProductoPorId(id) {
        return this.#productos.find(producto => producto.id === id);
    }

    filtrarProductos(textoBusqueda, categoriaSeleccionada) {
        return this.#productos.filter(producto => producto.coincideConBusqueda(textoBusqueda, categoriaSeleccionada));
    }

    agregarAlCarrito(idProducto) {
        const producto = this.buscarProductoPorId(idProducto);

        if (!producto) {
            throw new Error("No se encontró el producto seleccionado.");
        }

        producto.reducirStock(1);

        const itemExistente = this.#carrito.find(item => item.producto.id === idProducto);

        if (itemExistente) {
            itemExistente.cantidad += 1;
        } else {
            this.#carrito.push({
                producto: producto,
                cantidad: 1
            });
        }
    }

    quitarDelCarrito(idProducto) {
        const indice = this.#carrito.findIndex(item => item.producto.id === idProducto);

        if (indice === -1) {
            return;
        }

        const item = this.#carrito[indice];
        item.producto.aumentarStock(1);
        item.cantidad -= 1;

        if (item.cantidad === 0) {
            this.#carrito.splice(indice, 1);
        }
    }

    calcularSubtotal() {
        return this.#carrito.reduce((suma, item) => {
            return suma + item.producto.precio * item.cantidad;
        }, 0);
    }

    calcularIGV() {
        return this.calcularSubtotal() * 0.18;
    }

    calcularTotal() {
        return this.calcularSubtotal() + this.calcularIGV();
    }

    finalizarVenta() {
        if (this.#carrito.length === 0) {
            throw new Error("El carrito está vacío. Agrega productos antes de finalizar.");
        }

        const total = this.calcularTotal();
        this.#carrito = [];
        return `Venta registrada por ${this.#vendedor.nombreCompleto}. Total pagado: S/ ${total.toFixed(2)}`;
    }
}

const proveedor1 = new Proveedor({
    id: 1,
    empresa: "TecnoImport Perú",
    ruc: "20481234561",
    telefono: "987-654-321",
    correo: "ventas@tecnoimport.com"
});

const proveedor2 = new Proveedor({
    id: 2,
    empresa: "PC Componentes Lima",
    ruc: "20679854123",
    telefono: "956-222-111",
    correo: "contacto@pccomponentes.pe"
});

const proveedor3 = new Proveedor({
    id: 3,
    empresa: "Gaming Hardware SAC",
    ruc: "20555444333",
    telefono: "944-333-222",
    correo: "proveedores@gaminghardware.pe"
});

const vendedor = new Vendedor({
    id: 1,
    nombre: "Raymond",
    apellido: "Díaz",
    telefono: "999-888-777",
    correo: "ventaspc@tienda.com",
    codigoEmpleado: "VEND-001",
    cargo: "Asesor de ventas",
    sede: "Lima"
});

const productos = [
    new Procesador({
        id: 1,
        nombre: "Ryzen 5 5600X",
        marca: "AMD",
        precio: 620,
        stock: 5,
        descripcion: "Procesador de alto rendimiento para gaming, edición y multitarea.",
        proveedor: proveedor1,
        nucleos: 6,
        frecuencia: "4.6 GHz"
    }),
    new MemoriaRAM({
        id: 2,
        nombre: "Memoria RAM 16GB",
        marca: "Kingston",
        precio: 155,
        stock: 8,
        descripcion: "Memoria ideal para mejorar el rendimiento general de una PC.",
        proveedor: proveedor2,
        capacidad: "16GB",
        tipo: "DDR4"
    }),
    new Almacenamiento({
        id: 3,
        nombre: "SSD NVMe 1TB",
        marca: "Western Digital",
        precio: 290,
        stock: 6,
        descripcion: "Unidad rápida para sistema operativo, juegos y programas.",
        proveedor: proveedor2,
        capacidad: "1TB",
        tipoDisco: "NVMe"
    }),
    new Periferico({
        id: 4,
        nombre: "Mouse Gamer RGB",
        marca: "Logitech",
        precio: 120,
        stock: 10,
        descripcion: "Mouse ergonómico con iluminación RGB y botones programables.",
        proveedor: proveedor3,
        tipoConexion: "USB"
    }),
    new Periferico({
        id: 5,
        nombre: "Teclado Mecánico",
        marca: "Redragon",
        precio: 180,
        stock: 7,
        descripcion: "Teclado mecánico resistente para juegos, programación y oficina.",
        proveedor: proveedor3,
        tipoConexion: "USB"
    }),
    new TarjetaGrafica({
        id: 6,
        nombre: "RTX 4060",
        marca: "NVIDIA",
        precio: 1450,
        stock: 3,
        descripcion: "Tarjeta gráfica para gaming, diseño 3D y trabajos de alto rendimiento.",
        proveedor: proveedor1,
        memoriaVideo: "8GB GDDR6"
    })
];

const proyecto = new ProyectoVenta(productos, vendedor, [proveedor1, proveedor2, proveedor3]);

const datosVendedor = document.querySelector("#datosVendedor");
const listaProductos = document.querySelector("#listaProductos");
const listaCarrito = document.querySelector("#listaCarrito");
const listaProveedores = document.querySelector("#listaProveedores");
const busqueda = document.querySelector("#busqueda");
const categoria = document.querySelector("#categoria");
const subtotal = document.querySelector("#subtotal");
const igv = document.querySelector("#igv");
const total = document.querySelector("#total");
const finalizarVenta = document.querySelector("#finalizarVenta");
const mensajeVenta = document.querySelector("#mensajeVenta");

function formatearMoneda(valor) {
    return `S/ ${valor.toFixed(2)}`;
}

function crearTarjetaProducto(producto) {
    const tarjeta = document.createElement("article");
    tarjeta.className = producto.disponible ? "tarjeta-producto" : "tarjeta-producto agotado";

    tarjeta.innerHTML = `
        <span class="categoria">${producto.categoria}</span>
        <h3>${producto.nombre}</h3>
        <p><strong>Marca:</strong> ${producto.marca}</p>
        <p class="proveedor"><strong>Proveedor:</strong> ${producto.proveedor.empresa}</p>
        <p><strong>Detalle:</strong> ${producto.obtenerDetalleTecnico()}</p>
        <p>${producto.descripcion}</p>
        <p class="precio">${producto.obtenerPrecioFormateado()}</p>
        <p class="stock"><strong>Stock:</strong> ${producto.stock}</p>
        <button class="boton-principal" data-id="${producto.id}" ${producto.disponible ? "" : "disabled"}>
            ${producto.disponible ? "Agregar al carrito" : "Sin stock"}
        </button>
    `;

    return tarjeta;
}

function renderizarProductos() {
    const textoBusqueda = busqueda.value.trim();
    const categoriaSeleccionada = categoria.value;
    const productosFiltrados = proyecto.filtrarProductos(textoBusqueda, categoriaSeleccionada);

    listaProductos.innerHTML = "";

    if (productosFiltrados.length === 0) {
        listaProductos.innerHTML = "<p>No se encontraron productos con ese filtro.</p>";
        return;
    }

    productosFiltrados.forEach(producto => {
        listaProductos.appendChild(crearTarjetaProducto(producto));
    });
}

function renderizarCarrito() {
    const carrito = proyecto.obtenerCarrito();
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<li>El carrito está vacío.</li>";
    } else {
        carrito.forEach(item => {
            const li = document.createElement("li");
            li.className = "item-carrito";

            li.innerHTML = `
                <span>${item.producto.nombre} x ${item.cantidad}</span>
                <button class="boton-eliminar" data-id="${item.producto.id}" aria-label="Quitar ${item.producto.nombre}">
                    Quitar
                </button>
            `;

            listaCarrito.appendChild(li);
        });
    }

    subtotal.textContent = formatearMoneda(proyecto.calcularSubtotal());
    igv.textContent = formatearMoneda(proyecto.calcularIGV());
    total.textContent = formatearMoneda(proyecto.calcularTotal());
}

function renderizarProveedores() {
    listaProveedores.innerHTML = "";

    proyecto.obtenerProveedores().forEach(proveedor => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-proveedor";
        tarjeta.innerHTML = `<h3>${proveedor.empresa}</h3><p>${proveedor.mostrarInfo()}</p>`;
        listaProveedores.appendChild(tarjeta);
    });
}

function actualizarInterfaz() {
    renderizarProductos();
    renderizarCarrito();
    renderizarProveedores();
}

datosVendedor.innerHTML = proyecto.obtenerVendedor().mostrarDatos();

listaProductos.addEventListener("click", event => {
    const boton = event.target.closest("button");

    if (!boton) {
        return;
    }

    const idProducto = Number(boton.dataset.id);

    try {
        proyecto.agregarAlCarrito(idProducto);
        mensajeVenta.textContent = "Producto agregado correctamente.";
        actualizarInterfaz();
    } catch (error) {
        mensajeVenta.textContent = error.message;
    }
});

listaCarrito.addEventListener("click", event => {
    const boton = event.target.closest("button");

    if (!boton) {
        return;
    }

    const idProducto = Number(boton.dataset.id);
    proyecto.quitarDelCarrito(idProducto);
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
