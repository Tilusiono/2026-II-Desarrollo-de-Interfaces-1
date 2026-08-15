const API = "http://localhost:3000/api";


// ================================
// CAMBIAR DE SECCIÓN
// ================================

function mostrarSeccion(nombre) {

    const secciones =
        document.querySelectorAll(".seccion");

    secciones.forEach(seccion => {
        seccion.classList.remove("activa");
    });


    const seleccionada =
        document.getElementById(nombre);

    if (seleccionada) {
        seleccionada.classList.add("activa");
    }


    // Cargar información automáticamente

    if (nombre === "productos") {
        cargarProductos();
    }

    if (nombre === "clientes") {
        cargarClientes();
    }

    if (nombre === "ventas") {
        cargarVentas();
    }
}


// ================================
// PRODUCTOS
// ================================

async function cargarProductos() {

    const contenedor =
        document.getElementById("listaProductos");

    contenedor.innerHTML =
        "<p>Cargando productos...</p>";


    try {

        const respuesta =
            await fetch(`${API}/productos`);

        const productos =
            await respuesta.json();


        if (productos.length === 0) {

            contenedor.innerHTML =
                "<p>No hay productos registrados.</p>";

            return;
        }


        contenedor.innerHTML = "";


        productos.forEach(producto => {

            const tarjeta =
                document.createElement("div");

            tarjeta.className = "producto";


            tarjeta.innerHTML = `
                <h3>
                    ${producto.nombreProducto}
                </h3>

                <p>
                    ${producto.descripcion || "Sin descripción"}
                </p>

                <p class="precio">
                    S/ ${Number(producto.precio).toFixed(2)}
                </p>

                <p>
                    <strong>Categoría:</strong>
                    ${producto.nombreCategoria}
                </p>

                <p class="stock">
                    Stock disponible:
                    ${producto.stock}
                </p>
            `;


            contenedor.appendChild(tarjeta);

        });


    } catch (error) {

        console.error(error);

        contenedor.innerHTML = `
            <p>
                ❌ No se pudo conectar con el servidor.
            </p>
        `;
    }
}


// ================================
// CLIENTES
// ================================

async function cargarClientes() {

    const contenedor =
        document.getElementById("listaClientes");


    contenedor.innerHTML =
        "<p>Cargando clientes...</p>";


    try {

        const respuesta =
            await fetch(`${API}/clientes`);

        const clientes =
            await respuesta.json();


        if (clientes.length === 0) {

            contenedor.innerHTML =
                "<p>No hay clientes registrados.</p>";

            return;
        }


        let html = `
            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                    </tr>

                </thead>

                <tbody>
        `;


        clientes.forEach(cliente => {

            html += `
                <tr>

                    <td>
                        ${cliente.idCliente}
                    </td>

                    <td>
                        ${cliente.nombreCliente}
                    </td>

                    <td>
                        ${cliente.apellidoCliente}
                    </td>

                    <td>
                        ${cliente.telefono || "-"}
                    </td>

                    <td>
                        ${cliente.email || "-"}
                    </td>

                </tr>
            `;

        });


        html += `
                </tbody>
            </table>
        `;


        contenedor.innerHTML = html;


    } catch (error) {

        console.error(error);

        contenedor.innerHTML = `
            <p>
                ❌ Error al cargar los clientes.
            </p>
        `;
    }
}


// ================================
// VENTAS
// ================================

async function cargarVentas() {

    const contenedor =
        document.getElementById("listaVentas");


    contenedor.innerHTML =
        "<p>Cargando ventas...</p>";


    try {

        const respuesta =
            await fetch(`${API}/ventas`);

        const ventas =
            await respuesta.json();


        if (ventas.length === 0) {

            contenedor.innerHTML =
                "<p>No hay ventas registradas.</p>";

            return;
        }


        let html = `
            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Empleado</th>
                        <th>Total</th>
                    </tr>

                </thead>

                <tbody>
        `;


        ventas.forEach(venta => {

            html += `
                <tr>

                    <td>
                        ${venta.idVenta}
                    </td>

                    <td>
                        ${venta.fechaVenta}
                    </td>

                    <td>
                        ${venta.cliente}
                    </td>

                    <td>
                        ${venta.empleado}
                    </td>

                    <td>
                        S/ ${Number(venta.total).toFixed(2)}
                    </td>

                </tr>
            `;

        });


        html += `
                </tbody>
            </table>
        `;


        contenedor.innerHTML = html;


    } catch (error) {

        console.error(error);

        contenedor.innerHTML = `
            <p>
                ❌ Error al cargar las ventas.
            </p>
        `;
    }
}