import { ProcesadorRequestDto } from "../src/dtos/ProcesadorDto.js";
import { ProcesadorRepository } from "../src/repositories/ProcesadorRepository.js";
import { ProcesadoresService } from "../src/services/procesadores.service.js";

const repository = new ProcesadorRepository();
const service = new ProcesadoresService(repository);

const procesadoresIniciales = [
  {
    codigo: "P-001",
    modelo: "Intel Core i5-12400",
    arquitectura: "X64",
    nucleos: 6,
    precio: 799.9,
    frecuenciaGhz: 4.4,
    descripcion: "Procesador de escritorio.",
    registro: true,
    fechaLanzamiento: "2022-01-04",
    horaRegistro: "09:00",
    fechaHoraRegistro: "2026-08-04T09:00",
    imagenBase64: null,
  },
  {
    codigo: "P-002",
    modelo: "AMD Ryzen 5 5600G",
    arquitectura: "X64",
    nucleos: 6,
    precio: 629.9,
    frecuenciaGhz: 4.4,
    descripcion: "Procesador con gráficos integrados.",
    registro: true,
    fechaLanzamiento: "2021-08-05",
    horaRegistro: "09:15",
    fechaHoraRegistro: "2026-08-04T09:15",
    imagenBase64: null,
  },
  {
    codigo: "P-003",
    modelo: "Intel Core i7-13700K",
    arquitectura: "X64",
    nucleos: 16,
    precio: 1699.9,
    frecuenciaGhz: 5.4,
    descripcion: "Procesador de alto rendimiento.",
    registro: true,
    fechaLanzamiento: "2022-10-20",
    horaRegistro: "09:30",
    fechaHoraRegistro: "2026-08-04T09:30",
    imagenBase64: null,
  },
  {
    codigo: "P-004",
    modelo: "Procesador ARM de ejemplo",
    arquitectura: "ARM",
    nucleos: 8,
    precio: 999.9,
    frecuenciaGhz: 3.5,
    descripcion: "Registro desactivado para verificar el campo booleano.",
    registro: false,
    fechaLanzamiento: "2024-01-15",
    horaRegistro: "09:45",
    fechaHoraRegistro: "2026-08-04T09:45",
    imagenBase64: null,
  },
];

const existentes = await repository.listar();
const codigos = new Set(existentes.map((procesador) => procesador.codigo));
let creados = 0;

for (const procesador of procesadoresIniciales) {
  if (codigos.has(procesador.codigo)) continue;
  await service.crear(new ProcesadorRequestDto(procesador));
  creados += 1;
}

console.log(
  creados
    ? `Se agregaron ${creados} procesadores iniciales.`
    : "Los procesadores iniciales ya existen.",
);
