// ============================================
// PROYECTO SchoolSupply
// VERSIÓN FINAL - CON SUPER CORRECTO
// ============================================

// ============================================
// CLASE PADRE: producto (NO tiene super)
// ============================================

class producto {
    id;
    nombre;
    marca;
    precioUnitario;
    precioDocena;
    stock;
    activo;

    #codigoInterno;
    #fechaCreacion;

    constructor(id, nombre, marca, precioUnitario, precioDocena, stock) {
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.precioUnitario = precioUnitario;
        this.precioDocena = precioDocena;
        this.stock = stock;
        this.activo = true;
        this.#codigoInterno = "PROD-" + id;
        this.#fechaCreacion = new Date();
    }

    getcodigoInterno() {
        return this.#codigoInterno;
    }

    getfechaCreacion() {
        return this.#fechaCreacion.toLocaleDateString();
    }

    setstock(nuevoStock) {
        if (nuevoStock >= 0) {
            this.stock = nuevoStock;
        }
    }

    setactivo(estado) {
        this.activo = estado;
    }

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
        return this.nombre + " - " + this.marca;
    }

    tieneStock(cantidad) {
        return this.stock >= cantidad;
    }

    reducirStock(cantidad) {
        if (this.tieneStock(cantidad)) {
            this.stock = this.stock - cantidad;
            return true;
        }
        return false;
    }

    obtenerTipo() {
        return "Producto";
    }

    obtenerDescripcion() {
        return "Producto: " + this.nombre;
    }

    #validarPrecio() {
        return this.precioUnitario > 0 && this.precioDocena > 0;
    }
}

// ============================================
// CLASE HIJO 1: escolar (hereda de producto) - CON super
// ============================================

class escolar extends producto {
    grado;
    materia;
    nivel;
    #tipoEscolar;

    constructor(id, nombre, marca, precioUnitario, precioDocena, stock, grado, materia, nivel) {
        super(id, nombre, marca, precioUnitario, precioDocena, stock);
        this.grado = grado;
        this.materia = materia;
        this.nivel = nivel;
        this.#tipoEscolar = "Escolar";
    }

    get tipoEscolar() {
        return this.#tipoEscolar;
    }

    set grado(nuevoGrado) {
        this.grado = nuevoGrado;
    }

    obtenerInfo() {
        return super.obtenerInfo() + " - " + this.nivel + " - " + this.materia;
    }

    obtenerTipo() {
        return "Escolar";
    }

    obtenerDescripcion() {
        return "Producto Escolar: " + this.nombre + " (" + this.nivel + ")";
    }

    #validarGrado() {
        return this.grado > 0 && this.grado <= 11;
    }
}

// ============================================
// CLASE HIJO 2: Papeleria (hereda de escolar) - CON super
// ============================================

class Papeleria extends escolar {
    tipoPapel;
    gramaje;
    tamaño;
    #tipoProducto;

    constructor(id, nombre, marca, precioUnitario, precioDocena, stock, grado, materia, nivel, tipoPapel, gramaje, tamaño) {
        super(id, nombre, marca, precioUnitario, precioDocena, stock, grado, materia, nivel);
        this.tipoPapel = tipoPapel;
        this.gramaje = gramaje;
        this.tamaño = tamaño;
        this.#tipoProducto = "Papeleria";
    }

    get tipoProducto() {
        return this.#tipoProducto;
    }

    set gramaje(nuevoGramaje) {
        if (nuevoGramaje > 0) {
            this.gramaje = nuevoGramaje;
        }
    }

    obtenerInfo() {
        return super.obtenerInfo() + " - " + this.tipoPapel + " (" + this.gramaje + "g)";
    }

    obtenerTipo() {
        return "Papeleria";
    }

    obtenerDescripcion() {
        return "Papelería: " + this.nombre + " - " + this.tipoPapel;
    }

    #validarGramaje() {
        return this.gramaje >= 60 && this.gramaje <= 300;
    }
}

