export class UsuariosController {
  constructor(service) { this.service = service; }
  async listar(queryDto, response) {
    const usuariosResponseDto = await this.service.listar(queryDto);
    response.json({ ok: true, total: usuariosResponseDto.length, usuariosResponseDto });
  }
  async obtener(id, response) {
    response.json({ ok: true, usuarioResponseDto: await this.service.obtener(id) });
  }
  async crear(dto, response) {
    const user = await this.service.crear(dto);
    response.status(201).location(`/api/usuarios/${user.id}`).json({ ok: true, mensaje: "Usuario guardado en SQLite", usuarioResponseDto: user });
  }
  async reemplazar(id, dto, response) {
    response.json({ ok: true, mensaje: "Usuario reemplazado con PUT", usuarioResponseDto: await this.service.reemplazar(id, dto) });
  }
  async actualizar(id, dto, response) {
    response.json({ ok: true, mensaje: "Usuario actualizado parcialmente con PATCH", usuarioResponseDto: await this.service.actualizar(id, dto) });
  }
  async eliminar(id, response) {
    response.json({ ok: true, mensaje: "Usuario eliminado correctamente", usuarioResponseDto: await this.service.eliminar(id) });
  }
}
