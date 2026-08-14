// --- UTILIDADES GLOBALES ---
async function api(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Ocurrió un error en la solicitud');
  }

  return data;
}

function mostrarMensaje(texto, tipo = 'success') {
  const elemento = document.getElementById('mensaje');
  if (!elemento) return;

  elemento.textContent = texto;
  elemento.className = `mensaje ${tipo}`;

  setTimeout(() => {
    elemento.textContent = '';
    elemento.className = 'mensaje';
  }, 3500);
}

function escapeHtml(valor) {
  return String(valor ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}


// ==========================================
// LÓGICA GENERAL SEGÚN LA PÁGINA ACTUAL
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

  // 1. Productos
  const tablaProductos = document.getElementById('tablaProductos');

  if (tablaProductos) {
    cargarProductos();

    const formProducto = document.getElementById('formProducto');

    if (formProducto) {
      formProducto.addEventListener('submit', crearProducto);
    }
  }


  // 2. Clientes
  const tablaClientes = document.getElementById('tablaClientes');

  if (tablaClientes) {
    cargarClientes();

    const formCliente = document.getElementById('formCliente');

    if (formCliente) {
      formCliente.addEventListener('submit', crearCliente);
    }
  }


  // 3. Ventas
  const tablaVentas = document.getElementById('tablaVentas');

  if (tablaVentas || document.getElementById('id_cliente')) {
    cargarVentas();

    const formVenta =
      document.getElementById('formVenta') ||
      document.getElementById('ventaForm');

    if (formVenta) {
      formVenta.addEventListener('submit', crearVenta);
    }
  }

});


// ==========================================
// MÓDULO 1: PRODUCTOS
// ==========================================

const API_PRODUCTOS = 'http://localhost:3000/api/productos';

async function cargarProductos() {

  try {

    const productos = await api(API_PRODUCTOS);

    const tablaProductos =
      document.getElementById('tablaProductos');

    if (!tablaProductos) return;

    tablaProductos.innerHTML = '';

    productos.forEach(producto => {

      const fila = document.createElement('tr');

      fila.innerHTML = `
        <td>#${escapeHtml(producto.id_producto)}</td>

        <td>
          <strong>
            ${escapeHtml(producto.nombre)}
          </strong>
        </td>

        <td>
          ${escapeHtml(producto.categoria || 'N/A')}
        </td>

        <td>
          S/ ${escapeHtml(producto.precio)}
        </td>

        <td>
          ${escapeHtml(producto.stock)}
        </td>

        <td>
          <span class="badge ${
            producto.stock > 0
              ? 'available'
              : 'unavailable'
          }">
            ${
              producto.stock > 0
                ? 'Disponible'
                : 'Agotado'
            }
          </span>
        </td>

        <td>
          <div class="table-actions">

            <button
              onclick="eliminarProducto(${producto.id_producto})"
              class="danger">
              Eliminar
            </button>

          </div>
        </td>
      `;

      tablaProductos.appendChild(fila);

    });

  } catch (error) {

    mostrarMensaje(error.message, 'error');

  }

}


async function crearProducto(e) {

  e.preventDefault();

  const nuevoProducto = {

    nombre:
      document.getElementById('nombre_producto').value,

    categoria:
      document.getElementById('categoria').value,

    precio:
      document.getElementById('precio').value,

    stock:
      document.getElementById('stock').value

  };

  try {

    await api(API_PRODUCTOS, {

      method: 'POST',

      body: JSON.stringify(nuevoProducto)

    });

    e.target.reset();

    mostrarMensaje(
      '¡Producto registrado con éxito en SQL!',
      'success'
    );

    cargarProductos();

  } catch (error) {

    mostrarMensaje(error.message, 'error');

  }

}


async function eliminarProducto(id) {

  if (!confirm(
    '¿Estás seguro de eliminar este producto?'
  )) return;

  try {

    await api(
      `${API_PRODUCTOS}/${id}`,
      { method: 'DELETE' }
    );

    mostrarMensaje(
      'Producto eliminado correctamente',
      'success'
    );

    cargarProductos();

  } catch (error) {

    mostrarMensaje(error.message, 'error');

  }

}


// ==========================================
// MÓDULO 2: CLIENTES
// ==========================================

const API_CLIENTES =
  'http://localhost:3000/api/clientes';


async function cargarClientes() {

  try {

    const clientes = await api(API_CLIENTES);

    const tablaClientes =
      document.getElementById('tablaClientes');

    if (!tablaClientes) return;

    tablaClientes.innerHTML = '';

    clientes.forEach(cliente => {

      const fila =
        document.createElement('tr');

      fila.innerHTML = `

        <td>
          #${escapeHtml(cliente.id_cliente)}
        </td>

        <td>
          <strong>
            ${escapeHtml(cliente.nombre)}
          </strong>
        </td>

        <td>
          ${escapeHtml(cliente.dni || 'N/A')}
        </td>

        <td>
          ${escapeHtml(cliente.telefono || 'N/A')}
        </td>

        <td>
          ${escapeHtml(cliente.correo || 'N/A')}
        </td>

        <td>

          <div class="table-actions">

            <button
              onclick="eliminarCliente(${cliente.id_cliente})"
              class="danger">

              Eliminar

            </button>

          </div>

        </td>

      `;

      tablaClientes.appendChild(fila);

    });

  } catch (error) {

    mostrarMensaje(error.message, 'error');

  }

}