// ============================================
// CLASE HIJO 3: Utiles (hereda de escolar) - CON super
// ============================================

class Utiles extends escolar {
    color;
    material;
    uso;
    #tipoUtiles;

    constructor(id, nombre, marca, precioUnitario, precioDocena, stock, grado, materia, nivel, color, material, uso) {
        super(id, nombre, marca, precioUnitario, precioDocena, stock, grado, materia, nivel);
        this.color = color;
        this.material = material;
        this.uso = uso;
        this.#tipoUtiles = "Utiles";
    }

    get tipoUtiles() {
        return this.#tipoUtiles;
    }

    set color(nuevoColor) {
        this.color = nuevoColor;
    }

    obtenerInfo() {
        return super.obtenerInfo() + " - " + this.color + " (" + this.material + ")";
    }

    obtenerTipo() {
        return "Utiles";
    }

    obtenerDescripcion() {
        return "Útiles: " + this.nombre + " - " + this.color;
    }

    #validarMaterial() {
        let materialesValidos = ["Plástico", "Madera", "Metal", "Tela"];
        for (let i = 0; i < materialesValidos.length; i++) {
            if (materialesValidos[i] === this.material) {
                return true;
            }
        }
        return false;
    }
}

// ============================================
// CLASE HIJO 4: Jugueteria (hereda de producto) - CON super
// ============================================

class Jugueteria extends producto {
    edadRecomendada;
    tipoJuguete;
    material;
    #tipoProducto;

    constructor(id, nombre, marca, precioUnitario, precioDocena, stock, edadRecomendada, tipoJuguete, material) {
        super(id, nombre, marca, precioUnitario, precioDocena, stock);
        this.edadRecomendada = edadRecomendada;
        this.tipoJuguete = tipoJuguete;
        this.material = material;
        this.#tipoProducto = "Jugueteria";
    }

    get tipoProducto() {
        return this.#tipoProducto;
    }

    set edadRecomendada(nuevaEdad) {
        if (nuevaEdad >= 0) {
            this.edadRecomendada = nuevaEdad;
        }
    }

    obtenerInfo() {
        return super.obtenerInfo() + " - " + this.tipoJuguete + " (Edad: " + this.edadRecomendada + "+)";
    }

    obtenerTipo() {
        return "Jugueteria";
    }

    obtenerDescripcion() {
        return "Juguete: " + this.nombre + " - " + this.tipoJuguete;
    }

    #validarEdad() {
        return this.edadRecomendada >= 0 && this.edadRecomendada <= 18;
    }
}

// ============================================
// CLASE PADRE: cliente (NO tiene super)
// ============================================

class cliente {
    id;
    nombre;
    correo;
    telefono;
    direccion;
    fechaRegistro;
    #compras;
    #totalGastado;

    constructor(id, nombre, correo, telefono, direccion) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.direccion = direccion;
        this.fechaRegistro = new Date();
        this.#compras = [];
        this.#totalGastado = 0;
    }

    get compras() {
        return this.#compras;
    }

    get totalGastado() {
        return this.#totalGastado;
    }

    set telefono(nuevoTelefono) {
        if (nuevoTelefono.length >= 9) {
            this.telefono = nuevoTelefono;
        }
    }

    set direccion(nuevaDireccion) {
        this.direccion = nuevaDireccion;
    }

    obtenerDatos() {
        return "Cliente: " + this.nombre + " - Correo: " + this.correo;
    }

    agregarCompra(compra) {
        this.#compras.push(compra);
        this.#totalGastado = this.#totalGastado + compra.totalFinal;
        return this.#compras.length;
    }

    validarCorreo() {
        return this.correo.includes("@") && this.correo.includes(".");
    }

    obtenerTipo() {
        return "Cliente";
    }

    obtenerDescripcion() {
        return "Cliente: " + this.nombre;
    }

    #validarTelefono() {
        return this.telefono.length >= 9;
    }
}

