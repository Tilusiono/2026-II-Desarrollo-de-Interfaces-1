import ColchonIndividual from "./ColchonIndividual.js";
import ColchonKing from "./ColchonKing.js";
import Armario from "./Armario.js";
import Estante from "./Estante.js";
import Cliente from "./Cliente.js";
import Vendedor from "./Vendedor.js";

// creacion del cliente
const cliente1 = new Cliente(1, "Pedro", "Gonzales", "12345678")


// creaciones de productos
const colchonIndividual1 = new ColchonIndividual(1, "colchon simple individual", 400, 5, "1", "normal", "rojo");
const colchonKing1 = new ColchonKing(2, "Colchon King familiar", 600, 4, "3", "suave", "200kg");
const armario1 = new Armario(3, "Armario 4 puertas", 550, 10, "roble", "2", "2");
const estante1 = new Estante(4, "Estante flotante", 200, 6, "pino", 2);

const productosAlmacenados = [colchonIndividual1, colchonKing1, armario1, estante1]

colchonIndividual1.mostrarDatos();
colchonKing1.mostrarDatos();
armario1.mostrarDatos();
estante1.mostrarDatos();

// creacion de un carrito
let carrito1 = [];

carrito1.push(cliente1.añadirCarrito(colchonIndividual1, 1));
carrito1.push(cliente1.añadirCarrito(colchonKing1, 1));
carrito1.push(cliente1.añadirCarrito(estante1, 2));


console.log(carrito1);

const vendedor1 = new Vendedor(1, "Carlos", "Lopez", "45678876", "900000123", 1130);

vendedor1.registrarVenta(cliente1, carrito1, productosAlmacenados);