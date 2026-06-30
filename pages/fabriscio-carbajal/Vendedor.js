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

    registrarVenta(cliente, carrito, productosAlmacenados){
        let apellido = " " + cliente.getApellido();      
        if (cliente.getApellido() == "Sin apellido"){ // condicion si el cliente tiene un apellido indefinido
            apellido = "";
        }
        console.log(`Carrito del cliente ${cliente.getNombre()}${apellido}: \n`) // Imprime el nombre y apellido del vendedor

        let subtotal;
        let total = 0;
        const igv = 0.18;

        for (let i = 0; i < carrito.length; i++){ // recorre según el tamaño del carrito
            for (let j = 0; j < productosAlmacenados.length; j++) // busca segun el tamaño del total de productos almacenados
                if (carrito[i].id == productosAlmacenados[j].idProducto) { // condicion si la posicion del carrito coincide con un producto almacenado

                    subtotal = (productosAlmacenados[j].precio * carrito[i].cantidad); //crea un subtotal

                    total = total + subtotal;

                    productosAlmacenados[j].inventario - carrito[i].cantidad; // resta al inventario del producto

                    let pr = carrito[i].producto
                    pr = String(pr); 
                    console.log(pr.padEnd(30) + subtotal) // espacio a la izquierda para no descuadrar los precios
            }
        }
        console.log(`\nOP GRAVADA:    ${total}`);
        let totalIgv = total * igv;
        console.log(`IGV:           ${totalIgv}`);
        let totalFinal = total + totalIgv;
        console.log(`TOTAL:         ${totalFinal}`);
    }
}

export default Vendedor;