// ============================================
// CLASE HIJO 1: clienteunitario (hereda de cliente) - CON super
// ============================================

class clienteunitario extends cliente {
    tipoCliente;
    descuentoBase;
    #cantidadComprasUnitarias;

    constructor(id, nombre, correo, telefono, direccion) {
        super(id, nombre, correo, telefono, direccion);
        this.tipoCliente = "Unitario";
        this.descuentoBase = 0;
        this.#cantidadComprasUnitarias = 0;
    }

    get cantidadComprasUnitarias() {
        return this.#cantidadComprasUnitarias;
    }

    set descuentoBase(nuevoDescuento) {
        if (nuevoDescuento >= 0 && nuevoDescuento <= 10) {
            this.descuentoBase = nuevoDescuento;
        }
    }

    agregarCompra(compra) {
        super.agregarCompra(compra);
        this.#cantidadComprasUnitarias = this.#cantidadComprasUnitarias + 1;
        this.actualizarDescuento();
        return this.#cantidadComprasUnitarias;
    }

    actualizarDescuento() {
        if (this.#cantidadComprasUnitarias >= 10) {
            this.descuentoBase = 10;
        } else if (this.#cantidadComprasUnitarias >= 5) {
            this.descuentoBase = 5;
        } else {
            this.descuentoBase = 0;
        }
        return this.descuentoBase;
    }

    obtenerTipo() {
        return "ClienteUnitario";
    }

    obtenerDescripcion() {
        return "Cliente Unitario: " + this.nombre + " - Compras: " + this.#cantidadComprasUnitarias;
    }

    #validarCantidadCompras() {
        return this.#cantidadComprasUnitarias >= 0;
    }
}

// ============================================
// CLASE HIJO 2: clientepordocena (hereda de cliente) - CON super
// ============================================

class clientepordocena extends cliente {
    tipoCliente;
    descuentoBase;
    cantidadDocenas;
    descuentoAdicional;
    #totalDocenasCompradas;

    constructor(id, nombre, correo, telefono, direccion) {
        super(id, nombre, correo, telefono, direccion);
        this.tipoCliente = "PorDocena";
        this.descuentoBase = 10;
        this.cantidadDocenas = 0;
        this.descuentoAdicional = 0;
        this.#totalDocenasCompradas = 0;
    }

    get totalDocenasCompradas() {
        return this.#totalDocenasCompradas;
    }

    set descuentoBase(nuevoDescuento) {
        if (nuevoDescuento >= 0 && nuevoDescuento <= 20) {
            this.descuentoBase = nuevoDescuento;
        }
    }

    agregarCompra(compra) {
        super.agregarCompra(compra);
        this.#totalDocenasCompradas = this.#totalDocenasCompradas + 1;
        this.actualizarDescuento();
        return this.#totalDocenasCompradas;
    }

    actualizarDescuento() {
        if (this.#totalDocenasCompradas >= 20) {
            this.descuentoAdicional = 5;
        } else if (this.#totalDocenasCompradas >= 10) {
            this.descuentoAdicional = 3;
        } else if (this.#totalDocenasCompradas >= 5) {
            this.descuentoAdicional = 1;
        } else {
            this.descuentoAdicional = 0;
        }
        return this.descuentoBase + this.descuentoAdicional;
    }

    calcularPrecioConDescuento(precio) {
        let descuentoTotal = this.descuentoBase + this.descuentoAdicional;
        let precioFinal = precio - (precio * descuentoTotal / 100);
        return precioFinal;
    }

    obtenerTipo() {
        return "ClientePorDocena";
    }

    obtenerDescripcion() {
        return "Cliente por Docena: " + this.nombre + " - Docenas: " + this.#totalDocenasCompradas;
    }

    #validarDocenas() {
        return this.#totalDocenasCompradas >= 0;
    }
}

// ============================================
// CLASE: carrito (NO hereda) - SIN super
// ============================================

class carrito {
    #cantidadItems;
    #descuentoAplicado;

