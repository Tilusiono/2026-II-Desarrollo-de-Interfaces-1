class Persona {

    nombre;              // Público

    #codigo;
    #telefono;
    #direccion;

    constructor(nombre, codigo, telefono, direccion) {

        if (new.target === Persona) {
            throw new Error("No se puede instanciar Persona");
        }

        this.nombre = nombre;
        this.#codigo = codigo;
        this.#telefono = telefono;
        this.#direccion = direccion;
    }

    // Encapsulamiento
    get codigo() {
        return this.#codigo;
    }

    set codigo(valor) {
        this.#codigo = valor;
    }

    // Métodos públicos
    mostrarDatos() {
        console.log(this.nombre);
    }

    registrar() {
        console.log("Persona registrada");
    }

    // Métodos privados
    #validarCodigo() {
        return true;
    }

    #guardar() {
        console.log("Guardado");
    }
}

class Vendedor extends Persona {

    numeroCaja;      // Público

    #codigoVendedor;
    #turno;
    #ventas;

    constructor(nombre, numeroCaja, codigoVendedor, turno) {

        super(nombre, codigoVendedor, "", "");

        this.numeroCaja = numeroCaja;
        this.#codigoVendedor = codigoVendedor;
        this.#turno = turno;
        this.#ventas = 0;
    }

    get turno() {
        return this.#turno;
    }

    set turno(valor) {
        this.#turno = valor;
    }

    // Polimorfismo
    mostrarDatos() {
        console.log("Vendedor:", this.nombre);
    }

    vender() {
        this.#ventas++;
    }

    #validarCaja() {
        return this.numeroCaja > 0;
    }

    #registrarVenta() {
        console.log("Venta registrada");
    }

}
const vendedor = new Vendedor(
    "Juan Pérez",
    1,
    "V001",
    "Mañana"
)

class Supervisor extends Vendedor {

    zona;      // Público

    #nivel;
    #bono;
    #area;

    constructor(nombre,caja,codigo,turno,zona,nivel){

        super(nombre,caja,codigo,turno);

        this.zona=zona;
        this.#nivel=nivel;
        this.#bono=500;
        this.#area="Ventas";
    }

    // Polimorfismo
    mostrarDatos(){
        console.log("Supervisor:",this.nombre);
    }

    supervisar(){
        console.log("Supervisando");
    }

    #evaluar(){
        return true;
    }

    #autorizar(){
        console.log("Autorizado");
    }

}
const supervisor = new Supervisor(
    "Carlos López",
    2,
    "S001",
    "Tarde",
    "Zona Norte",
    "Senior"
)

class Cliente extends Persona{

    nombreCompleto;

    #numeroDNI;
    #telefono;
    #direccion;

    constructor(nombre,dni,telefono,direccion){

        super(nombre,dni,telefono,direccion);

        this.nombreCompleto=nombre;
        this.#numeroDNI=dni;
        this.#telefono=telefono;
        this.#direccion=direccion;
    }

    get numeroDNI(){
        return this.#numeroDNI;
    }

    set numeroDNI(valor){
        this.#numeroDNI=valor;
    }

    // Polimorfismo
    mostrarDatos(){
        console.log("Cliente:",this.nombreCompleto);
    }

    comprar(){
        console.log("Compra realizada");
    }

    #validarDNI(){
        return this.#numeroDNI.length==8;
    }

    #registrarCompra(){
        console.log("Compra registrada");
    }

}
const cliente = new Cliente(
    "María Gómez",
    "12345678",
    "987654321",
    "Av. Principal 123"
)

class ProductoBase{

    nombreProducto;

    #codigoProducto;
    #precio;
    #stock;

    constructor(nombre,codigo,precio,stock){

        if(new.target===ProductoBase){
            throw new Error("Clase abstracta");
        }

        this.nombreProducto=nombre;
        this.#codigoProducto=codigo;
        this.#precio=precio;
        this.#stock=stock;
    }

    get precio(){
        return this.#precio;
    }

    set precio(valor){
        this.#precio=valor;
    }

    mostrarProducto(){
        console.log(this.nombreProducto);
    }

