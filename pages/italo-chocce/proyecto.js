/** Proyecto Casino Las Perlitas De Barcena */

class usuario {
    
    #correo_electronico;//privado
    #telefono;//privado
    #edad_usuario;//privado
    id_usuario;//publico
    nombre;//publico

    constructor(id_usuario, nombre, edad, correo_electronico, telefono) {
        if (edad < 18) {
            throw new Error("El usuario debe ser mayor de edad para registrarse en el casino.");
        }   
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.#edad_usuario = edad;
        this.#correo_electronico = correo_electronico;
        this.#telefono = telefono
        console.log("Usuario registrado exitosamente.");
    }

    // --- GETTERS Y SETTERS ---
    get correo_electronico() {
        return this.#correo_electronico;
    }

    set correo_electronico(nuevoCorreo) {
        if (this.#validarFormatoCorreo(nuevoCorreo)) {
            this.#correo_electronico = nuevoCorreo;
            console.log("Correo actualizado correctamente.");
        } else {
            console.log("Error: Correo no válido.");
        }
    }

    get telefono() {
        return this.#telefono;
    }

    set telefono(nuevoTelefono) {
        this.#telefono = nuevoTelefono;
    }

    get edad_usuario() {
        return this.#edad_usuario;
    }

    //metodo publico
    mostrar_telefono(){
        return `Teléfono de contacto: ${this.#telefono}`
    }

    actualizarCorreo(nuevoCorreo) {
        if (this.#validarFormatoCorreo(nuevoCorreo)) {
            this.#correo_electronico = nuevoCorreo;
            console.log("Correo actualizado correctamente.");
        } else {
            console.log("Error: Correo no válido.");
        }
    }

    //metodo privado
    #validarFormatoCorreo(correo) {
        return correo.includes("@") && correo.includes(".");
    }

    // 2. 
    #SEÑOR() {
        return this.#edad_usuario >= 70;
    }
}


class Billetera_virtual extends usuario {
    metodo_pago; 
    #saldo;
    #pin_seguridad;
    limite_diario;

    constructor(id_usuario, correo_electronico, nombre, telefono, saldo, metodo_pago, pin123, limite_diario) {
        super(nombre, correo_electronico, id_usuario, 18, telefono); // 
        this.#saldo = saldo;
        this.metodo_pago = metodo_pago;
        this.limite_diario = 1000;
        this.#pin_seguridad = pin123;
    }

    // --- GETTERS Y SETTERS ---
    get saldo() {
        return this.#saldo;
    }

    set pin_seguridad(nuevoPin) {
        this.#pin_seguridad = nuevoPin;
    }

    // --- MÉTODOS PÚBLICOS ---
    consultar_saldo() {
        return `Este es tu saldo actual: ${this.#saldo}`;
    }
    
    depositar(cantidad) {
        if (cantidad > 0) {
            this.#saldo += cantidad;
            console.log("Cantidad Recibida Exitosamente");
        }
    }

    retirar(cantidad, pin123) {
        if (this.#validar_pin(pin123)) {
            if (cantidad <= this.#saldo && cantidad <= this.limite_diario) {
                this.#saldo -= cantidad;
                console.log("Retiro exitoso");
            } else {
                console.log("Error: Fondos Insuficientes o excedes el limite diario colegita");
            }
        } else {
            console.log("PIN incorrecto");
        }
    }

    // MÉTODOS PRIVADOS 
    #validar_pin(pin123) {
        return this.#pin_seguridad == pin123;
    }
}


class Cuenta_virtual extends Billetera_virtual {
    // 4 Variables
    tipo_cuenta;        // Pública
    nivel_cuenta;       // Pública
    #fecha_registro;    // Privada
    #estado_verificacion;// Privada

