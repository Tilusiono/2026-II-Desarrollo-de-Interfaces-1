export class Servicio {
  #id;
  #codigo;
  #nombre;
  #tipoServicio;
  #precio;

  constructor(
    id,
    codigo,
    nombre,
    tipoServicio,
    precio,
    duracionMinutos,
    fechaInicio,
    descripcion,
    activo,
    horaRegistro,
    fechaHoraRegistro,
    imagen,
    imagenMimeType,
  ) {
    this.#id = Number(id);
    this.#codigo = codigo;
    this.#nombre = nombre;
    this.#tipoServicio = tipoServicio;
    this.#precio = Number(precio);

    this.duracionMinutos =
      duracionMinutos === null || duracionMinutos === undefined
        ? null
        : Number(duracionMinutos);

    this.fechaInicio = fechaInicio ?? null;
    this.descripcion = descripcion ?? null;
    this.activo = activo === true || Number(activo) === 1;
    this.horaRegistro = horaRegistro;
    this.fechaHoraRegistro = fechaHoraRegistro;
    this.imagen = imagen ?? null;
    this.imagenMimeType = imagenMimeType ?? null;
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    this.#id = Number(id);
  }

  get codigo() {
    return this.#codigo;
  }

  set codigo(codigo) {
    this.#codigo = codigo;
  }

  get nombre() {
    return this.#nombre;
  }

  set nombre(nombre) {
    this.#nombre = nombre;
  }

  get tipoServicio() {
    return this.#tipoServicio;
  }

  set tipoServicio(tipoServicio) {
    this.#tipoServicio = tipoServicio;
  }

  get precio() {
    return this.#precio;
  }

  set precio(precio) {
    this.#precio = Number(precio);
  }
}