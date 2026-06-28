import ColchonIndividual from "./ColchonIndividual.js";
import ColchonKing from "./ColchonKing.js";
import Armario from "./Armario.js";
import Estante from "./Estante.js";

const colchonIndividual1 = new ColchonIndividual(1, "colchon simple individual", 400, 5, "1", "normal", "rojo");
const colchonKing1 = new ColchonKing(1, "Colchon King familiar", 600, 4, "3", "suave", "200kg");
const armario1 = new Armario(1, "Armario 4 puertas", 550, 10, "roble", "2", "2");
const estante1 = new Estante(1, "Estante flotante", 200, 6, "pino", 2);

colchonIndividual1.mostrarDatos();
colchonKing1.mostrarDatos();
armario1.mostrarDatos();
estante1.mostrarDatos();