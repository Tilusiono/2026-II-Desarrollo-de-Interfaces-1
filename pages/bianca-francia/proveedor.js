export class Proveedor {

    nombreProveedor;

    #idProveedor;
    #telefono;
    #direccion;

    constructor(idProveedor, nombreProveedor, telefono, direccion) {

        this.nombreProveedor = nombreProveedor;
        this.#idProveedor = idProveedor;
        this.#telefono = telefono;
        this.#direccion = direccion;
    }

    mostrarProveedor() {
        console.log(this.nombreProveedor);
    }
}