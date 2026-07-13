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

        let resultado = ""; // variable que almacenara los datos para imprimirlos en una boleta


        resultado += `PRODUCTO                      UDS.   P.U.  SUBTOTAL\n`
        resultado += `----------------------------------------------------\n`

        let subtotal;
        let total = 0;
        const igv = 0.18;

        for (let i = 0; i < carrito.length; i++){ // recorre según el tamaño del carrito
            for (let j = 0; j < productosAlmacenados.length; j++) // busca segun el tamaño del total de productos almacenados
                if (carrito[i].id == productosAlmacenados[j].idProducto) { // condicion si el id de la posicion del carrito coincide con el id deun producto almacenado

                    subtotal = (productosAlmacenados[j].precio * carrito[i].cantidad); //crea un subtotal

                    total = total + subtotal;

                    productosAlmacenados[j].inventario - carrito[i].cantidad; // resta al inventario del producto

                    let nom = carrito[i].producto; // Almacena el nombre del producto
                    let prUnd = productosAlmacenados[j].precio; // Almacena el precio por unidad del producto
                    let und = carrito[i].cantidad; // Almacena la cantidad de productos comprados

                    nom = String(nom);
                    und = String(und); 
                    prUnd = String(prUnd);

                    resultado += `${nom.padEnd(30)} ${und.padEnd(5)} ${prUnd.padEnd(8)}${subtotal}\n` // espacio a la izquierda para no descuadrar los precios
            }
        }
        resultado += `----------------------------------------------------`
        resultado += `\nOP GRAVADA:                 S/ ${total}`;
        let totalIgv = total * igv;
        resultado += `\nIGV (18%):                  S/ ${totalIgv}`;
        let totalFinal = total + totalIgv;
        resultado +=`\nTOTAL:                      S/ ${totalFinal}`;
        return resultado
    }
}

export default Vendedor;