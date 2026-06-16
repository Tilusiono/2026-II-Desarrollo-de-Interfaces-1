let pagoConfirmado = true;

if (pagoConfirmado) {
    console.log("Credenciales de la cuenta enviadas al cliente.");
} else {
    console.log("Esperando confirmación de pago para entregar el perfil.");
}






let tieneTPM2 = false;

if (tieneTPM2) {
    console.log("El equipo es compatible. Iniciando instalación de Windows 11.");
} else {
    console.log("Equipo no compatible con W11. Se procederá a instalar Windows 10.");
}






let diasRestantesLicencia = 0;

if (diasRestantesLicencia > 0) {
    console.log("El software se encuentra activado y listo para usarse.");
} else {
    console.log("La licencia ha expirado. Se requiere una nueva activación.");
}







let horaActual = 14; // Formato de 24 horas (2 PM)

if (horaActual >= 9 && horaActual <= 18) {
    console.log("Soporte técnico Master disponible. ¿En qué te ayudo?");
} else {
    console.log("Fuera de horario. Deja tu mensaje y te contactaremos pronto.");
}





let perfilesDisponibles = 2;

if (perfilesDisponibles > 0) {
    console.log("Pantalla disponible. Procediendo con la venta.");
} else {
    console.log("Sin stock en esta cuenta. Revisar disponibilidad en otro correo.");
}






let mesesRenovados = 4;

if (mesesRenovados >= 3) {
    console.log("Cliente frecuente: Se ha aplicado un descuento en su renovación.");
} else {
    console.log("Precio normal de lista aplicado a la mensualidad.");
}



let tokenUsuario = "auth_abc123_xyz";

if (tokenUsuario !== "") {
    console.log("Acceso concedido al panel de administración y base de datos.");
} else {
    console.log("Error de seguridad: Acceso denegado. Inicie sesión nuevamente.");
}