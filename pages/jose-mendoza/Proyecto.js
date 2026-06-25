class Empleado{
    #idEmpleado;
    #nombre;
    #apellido;
    #edad;
    #movil;
    #sector;

    /**
     * Crea una instancia de Empleado.
     *
     * @param {number} id Identificador del empleado.
     * @param {string} nombre Nombre del empleado.
     * @param {string} [apellido="Sin Apellido"] Apellido del empleado.
     * @param {number} [edad=0] Edad del empleado.
     * @param {string} [movil=""] Móvil del empleado.
     * @param {Sector} sector Sector al que pertenece el empleado.
     */


    constructor(id, nombre, apellido="Sin Apellido", edad=0, movil="", sector){
         
        if (typeof id !== "number")
            throw new Error("ID debe ser number");
        if (typeof nombre !== "string")
            throw new Error("Nombre debe ser string");
        if (typeof apellido !== "string")
            throw new Error("Apellido debe ser string");
        if (typeof edad !== "number")
            throw new Error("Edad debe ser number");
        if (typeof movil !== "string")
            throw new Error("Móvil debe ser string");
        if (!(sector instanceof Sector))
            throw new Error("Sector debe ser una instancia de la clase Sector");

        
        this.#idEmpleado = id;
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#edad = edad;
        this.#movil = movil;  
        this.#sector = sector;
    }

    #validarEdad(){
        if(this.#edad=== 0){
            return "Edad invalida";
        }
        if(this.#edad >= 18){
            return true;
        }
        return false;
    }

    mostrarEstado(){
        if(this.#validarEdad()=== "Edad invalida"){
            return "Edad invalida";
        }
        else if(this.#validarEdad()){
            return "Es mayor de edad - " + this.#edad;
        }
        else{
            return "Es menor de edad - " + this.#edad;
        }
    }
    // GETTERS
    getIdEmpleado(){
        return this.#idEmpleado;
    }
    getNombre(){
        return this.#nombre;
    }
    getApellido(){
        return this.#apellido;
    }
    getEdad(){
        return this.#edad;
    }
    getMovil(){
        return this.#movil;
    }
    getSector(){
        return this.#sector;
    }
    // SETTERS

    setNombre(nombre){
        if(typeof nombre !== "string")
            throw new Error("Nombre invalido");
        this.#nombre = nombre;
    }
    setApellido(apellido){
        if(typeof apellido !== "string")
            throw new Error("Apellido invalido");
        this.#apellido = apellido;
    }
    setEdad(edad){
        if(typeof edad !== "number")
            throw new Error("Edad invalida");
        this.#edad = edad;
    }
    setMovil(movil){
        if(typeof movil !== "string")
            throw new Error("Movil invalido");
        this.#movil = movil;
    }
    setSector(sector){
        this.#sector = sector;
    }
}

class Sector{
    #idSector;
    #nombreSector;
    #descripcion;

    /**
     * Crea una instancia de Sector.
     *
     * @param {number} id Identificador del sector.
     * @param {string} nombre Nombre del sector.
     * @param {string} descripcion Descripción del sector.
     */
    constructor(id, nombre, descripcion){
        if(typeof id !== "number")
            throw new Error("ID debe ser number");
        if(typeof nombre !== "string")
            throw new Error("Nombre debe ser string");
        if(typeof descripcion !== "string")
            throw new Error("Descripción debe ser string");
        
        this.#idSector = id;
        this.#nombreSector = nombre;
        this.#descripcion = descripcion;
    }
    // Método privado
    #validarDescripcion(){
        return this.#descripcion.trim() !== "";
    }
    // Método público
    mostrarEstado(){
        if(this.#validarDescripcion()){
            return "Sector válido";
        }
        return "Descripción inválida";
    }
    // GETTERS
    getIdSector(){
        return this.#idSector;
    }
    getNombreSector(){
        return this.#nombreSector;
    }
    getDescripcion(){
        return this.#descripcion;
    }
    // SETTERS
    setNombreSector(nombre){
        if(typeof nombre !== "string")
            throw new Error("Nombre inválido");

        this.#nombreSector = nombre;
    }
    setDescripcion(descripcion){
        if(typeof descripcion !== "string")
            throw new Error("Descripción inválida");

        this.#descripcion = descripcion;
    }
}

