//proyecto SchoolSupply.

class Entidad {
    id;
    nombre;

    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    // Getters
    getid() {
        return this.id;
    }

    getnombre() {
        return this.nombre;
    }

    // Setters
    setid(nuevoId) {
        if (nuevoId > 0) {
            this.id = nuevoId;
        }
    }

    setnombre(nuevoNombre) {
        if (nuevoNombre !== "") {
            this.nombre = nuevoNombre;
        }
    }

    obtenerIdentificador() {
        return "ID: " + this.id + " - Nombre: " + this.nombre;
    }
}

class producto extends Entidad { 
    #stock;
    #activo;
    #codigoInterno;
     
    marca;
    color;
    calidad;
    precioUnitario;
    precioDocena;

    constructor (cod, nom, mar, col, cal, pUni, pDoc, stk){
        super(cod, nom);

        this.marca = mar;
        this.color = col;
        this.calidad = cal;
        this.precioUnitario = pUni;
        this.precioDocena = pDoc;
        this.#stock = stk;
        this.#activo = true;
        this.#codigoInterno = "PROD-" + cod;

    }

    // Getters
    getstock() {
        return this.#stock;
    }

    getactivo() {
        return this.#activo;
    }

    getcodigoInterno() {
        return this.#codigoInterno;
    }

    // Setters
    setstock(nuevoStock) {
        if (nuevoStock >= 0) {
            this.#stock = nuevoStock;
        }
    }

    setactivo(estado) {
        this.#activo = estado;
    }

    // Métodos públicos
    obtenerPrecio(cantidad) {
        let resultado = 0;
        if (cantidad >= 12) {
            resultado = this.precioDocena * (cantidad / 12);
        } else {
            resultado = this.precioUnitario * cantidad;
        }
        return resultado;
    }

    obtenerInfo() {
        return this.nombre + " - " + this.marca + " (" + this.color + ")";
    }

    tieneStock(cantidad) {
        return this.#stock >= cantidad;
    }

    reducirStock(cantidad) {
        if (this.tieneStock(cantidad)) {
            this.#stock = this.#stock - cantidad;
            return true;
        }
        return false;
    }

    // Método privado
    #validarPrecio() {
        return this.precioUnitario > 0 && this.precioDocena > 0;
    }
}

const producto1 = new producto(1, "Cuaderno A4", "Norma", "Azul", "Premium", 9, 96, 100);

class carrito extends Entidad {
    #cantidadItems;
    #descuentoAplicado;

    items;
    metodoPago;
    total;
    subtotal;
     
    constructor (itm, metPag, tot, subTot){
        super(0, "Carrito");

        this.items = Array.isArray(itm) ? itm : [];
        this.metodoPago = metPag;
        this.total = tot;
        this.subtotal = subTot;
        this.#cantidadItems = 0;
        this.#descuentoAplicado = 0;
    }

    // Getters
    getcantidadItems() {
        return this.#cantidadItems;
    }

    getdescuentoAplicado() {
        return this.#descuentoAplicado;
    }

    // Setters
    setmetodoPago(nuevoMetodo) {
        this.metodoPago = nuevoMetodo;
    }

    // Métodos públicos
    agregarItem(producto, cantidad) {
        let encontrado = null;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].producto.id === producto.id) {
                encontrado = this.items[i];
                break;
            }
        }
        if (encontrado !== null) {
            encontrado.cantidad = encontrado.cantidad + cantidad;
        } else {
            this.items.push({
                producto: producto,
                cantidad: cantidad
            });
        }
        this.#actualizarTotales();
        return this.items.length;
    }

    eliminarItem(id) {
        let nuevoCarrito = [];
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].producto.id !== id) {
                nuevoCarrito.push(this.items[i]);
            }
        }
        this.items = nuevoCarrito;
        this.#actualizarTotales();
        return this.items.length;
    }

    vaciar() {
        this.items = [];
        this.total = 0;
        this.subtotal = 0;
        this.#cantidadItems = 0;
        this.#descuentoAplicado = 0;
    }

    obtenerSubtotal() {
        return this.subtotal;
    }

    obtenerTotal() {
        return this.total;
    }

    estaVacio() {
        return this.items.length === 0;
    }

    cambiarPago(metodo) {
        this.metodoPago = metodo;
        return this.metodoPago;
    }

    obtenerPago() {
        return this.metodoPago;
    }

    aplicarDescuento() {
        this.#calcularDescuento();
        this.total = this.subtotal - this.#descuentoAplicado;
        return this.total;
    }

    // Métodos privados
    #actualizarTotales() {
        let total = 0;
        let cantidad = 0;
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            cantidad = cantidad + item.cantidad;
            total = total + (item.producto.precioUnitario * item.cantidad);
        }
        this.#cantidadItems = cantidad;
        this.subtotal = total;
        this.total = total - this.#descuentoAplicado;
    }

    #calcularDescuento() {
        if (this.#cantidadItems >= 24) {
            this.#descuentoAplicado = this.subtotal * 0.15;
        } else if (this.#cantidadItems >= 12) {
            this.#descuentoAplicado = this.subtotal * 0.10;
        } else if (this.#cantidadItems >= 6) {
            this.#descuentoAplicado = this.subtotal * 0.05;
        } else {
            this.#descuentoAplicado = 0;
        }
        return this.#descuentoAplicado;
    }
}