    items;
    metodoPago;
    total;
    subtotal;

    constructor(itm, metPag, tot, subTot) {
        this.items = Array.isArray(itm) ? itm : [];
        this.metodoPago = metPag;
        this.total = tot;
        this.subtotal = subTot;
        this.#cantidadItems = 0;
        this.#descuentoAplicado = 0;
    }

    getcantidadItems() {
        return this.#cantidadItems;
    }

    getdescuentoAplicado() {
        return this.#descuentoAplicado;
    }

    setmetodoPago(nuevoMetodo) {
        this.metodoPago = nuevoMetodo;
    }

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

// ============================================
// CLASE: descuento (NO hereda) - SIN super
// ============================================

class descuento {
    #aplicado;
    #metodoPagoSeleccionado;

    porcentajeCantidad;
    porcentajePago;
    descCantidad;
    subtotalConDescuento;
    descPago;
    total;

    constructor(porCant, porPag, desCant, subDesc, desPag, tot) {
        this.porcentajeCantidad = porCant;
        this.porcentajePago = porPag;
        this.descCantidad = desCant;
        this.subtotalConDescuento = subDesc;
        this.descPago = desPag;
        this.total = tot;
        this.#aplicado = false;
        this.#metodoPagoSeleccionado = "Efectivo";
    }

    getaplicado() {
        return this.#aplicado;
    }

    getmetodoPagoSeleccionado() {
        return this.#metodoPagoSeleccionado;
    }

    setmetodoPagoSeleccionado(nuevoMetodo) {
        this.#metodoPagoSeleccionado = nuevoMetodo;
    }

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

// ============================================
// CLASE: compra (NO hereda) - SIN super
// ============================================

class compra {
    #numeroCompra;
    #totalFinal;
    #detalles;

    cliente;
    carrito;
    descuento;
    fecha;
    estado;

    constructor(cli, car, desc, fec, est) {
        this.cliente = cli;
        this.carrito = car;
        this.descuento = desc;
        this.fecha = fec;
        this.estado = est;
        this.#numeroCompra = this.#generarNumero();
        this.#totalFinal = 0;
        this.#detalles = null;
    }

    getnumeroCompra() {
        return this.#numeroCompra;
    }

    gettotalFinal() {
        return this.#totalFinal;
    }

    getdetalles() {
        return this.#detalles;
    }

    setestado(nuevoEstado) {
        let estadosValidos = ["Pendiente", "Confirmada", "Anulada", "Entregada"];
        for (let i = 0; i < estadosValidos.length; i++) {
            if (estadosValidos[i] === nuevoEstado) {
                this.estado = nuevoEstado;
                break;
            }
        }
    }

    calcularTotal() {
        let subtotal = this.carrito.obtenerSubtotal();
        let cantidad = this.carrito.getcantidadItems();

        if (this.cliente instanceof clientepordocena) {
            let total = this.cliente.calcularPrecioConDescuento(subtotal);
            this.#totalFinal = total;
            this.#detalles = {
                subtotal: subtotal,
                total: total,
                descuento: subtotal - total,
                tipoCliente: this.cliente.obtenerTipo()
            };
            return total;
        } else {
            this.descuento.calcularPorCantidad(cantidad);
            this.descuento.calcularPorPago(this.carrito.obtenerPago());
            let total = this.descuento.calcularTotal(subtotal);
            this.#totalFinal = total;
            this.#detalles = this.descuento.obtenerDetalles(subtotal);
            return total;
        }
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
                cliente: this.cliente.nombre,
                tipoCliente: this.cliente.obtenerTipo()
            };
        }
    }

    obtenerResumen() {
        let subtotal = this.carrito.obtenerSubtotal();
        this.calcularTotal();
        let tipo = this.cliente.obtenerTipo();
        let resumen = "=== RESUMEN DE COMPRA ===\n";
        resumen = resumen + "N°: " + this.#numeroCompra + "\n";
        resumen = resumen + "Fecha: " + this.fecha.toLocaleDateString() + "\n";
        resumen = resumen + "Cliente: " + this.cliente.nombre + "\n";
        resumen = resumen + "Tipo: " + tipo + "\n";
        resumen = resumen + "------------------------\n";
        resumen = resumen + "Subtotal: S/ " + subtotal.toFixed(2) + "\n";
        resumen = resumen + "Descuento: -S/ " + (subtotal - this.#totalFinal).toFixed(2) + "\n";
        resumen = resumen + "------------------------\n";
        resumen = resumen + "TOTAL: S/ " + this.#totalFinal.toFixed(2) + "\n";
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

    #generarNumero() {
        let fecha = new Date();
        let año = fecha.getFullYear();
        let mes = String(fecha.getMonth() + 1).padStart(2, '0');
        let dia = String(fecha.getDate()).padStart(2, '0');
        let aleatorio = Math.floor(Math.random() * 10000);
        return "COMP-" + año + mes + dia + "-" + aleatorio;
    }
}