    constructor(id_usuario, correo, nombre, telefono, saldo, pin, tipo, nivel) {
        super(id_usuario, correo, nombre, telefono, saldo, pin);
        this.tipo_cuenta = tipo;
        this.nivel_cuenta = nivel;
        this.#fecha_registro = new Date().toLocaleDateString();
        this.#estado_verificacion = false; 
    }

    // --- GETTERS Y SETTERS ---
    get fecha_registro() {
        return this.#fecha_registro;
    }

    get estado_verificacion() {
        return this.#estado_verificacion;
    }

    set estado_verificacion(nuevoEstado) {
        this.#estado_verificacion = nuevoEstado;
    }

    //metodos publicos
    ver_nivel(){
        this.nivel_cuenta++;
        console.log(`!Felicidade Subistes de Nivel¡: ${this.nivel_cuenta}`)
    }

    ver_cuenta(){
        return `${this.tipo_cuenta} | ${this.nivel_cuenta}`
    }

    #validar_cuenta(documentos){
        if(documento != null) {
            this.#estado_verificacion = true;
            return "Se Verifico correctamente";
        }
        return "Falta varios documentos, subelos"
    }
    
    #getAntiguedad(){
        return ` Registrado desde ${this.#fecha_registro}`
    }
}


class recepcionista {
    #salario
    id_empleado;
    nombre_empleado;
    turno;

    constructor(id_empleado, nombre_empleado, turno,) {
        this.id_empleado = id_empleado;
        this.nombre_empleado = nombre_empleado;
        this.turno = turno;
        this.#salario = 2000;
    }

    // --- GETTERS Y SETTERS ---
    get salario() {
        return this.#salario;
    }

    set salario(nuevoSalario) {
        if (nuevoSalario > 0) {
            this.#salario = nuevoSalario;
        }
    }

    //metodos publicos
    info_rapida(){
        return `${this.nombre_empleado} | ${this.id_empleado} | ${this.turno}`
    }

    //metodos privados
    meta(meta){
        if (meta > 100) 
            return this.#salario * 0.10;
        return 0;
    }
}


class Fichas {
    #id_usuario;//VALOR PRIVADO
    cantidad_fichas;//VALOR PUBLICO
    #fecha_adquision;//VALOR PRIVADO
    valor_ficha;//VALOR Publico

    Constructor(id_usuario, cantidad_fichas,valor_ficha,fecha_adquisicion) {
        this.#id_usuario = id_usuario;
        this.cantidad_fichas = cantidad_fichas;
        this.valor_ficha = valor_ficha;
        this.#fecha_adquisicion = fecha_adquisicion
    }

    // --- GETTERS Y SETTERS ---
    get id_usuario() {
        return this.#id_usuario;
    }

    get fecha_adquision() {
        return this.#fecha_adquision;
    }

    //metodo publico
    ficha(){
        return `Las fichas tienen un valor unitario ${this.valor_ficha}`
    }

    //metodos privados
    #getusuario(){
        return `Nuestro cliente es ${this.#id_usuario}`
    }
   
    #calcular_fichas(){
        return this.cantidad_fichas * this.valor_ficha;
    }
}


class Mesa {
    #id_mesa
    #usuariosJugando
    apuesta_maxima;
    apuesta_minima;
    juego;

    constructor(id_mesa, apuesta_maxima, apuesta_minima, juego) {
        this.#id_mesa = id_mesa;
        this.apuesta_maxima = "10.000";
        this.apuesta_minima = "0,10";
        this.juego = juego;
        this.#usuariosJugando = [];
    }

    // --- GETTERS Y SETTERS ---
    get id_mesa() {
        return this.#id_mesa;
    }

    get usuariosJugando() {
        return this.#usuariosJugando;
    }

    //metodo publico
    agregarJuagdor(usuario){
        if (this.#esMesaLlena())
            return "La mesa esta llena";
        this.#usuariosJugando.push(usuario);
        return "jugador añadido.";
    }

    verificarApuesra(monto){
        if(this.#validarApuesta(monto)) {
            return "Apuesta aceptada.";
        }
        return "Apuesta Fuera de limites.";
    }

    //metodo privado
    #mesallena(){
        return this.#usuariosJugando.length >=5; // limite de jugadores por mesa
    }