const carrito1 = new carrito([], "Efectivo", 0, 0);

class descuento extends Entidad {
    #aplicado;
    #metodoPagoSeleccionado;

    porcentajeCantidad;
    porcentajePago;
    descCantidad;
    subtotalConDescuento;
    descPago;
    total;
     
    constructor (porCant, porPag, desCant, subDesc, desPag, tot){
        super(0, "Descuento");

        this.porcentajeCantidad = porCant;
        this.porcentajePago = porPag;
        this.descCantidad = desCant;
        this.subtotalConDescuento = subDesc;
        this.descPago = desPag;
        this.total = tot;
        this.#aplicado = false;
        this.#metodoPagoSeleccionado = "Efectivo";
    }

    // Getters
    getaplicado() {
        return this.#aplicado;
    }

    getmetodoPagoSeleccionado() {
        return this.#metodoPagoSeleccionado;
    }

    // Setters
    setmetodoPagoSeleccionado(nuevoMetodo) {
        this.#metodoPagoSeleccionado = nuevoMetodo;
    }

    // Métodos públicos
    calcularPorCantidad(cantidad) {
        let descuento = 0;
        if (cantidad >= 24) {
            descuento = 15;
        } else if (cantidad >= 12) {
            descuento = 10;
        } else if (cantidad >= 6) {
            descuento = 5;
        } else {
            descuento = 0;
        }
        this.porcentajeCantidad = descuento;
        this.#aplicado = true;
        return descuento;
    }

    calcularPorPago(metodo) {
        let descuento = 0;
        if (metodo === "Yape" || metodo === "Plin") {
            descuento = 5;
        } else if (metodo === "Transferencia") {
            descuento = 3;
        } else {
            descuento = 0;
        }
        this.porcentajePago = descuento;
        this.#metodoPagoSeleccionado = metodo;
        this.#aplicado = true;
        return descuento;
    }

    calcularTotal(subtotal) {
        let descCant = (subtotal * this.porcentajeCantidad) / 100;
        let subtotalDesc = subtotal - descCant;
        let descPago = (subtotalDesc * this.porcentajePago) / 100;
        let total = subtotalDesc - descPago;
        this.descCantidad = descCant;
        this.subtotalConDescuento = subtotalDesc;
        this.descPago = descPago;
        this.total = total;
        return total;
    }

    obtenerDetalles(subtotal) {
        let descCant = (subtotal * this.porcentajeCantidad) / 100;
        let subtotalDesc = subtotal - descCant;
        let descPago = (subtotalDesc * this.porcentajePago) / 100;
        let total = subtotalDesc - descPago;
        return {
            subtotal: subtotal,
            descCantidad: descCant,
            subtotalConDescuento: subtotalDesc,
            descPago: descPago,
            total: total,
            porcentajeCantidad: this.porcentajeCantidad,
            porcentajePago: this.porcentajePago
        };
    }

    reiniciar() {
        this.porcentajeCantidad = 0;
        this.porcentajePago = 0;
        this.descCantidad = 0;
        this.subtotalConDescuento = 0;
        this.descPago = 0;
        this.total = 0;
        this.#aplicado = false;
    }

