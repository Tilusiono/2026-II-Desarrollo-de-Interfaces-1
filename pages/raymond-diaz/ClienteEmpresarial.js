// ClienteEmpresarial.js
// ClienteEmpresarial hereda de Persona.

class ClienteEmpresarial extends Persona {
    #ruc;
    #razonSocial;

    rubro;
    contactoEmpresa;

    constructor(
        id,
        nombre,
        apellido,
        edad,
        telefono,
        fechaNacimiento,
        ruc,
        razonSocial,
        rubro,
        contactoEmpresa
    ) {
        super({ id, nombre, apellido, edad, telefono, fechaNacimiento });

        this.#ruc = ruc;
        this.#razonSocial = razonSocial;

        this.rubro = rubro;
        this.contactoEmpresa = contactoEmpresa;
    }

    #validarRuc() {
        return this.#ruc.length === 11;
    }

    #obtenerRazonSocial() {
        return this.#razonSocial.toUpperCase();
    }

    mostrarDatos() {
        return `
            Cliente Empresarial<br>
            Representante: ${this.nombreCompleto}<br>
            Razón social: ${this.#obtenerRazonSocial()}<br>
            RUC válido: ${this.#validarRuc()}<br>
            Rubro: ${this.rubro}<br>
            Contacto: ${this.contactoEmpresa}
        `;
    }

    cambiarContacto(nuevoContacto) {
        this.contactoEmpresa = nuevoContacto;
    }

    registrarCompra(fechaHora) {
        console.log(`${this.#razonSocial} registró una compra empresarial (${fechaHora.toLocaleString()})`);
    }

    cancelarCompra(fechaHora) {
        console.log(`${this.#razonSocial} canceló una compra empresarial (${fechaHora.toLocaleString()})`);
    }
}
