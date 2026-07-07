// productos.js
// Aquí se usan proveedores y HERENCIA en productos.
// Producto es la clase padre.
// Procesador, MemoriaRAM, Almacenamiento, Periferico y TarjetaGrafica heredan de Producto.

class Proveedor {
    #id;
    #empresa;
    #ruc;
    #telefono;
    #correo;

    constructor({ id, empresa, ruc, telefono, correo }) {
        if (typeof id !== "number") throw new TypeError("El ID del proveedor debe ser numérico.");
        if (typeof empresa !== "string" || empresa.trim() === "") throw new TypeError("La empresa es obligatoria.");
        if (typeof ruc !== "string" || ruc.trim() === "") throw new TypeError("El RUC es obligatorio.");
        if (typeof telefono !== "string" || telefono.trim() === "") throw new TypeError("El teléfono del proveedor es obligatorio.");
        if (typeof correo !== "string" || !correo.includes("@")) throw new TypeError("El correo del proveedor no es válido.");

        this.#id = id;
        this.#empresa = empresa;
        this.#ruc = ruc;
        this.#telefono = telefono;
        this.#correo = correo;
    }

    get id() {
        return this.#id;
    }

    get empresa() {
        return this.#empresa;
    }

    get ruc() {
        return this.#ruc;
    }

    get telefono() {
        return this.#telefono;
    }

    get correo() {
        return this.#correo;
    }

    mostrarInfo() {
        return `${this.#empresa}<br>RUC: ${this.#ruc}<br>Tel: ${this.#telefono}<br>${this.#correo}`;
    }
}

class Producto {
    #id;
    #nombre;
    #marca;
    #categoria;
    #precio;
    #stock;
    #descripcion;
    #proveedor;

    constructor({ id, nombre, marca, categoria, precio, stock, descripcion, proveedor }) {
        if (typeof id !== "number") throw new TypeError("El ID del producto debe ser numérico.");
        if (typeof nombre !== "string" || nombre.trim() === "") throw new TypeError("El nombre del producto es obligatorio.");
        if (typeof marca !== "string" || marca.trim() === "") throw new TypeError("La marca es obligatoria.");
        if (typeof categoria !== "string" || categoria.trim() === "") throw new TypeError("La categoría es obligatoria.");
        if (typeof precio !== "number" || precio <= 0) throw new TypeError("El precio debe ser mayor que cero.");
        if (typeof stock !== "number" || stock < 0) throw new TypeError("El stock no puede ser negativo.");
        if (typeof descripcion !== "string") throw new TypeError("La descripción debe ser texto.");
        if (!(proveedor instanceof Proveedor)) throw new TypeError("El proveedor debe ser un objeto Proveedor.");

        this.#id = id;
        this.#nombre = nombre;
        this.#marca = marca;
        this.#categoria = categoria;
        this.#precio = precio;
        this.#stock = stock;
        this.#descripcion = descripcion;
        this.#proveedor = proveedor;
    }

    get id() {
        return this.#id;
    }

    get nombre() {
        return this.#nombre;
    }

    get marca() {
        return this.#marca;
    }

    get categoria() {
        return this.#categoria;
    }

    get precio() {
        return this.#precio;
    }

    get stock() {
        return this.#stock;
    }

    get descripcion() {
        return this.#descripcion;
    }

    get proveedor() {
        return this.#proveedor;
    }

    get disponible() {
        return this.#stock > 0;
    }

    reducirStock(cantidad = 1) {
        if (cantidad <= 0) throw new Error("La cantidad debe ser mayor que cero.");
        if (this.#stock < cantidad) throw new Error("No hay stock suficiente para este producto.");
        this.#stock -= cantidad;
    }

    aumentarStock(cantidad = 1) {
        if (cantidad <= 0) throw new Error("La cantidad debe ser mayor que cero.");
        this.#stock += cantidad;
    }

    coincideConBusqueda(textoBusqueda, categoriaSeleccionada) {
        const texto = textoBusqueda.toLowerCase();

        const coincideTexto =
            this.#nombre.toLowerCase().includes(texto) ||
            this.#marca.toLowerCase().includes(texto) ||
            this.#categoria.toLowerCase().includes(texto) ||
            this.#proveedor.empresa.toLowerCase().includes(texto);

        const coincideCategoria =
            categoriaSeleccionada === "todos" || this.#categoria === categoriaSeleccionada;

        return coincideTexto && coincideCategoria;
    }

    obtenerPrecioFormateado() {
        return `S/ ${this.#precio.toFixed(2)}`;
    }

    obtenerDetalleTecnico() {
        return "Producto electrónico para computadora.";
    }
}

class Procesador extends Producto {
    #nucleos;
    #frecuencia;

    constructor(datos) {
        super({ ...datos, categoria: "Procesador" });
        this.#nucleos = datos.nucleos;
        this.#frecuencia = datos.frecuencia;
    }

    obtenerDetalleTecnico() {
        return `${this.#nucleos} núcleos - ${this.#frecuencia}`;
    }
}

class MemoriaRAM extends Producto {
    #capacidad;
    #tipo;

    constructor(datos) {
        super({ ...datos, categoria: "Memoria RAM" });
        this.#capacidad = datos.capacidad;
        this.#tipo = datos.tipo;
    }

    obtenerDetalleTecnico() {
        return `${this.#capacidad} - ${this.#tipo}`;
    }
}

class Almacenamiento extends Producto {
    #capacidad;
    #tipoDisco;

    constructor(datos) {
        super({ ...datos, categoria: "Almacenamiento" });
        this.#capacidad = datos.capacidad;
        this.#tipoDisco = datos.tipoDisco;
    }

    obtenerDetalleTecnico() {
        return `${this.#capacidad} - ${this.#tipoDisco}`;
    }
}

class Periferico extends Producto {
    #tipoConexion;

    constructor(datos) {
        super({ ...datos, categoria: "Periférico" });
        this.#tipoConexion = datos.tipoConexion;
    }

    obtenerDetalleTecnico() {
        return `Conexión: ${this.#tipoConexion}`;
    }
}

class TarjetaGrafica extends Producto {
    #memoriaVideo;

    constructor(datos) {
        super({ ...datos, categoria: "Tarjeta gráfica" });
        this.#memoriaVideo = datos.memoriaVideo;
    }

    obtenerDetalleTecnico() {
        return `Memoria de video: ${this.#memoriaVideo}`;
    }
}