    obtenerPorcentajeTotal() {
        return this.porcentajeCantidad + this.porcentajePago;
    }

    // Método privado
    #validarMetodoPago(metodo) {
        let metodosValidos = ["Efectivo", "Tarjeta", "Yape", "Plin", "Transferencia"];
        for (let i = 0; i < metodosValidos.length; i++) {
            if (metodosValidos[i] === metodo) {
                return true;
            }
        }
        return false;
    }
}

const descuento1 = new descuento(0, 0, 0, 0, 0, 0);

class cliente extends Entidad {
    #tipo;
    #compras;
    #totalGastado;

    correo;
    telefono;
    direccion;
    fechaRegistro;

    constructor (nomComp, corr, tel, dir, fecReg){
        super(0, nomComp);

        this.correo = corr;
        this.telefono = tel;
        this.direccion = dir;
        this.fechaRegistro = fecReg;
        this.#tipo = "Minorista";
        this.#compras = [];
        this.#totalGastado = 0;
    }

    // Getters
    gettipo() {
        return this.#tipo;
    }

    getcompras() {
        return this.#compras;
    }

    gettotalGastado() {
        return this.#totalGastado;
    }

    // Setters
    setdireccion(nuevaDireccion) {
        this.direccion = nuevaDireccion;
    }

    settelefono(nuevoTelefono) {
        if (nuevoTelefono.length >= 9) {
            this.telefono = nuevoTelefono;
        }
    }

    // Métodos públicos
    obtenerDatos() {
        return "Cliente: " + this.nombre + " - Correo: " + this.correo;
    }

    actualizarTipo(total) {
        if (total > 100) {
            this.#tipo = "Mayorista";
            return "Cliente mayorista";
        } else {
            this.#tipo = "Minorista";
            return "Cliente minorista";
        }
    }

    agregarCompra(compra) {
        this.#compras.push(compra);
        this.#totalGastado = this.#totalGastado + compra.gettotalFinal();
        return this.#compras.length;
    }

    validarCorreo() {
        return this.correo.includes("@") && this.correo.includes(".");
    }

    cambiarDireccion(nueva) {
        this.direccion = nueva;
        return this.direccion;
    }

    esMayorista() {
        return this.#totalGastado > 500;
    }

    // Método privado
    #validarTelefono() {
        return this.telefono.length >= 9;
    }
}

const cliente1 = new cliente("Ana Pérez", "ana@email.com", "987654321", "Av. Siempre Viva 123", new Date());

class compra extends Entidad {
    #numeroCompra;
    #totalFinal;
    #detalles;

    cliente;
    carrito;
    descuento;
    fecha;
    estado;

    constructor (cli, car, desc, fec, est){
        super(0, "Compra");

        this.cliente = cli;
        this.carrito = car;
        this.descuento = desc;
        this.fecha = fec;
        this.estado = est;
        this.#numeroCompra = this.#generarNumero();
        this.#totalFinal = 0;
        this.#detalles = null;
    }

    // Getters
    getnumeroCompra() {
        return this.#numeroCompra;
    }

    gettotalFinal() {
        return this.#totalFinal;
    }

    getdetalles() {
        return this.#detalles;
    }

    // Setters
    setestado(nuevoEstado) {
        let estadosValidos = ["Pendiente", "Confirmada", "Anulada", "Entregada"];
        for (let i = 0; i < estadosValidos.length; i++) {
            if (estadosValidos[i] === nuevoEstado) {
                this.estado = nuevoEstado;  
                break;
            }
        }
    }

    // Métodos públicos
    calcularTotal() {
        let subtotal = this.carrito.obtenerSubtotal();
        let cantidad = this.carrito.getcantidadItems();
        this.descuento.calcularPorCantidad(cantidad);
        this.descuento.calcularPorPago(this.carrito.obtenerPago());
        let total = this.descuento.calcularTotal(subtotal);
        this.#totalFinal = total;
        this.#detalles = this.descuento.obtenerDetalles(subtotal);
        return total;
    }

