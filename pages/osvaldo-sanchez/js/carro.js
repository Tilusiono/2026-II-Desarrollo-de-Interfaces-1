class carro {

    marca;
    modelo;
    color;
    precio;

    #precio;
    #codigo;
    #motor;
    #chasis;

    contructor(marca, modelo, color, precio, codigo, motor, chasis) {
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        
        this.#precio = precio;
        this.#codigo = codigo;
        this.#motor = motor;
        this.#chasisi = chasis;
    }

    mostrarCarro() {
        console.log("Marca: " + this.marca);
    }

     #validarPrecio() {
        return this.#precio > 0;
    }

    #mostrarPlaca() {
        return this.#placa;
    }
}

// Clase hija 1
class Auto extends Carro {

    puertas;

    constructor(marca, modelo, color, año, puertas) {
        super(marca, modelo, color, año);
        this.puertas = puertas;
    }

    abrirPuertas() {
        console.log("El auto tiene " + this.puertas + " puertas.");
    }

    tocarBocina() {
        console.log("El auto tocó la bocina.");
    }

    estacionar() {
        console.log("El auto está estacionado.");
    }
}

// Clase hija 2
class Camioneta extends Carro {

    traccion;

    constructor(marca, modelo, color, año, traccion) {
        super(marca, modelo, color, año);
        this.traccion = traccion;
    }

    cargarEquipaje() {
        console.log("La camioneta está cargando equipaje.");
    }

    activarTraccion() {
        console.log("Tracción: " + this.traccion);
    }

    subirCerro() {
        console.log("La camioneta subió un cerro.");
    }
}

// Clase hija 3
class Camion extends Carro {

    cargaMaxima;

    constructor(marca, modelo, color, año, cargaMaxima) {
        super(marca, modelo, color, año);
        this.cargaMaxima = cargaMaxima;
    }

    transportarCarga() {
        console.log("El camión está transportando carga.");
    }

    descargar() {
        console.log("El camión descargó la mercancía.");
    }

    mostrarCarga() {
        console.log("Carga máxima: " + this.cargaMaxima + " toneladas.");
    }
}