    #validarLasApuestas(monto){
       return monto >= this.apuesta_minima && monto <= this.apuesta_maxima 
    }
}


class apuesta {

    #id_usuario; 
    apuesta_realizada;
    prediccion;
    #estado; 

    constructor(id_usuario, apuesta_realizada, estado, prediccion) {
        this.#id_usuario = id_usuario; 
        this.apuesta_realizada = apuesta_realizada;
        this.#estado = estado; 
        this.prediccion = prediccion;
    }

    // --- GETTERS Y SETTERS ---
    get id_usuario() {
        return this.#id_usuario;
    }

    set id_usuario(nuevoId) {
        this.#id_usuario = nuevoId;
    }

    get estado() {
        return this.#estado;
    }

    set estado(nuevoEstado) {
        if (this.#validarEstado(nuevoEstado)) {
            this.#estado = nuevoEstado;
        } else {
            console.log("Error: Estado de apuesta no válido.");
        }
    }

    //metodo publica
    apuesta(){
        return `La prediccion de la ${this.prediccion}`
    }
    
    //metodo privado
    #validarEstado(estadoAValidar) {
        const estadosValidos = ["pendiente", "ganada", "perdida"];
        return estadosValidos.includes(estadoAValidar.toLowerCase());
    }
}


class Juez_mesa{
    #id_empleado
    #nombre_empleado
    mesa_asignada

    constructor(id_empleado, nombre_empleado, mesa_asignada) {
         this.id_empleado = id_empleado;
         this.nombre_empleado = nombre_empleado;
         this.mesa_asignada = mesa_asignada;
    }

    // --- GETTERS Y SETTERS ---
    get id_empleado() {
        return this.#id_empleado;
    }

    get nombre_empleado() {
        return this.#nombre_empleado;
    }

    //metodo publico
    JUEZ(){
        return`Hola Soy el Juez deL: ${this.mesa_asignada}`
    }

    //metodo privado
    #INFO_JUEZ(){
        return `${this.#id_empleado} | ${this.#nombre_empleado}`
    }
}


class partida {
    id_partida
    id_mesa
    #usuarios_participantes;

    constructor(id_partida, id_mesa, usuarios_participantes) {
        this.id_partida = id_partida;
        this.id_mesa = id_mesa;
        this.usuarios_participantes = "10"
    }

    // --- GETTERS Y SETTERS ---
    get usuarios_participantes() {
        return this.#usuarios_participantes;
    }

    //metodos publico
    encontar_mesa(){
        return `Puedes Encontrar La mesa: ${this.#id_mesa}`
    }

    identificar_usuario(){
        return `Los Usuarios son los siguientes: ${this.#usuarios_participantes}`
    }

    //metodos privados
    #validar_mesa(){
        return this.#usuarios_participantes.length >=2;
    }
}


class recompensa {
    #id_recompensa
    descripcion;

    constructor(id_recompensa, descripcion) {
        this.id_recompensa = id_recompensa;
        this.descripcion = descripcion;
    }

    // --- GETTERS Y SETTERS ---
    get id_recompensa() {
        return this.#id_recompensa;
    }

    //metodo publico
    ganar(){
        this.#reclamacion();
        return `¡Felicidades! Has ganado ${this.descripcion} `
    }

    //metodo privado
    #reclamo(){
       console.log(`Registrando la recompensa #${this.recompensa} en el sistema. `);    
    }
}
   

console.log(usuario)
console.log(recepcionista)
console.log(Billetera_virtual)
console.log(Cuenta_virtual)
console.log(Fichas)
console.log(Mesa)
console.log(apuesta)
console.log(Juez_mesa)
console.log(partida)
console.log(recompensa)







