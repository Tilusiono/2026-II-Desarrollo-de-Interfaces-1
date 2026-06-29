//proyecto Cafeteria.

class molde{
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
        if (nuevoId !== "") {
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

class producto extends molde {
    #stock;
    #disponible;
    #codigoInterno;

    tamaño;
    tipo;
    precioUnitario;
    precioCombo;

    constructor( nom,  tam, tip, prec, ) {
        super(cod, nom);

        this.nombre = nom;
        this.tamaño = tam;
        this.tipo = tip;
        this.precio = prec;
        this.#codigoInterno = "CAF-" + cod;
    }

    // Getters
    getstock() {
        return this.#stock;
    }

    getdisponible() {
        return this.#disponible;
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

    setdisponible(estado) {
        this.#disponible = estado;
    }

    // Métodos públicos
    obtenerPrecio(cantidad) {
        let resultado = 0;

        if (cantidad >= 10) {
            resultado = this.precioCombo * (cantidad / 10);
        } else {
            resultado = this.precioUnitario * cantidad;
        }

        return resultado;
    }

    obtenerInfo() {
        return this.nombre + " - " + this.marca + " (" + this.tamaño + ")";
    }


    // Método privado
    #validarPrecio() {
        return this.precioUnitario > 0 && this.precioCombo > 0;
    }
}





const producto1 = new producto(
    1,
    "Cappuccino",
    "Juan Valdez",
    "Grande",
    "Bebida Caliente",
    15,
    140,
    50
);




c
class cliente extends molde {
    #tipo;
    #compras;
    #totalGastado;

    correo;
    telefono;
    direccion;
    fechaRegistro;

    constructor(nomComp, corr, tel, dir, fecReg) {
        super(0, nomComp);

        this.correo = corr;
        this.telefono = tel;
        this.direccion = dir;
        this.fechaRegistro = fecReg;
        this.#tipo = "Frecuente";
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
        if (total > 200) {
            this.#tipo = "VIP";
            return "Cliente VIP";
        } else {
            this.#tipo = "Frecuente";
            return "Cliente Frecuente";
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

    esVIP() {
        return this.#totalGastado > 500;
    }

    obtenerHistorial() {
        return this.#compras;
    }

    // Método privado
    #validarTelefono() {
        return this.telefono.length >= 9;
    }
}

const cliente1 = new cliente(
    "Carlos Ramírez",
    "carlos@email.com",
    "987654321",
    "Av. Los Cafetos 123",
    new Date()
);

class Categoria extends molde {
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
h

    obtenerInformacion() {
        return "Categoría: " + this.nombre + " - " + this.descripcion;
    }

    // Método privado
    #contarProductosDisponibles() {
        let disponibles = 0;

        for (let i = 0; i < this.#productos.length; i++) {
            if (this.#productos[i].getdisponible()) {
                disponibles++;
            }
        }

        return disponibles;
    }
}



const categoria1 = new Categoria(
    1,
    "Bebidas Calientes",
    "Cafés, chocolates y tés preparados al momento",
    true,
    new Date()
);

class metodoPago extends molde {
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


}

const metodoPago1 = new metodoPago(
    1,
    "Yape",
    5,
    "Digital",
    true
);
