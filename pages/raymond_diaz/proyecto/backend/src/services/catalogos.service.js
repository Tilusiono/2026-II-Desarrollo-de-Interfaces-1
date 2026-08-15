import { callbackAPromesa } from "../utils/callbackToPromise.js";

export class CatalogosService {
  constructor(repository) { this.repository = repository; }
  async obtener() {
    const [categorias, proveedores] = await Promise.all([
      callbackAPromesa(() => this.repository.listarCategorias()),
      callbackAPromesa(() => this.repository.listarProveedores()),
    ]);
    return { categorias, proveedores };
  }
}