// ============================================
// CLASE: Categoria (NO hereda) - SIN super
// ============================================

class Categoria {
    #productos;
    #totalProductos;

    nombre;
    descripcion;
    estado;
    fechaRegistro;

    constructor(cod, nom, desc, est, fecReg) {
        this.nombre = nom;
        this.descripcion = desc;
        this.estado = est;
        this.fechaRegistro = fecReg;
        this.#productos = [];
        this.#totalProductos = 0;
    }

    getproductos() {
        return this.#productos;
    }

    gettotalProductos() {
        return this.#totalProductos;
    }

    setnombre(nuevoNombre) {
        this.nombre = nuevoNombre;
    }

    setdescripcion(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }

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

    #contarProductosActivos() {
        let activos = 0;
        for (let i = 0; i < this.#productos.length; i++) {
            if (this.#productos[i].activo) {
                activos++;
            }
        }
        return activos;
    }
}

const categoria1 = new Categoria(1, "Útiles de Escritura", "Lapiceros, lápices y borradores", true, new Date());

// ============================================
// CLASE: metodoPago (NO hereda) - SIN super
// ============================================

class metodoPago {
    #transacciones;
    #totalProcesado;

    nombre;
    descuento;
    tipo;
    estado;

    constructor(cod, nom, desc, tip, est) {
        this.nombre = nom;
        this.descuento = desc;
        this.tipo = tip;
        this.estado = est;
        this.#transacciones = 0;
        this.#totalProcesado = 0;
    }

    gettransacciones() {
        return this.#transacciones;
    }

    gettotalProcesado() {
        return this.#totalProcesado;
    }

    setnombre(nuevoNombre) {
        this.nombre = nuevoNombre;
    }

    setdescuento(nuevoDescuento) {
        if (nuevoDescuento >= 0) {
            this.descuento = nuevoDescuento;
        }
    }

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

    #validarMonto(monto) {
        return monto > 0;
    }
}

const metodoPago1 = new metodoPago(1, "Yape", 5, "Digital", true);

// ============================================
// CLASE: proveedor (NO hereda) - SIN super
// ============================================

class proveedor {
    #productos;
    #totalProductos;
    #activo;

    nombre;
    telefono;
    direccion;
    correo;
    ruc;

    constructor(cod, nom, tel, dir, corr, rucProv) {
        this.nombre = nom;
        this.telefono = tel;
        this.direccion = dir;
        this.correo = corr;
        this.ruc = rucProv;
        this.#productos = [];
        this.#totalProductos = 0;
        this.#activo = true;
    }

    getproductos() {
        return this.#productos;
    }

    gettotalProductos() {
        return this.#totalProductos;
    }

    getactivo() {
        return this.#activo;
    }

    setnombre(nuevoNombre) {
        this.nombre = nuevoNombre;
    }

    settelefono(nuevoTelefono) {
        if (nuevoTelefono.length >= 9) {
            this.telefono = nuevoTelefono;
        }
    }

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

