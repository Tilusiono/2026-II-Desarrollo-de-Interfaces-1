/**proyecto casino Las Perlitas De Barcena */

class usuario {
    id;
    nombre;
    edad;
    corre_electronico;
    telefono;
}

class Billetera_virtual {
    fondos_restantes;
    retirar_fondos;
    depositar_fondos;
}

class historial {
    Ingresos_recibidos;
    Ingresos_Perdidos;
    cantidades_apostadas;
}

class Fichas {
    compra_fichas;
    cambiar_fichas;
}

class Mesa {
    id_mesa;
    apuesta_maxima;
    apuesta_minima;
    juego;
    usuariosJugando;
}

class apuesta {
    id_usuario;
    apuesta_realizada;
    estado;
    prediccion;

}

class Juez_mesa{
        id_empleado;
        nombre_empleado;
        mesa_asignada;

}
