export class EntidadAuditable {
  constructor({ id = null, creadoEn = null, actualizadoEn = null } = {}) {
    this.id = id;
    this.creadoEn = creadoEn;
    this.actualizadoEn = actualizadoEn;
  }

  fuePersistida() {
    return Number.isInteger(this.id) && this.id > 0;
  }
}
