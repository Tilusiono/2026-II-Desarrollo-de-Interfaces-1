class Vendedor {
    #idVendedor;
    #nombre;
    #apellido_paterno;
    #dni;
    #telefono;
    #salario;
    
    /**
     * 
     * @param {number} id Identificador unico del vendedor.
     * @param {string} nom Nombre del vendodor.
     * @param {string} ape Apellido del vendedor.
     * @param {string} dni DNI del vendedor
     * @param {string} tel Numero de teléfono del vendedor.
     * @param {number} sal Salario del vendedor.
     */

    constructor(id, nom, ape, dni, tel, sal) {

        if (typeof id !== "number")
            throw new Error("El ID debe ser un número");
        if (typeof nom !== "string")
            throw new Error("El nombre debe ser una cadena de texto");
        if (typeof ape !== "string")
            throw new Error("El apellido debe ser una cadena de texto");
        if (typeof dni !== "string")
            throw new Error("El DNI debe ser una cadena de texto");
        if (typeof tel !== "string")
            throw new Error("El teléfono debe ser una cadena de texto");
        if (typeof sal !== "number")
            throw new Error("El salario debe ser un número")

        this.#idVendedor = id;
        this.#nombre = nom;
        this.#apellido_paterno = ape;
        this.#dni = dni;
        this.#telefono = tel;
        this.#salario = sal;
    }
}