    registrarProducto(){
        console.log("Registrado");
    }

    #validarPrecio(){
        return this.#precio>0;
    }

    #actualizarStock(){
        console.log("Actualizado");
    }

}

class Productos extends ProductoBase{

    categoria;

    #marca;
    #modelo;
    #garantia;

    constructor(nombre,codigo,precio,stock,categoria){

        super(nombre,codigo,precio,stock);

        this.categoria=categoria;
        this.#marca="Lenovo";
        this.#modelo="ThinkPad";
        this.#garantia="12 meses";
    }

    // Polimorfismo
    mostrarProducto(){
        console.log(this.nombreProducto+" "+this.categoria);
    }

    vender(){
        console.log("Producto vendido");
    }

    #calcularValor(){
        return true;
    }

    #registrarSalida(){
        console.log("Salida registrada");
    }

}
const producto = new Productos(
    "Laptop Lenovo",
    "P001",
    2500,
    15,
    "Electrónica"
)

class CalidadProducto {
     estado;

    #categoria;
    #garantia;
    #observaciones;

    constructor(nombre,codigo,precio,stock,estado,categoria,garantia,obs){

        super(nombre,codigo,precio,stock,categoria);

        this.estado=estado;
        this.#categoria=categoria;
        this.#garantia=garantia;
        this.#observaciones=obs;
    }

    // Polimorfismo
    mostrarProducto(){
        console.log(this.nombreProducto+" Estado:"+this.estado);
    }

    revisar(){
        console.log("Producto revisado");
    }

    #validarEstado(){
        return true;
    }

    #registrarRevision(){
        console.log("Revisión registrada");
    }

}
const calidadProducto = new CalidadProducto(
    "Laptop Lenovo",
    "P001",
    2500,
    15,
    "Nuevo",
    "Electrónica",
    "12 meses",
    "Sin observaciones"
)

class Inventario {
    ubicacion; // Pública

    #stockActual;
    #stockMinimo;
    #codigoProducto;

    constructor(codigoProducto, stockActual, stockMinimo, ubicacion) {

        super(codigoProducto, "18/06/2026", "Admin", "Activo");

        this.ubicacion = ubicacion;
        this.#codigoProducto = codigoProducto;
        this.#stockActual = stockActual;
        this.#stockMinimo = stockMinimo;
    }

    get stockActual() {
        return this.#stockActual;
    }

    set stockActual(valor) {
        this.#stockActual = valor;
    }

    // Polimorfismo
    mostrarDatos() {
        console.log("Inventario:", this.ubicacion);
    }

    actualizarStock(cantidad) {
        this.#stockActual += cantidad;
    }

    // Métodos privados
    #verificarStock() {
        return this.#stockActual > this.#stockMinimo;
    }

    #registrarMovimiento() {
        console.log("Movimiento registrado");
    }
}
const inventario = new Inventario(
    "P001",
    15,
    5,
    "Almacén A"
)

class CantidadVendida {
   unidadMedida; // Pública

    #cantidad;
    #subtotal;
    #fechaRegistro;

    constructor(cantidad, unidadMedida, subtotal, fechaRegistro) {

        super("VENTA", fechaRegistro, "Admin", "Activo");

        this.unidadMedida = unidadMedida;
        this.#cantidad = cantidad;
        this.#subtotal = subtotal;
        this.#fechaRegistro = fechaRegistro;
    }

    get cantidad() {
        return this.#cantidad;
    }

    set cantidad(valor) {
        this.#cantidad = valor;
    }

    // Polimorfismo
    mostrarDatos() {
        console.log("Cantidad vendida:", this.#cantidad);
    }

    calcularSubtotal() {
        console.log(this.#subtotal);
    }

    // Métodos privados
    #validarCantidad() {
        return this.#cantidad > 0;
    }

    #guardarVenta() {
        console.log("Venta registrada");
    }
}
const cantidadVendida = new CantidadVendida(
    2,
    "Unidad",
    5000,
    "18/06/2026"
)

class Proveedor {

    nombreProveedor; // Público

    #idProveedor;
    #telefono;
    #direccion;

