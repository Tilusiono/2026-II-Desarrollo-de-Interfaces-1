class Proveedor {
    #id; #empresa; #ruc; #telefono; #correo;

    constructor({ id, empresa, ruc, telefono, correo }) {
        this.#id = id;
        this.#empresa = empresa;
        this.#ruc = ruc;
        this.#telefono = telefono;
        this.#correo = correo;
    }

    get empresa() { return this.#empresa; }

    mostrarInfo() {
        return `Empresa: ${this.#empresa}<br>RUC: ${this.#ruc}<br>Teléfono: ${this.#telefono}<br>Correo: ${this.#correo}`;
    }
}

class Producto {
    #id; #nombre; #marca; #categoria; #precio; #stock; #descripcion; #proveedor;

    constructor({ id, nombre, marca, categoria, precio, stock, descripcion, proveedor }) {
        this.#id = id;
        this.#nombre = nombre;
        this.#marca = marca;
        this.#categoria = categoria;
        this.#precio = precio;
        this.#stock = stock;
        this.#descripcion = descripcion;
        this.#proveedor = proveedor;
    }

    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get marca() { return this.#marca; }
    get categoria() { return this.#categoria; }
    get precio() { return this.#precio; }
    get stock() { return this.#stock; }
    get descripcion() { return this.#descripcion; }
    get proveedor() { return this.#proveedor; }
    get disponible() { return this.#stock > 0; }

    reducirStock(cantidad = 1) {
        if (this.#stock < cantidad) throw new Error("No hay stock suficiente.");
        this.#stock -= cantidad;
    }

    aumentarStock(cantidad = 1) { this.#stock += cantidad; }

    coincideConBusqueda(textoBusqueda, categoriaSeleccionada) {
        const texto = textoBusqueda.toLowerCase();
        const coincideTexto =
            this.#nombre.toLowerCase().includes(texto) ||
            this.#marca.toLowerCase().includes(texto) ||
            this.#categoria.toLowerCase().includes(texto) ||
            this.#proveedor.empresa.toLowerCase().includes(texto);

        const coincideCategoria = categoriaSeleccionada === "todos" || this.#categoria === categoriaSeleccionada;
        return coincideTexto && coincideCategoria;
    }

    obtenerPrecioFormateado() { return `S/ ${this.#precio.toFixed(2)}`; }
    obtenerDetalleTecnico() { return "Producto electrónico para computadora."; }
}

class Procesador extends Producto {
    #nucleos; #frecuencia;
    constructor(datos) {
        super({ ...datos, categoria: "Procesador" });
        this.#nucleos = datos.nucleos;
        this.#frecuencia = datos.frecuencia;
    }
    obtenerDetalleTecnico() { return `${this.#nucleos} núcleos - ${this.#frecuencia}`; }
}

class MemoriaRAM extends Producto {
    #capacidad; #tipo;
    constructor(datos) {
        super({ ...datos, categoria: "Memoria RAM" });
        this.#capacidad = datos.capacidad;
        this.#tipo = datos.tipo;
    }
    obtenerDetalleTecnico() { return `${this.#capacidad} - ${this.#tipo}`; }
}

class Almacenamiento extends Producto {
    #capacidad; #tipoDisco;
    constructor(datos) {
        super({ ...datos, categoria: "Almacenamiento" });
        this.#capacidad = datos.capacidad;
        this.#tipoDisco = datos.tipoDisco;
    }
    obtenerDetalleTecnico() { return `${this.#capacidad} - ${this.#tipoDisco}`; }
}

class Periferico extends Producto {
    #tipoConexion;
    constructor(datos) {
        super({ ...datos, categoria: "Periférico" });
        this.#tipoConexion = datos.tipoConexion;
    }
    obtenerDetalleTecnico() { return `Conexión: ${this.#tipoConexion}`; }
}

class TarjetaGrafica extends Producto {
    #memoriaVideo;
    constructor(datos) {
        super({ ...datos, categoria: "Tarjeta gráfica" });
        this.#memoriaVideo = datos.memoriaVideo;
    }
    obtenerDetalleTecnico() { return `Memoria de video: ${this.#memoriaVideo}`; }
}
