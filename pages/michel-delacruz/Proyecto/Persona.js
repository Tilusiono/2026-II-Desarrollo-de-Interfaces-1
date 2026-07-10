
// ---------
// PERSONA
// ---------


class Persona {
    constructor(nombre,apellido_paterno,apellido_materno,fecha_nacimineto) {
        this.#nombre = nombre;
        this.#apellido_paterno = apellido_paterno;
        this.apellido_materno = apellido_materno;
        this.fecha_nacimiento = fecha_nacimineto;
    }

    getNombre() {
        return this.nombre;
    }

    getApellidoPaterno() {
        return this.apellido_paterno;
    }

    getApellidoMaterno() {
        return this.apellido_materno;
    }

    getFechaNacimiento() {
        return this.fecha_nacimiento;
    }

    // 
    setNombre(nuevoNombre) {
        if (this.#validarNombre(nuevoNombre)) {
            this.nombre = this.#MayuculaNombre(nuevoNombre);
        }
    }

    //  privado
   #validarNombre(nombre) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre);
    }

    #validarApellidoPaterno(apellido_paterno) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido_paterno);
    }

    #validarApellidoMaterno(apellido_materno) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido_materno);
    }

    #validarFecha(fecha) {
    return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(fecha);
    }

    #MayuculaNombre(nombre) {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
    }

    

}





// WERHUBAJIGSDFKJSDG

// Productos
const cafe1 = new Bebida(1, "Cappuccino", 12, 20, true, "Grande", "Caliente");
const cafe2 = new Bebida(2, "Latte", 10, 15, true, "Mediano", "Caliente");
const cafe3 = new Bebida(3, "Americano", 8, 12, true, "Grande", "Caliente");
const postre1 = new Postre(4, "Cheesecake", 15, 10, true, "Mediano", "Fría");
const postre2 = new Postre(5, "Tarta de Manzana", 12, 8, true, "Mediano", "Fría");

// Cliente
const cliente1 = new Cliente("Carlos Ramírez", "carlos@email.com", "987654321", "Lima");

// Compra
const compra1 = new Compra(1, cliente1);
compra1.agregarProducto(cafe1);
compra1.agregarProducto(cafe2);
compra1.agregarProducto(cafe3);
compra1.agregarProducto(postre1);
compra1.agregarProducto(postre2);
// Asignar compra al cliente
cliente1.agregarCompra(compra1);

// for  k reorre uno por uno


// Pago
const pago1 = new Pago("Yape", compra1.total);
pago1.procesarPago();

// Inventario
const inventario = new Inventario();
inventario.agregarProducto(cafe1);
inventario.agregarProducto(cafe2);
inventario.agregarProducto(cafe3);
inventario.agregarProducto(postre1);
inventario.agregarProducto(postre2);

// Mostrar resultados
console.log(compra1);
console.log(cliente1.obtenerDatos());
console.log(pago1.obtenerInfo());
console.log(inventario.mostrarInventario());