async function crearCliente(e) {

  e.preventDefault();

  const nuevoCliente = {

    nombre:
      document.getElementById('nombre_cliente').value,

    dni:
      document.getElementById('dni').value,

    telefono:
      document.getElementById('telefono').value,

    correo:
      document.getElementById('correo').value

  };


  try {

    await api(API_CLIENTES, {

      method: 'POST',

      body: JSON.stringify(nuevoCliente)

    });

    e.target.reset();

    mostrarMensaje(
      '¡Cliente registrado con éxito en SQL!',
      'success'
    );

    cargarClientes();

  } catch (error) {

    mostrarMensaje(error.message, 'error');

  }

}


async function eliminarCliente(id) {

  if (!confirm(
    '¿Estás seguro de eliminar este cliente?'
  )) return;

  try {

    await api(
      `${API_CLIENTES}/${id}`,
      { method: 'DELETE' }
    );

    mostrarMensaje(
      'Cliente eliminado correctamente',
      'success'
    );

    cargarClientes();

  } catch (error) {

    mostrarMensaje(error.message, 'error');

  }

}


// ==========================================
// MÓDULO 3: VENTAS
// ==========================================

const API_VENTAS =
  'http://localhost:3000/api/ventas';


async function cargarVentas() {

  try {

    const [
      clientes,
      productos,
      ventas
    ] = await Promise.all([

      api(API_CLIENTES).catch(() => []),

      api(API_PRODUCTOS).catch(() => []),

      api(API_VENTAS).catch(() => [])

    ]);


    // -------------------------------
    // Rellenar select de clientes
    // -------------------------------

    const selectCliente =
      document.getElementById('id_cliente');


    if (
      selectCliente &&
      Array.isArray(clientes)
    ) {

      selectCliente.innerHTML =
        '<option value="">Seleccione un cliente</option>' +

        clientes.map(cliente => `

          <option value="${cliente.id_cliente}">

            ${escapeHtml(cliente.nombre)}

          </option>

        `).join('');

    }


    // -------------------------------
    // Rellenar select de productos
    // -------------------------------

    const selectProducto =
      document.getElementById('id_producto');


    if (
      selectProducto &&
      Array.isArray(productos)
    ) {

      selectProducto.innerHTML =
        '<option value="">Seleccione un producto</option>' +

        productos
          .filter(producto => producto.stock > 0)
          .map(producto => `

            <option
              value="${producto.id_producto}">

              ${escapeHtml(producto.nombre)}
              - S/${escapeHtml(producto.precio)}

            </option>

          `)
          .join('');

    }


    // -------------------------------
    // Mostrar ventas
    // -------------------------------

    const tablaVentas =
      document.getElementById('tablaVentas');


    if (
      tablaVentas &&
      Array.isArray(ventas)
    ) {

      tablaVentas.innerHTML = '';

      ventas.forEach(venta => {

        const fila =
          document.createElement('tr');


        fila.innerHTML = `

          <td>
            #${escapeHtml(
              venta.id_venta ||
              venta.id
            )}
          </td>

          <td>

            <strong>
              ${escapeHtml(
                venta.cliente || 'N/A'
              )}
            </strong>

          </td>

          <td>

            ${escapeHtml(
              venta.producto || 'N/A'
            )}

          </td>

          <td>

            ${escapeHtml(
              venta.cantidad || 0
            )}

          </td>

          <td>

            S/ ${escapeHtml(
              venta.total || 0
            )}

          </td>

          <td>

            <span class="badge available">

              ${escapeHtml(
                venta.estado || 'REGISTRADA'
              )}

            </span>

          </td>

          <td>

            <div class="table-actions">

              <button

                onclick="eliminarVenta(${
                  venta.id_venta ||
                  venta.id
                })"

                class="danger">

                Eliminar

              </button>

            </div>

          </td>

        `;

        tablaVentas.appendChild(fila);

      });

    }


  } catch (error) {

    mostrarMensaje(
      error.message,
      'error'
    );

  }

}


// ==========================================
// CREAR VENTA
// ==========================================

async function crearVenta(e) {

  e.preventDefault();


  const nuevaVenta = {

    id_cliente:
      document.getElementById('id_cliente').value,

    id_producto:
      document.getElementById('id_producto').value,

    cantidad:
      document.getElementById('cantidad').value

  };


  try {

    await api(API_VENTAS, {

      method: 'POST',

      body: JSON.stringify(nuevaVenta)

    });


    e.target.reset();


    mostrarMensaje(
      '¡Venta registrada con éxito en SQL!',
      'success'
    );


    cargarVentas();

    // Actualizar productos porque cambia el stock
    cargarProductos();


  } catch (error) {

    mostrarMensaje(
      error.message,
      'error'
    );

  }

}


// ==========================================
// ELIMINAR VENTA
// ==========================================

async function eliminarVenta(id) {

  if (!confirm(
    '¿Estás seguro de eliminar esta venta?'
  )) return;


  try {

    await api(
      `${API_VENTAS}/${id}`,
      {
        method: 'DELETE'
      }
    );


    mostrarMensaje(
      'Venta eliminada correctamente',
      'success'
    );


    cargarVentas();

    cargarProductos();


  } catch (error) {

    mostrarMensaje(
      error.message,
      'error'
    );

  }

}