    confirmar() {
        let total = this.calcularTotal();
        if (this.carrito.estaVacio()) {
            return {
                exitoso: false,
                mensaje: "No hay productos en el carrito",
                total: 0
            };
        } else {
            this.estado = "Confirmada";
            this.cliente.agregarCompra(this);
            return {
                exitoso: true,
                mensaje: "Compra confirmada",
                total: total,
                numero: this.#numeroCompra,
                fecha: this.fecha.toLocaleDateString(),
                cliente: this.cliente.nombre
            };
        }
    }

    obtenerResumen() {
        let subtotal = this.carrito.obtenerSubtotal();
        let detalles = this.descuento.obtenerDetalles(subtotal);
        let tipo = this.cliente.actualizarTipo(subtotal);
        let resumen = "=== RESUMEN DE COMPRA ===\n";
        resumen = resumen + "N°: " + this.#numeroCompra + "\n";
        resumen = resumen + "Fecha: " + this.fecha.toLocaleDateString() + "\n";
        resumen = resumen + "Cliente: " + this.cliente.nombre + "\n";
        resumen = resumen + "Tipo: " + tipo + "\n";
        resumen = resumen + "------------------------\n";
        resumen = resumen + "Subtotal: S/ " + detalles.subtotal.toFixed(2) + "\n";
        resumen = resumen + "Descuento: -S/ " + detalles.descCantidad.toFixed(2) + "\n";
        resumen = resumen + "Descuento pago: -S/ " + detalles.descPago.toFixed(2) + "\n";
        resumen = resumen + "------------------------\n";
        resumen = resumen + "TOTAL: S/ " + detalles.total.toFixed(2) + "\n";
        resumen = resumen + "Estado: " + this.estado + "\n";
        resumen = resumen + "========================";
        return resumen;
    }

    obtenerNumero() {
        return this.#numeroCompra;
    }

    obtenerEstado() {
        return this.estado;
    }

    anular() {
        this.estado = "Anulada";
        return this.estado;
    }

    estaPendiente() {
        return this.estado === "Pendiente";
    }

    // Método privado
    #generarNumero() {
        let fecha = new Date();
        let año = fecha.getFullYear();
        let mes = String(fecha.getMonth() + 1).padStart(2, '0');
        let dia = String(fecha.getDate()).padStart(2, '0');
        let aleatorio = Math.floor(Math.random() * 10000);
        return "COMP-" + año + mes + dia + "-" + aleatorio;
    }
}

const compra1 = new compra(cliente1, carrito1, descuento1, new Date(), "Pendiente");

class Categoria extends Entidad {
    #productos;
    #totalProductos;

    descripcion;
    estado;
    fechaRegistro;

    constructor(cod, nom, desc, est, fecReg) {
        super(cod, nom);

        this.descripcion = desc;
        this.estado = est;
        this.fechaRegistro = fecReg;
        this.#productos = [];
        this.#totalProductos = 0;
    }

    // Getters
    getproductos() {
        return this.#productos;
    }

    gettotalProductos() {
        return this.#totalProductos;
    }

    // Setters
    setnombre(nuevoNombre) {
        this.nombre = nuevoNombre;
    }

    setdescripcion(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }

    // Métodos públicos
    agregarProducto(producto) {
        this.#productos.push(producto);
        this.#totalProductos = this.#totalProductos + 1;
        return this.#totalProductos;
    }

    eliminarProducto(id) {
        let nuevos = [];
        for (let i = 0; i < this.#productos.length; i++) {
            if (this.#productos[i].id !== id) {
                nuevos.push(this.#productos[i]);
            }
        }
        this.#productos = nuevos;
        this.#totalProductos = this.#productos.length;
        return this.#totalProductos;
    }

    activar() {
        this.estado = true;
        return this.estado;
    }

    desactivar() {
        this.estado = false;
        return this.estado;
    }

    estaActiva() {
        return this.estado;
    }

    obtenerInformacion() {
        return "Categoría: " + this.nombre + " - " + this.descripcion;
    }

    obtenerActivos() {
        return this.#contarProductosActivos();
    }

    // Método privado
    #contarProductosActivos() {
        let activos = 0;
        for (let i = 0; i < this.#productos.length; i++) {
            if (this.#productos[i].getactivo()) {
                activos++;
            }
        }
        return activos;
    }
}

const categoria1 = new Categoria(1, "Útiles de Escritura", "Lapiceros, lápices y borradores", true, new Date());


class metodoPago extends Entidad {
    #transacciones;
    #totalProcesado;

