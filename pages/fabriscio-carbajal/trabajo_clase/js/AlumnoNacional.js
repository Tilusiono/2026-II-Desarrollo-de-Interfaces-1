import Alumno from "./Alumno.js";
class AlumnoNacional extends Alumno {

    // Propiedades privadas
    #departamento;
    #codigoEstudiante;

    // Propiedades públicas
    sede;
    carreraTecnica;

    constructor(
        id,
        nombre,
        apellido,
        edad,
        telefono,
        fechaNacimiento,
        departamento,
        codigoEstudiante,
        sede,
        carreraTecnica
    ) {

        super(id, nombre, apellido, edad, telefono, fechaNacimiento);

        this.#departamento = departamento;
        this.#codigoEstudiante = codigoEstudiante;

        this.sede = sede;
        this.carreraTecnica = carreraTecnica;
    }

    // Métodos privados

    #validarCodigo() {
        return this.#codigoEstudiante.length >= 6;
    }

    #obtenerDepartamento() {
        return this.#departamento.toUpperCase();
    }

    // Métodos públicos

    mostrarDatos(grado) {
    return `Alumno Nacional
    Nombre: ${this.getNombre()}
    Departamento: ${this.#obtenerDepartamento()}
    Código válido: ${this.#validarCodigo()}
    Grado: ${grado}
    `;
    }

    cambiarSede(nuevaSede) {
        this.sede = nuevaSede;
    }
    registrarEntrada(fechaHora) {

        console.log(
            `${this.getNombre()} ingresó el ${fechaHora.toLocaleString()}`
        );

    }

    registrarSalida(fechaHora) {

        console.log(
            `${this.getNombre()} salió el ${fechaHora.toLocaleString()}`
        );

    }
}

export default AlumnoNacional;