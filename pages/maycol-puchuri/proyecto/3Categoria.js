class Categoria {
  #id;
  #nombre;
  #descripcion;
  #activo; // 1. NUEVO ATRIBUTO PRIVADO

  // Actualizamos el constructor para aceptar el nuevo atributo (por defecto será true)
  constructor(id, nombre, descripcion, activo = true) {
    this.#id = id;
    this.#nombre = nombre;
    this.#descripcion = descripcion;
    this.#activo = activo;
  }

  // --- GETTERS Y SETTERS ORIGINALES ---
  get id() { return this.#id; }
  set id(nuevoId) { this.#id = nuevoId; }

  get nombre() { return this.#nombre; }
  set nombre(nuevoNombre) { this.#nombre = nuevoNombre; }

  get descripcion() { return this.#descripcion; }
  set descripcion(nuevaDescripcion) { this.#descripcion = nuevaDescripcion; }

  // --- NUEVO GETTER Y SETTER ---
  get activo() { return this.#activo; }
  set activo(nuevoEstado) { this.#activo = nuevoEstado; }


  // --- NUEVOS MÉTODOS ---

  // 1. Método para activar/desactivar la categoría rápidamente
  alternarEstado() {
    this.#activo = !this.#activo;
    return this.#activo;
  }

  // 2. Método para mostrar la información en formato texto (útil para la consola o logs)
  obtenerResumen() {
    const estado = this.#activo ? '🟢 Activa' : '🔴 Inactiva';
    return `${estado} | Categoría #${this.#id}: ${this.#nombre} - ${this.#descripcion}`;
  }

  // 3. Método para convertir la clase a JSON
  // IMPORTANTE: JSON.stringify() ignora los atributos con '#' por defecto. 
  // Al definir toJSON(), le enseñamos a JavaScript cómo debe exportar estos datos.
  toJSON() {
    return {
      id: this.#id,
      nombre: this.#nombre,
      descripcion: this.#descripcion,
      activo: this.#activo
    };
  }
}