    descuento;
    tipo;
    estado;

    constructor(cod, nom, desc, tip, est) {
        super(cod, nom);


        this.descuento = desc;
        this.tipo = tip;
        this.estado = est;
        this.#transacciones = 0;
        this.#totalProcesado = 0;
    }
    // Getters
    gettransacciones() {
        return this.#transacciones;
    }

    gettotalProcesado() {
        return this.#totalProcesado;
    }

    // Setters
    setnombre(nuevoNombre) {
        this.nombre = nuevoNombre;
    }

    setdescuento(nuevoDescuento) {
        if (nuevoDescuento >= 0) {
            this.descuento = nuevoDescuento;
        }
    }

    // Métodos públicos
    procesarPago(monto) {
        if (this.estado && this.#validarMonto(monto)) {
            this.#transacciones = this.#transacciones + 1;
            this.#totalProcesado = this.#totalProcesado + monto;
            return true;
        }
        return false;
    }

    obtenerDescuento() {
        return this.descuento;
    }

    obtenerNombre() {
        return this.nombre;
    }

    estaActivo() {
        return this.estado;
    }

    activar() {
        this.estado = true;
        return this.estado;
    }

    desactivar() {
        this.estado = false;
        return this.estado;
    }

    cambiarDescuento(nuevo) {
        if (nuevo >= 0) {
            this.descuento = nuevo;
        }
        return this.descuento;
    }

    // Método privado
    #validarMonto(monto) {
        return monto > 0;
    }
}

const metodoPago1 = new metodoPago(1, "Yape", 5, "Digital", true);


class proveedor extends Entidad {
    #productos;
    #totalProductos;
    #activo;


    telefono;
    direccion;
    correo;
    ruc;

    constructor(cod, nom, tel, dir, corr, rucProv) {
        super(cod, nom);

        this.telefono = tel;
        this.direccion = dir;
        this.correo = corr;
        this.ruc = rucProv;
        this.#productos = [];
        this.#totalProductos = 0;
        this.#activo = true;
    }

    // Getters
    getproductos() {
        return this.#productos;
    }

    gettotalProductos() {
        return this.#totalProductos;
    }

    getactivo() {
        return this.#activo;
    }

    // Setters
    setnombre(nuevoNombre) {
        this.nombre = nuevoNombre;
    }

    settelefono(nuevoTelefono) {
        if (nuevoTelefono.length >= 9) {
            this.telefono = nuevoTelefono;
        }
    }

    // Métodos públicos
    agregarProducto(producto) {
        this.#productos.push(producto);
        this.#totalProductos = this.#totalProductos + 1;
        return this.#totalProductos;
    }

    eliminarProducto(id) {
        let nuevos = [];
        for (let i = 0; i < this.#productos.length; i++) {
            if (this.#productos[i].id !== id) {
                nuevos.push(this.#productos[i]);
            }
        }
        this.#productos = nuevos;
        this.#totalProductos = this.#productos.length;
        return this.#totalProductos;
    }

    activar() {
        this.#activo = true;
        return this.#activo;
    }

    desactivar() {
        this.#activo = false;
        return this.#activo;
    }

    estaActivo() {
        return this.#activo;
    }

    obtenerInformacion() {
        return "Proveedor: " + this.nombre + " - RUC: " + this.ruc;
    }

    obtenerContacto() {
        return "Teléfono: " + this.telefono + " - Dirección: " + this.direccion;
    }

    // Método privado
    #validarRUC() {
        return this.ruc.length === 11;
    }
}

const proveedor1 = new proveedor(1, "Papelera Central", "987654321", "Av. Principal 456", "ventas@papeleracentral.com", "12345678901");


class inventario extends Entidad {
    #valorTotal;
    #productosAlmacenados;

    producto;
    stock;
    almacen;
    fechaIngreso;
    estado;

    constructor(cod, prod, stk, alm, fecIng, est) {
        super(cod, "Inventario");
        
        this.producto = prod;
        this.stock = stk;
        this.almacen = alm;
        this.fechaIngreso = fecIng;
        this.estado = est;
        this.#valorTotal = 0;
        this.#productosAlmacenados = [];
    }

    // Getters
    getvalorTotal() {
        return this.#valorTotal;
    }

