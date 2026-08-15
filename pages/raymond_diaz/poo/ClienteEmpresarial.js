class ClienteEmpresarial extends Cliente {
    #ruc; #razonSocial;
    rubro; contactoEmpresa;

    constructor({ id, nombre, apellido, edad, telefono, fechaNacimiento, codigoCliente, correo, direccion, ruc, razonSocial, rubro, contactoEmpresa }) {
        super({ id, nombre, apellido, edad, telefono, fechaNacimiento, codigoCliente, correo, direccion, tipoCliente: "Cliente Empresarial" });

        if (typeof ruc !== "string" || ruc.trim() === "") throw new TypeError("RUC obligatorio");
        if (typeof razonSocial !== "string" || razonSocial.trim() === "") throw new TypeError("Razón social obligatoria");
        if (typeof rubro !== "string" || rubro.trim() === "") throw new TypeError("Rubro obligatorio");
        if (typeof contactoEmpresa !== "string" || !contactoEmpresa.includes("@")) throw new TypeError("Contacto inválido");

        this.#ruc = ruc;
        this.#razonSocial = razonSocial;
        this.rubro = rubro;
        this.contactoEmpresa = contactoEmpresa;
    }

    #validarRuc() { return this.#ruc.length === 11; }
    #obtenerRazonSocial() { return this.#razonSocial.toUpperCase(); }

    mostrarDatos() {
        return `Cliente Empresarial<br>${this.mostrarDatosCliente()}<br>Razón social: ${this.#obtenerRazonSocial()}<br>RUC válido: ${this.#validarRuc()}<br>Rubro: ${this.rubro}<br>Contacto: ${this.contactoEmpresa}`;
    }
}