class Jefe{
    #idJefe;
    #nombre;
    #edad;
    #telefono;
    #area;

    /**
     * Crea una instancia de Jefe.
     *
     * @param {number} id Identificador del jefe.
     * @param {string} nombre Nombre del jefe.
     * @param {number} edad Edad del jefe.
     * @param {string} telefono Teléfono del jefe.
     * @param {string} area Área que dirige el jefe.
     */
    constructor(id, nombre, edad, telefono, area){
        if(typeof id !== "number")
            throw new Error("ID debe ser number");
        if(typeof nombre !== "string")
            throw new Error("Nombre debe ser string");
        if(typeof edad !== "number")
            throw new Error("Edad debe ser number");
        if(typeof telefono !== "string")
            throw new Error("Teléfono debe ser string");
        if(typeof area !== "string")
            throw new Error("Área debe ser string");

        this.#idJefe = id;
        this.#nombre = nombre;
        this.#edad = edad;
        this.#telefono = telefono;
        this.#area = area;
    }
    // Método privado
    #validarEdad(){
        return this.#edad >= 18;
    }
    // Método público
    mostrarEstado(){
        if(this.#edad === 0){
            return "Edad inválida";
        }
        if(this.#validarEdad()){
            return "Jefe mayor de edad - " + this.#edad;
        }
        return "Jefe menor de edad - " + this.#edad;
    }
    // GETTERS
    getIdJefe(){
        return this.#idJefe;
    }
    getNombre(){
        return this.#nombre;
    }
    getEdad(){
        return this.#edad;
    }
    getTelefono(){
        return this.#telefono;
    }
    getArea(){
        return this.#area;
    }
    // SETTERS
    setNombre(nombre){

        if(typeof nombre !== "string")
            throw new Error("Nombre inválido");
        this.#nombre = nombre;
    }
    setEdad(edad){
        if(typeof edad !== "number")
            throw new Error("Edad inválida");
        this.#edad = edad;
    }
    setTelefono(telefono){
        if(typeof telefono !== "string")
            throw new Error("Teléfono inválido");
        this.#telefono = telefono;
    }
    setArea(area){

        if(typeof area !== "string")
            throw new Error("Área inválida");
        this.#area = area;
    }
}

class Asistencia{
    #idAsistencia;
    #fecha;
    #estado;
    #idEmpleado;
    /**
     * Crea una instancia de Asistencia.
     *
     * @param {number} id Identificador de la asistencia.
     * @param {string} fecha Fecha de la asistencia.
     * @param {string} estado Estado de asistencia.
     * @param {Empleado} empleado Empleado asociado a la asistencia.
     */
    constructor(id, fecha, estado, empleado){
        if(typeof id !== "number")
            throw new Error("ID debe ser number");
        if(typeof fecha !== "string")
            throw new Error("Fecha debe ser string");
        if(typeof estado !== "string")
            throw new Error("Estado debe ser string");
        if(!(empleado instanceof Empleado))
            throw new Error("Empleado debe ser una instancia de la clase Empleado");

        this.#idAsistencia = id;
        this.#fecha = fecha;
        this.#estado = estado;
        this.#idEmpleado = empleado;
    }
    // Método privado
    #validarEstado(){
        return this.#estado.trim() !== "";
    }
    // Método público
    mostrarEstado(){
        if(this.#validarEstado()){
            return "Asistencia registrada - " + this.#estado;
        }
        return "Estado de asistencia inválido";
    }
    // GETTERS
    getIdAsistencia(){
        return this.#idAsistencia;
    }
    getFecha(){
        return this.#fecha;
    }
    getEstado(){
        return this.#estado;
    }
    getEmpleado(){
        return this.#idEmpleado;
    }
    // SETTERS
    setFecha(fecha){
        if(typeof fecha !== "string")
            throw new Error("Fecha inválida");
        this.#fecha = fecha;
    }
    setEstado(estado){
        if(typeof estado !== "string")
            throw new Error("Estado inválido");
        this.#estado = estado;
    }
    setEmpleado(empleado){
        if(!(empleado instanceof Empleado))
            throw new Error("Empleado inválido");
        this.#idEmpleado = empleado;
    }
}

