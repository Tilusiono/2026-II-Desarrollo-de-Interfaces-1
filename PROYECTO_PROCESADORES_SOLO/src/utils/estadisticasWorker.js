import { Worker } from "node:worker_threads";

export function calcularEstadisticasEnWorker(datos) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL("../workers/estadisticas.worker.js", import.meta.url),
      { workerData: datos },
    );

    worker.once("message", resolve);
    worker.once("error", reject);
    worker.once("exit", (codigo) => {
      if (codigo !== 0) {
        reject(new Error(`El Worker finalizó con código ${codigo}`));
      }
    });
  });
}
