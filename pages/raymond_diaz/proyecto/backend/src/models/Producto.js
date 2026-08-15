import { EntidadAuditable } from "./EntidadAuditable.js";

export class Producto extends EntidadAuditable {
  #codigo;
  #nombre;
  #marca;
  #precio;
  #stock;

  constructor(data = {}) {
    super(data);
    this.#codigo = data.codigo;
    this.#nombre = data.nombre;
    this.#marca = data.marca;
    this.#precio = data.precio;
    this.#stock = data.stock;
    this.descripcion = data.descripcion ?? null;
    this.categoriaId = data.categoriaId;
    this.categoria = data.categoria ?? null;
    this.proveedorId = data.proveedorId ?? null;
    this.proveedor = data.proveedor ?? null;
    this.activo = data.activo ?? true;
    this.fechaIngreso = data.fechaIngreso ?? null;
  }

  get codigo() { return this.#codigo; }
  set codigo(value) { this.#codigo = value; }
  get nombre() { return this.#nombre; }
  set nombre(value) { this.#nombre = value; }
  get marca() { return this.#marca; }
  set marca(value) { this.#marca = value; }
  get precio() { return this.#precio; }
  set precio(value) { this.#precio = value; }
  get stock() { return this.#stock; }
  set stock(value) { this.#stock = value; }

  get valorInventario() {
    return Number((this.#precio * this.#stock).toFixed(2));
  }

  toJSON() {
    return {
      id: this.id,
      codigo: this.#codigo,
      nombre: this.#nombre,
      marca: this.#marca,
      descripcion: this.descripcion,
      precio: this.#precio,
      stock: this.#stock,
      valorInventario: this.valorInventario,
      categoriaId: this.categoriaId,
      categoria: this.categoria,
      proveedorId: this.proveedorId,
      proveedor: this.proveedor,
      activo: this.activo,
      fechaIngreso: this.fechaIngreso,
      creadoEn: this.creadoEn,
      actualizadoEn: this.actualizadoEn,
    };
  }
}