class HorasTrabajadas{
    #idHoras;
    #horasNormales;
    #horasExtras;
    #fecha;
    #idEmpleado;
    /**
     * Crea una instancia de HorasTrabajadas.
     *
     * @param {number} id Identificador del registro.
     * @param {number} normales Horas normales trabajadas.
     * @param {number} extras Horas extras trabajadas.
     * @param {string} fecha Fecha del registro.
     * @param {Empleado} empleado Empleado asociado al registro.
     */
    constructor(id, normales, extras, fecha, empleado){
        if(typeof id !== "number")
            throw new Error("ID debe ser number");
        if(typeof normales !== "number")
            throw new Error("Horas normales debe ser number");
        if(typeof extras !== "number")
            throw new Error("Horas extras debe ser number");
        if(typeof fecha !== "string")
            throw new Error("Fecha debe ser string");
        if(!(empleado instanceof Empleado))
            throw new Error("Empleado debe ser una instancia de la clase Empleado");

        this.#idHoras = id;
        this.#horasNormales = normales;
        this.#horasExtras = extras;
        this.#fecha = fecha;
        this.#idEmpleado = empleado;
    }
    // Método privado
    #validarHoras(){
        return this.#horasNormales >= 0 && this.#horasExtras >= 0;
    }
    // Método público
    mostrarEstado(){
        if(this.#validarHoras()){
            return "Horas registradas correctamente";
        }
        return "Horas inválidas";
    }
    // GETTERS
    getIdHoras(){
        return this.#idHoras;
    }
    getHorasNormales(){
        return this.#horasNormales;
    }
    getHorasExtras(){
        return this.#horasExtras;
    }
    getFecha(){
        return this.#fecha;
    }
    getEmpleado(){
        return this.#idEmpleado;
    }
    // SETTERS
    setHorasNormales(horas){
        if(typeof horas !== "number")
            throw new Error("Horas normales inválidas");
        this.#horasNormales = horas;
    }
    setHorasExtras(horas){
        if(typeof horas !== "number")
            throw new Error("Horas extras inválidas");
        this.#horasExtras = horas;
    }

    setFecha(fecha){
        if(typeof fecha !== "string")
            throw new Error("Fecha inválida");
        this.#fecha = fecha;
    }

    setEmpleado(empleado){
        if(!(empleado instanceof Empleado))
            throw new Error("Empleado inválido");
        this.#idEmpleado = empleado;
    }
}

class Permiso{
    #idPermiso;
    #motivo;
    #fechaInicio;
    #fechaFin;
    #idEmpleado;

    /**
     * Crea una instancia de Permiso.
     *
     * @param {number} id Identificador del permiso.
     * @param {string} motivo Motivo del permiso.
     * @param {string} inicio Fecha de inicio.
     * @param {string} fin Fecha de fin.
     * @param {Empleado} empleado Empleado asociado al permiso.
     */
    constructor(id, motivo, inicio, fin, empleado){

        if(typeof id !== "number")
            throw new Error("ID debe ser number");
        if(typeof motivo !== "string")
            throw new Error("Motivo debe ser string");
        if(typeof inicio !== "string")
            throw new Error("Fecha de inicio debe ser string");
        if(typeof fin !== "string")
            throw new Error("Fecha de fin debe ser string");
        if(!(empleado instanceof Empleado))
            throw new Error("Empleado debe ser una instancia de la clase Empleado");

        this.#idPermiso = id;
        this.#motivo = motivo;
        this.#fechaInicio = inicio;
        this.#fechaFin = fin;
        this.#idEmpleado = empleado;
    }
    // Método privado
    #validarMotivo(){
        return this.#motivo.trim() !== "";
    }
    // Método público
    mostrarEstado(){
        if(this.#validarMotivo()){
            return "Permiso válido";
        }
        return "Motivo inválido";
    }
    // GETTERS
    getIdPermiso(){
        return this.#idPermiso;
    }
    getMotivo(){
        return this.#motivo;
    }
    getFechaInicio(){
        return this.#fechaInicio;
    }
    getFechaFin(){
        return this.#fechaFin;
    }
    getEmpleado(){
        return this.#idEmpleado;
    }
    // SETTERS

    setMotivo(motivo){
        if(typeof motivo !== "string")
            throw new Error("Motivo inválido");
        this.#motivo = motivo;
    }

    setFechaInicio(fecha){
        if(typeof fecha !== "string")
            throw new Error("Fecha inválida");
        this.#fechaInicio = fecha;
    }

    setFechaFin(fecha){
        if(typeof fecha !== "string")
            throw new Error("Fecha inválida");
        this.#fechaFin = fecha;
    }
    setEmpleado(empleado){
        if(!(empleado instanceof Empleado))
            throw new Error("Empleado inválido");
        this.#idEmpleado = empleado;
    }
}

