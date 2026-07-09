import Vendedor  from "./Vendedor.js";
import  Supervisor  from "./Supervisor.js";
import Cliente from "./Cliente.js";
import  Categoria  from "./Categoria.js";
import Productos  from "./Productos.js";
import  CalidadProducto  from "./CalidadProducto.js";
import Inventario  from "./Inventario.js";
import  CantidadVendida  from "./CantidadVendida.js";
import  Proveedor  from "./Proveedor.js";
import  Precio  from "./Precio.js";
import  TotalVenta  from "./TotalVenta.js";


const vendedor = new Vendedor(
    "Juan Pérez",
    1,
    "V001",
    "Mañana"
)


const supervisor = new Supervisor(
    "Carlos López",
    2,
    "S001",
    "Tarde",
    "Zona Norte",
    "Senior"
)


const cliente = new Cliente(
    "María Gómez",
    "12345678",
    "987654321",
    "Av. Principal 123"
)


const producto = new Productos(
    "Laptop Lenovo",
    "P001",
    2500,
    15,
    "Electrónica"
)


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


const inventario = new Inventario(
    "P001",
    15,
    5,
    "Almacén A"
)


const cantidadVendida = new CantidadVendida(
    2,
    "Unidad",
    5000,
    "18/06/2026"
)

const proveedor = new Proveedor(
    "PR001",
    "Tech Import SAC",
    "999888777",
    "Lima, Perú"
)


const precio = new Precio(
    2000,
    2500,
    100,
    2400
)


const totalVenta = new TotalVenta(
    5000,
    900,
    100,
    5800
)


const comprobante = new Comprobante(
    "Factura",
    "F001-000123",
    "18/06/2026",
    "Activo"
)