    #validarRUC() {
        return this.ruc.length === 11;
    }
}

const proveedor1 = new proveedor(1, "Papelera Central", "987654321", "Av. Principal 456", "ventas@papeleracentral.com", "12345678901");

// ============================================
// CLASE: inventario (NO hereda) - SIN super
// ============================================

class inventario {
    #valorTotal;
    #productosAlmacenados;

    producto;
    stock;
    almacen;
    fechaIngreso;
    estado;

    constructor(cod, prod, stk, alm, fecIng, est) {
        this.producto = prod;
        this.stock = stk;
        this.almacen = alm;
        this.fechaIngreso = fecIng;
        this.estado = est;
        this.#valorTotal = 0;
        this.#productosAlmacenados = [];
    }

    getvalorTotal() {
        return this.#valorTotal;
    }

    getproductosAlmacenados() {
        return this.#productosAlmacenados;
    }

    setalmacen(nuevoAlmacen) {
        this.almacen = nuevoAlmacen;
    }

    setestado(nuevoEstado) {
        this.estado = nuevoEstado;
    }

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

// ============================================
// CLASE: detalleCompra (NO hereda) - SIN super
// ============================================

class detalleCompra {
    #descuentoAplicado;
    #precioFinal;

    producto;
    cantidad;
    precioUnitario;
    subtotal;
    observacion;

    constructor(cod, prod, cant, pUni, subTot, obs) {
        this.producto = prod;
        this.cantidad = cant;
        this.precioUnitario = pUni;
        this.subtotal = subTot;
        this.observacion = obs;
        this.#descuentoAplicado = 0;
        this.#precioFinal = subTot;
    }

    getdescuentoAplicado() {
        return this.#descuentoAplicado;
    }

    getprecioFinal() {
        return this.#precioFinal;
    }

    setcantidad(nuevaCantidad) {
        if (nuevaCantidad > 0) {
            this.cantidad = nuevaCantidad;
            this.calcularSubtotal();
        }
    }

    setobservacion(nuevaObservacion) {
        this.observacion = nuevaObservacion;
    }

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

    #validarCantidad() {
        return this.cantidad > 0;
    }

    #validarPrecio() {
        return this.precioUnitario > 0;
    }
}

const detalleCompra1 = new detalleCompra(1, null, 3, 9, 27, "Cuadernos A4");

// ============================================
// INSTANCIAS DE PRUEBA
// ============================================

const producto1 = new Papeleria(
    1, "Cuaderno A4", "Norma", 9, 96, 100,
    3, "Comunicación", "Primaria",
    "Rayado", 80, "A4"
);

const producto2 = new Utiles(
    2, "Lapicero Retráctil", "Bic", 3, 30, 200,
    2, "Escritura", "Inicial",
    "Azul", "Plástico", "Escribir"
);

const producto3 = new Jugueteria(
    3, "Pelota de Fútbol", "Adidas", 45, 480, 50,
    8, "Deportivo", "Cuero"
);

const producto4 = new Papeleria(
    4, "Papel Bond", "Maped", 15, 150, 500,
    4, "Arte", "Primaria",
    "Blanco", 75, "A4"
);

const producto5 = new Utiles(
    5, "Tijeras", "Maped", 5, 54, 80,
    6, "Manualidades", "Primaria",
    "Plateado", "Metal", "Cortar"
);

const cliente1 = new clienteunitario(
    1, "Ana Pérez", "ana@email.com", "987654321", "Av. Siempre Viva 123"
);

const cliente2 = new clientepordocena(
    2, "Colegio San José", "colegio@email.com", "987654322", "Av. Principal 456"
);

const compra1 = new compra(cliente1, carrito1, descuento1, new Date(), "Pendiente");

// ============================================
// DEMOSTRACIÓN DE FUNCIONAMIENTO
// ============================================