class Vacaciones{
    #idVacacion;
    #fechaInicio;
    #fechaFin;
    #idEmpleado;

    /**
     * Crea una instancia de Vacaciones.
     *
     * @param {number} id Identificador de las vacaciones.
     * @param {string} inicio Fecha de inicio.
     * @param {string} fin Fecha de fin.
     * @param {Empleado} empleado Empleado asociado a las vacaciones.
     */
    constructor(id, inicio, fin, empleado){

        if(typeof id !== "number")
            throw new Error("ID debe ser number");
        if(typeof inicio !== "string")
            throw new Error("Fecha de inicio debe ser string");
        if(typeof fin !== "string")
            throw new Error("Fecha de fin debe ser string");
        if(!(empleado instanceof Empleado))
            throw new Error("Empleado debe ser una instancia de la clase Empleado");

        this.#idVacacion = id;
        this.#fechaInicio = inicio;
        this.#fechaFin = fin;
        this.#idEmpleado = empleado;
    }

    // Método privado
    #validarFechas(){
        return this.#fechaInicio.trim() !== "" &&
               this.#fechaFin.trim() !== "";
    }
    // Método público
    mostrarEstado(){
        if(this.#validarFechas()){
            return "Vacaciones registradas correctamente";
        }
        return "Fechas inválidas";
    }
    // GETTERS
    getIdVacacion(){
        return this.#idVacacion;
    }
    getFechaInicio(){
        return this.#fechaInicio;
    }
    getFechaFin(){
        return this.#fechaFin;
    }
    getEmpleado(){
        return this.#idEmpleado;
    }
    // SETTERS

    setFechaInicio(fecha){
        if(typeof fecha !== "string")
            throw new Error("Fecha inválida");
        this.#fechaInicio = fecha;
    }
    setFechaFin(fecha){
        if(typeof fecha !== "string")
            throw new Error("Fecha inválida");
        this.#fechaFin = fecha;
    }
    setEmpleado(empleado){
        if(!(empleado instanceof Empleado))
            throw new Error("Empleado inválido");
        this.#idEmpleado = empleado;
    }
}

class Feriado{
    #idFeriado;
    #fecha;
    #descripcion;

    /**
     * Crea una instancia de Feriado.
     *
     * @param {number} id Identificador del feriado.
     * @param {string} fecha Fecha del feriado.
     * @param {string} descripcion Descripción del feriado.
     */
    constructor(id, fecha, descripcion){

        if(typeof id !== "number")
            throw new Error("ID debe ser number");
        if(typeof fecha !== "string")
            throw new Error("Fecha debe ser string");
        if(typeof descripcion !== "string")
            throw new Error("Descripción debe ser string");

        this.#idFeriado = id;
        this.#fecha = fecha;
        this.#descripcion = descripcion;
    }
    // Método privado
    #validarDescripcion(){
        return this.#descripcion.trim() !== "";
    }
    // Método público
    mostrarEstado(){
        if(this.#validarDescripcion()){
            return "Feriado válido";
        }
        return "Descripción inválida";
    }
    // GETTERS
    getIdFeriado(){
        return this.#idFeriado;
    }
    getFecha(){
        return this.#fecha;
    }
    getDescripcion(){
        return this.#descripcion;
    }
    // SETTERS
    setFecha(fecha){
        if(typeof fecha !== "string")
            throw new Error("Fecha inválida");
        this.#fecha = fecha;
    }
    setDescripcion(descripcion){
        if(typeof descripcion !== "string")
            throw new Error("Descripción inválida");
        this.#descripcion = descripcion;
    }
}

