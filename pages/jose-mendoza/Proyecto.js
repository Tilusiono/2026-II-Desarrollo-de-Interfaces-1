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
}

class HorasTrabajadas{
    #idHoras;
    #horasNormales;
    #horasExtras;
    #fecha;
    #idEmpleado;

    constructor(id, normales, extras, fecha, empleado){
        this.#idHoras = id;
        this.#horasNormales = normales;
        this.#horasExtras = extras;
        this.#fecha = fecha;
        this.#idEmpleado = empleado;
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
}

// usando el new
let sector1 = new Sector(
    1,
    "Sistemas",
    "Area de tecnologia."
)

let empleado1= new empleado(
    101,
    "Jose",
    "Mendoza",
    17,
    "954302181",
    sector1,
)

let jefe1 = new Jefe(
    1,
    "Carlos Martinez",
    45,
    "987654321",
    "Sistemas"
)

let asistencia1 = new Asistencia(
    1,
    "2024-06-01",
    "Presente",
    empleado1
)

let horas1= new HorasTrabajadas(
    1,
    8,
    2,
    "2024-06-01",
    empleado1
)
let permiso1 = new Permiso(
    1,
    "Cita Medica",
    "21/06/2026",
    "24/06/2026",
    empleado1
);

let vacaciones1 = new Vacaciones(
    1,
    "01/07/2026",
    "15/07/2026",
    empleado1
);

let feriado1 = new Feriado(
    1,
    "28/07/2026",
    "Fiestas Patrias"
);

let pago1 = new Pago(
    1,
    1500,
    "30/06/2026",
    empleado1
);

let reporte1 = new Reporte(
    1,
    "30/06/2026",
    "Reporte Mensual",
    jefe1
);