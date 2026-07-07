// ==========================================
// 1. CLASE: Empleado
// ==========================================
class Empleado {
    // 1 Variable pública
    departamento; 
    // 3 Variables privadas
    #nombre;
    #salario;
    #numeroSeguro;

    constructor(departamento, nombre, salario, numeroSeguro) {
        this.departamento = departamento;
        this.#nombre = nombre;
        this.#salario = salario;
        this.#numeroSeguro = numeroSeguro;
    }

    // 2 Métodos privados
    #calcularBono() { return this.#salario * 0.10; }
    #generarID() { return `EMP-${this.#numeroSeguro.substring(0, 4)}`; }

    // 2 Métodos públicos
    mostrarInformacion() {
        console.log(`Departamento: ${this.departamento} | ID: ${this.#generarID()}`);
    }
    procesarSueldo() {
        return this.#salario + this.#calcularBono();
    }
}

// ==========================================
// 2. CLASE: Estudiante
// ==========================================
class Estudiante {
    carrera; 
    #nombre;
    #promedio;
    #matricula;

    constructor(carrera, nombre, promedio, matricula) {
        this.carrera = carrera;
        this.#nombre = nombre;
        this.#promedio = promedio;
        this.#matricula = matricula;
    }

    #validarBeca() { return this.#promedio >= 18; }
    #calcularCreditos() { return 22; }

    mostrarEstado() {
        const estadoBeca = this.#validarBeca() ? "Becado" : "Regular";
        console.log(`${this.#nombre} - ${estadoBeca}`);
    }
    matricularCiclo() {
        console.log(`Matriculando ${this.#calcularCreditos()} créditos en ${this.carrera}`);
    }
}

// ==========================================
// 3. CLASE: Vehiculo
// ==========================================
class Vehiculo {
    marca;
    #motor;
    #kilometraje;
    #chasis;

    constructor(marca, motor, kilometraje, chasis) {
        this.marca = marca;
        this.#motor = motor;
        this.#kilometraje = kilometraje;
        this.#chasis = chasis;
    }

    #revisarAceite() { return this.#kilometraje > 10000; }
    #diagnosticoInterno() { return "OK"; }

    encender() {
        console.log(`Encendiendo motor ${this.#motor} del ${this.marca}`);
    }
    realizarMantenimiento() {
        if (this.#revisarAceite()) {
            console.log(`Diagnóstico: ${this.#diagnosticoInterno()} - Requiere cambio de aceite.`);
        }
    }
}