class Pago{
    #idPago;
    #monto;
    #fechaPago;
    #idEmpleado;

    /**
     * Crea una instancia de Pago.
     *
     * @param {number} id Identificador del pago.
     * @param {number} monto Monto del pago.
     * @param {string} fecha Fecha del pago.
     * @param {Empleado} empleado Empleado asociado al pago.
     */
    constructor(id, monto, fecha, empleado){
        if(typeof id !== "number")
            throw new Error("ID debe ser number");
        if(typeof monto !== "number")
            throw new Error("Monto debe ser number");
        if(typeof fecha !== "string")
            throw new Error("Fecha debe ser string");
        if(!(empleado instanceof Empleado))
            throw new Error("Empleado debe ser una instancia de la clase Empleado");

        this.#idPago = id;
        this.#monto = monto;
        this.#fechaPago = fecha;
        this.#idEmpleado = empleado;
    }
    // Método privado
    #validarMonto(){
        return this.#monto > 0;
    }
    // Método público
    mostrarEstado(){
        if(this.#validarMonto()){
            return "Pago válido - S/ " + this.#monto;
        }
        return "Monto inválido";
    }
    // GETTERS
    getIdPago(){
        return this.#idPago;
    }
    getMonto(){
        return this.#monto;
    }
    getFechaPago(){
        return this.#fechaPago;
    }
    getEmpleado(){
        return this.#idEmpleado;
    }
    // SETTERS
    setMonto(monto){
        if(typeof monto !== "number")
            throw new Error("Monto inválido");
        this.#monto = monto;
    }
    setFechaPago(fecha){
        if(typeof fecha !== "string")
            throw new Error("Fecha inválida");
        this.#fechaPago = fecha;
    }
    setEmpleado(empleado){

        if(!(empleado instanceof Empleado))
            throw new Error("Empleado inválido");
        this.#idEmpleado = empleado;
    }
}

class Reporte{
    #idReporte;
    #fecha;
    #tipo;
    #idJefe;

    /**
     * Crea una instancia de Reporte.
     *
     * @param {number} id Identificador del reporte.
     * @param {string} fecha Fecha del reporte.
     * @param {string} tipo Tipo de reporte.
     * @param {Jefe} jefe Jefe asociado al reporte.
     */
    constructor(id, fecha, tipo, jefe){ 
        if(typeof id !== "number")
            throw new Error("ID debe ser number");
        if(typeof fecha !== "string")
            throw new Error("Fecha debe ser string");
        if(typeof tipo !== "string")
            throw new Error("Tipo debe ser string");
        if(!(jefe instanceof Jefe))
            throw new Error("Jefe debe ser una instancia de la clase Jefe");

        this.#idReporte = id;
        this.#fecha = fecha;
        this.#tipo = tipo;
        this.#idJefe = jefe;
    }

    // Método privado
    #validarTipo(){
        return this.#tipo.trim() !== "";
    }
    // Método público
    mostrarEstado(){
        if(this.#validarTipo()){
            return "Reporte válido - " + this.#tipo;
        }
        return "Tipo de reporte inválido";
    }
    // GETTERS
    getIdReporte(){
        return this.#idReporte;
    }
    getFecha(){
        return this.#fecha;
    }
    getTipo(){
        return this.#tipo;
    }
    getJefe(){
        return this.#idJefe;
    }
    // SETTERS
    setFecha(fecha){
        if(typeof fecha !== "string")
            throw new Error("Fecha inválida");
        this.#fecha = fecha;
    }
    setTipo(tipo){
        if(typeof tipo !== "string")
            throw new Error("Tipo inválido");
        this.#tipo = tipo;
    }
    setJefe(jefe){
        if(!(jefe instanceof Jefe))
            throw new Error("Jefe inválido");
        this.#idJefe = jefe;
    }
}

// usando el new
let sector1 = new Sector(
    1,
    "Sistemas",
    "Area de tecnologia."
)

let empleado1= new Empleado(
    101,
    "Jose",
    "Mendoza",
    19,
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