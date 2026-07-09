class Tienda {
  #id;
  #nombre;
  #direccion;
  #telefono; // 1. NUEVO ATRIBUTO PRIVADO

  // Actualizamos el constructor para aceptar el teléfono (con un valor por defecto)
  constructor(id, nombre, direccion, telefono = "Sin registrar") {
    this.#id = id;
    this.#nombre = nombre;
    this.#direccion = direccion;
    this.#telefono = telefono;
  }

  // --- GETTERS Y SETTERS ORIGINALES ---
  get id() { return this.#id; }
  set id(nuevoId) { this.#id = nuevoId; }

  get nombre() { return this.#nombre; }
  set nombre(nuevoNombre) { this.#nombre = nuevoNombre; }

  get direccion() { return this.#direccion; }
  set direccion(nuevaDireccion) { this.#direccion = nuevaDireccion; }

  // --- NUEVO GETTER Y SETTER ---
  get telefono() { return this.#telefono; }
  set telefono(nuevoTelefono) { 
    if (nuevoTelefono.trim() === "") throw new Error("El teléfono no puede estar vacío.");
    this.#telefono = nuevoTelefono; 
  }

  // --- NUEVOS MÉTODOS ---

  // 1. Método para verificar si la tienda tiene toda su información completa
  tieneDatosCompletos() {
    return (
      this.#nombre !== "" && 
      this.#direccion !== "" && 
      this.#telefono !== "Sin registrar"
    );
  }

  // 2. Método para mostrar una tarjeta de presentación de la tienda en texto
  obtenerInfo() {
    return `🏪 Tienda: ${this.#nombre}
📍 Dirección: ${this.#direccion}
📞 Teléfono: ${this.#telefono}`;
  }

  // 3. Método para exportar a JSON (imprescindible para los campos con '#')
  toJSON() {
    return {
      id: this.#id,
      nombre: this.#nombre,
      direccion: this.#direccion,
      telefono: this.#telefono,
      perfilCompletado: this.tieneDatosCompletos() // Agregamos este dato extra útil para la interfaz
    };
  }
}