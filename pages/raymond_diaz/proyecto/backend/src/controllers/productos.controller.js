export class ProductosController {
  constructor(service) { this.service = service; }

  async listar(queryDto, response) {
    const productosResponseDto = await this.service.listar(queryDto);
    response.json({ ok: true, total: productosResponseDto.length, productosResponseDto });
  }

  async consultar(queryDto, response) {
    const productosResponseDto = await this.service.listar(queryDto);
    response.json({ ok: true, metodo: "QUERY", total: productosResponseDto.length, productoConsultaDto: queryDto, productosResponseDto });
  }

  async obtener(id, response) {
    response.json({ ok: true, productoResponseDto: await this.service.obtener(id) });
  }

  async crear(dto, response) {
    const product = await this.service.crear(dto);
    response.status(201).location(`/api/productos/${product.id}`).json({ ok: true, mensaje: "Producto guardado en SQLite", productoResponseDto: product });
  }

  async reemplazar(id, dto, response) {
    response.json({ ok: true, mensaje: "Producto reemplazado con PUT", productoResponseDto: await this.service.reemplazar(id, dto) });
  }

  async actualizar(id, dto, response) {
    response.json({ ok: true, mensaje: "Producto actualizado parcialmente con PATCH", productoResponseDto: await this.service.actualizar(id, dto) });
  }

  async eliminar(id, response) {
    response.json({ ok: true, mensaje: "Producto eliminado correctamente", productoResponseDto: await this.service.eliminar(id) });
  }
}
