import { Worker } from "node:worker_threads";
import { callbackAPromesa } from "../utils/callbackToPromise.js";

function calcularEnWorker(payload) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("../workers/estadisticas.worker.js", import.meta.url));
    worker.once("message", (result) => {
      resolve(result);
      worker.terminate();
    });
    worker.once("error", reject);
    worker.postMessage(payload);
  });
}

export class EstadisticasService {
  constructor(productRepository, userRepository) {
    this.productRepository = productRepository;
    this.userRepository = userRepository;
  }

  async obtenerResumen() {
    const [productos, usuarios] = await Promise.all([
      callbackAPromesa(() => this.productRepository.datosParaEstadisticas()),
      callbackAPromesa(() => this.userRepository.listar().map((user) => user.toJSON())),
    ]);
    return calcularEnWorker({ productos, usuarios });
  }
}