console.log("=== PRODUCTOS CREADOS ===");
console.log(producto1.obtenerInfo());
console.log("Tipo: " + producto1.obtenerTipo());
console.log("Descripción: " + producto1.obtenerDescripcion());
console.log("");

console.log(producto2.obtenerInfo());
console.log("Tipo: " + producto2.obtenerTipo());
console.log("Descripción: " + producto2.obtenerDescripcion());
console.log("");

console.log(producto3.obtenerInfo());
console.log("Tipo: " + producto3.obtenerTipo());
console.log("Descripción: " + producto3.obtenerDescripcion());
console.log("");

console.log("=== CLIENTES CREADOS ===");
console.log(cliente1.obtenerDatos());
console.log("Tipo: " + cliente1.obtenerTipo());
console.log("Descripción: " + cliente1.obtenerDescripcion());
console.log("");

console.log(cliente2.obtenerDatos());
console.log("Tipo: " + cliente2.obtenerTipo());
console.log("Descripción: " + cliente2.obtenerDescripcion());
console.log("");

console.log("=== SIMULACIÓN DE COMPRA (Cliente Unitario) ===");
carrito1.agregarItem(producto1, 3);
carrito1.agregarItem(producto2, 12);
carrito1.agregarItem(producto3, 1);

console.log("Subtotal: S/" + carrito1.obtenerSubtotal().toFixed(2));
let resultado = compra1.confirmar();
console.log(resultado.mensaje);
console.log("Total: S/" + resultado.total.toFixed(2));
console.log("Tipo de cliente: " + resultado.tipoCliente);
console.log("");
console.log(compra1.obtenerResumen());

// ============================================
// SIMULACIÓN CON CLIENTE POR DOCENA
// ============================================

console.log("\n=== SIMULACIÓN DE COMPRA (Cliente por Docena) ===");
const carrito2 = new carrito([], "Efectivo", 0, 0);
carrito2.agregarItem(producto1, 12);
carrito2.agregarItem(producto2, 24);

const compra2 = new compra(cliente2, carrito2, descuento1, new Date(), "Pendiente");
console.log("Subtotal: S/" + carrito2.obtenerSubtotal().toFixed(2));
let resultado2 = compra2.confirmar();
console.log(resultado2.mensaje);
console.log("Total: S/" + resultado2.total.toFixed(2));
console.log("Tipo de cliente: " + resultado2.tipoCliente);
console.log("");
console.log(compra2.obtenerResumen());

// ============================================
// DEMOSTRACIÓN DE HERENCIA A 2 NIVELES
// ============================================

console.log("\n=== DEMOSTRACIÓN DE HERENCIA A 2 NIVELES ===");
console.log("producto1 es instancia de Papeleria: " + (producto1 instanceof Papeleria));
console.log("producto1 es instancia de escolar: " + (producto1 instanceof escolar));
console.log("producto1 es instancia de producto: " + (producto1 instanceof producto));
console.log("");
console.log("producto3 es instancia de Jugueteria: " + (producto3 instanceof Jugueteria));
console.log("producto3 es instancia de producto: " + (producto3 instanceof producto));
console.log("");
console.log("cliente1 es instancia de clienteunitario: " + (cliente1 instanceof clienteunitario));
console.log("cliente1 es instancia de cliente: " + (cliente1 instanceof cliente));
console.log("");
console.log("cliente2 es instancia de clientepordocena: " + (cliente2 instanceof clientepordocena));
console.log("cliente2 es instancia de cliente: " + (cliente2 instanceof cliente));

// ============================================
// DEMOSTRACIÓN DE POLIMORFISMO
// ============================================

console.log("\n=== DEMOSTRACIÓN DE POLIMORFISMO ===");
console.log("producto1.obtenerTipo(): " + producto1.obtenerTipo());
console.log("producto1.obtenerDescripcion(): " + producto1.obtenerDescripcion());
console.log("cliente1.obtenerTipo(): " + cliente1.obtenerTipo());
console.log("cliente1.obtenerDescripcion(): " + cliente1.obtenerDescripcion());