    getproductosAlmacenados() {
        return this.#productosAlmacenados;
    }

    // Setters
    setalmacen(nuevoAlmacen) {
        this.almacen = nuevoAlmacen;
    }

    setestado(nuevoEstado) {
        this.estado = nuevoEstado;
    }

    // Métodos públicos
    agregarProducto(producto, cantidad) {
        this.#productosAlmacenados.push({
            producto: producto,
            stock: cantidad,
            fechaIngreso: new Date()
        });
        this.#actualizarValorTotal();
        return this.#productosAlmacenados.length;
    }

    eliminarProducto(id) {
        let nuevos = [];
        for (let i = 0; i < this.#productosAlmacenados.length; i++) {
            if (this.#productosAlmacenados[i].producto.id !== id) {
                nuevos.push(this.#productosAlmacenados[i]);
            }
        }
        this.#productosAlmacenados = nuevos;
        this.#actualizarValorTotal();
        return this.#productosAlmacenados.length;
    }

    buscarProducto(id) {
        let encontrado = null;
        for (let i = 0; i < this.#productosAlmacenados.length; i++) {
            if (this.#productosAlmacenados[i].producto.id === id) {
                encontrado = this.#productosAlmacenados[i];
                break;
            }
        }
        return encontrado;
    }

    obtenerTotalProductos() {
        return this.#productosAlmacenados.length;
    }

    hayStock(id, cantidad) {
        let producto = this.buscarProducto(id);
        if (producto !== null) {
            return producto.stock >= cantidad;
        }
        return false;
    }

    reducirStock(id, cantidad) {
        let producto = this.buscarProducto(id);
        if (producto !== null && producto.stock >= cantidad) {
            producto.stock = producto.stock - cantidad;
            this.#actualizarValorTotal();
            return true;
        }
        return false;
    }

    // Método privado
    #actualizarValorTotal() {
        let total = 0;
        for (let i = 0; i < this.#productosAlmacenados.length; i++) {
            let item = this.#productosAlmacenados[i];
            total = total + (item.producto.precioUnitario * item.stock);
        }
        this.#valorTotal = total;
        return this.#valorTotal;
    }
}

const inventario1 = new inventario(1, null, 0, "Almacén Central", new Date(), true);


class detalleCompra extends Entidad {
    #descuentoAplicado;
    #precioFinal;

    producto;
    cantidad;
    precioUnitario;
    subtotal;
    observacion;

    constructor(cod, prod, cant, pUni, subTot, obs) {
        super(cod, "DetalleCompra"); 
        
        this.producto = prod;
        this.cantidad = cant;
        this.precioUnitario = pUni;
        this.subtotal = subTot;
        this.observacion = obs;
        this.#descuentoAplicado = 0;
        this.#precioFinal = subTot;
    }

    // Getters
    getdescuentoAplicado() {
        return this.#descuentoAplicado;
    }

    getprecioFinal() {
        return this.#precioFinal;
    }

    // Setters
    setcantidad(nuevaCantidad) {
        if (nuevaCantidad > 0) {
            this.cantidad = nuevaCantidad;
            this.calcularSubtotal();
        }
    }

    setobservacion(nuevaObservacion) {
        this.observacion = nuevaObservacion;
    }

    // Métodos públicos
    calcularSubtotal() {
        this.subtotal = this.precioUnitario * this.cantidad;
        return this.subtotal;
    }

    aplicarDescuento(porcentaje) {
        this.#descuentoAplicado = (this.subtotal * porcentaje) / 100;
        this.#precioFinal = this.subtotal - this.#descuentoAplicado;
        return this.#precioFinal;
    }

    obtenerSubtotal() {
        return this.subtotal;
    }

    cambiarCantidad(nuevaCantidad) {
        if (nuevaCantidad > 0) {
            this.cantidad = nuevaCantidad;
            this.calcularSubtotal();
            return true;
        }
        return false;
    }

    agregarObservacion(obs) {
        this.observacion = obs;
        return this.observacion;
    }

    // Métodos privados
    #validarCantidad() {
        return this.cantidad > 0;
    }

    #validarPrecio() {
        return this.precioUnitario > 0;
    }
}

const detalleCompra1 = new detalleCompra(1, null, 3, 9, 27, "Cuadernos A4");