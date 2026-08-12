import { parentPort, workerData } from "node:worker_threads";

const procesadores = Array.isArray(workerData) ? workerData : [];

const total = procesadores.length;
const registrados = procesadores.filter((item) => item.registro).length;
const totalNucleos = procesadores.reduce(
  (acumulado, item) => acumulado + Number(item.nucleos || 0),
  0,
);
const valorTotal = procesadores.reduce(
  (acumulado, item) => acumulado + Number(item.precio || 0),
  0,
);
const frecuenciaPromedio =
  procesadores.filter((item) => item.frecuenciaGhz !== null).length === 0
    ? 0
    : procesadores.reduce(
        (acumulado, item) => acumulado + Number(item.frecuenciaGhz || 0),
        0,
      ) /
      procesadores.filter((item) => item.frecuenciaGhz !== null).length;

parentPort.postMessage({
  total,
  registrados,
  totalNucleos,
  valorTotal: Number(valorTotal.toFixed(2)),
  frecuenciaPromedio: Number(frecuenciaPromedio.toFixed(2)),
});
