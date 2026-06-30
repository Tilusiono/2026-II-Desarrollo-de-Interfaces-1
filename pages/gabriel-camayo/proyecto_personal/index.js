const tecladoGamer = new Periferico(1, "PER-001", "Teclado Razer", 350, 10, "USB-C", "Negro", true);
const procesador = new ComponentePC(2, "COMP-001", "Ryzen 7", 1200, 4, 105, "AM5", 4500);
const empleado = new EmpleadoTienda(3, "EMP-001", "Jose", "74859612", "999888777", 1500, "Vendedor", 12000);
const venta = new VentaTienda(4, "VEN-001", 350, "Tarjeta", "B001-01", 10, 3, "Lima Sur");

const ecosistema = [tecladoGamer, procesador, empleado, venta];

ecosistema.forEach(entidad => {
    console.log(entidad.obtenerDetalles()); 
});

console.log(tecladoGamer.probarIluminacion());
console.log(procesador.testearRendimiento("AM5"));
console.log(empleado.generarReportePago());
console.log(venta.generarGuiaRemision());