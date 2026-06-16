// marketing proyecto ejercicio

class Empleado{
    nombre;
    apellido;
    edad;
    movil;
    sectorTrabajo;

    constructor(nom, ape, edad, movil, sector){
        this.nombre = nom;
        this.apellido = ape;
        this.edad = edad;
        this.movil = movil;
        this.sectorTrabajo = sector;
    }
}

class Jefe{
    nombreCompletos;
    edad;
    nroTelefono;
    areaResponsable;

    constructor(nombre, edad, telefono, area){
        this.nombreCompletos = nombre;
        this.edad = edad;
        this.nroTelefono = telefono;
        this.areaResponsable = area;
    }
}

class HorasTrabajadas{
    horas_normales;
    horas_extras;
    fecha;
    total_horas;

    constructor(normales, extras, fecha){
        this.horas_normales = normales;
        this.horas_extras = extras;
        this.fecha = fecha;
        this.total_horas = normales + extras;
    }
}

class Dias{
    fecha;
    nombreDia;
    asistencia;
    feriado;

    constructor(fecha, nombreDia, asistencia, feriado){
        this.fecha = fecha;
        this.nombreDia = nombreDia;
        this.asistencia = asistencia;
        this.feriado = feriado;
    }
}