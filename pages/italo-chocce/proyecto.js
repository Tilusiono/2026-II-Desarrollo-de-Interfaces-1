/**proyecto casino Las Perlitas De Barcena */

class usuario {
    
    #correo_electronico;//privado
    #telefono;//privado
    #edad_usuario;//privado
    id_usuario;//publico
    nombre;//publico
        Constructor(id_usuario, nombre, edad, correo_electronico, telefono) {
        
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
    constructor(id_usuario,correo_electronico,nombre,telefono,fondos_restantes,retirar_fondos,depositar_fondos) {
        super(nombre,correo_electronico,id_usuario)
        this.fondos_restantes = fondos_restantes;
        this.retirar_fondos = retirar_fondos;
        this.depositar_fondos = depositar_fondos;

    
}

}

class historial extends Billetera_virtual{ 

    constructor(id_usuario, transacciones, fecha_transaccion,monto_transaccion,tipo_transaccion,fondos_restantes,depositar_fondos,retirar_fondos) {

        super(fondos_restantes,retirar_fondos,depositar_fondos)
        this.id_usuario = id_usuario    
        this.transacciones = transacciones;
        this.fecha_transaccion =fecha_transaccion;
        this.monto_transaccion =monto_transaccion;
        this.tipo_transaccion =tipo_transaccion;
    }
}


class recepcionista {
    Constructor(id_empleado, nombre_empleado, turno) {
        this.id_empleado = id_empleado;
        this.nombre_empleado = nombre_empleado;
        this.turno = turno;
    }
    
}

class Fichas {
    id_usuario;//VALOR PUBLICO
    #cantidad_fichas;//VALOR PRIVADO
    #fecha_adquision;//VALOR PRIVADO
    valor_ficha;//VALOR Publico
    Constructor(id_usuario, cantidad_fichas,valor_ficha,fecha_adquisicion) {
        this.id_usuario = id_usuario;
        this.#cantidad_fichas = cantidad_fichas;
        this.valor_ficha = valor_ficha;
        this.#fecha_adquisicion = fecha_adquisicion
    }
}

class Mesa {
    constructor(id_mesa, apuesta_maxima, apuesta_minima, juego) {
        this.id_mesa = id_mesa;
        this.apuesta_maxima = apuesta_maxima;
        this.apuesta_minima = apuesta_minima;
        this.juego = juego;
        this.usuariosJugando = [];

}
 
}
class apuesta {
    constructor(id_usuario, apuesta_realizada, estado, prediccion) {
        this.id_usuario = id_usuario;
        this.apuesta_realizada = apuesta_realizada;
        this.estado = estado;
        this.prediccion = prediccion;
    }

}

class Juez_mesa{
    constructor(id_empleado, nombre_empleado, mesa_asignada) {
         this.id_empleado = id_empleado;
         this.nombre_empleado = nombre_empleado;
         this.mesa_asignada = mesa_asignada;

}

}

class partida {
    constructor(id_partida, id_mesa, usuarios_participantes) {
        this.id_partida = id_partida;
        this.id_mesa = id_mesa;
        this.usuarios_participantes = usuarios_participantes;
    }

}
    


class recompensa {
    constructor(id_recompensa, descripcion) {
        this.id_recompensa = id_recompensa;
        this.descripcion = descripcion;
    }
}
   

console.log(usuario)
console.log(recepcionista)
console.log(Billetera_virtual)
console.log(historial)
console.log(Fichas)
console.log(Mesa)
console.log(apuesta)
console.log(Juez_mesa)
console.log(partida)
console.log(recompensa)







