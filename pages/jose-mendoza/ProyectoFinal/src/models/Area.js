class Area{
    #idArea;
    #nombre;
    #descripcion;
    #capacidad;
    #idSede;
    #idJefe;

    constructor(idArea,nombre, descripcion, capacidad = 0, idSede =null, idJefe = null){
        this.__idArea = idArea;
        this.__nombre = nombre;
        this.__descripcion = descripcion;
        this.__capacidad = capacidad;
        this.__idSede = idSede;
        this.__idJefe = idJefe;
    }
    
// Getters & Setters
  get idArea() {
    return this._idArea;
  }

  set idArea(idArea) {
    this._idArea = idArea;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(nombre) {
    this._nombre = nombre;
  }

  get descripcion() {
    return this._descripcion;
  }

  set descripcion(descripcion) {
    this._descripcion = descripcion;
  }

  get capacidad() {
    return this._capacidad;
  }

  set capacidad(capacidad) {
    this._capacidad = capacidad;
  }

  get idSede() {
    return this._idSede;
  }

  set idSede(idSede) {
    this._idSede = idSede;
  }

  get idJefe() {
    return this._idJefe;
  }

  set idJefe(idJefe) {
    this._idJefe = idJefe;
  }
}

export default Area;