    constructor(idProveedor, nombreProveedor, telefono, direccion) {

        this.nombreProveedor = nombreProveedor;
        this.#idProveedor = idProveedor;
        this.#telefono = telefono;
        this.#direccion = direccion;
    }

    get telefono() {
        return this.#telefono;
    }

    set telefono(valor) {
        this.#telefono = valor;
    }

    // Métodos públicos
    mostrarProveedor() {
        console.log(this.nombreProveedor);
    }

    registrarProveedor() {
        console.log("Proveedor registrado");
    }

    // Métodos privados
    #validarTelefono() {
        return this.#telefono.length === 9;
    }

    #guardarProveedor() {
        console.log("Proveedor guardado");
    }
}
const proveedor = new Proveedor(
    "PR001",
    "Tech Import SAC",
    "999888777",
    "Lima, Perú"
)

class Precio {
     descuento; // Público

    #precioCompra;
    #precioVenta;
    #precioFinal;

    constructor(precioCompra, precioVenta, descuento, precioFinal) {

        super("PRECIO", "18/06/2026", "Admin", "Activo");

        this.descuento = descuento;
        this.#precioCompra = precioCompra;
        this.#precioVenta = precioVenta;
        this.#precioFinal = precioFinal;
    }

    get precioVenta() {
        return this.#precioVenta;
    }

    set precioVenta(valor) {
        this.#precioVenta = valor;
    }

    // Polimorfismo
    mostrarDatos() {
        console.log("Precio venta:", this.#precioVenta);
    }

    calcularPrecio() {
        console.log(this.#precioFinal);
    }

    // Métodos privados
    #calcularGanancia() {
        return this.#precioVenta - this.#precioCompra;
    }

    #aplicarDescuento() {
        return this.#precioVenta - this.descuento;
    }
}
const precio = new Precio(
    2000,
    2500,
    100,
    2400
)

class TotalVenta {
     descuento; // Público

    #subtotal;
    #impuesto;
    #totalPagar;

    constructor(subtotal, impuesto, descuento, totalPagar) {

        super("TOTAL", "18/06/2026", "Admin", "Activo");

        this.descuento = descuento;
        this.#subtotal = subtotal;
        this.#impuesto = impuesto;
        this.#totalPagar = totalPagar;
    }

    get totalPagar() {
        return this.#totalPagar;
    }

    set totalPagar(valor) {
        this.#totalPagar = valor;
    }

    // Polimorfismo
    mostrarDatos() {
        console.log("Total a pagar:", this.#totalPagar);
    }

    calcularTotal() {
        console.log(this.#subtotal + this.#impuesto - this.descuento);
    }

    // Métodos privados
    #sumarImpuestos() {
        return this.#subtotal + this.#impuesto;
    }

    #registrarTotal() {
        console.log("Total registrado");
    }
}
const totalVenta = new TotalVenta(
    5000,
    900,
    100,
    5800
)

class Comprobante {
     tipoDocumento; // Pública

    #numeroDocumento;
    #fechaEmision;
    #estado;

    constructor(tipoDocumento, numeroDocumento, fechaEmision, estado) {

        if (new.target === comprobante) {
            throw new Error("No se puede instanciar la clase Documento.");
        }

        this.tipoDocumento = tipoDocumento;
        this.#numeroDocumento = numeroDocumento;
        this.#fechaEmision = fechaEmision;
        this.#estado = estado;
    }

    // Encapsulamiento
    get numeroDocumento() {
        return this.#numeroDocumento;
    }

    set numeroDocumento(valor) {
        this.#numeroDocumento = valor;
    }

    // Métodos públicos
    mostrarDatos() {
        console.log("Documento:", this.tipoDocumento);
    }

    emitir() {
        console.log("Documento emitido.");
    }

    // Métodos privados
    #validarDocumento() {
        return this.#numeroDocumento !== "";
    }

    #guardarDocumento() {
        console.log("Documento guardado.");
    }
}
const comprobante = new Comprobante(
    "Factura",
    "F001-000123",
    "18/06/2026",
    "Activo"
)

