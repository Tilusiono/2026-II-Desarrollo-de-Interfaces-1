class Empleado{
    #idEmpleado;
    #nombre;
    #apellido;
    #edad;
    #movil;
    #sector;

    constructor(id, nombre, apellido, edad, movil, sector){
        this.#idEmpleado = id;
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#edad = edad;
        this.#movil = movil;
        this.#sector = sector;
    }

    mostrarEmpleado(){
        console.log(this.#idEmpleado, this.#nombre, this.#apellido);
    }
}

class Sector{
    #idSector;
    #nombreSector;
    #descripcion;

    constructor(id, nombre, descripcion){
        this.#idSector = id;
        this.#nombreSector = nombre;
        this.#descripcion = descripcion;
    }

    mostrarSector(){
        console.log(this.#nombreSector);
    }
}

class Jefe{
    #idJefe;
    #nombre;
    #edad;
    #telefono;
    #area;

    constructor(id, nombre, edad, telefono, area){
        this.#idJefe = id;
        this.#nombre = nombre;
        this.#edad = edad;
        this.#telefono = telefono;
        this.#area = area;
    }

    mostrarJefe(){
        console.log(this.#nombre, this.#area);
    }
}

class Asistencia{
    #idAsistencia;
    #fecha;
    #estado;
    #idEmpleado;

    constructor(id, fecha, estado, empleado){
        this.#idAsistencia = id;
        this.#fecha = fecha;
        this.#estado = estado;
        this.#idEmpleado = empleado;
    }

    mostrarAsistencia(){
        console.log(this.#fecha, this.#estado);
    }
}

class HorasTrabajadas{
    #idHoras;
    #horasNormales;
    #horasExtras;
    #totalHoras;
    #fecha;
    #idEmpleado;

    constructor(id, normales, extras, fecha, empleado){
        this.#idHoras = id;
        this.#horasNormales = normales;
        this.#horasExtras = extras;
        this.#totalHoras = normales + extras;
        this.#fecha = fecha;
        this.#idEmpleado = empleado;
    }

    mostrarHoras(){
        console.log(this.#totalHoras);
    }
}

class Permiso{
    #idPermiso;
    #motivo;
    #fechaInicio;
    #fechaFin;
    #idEmpleado;

    constructor(id, motivo, inicio, fin, empleado){
        this.#idPermiso = id;
        this.#motivo = motivo;
        this.#fechaInicio = inicio;
        this.#fechaFin = fin;
        this.#idEmpleado = empleado;
    }
}

class Vacaciones{
    #idVacacion;
    #fechaInicio;
    #fechaFin;
    #idEmpleado;

    constructor(id, inicio, fin, empleado){
        this.#idVacacion = id;
        this.#fechaInicio = inicio;
        this.#fechaFin = fin;
        this.#idEmpleado = empleado;
    }
}

class Feriado{
    #idFeriado;
    #fecha;
    #descripcion;

    constructor(id, fecha, descripcion){
        this.#idFeriado = id;
        this.#fecha = fecha;
        this.#descripcion = descripcion;
    }

    mostrarFeriado(){
        console.log(this.#fecha, this.#descripcion);
    }
}

class Pago{
    #idPago;
    #monto;
    #fechaPago;
    #idEmpleado;

    constructor(id, monto, fecha, empleado){
        this.#idPago = id;
        this.#monto = monto;
        this.#fechaPago = fecha;
        this.#idEmpleado = empleado;
    }

    mostrarPago(){
        console.log(this.#monto);
    }
}

class Reporte{
    #idReporte;
    #fecha;
    #tipo;
    #idJefe;

    constructor(id, fecha, tipo, jefe){
        this.#idReporte = id;
        this.#fecha = fecha;
        this.#tipo = tipo;
        this.#idJefe = jefe;
    }

    mostrarReporte(){
        console.log(this.#tipo);
    }
}