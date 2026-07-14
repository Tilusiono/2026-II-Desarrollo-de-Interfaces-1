// ============================================
// ui.js - INTERFAZ DE USUARIO COMPLETA
// ============================================

import { productos } from './data/instancias.js';
import { carrito1, descuento1, cliente1, cliente2 } from './main.js';
import { compra } from './models/compra.js';

// ============================================
// VARIABLE GLOBAL
// ============================================

let clienteActual = cliente2;
let compraActual = new compra(clienteActual, carrito1, descuento1, new Date(), "Pendiente");
let modoOfertas = false;

const CANTIDADES_RAPIDAS = [1, 6, 12, 24];

// ============================================
// 1. RENDERIZAR PRODUCTOS
// ============================================

function renderizarProductos(termino = '') {
    const container = document.getElementById('productos-container');
    if (!container) {
        console.warn('No se encontró el contenedor de productos');
        return;
    }

    let filtrados = [...productos];

    // Filtrar por ofertas
    if (modoOfertas) {
        filtrados = filtrados.filter(p => p.enOferta === true);
    }

    // Filtrar por búsqueda
    const searchTerm = termino.toLowerCase().trim();
    if (searchTerm !== '') {
        filtrados = filtrados.filter(p =>
            p.nombre.toLowerCase().includes(searchTerm) ||
            p.marca.toLowerCase().includes(searchTerm) ||
            (p.color && p.color.toLowerCase().includes(searchTerm)) ||
            (p.materia && p.materia.toLowerCase().includes(searchTerm))
        );
    }

    const countSpan = document.getElementById('productos-count');
    if (countSpan) countSpan.textContent = `${filtrados.length} productos`;

    if (filtrados.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4>${modoOfertas ? 'No hay productos en oferta' : 'No se encontraron productos'}</h4>
                <p class="text-muted">${modoOfertas ? 'Vuelve pronto para más ofertas' : 'Intenta con otra búsqueda'}</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';

    filtrados.forEach(producto => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 col-xl-3 mb-4';

        let cantidadBtns = '';
        CANTIDADES_RAPIDAS.forEach(cant => {
            const label = cant === 1 ? '1' : cant === 6 ? '½ Doc' : cant === 12 ? '1 Doc' : '2 Doc';
            cantidadBtns += `
                <button class="btn-cantidad" data-id="${producto.id}" data-cantidad="${cant}">
                    ${label}
                </button>
            `;
        });

        const ofertaTag = producto.enOferta ?
            `<span class="oferta-tag"><i class="fas fa-tag"></i> OFERTA</span>` :
            '';

        const stockClass = producto.stock > 10 ? 'stock-disponible' : producto.stock > 0 ? 'stock-disponible' : 'stock-agotado';
        const stockText = producto.stock > 50 ? 'Disponible' : producto.stock > 10 ? 'Pocas unidades' : '¡Últimas unidades!';

        col.innerHTML = `
            <div class="card product-card">
                ${ofertaTag}
                <div class="card-body">
                    <p class="product-brand">${producto.marca}</p>
                    <h5 class="product-name">${producto.nombre}</h5>
                    <p class="product-desc">${producto.obtenerInfo()}</p>
                    <p class="product-color"><i class="fas fa-palette"></i> Color: ${producto.color || 'N/A'}</p>
                    <p class="product-stock ${stockClass}"><i class="fas fa-box"></i> ${stockText}</p>
                    <p class="product-price">S/ ${producto.precioUnitario}</p>
                    <p class="product-docena">Por docena: S/ ${producto.precioDocena}</p>

                    <div class="cantidad-selector">
                        <label>Cant:</label>
                        ${cantidadBtns}
                        <input type="number" class="cantidad-input" id="cant-input-${producto.id}" value="1" min="1" max="${producto.stock}" />
                    </div>

                    <button class="btn btn-primary w-100 mt-2 btn-agregar" data-id="${producto.id}">
                        <i class="fas fa-cart-plus me-1"></i> Agregar al carrito
                    </button>
                </div>
            </div>
        `;

        container.appendChild(col);
    });

    // Eventos de cantidad
    document.querySelectorAll('.btn-cantidad').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const cantidad = parseInt(this.dataset.cantidad);
            const input = document.getElementById(`cant-input-${id}`);
            if (input) input.value = cantidad;
            this.parentElement.querySelectorAll('.btn-cantidad').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Eventos de agregar
    document.querySelectorAll('.btn-agregar').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const producto = productos.find(p => p.id === id);
            if (!producto) return;

            const input = document.getElementById(`cant-input-${id}`);
            let cantidad = parseInt(input.value) || 1;
            if (cantidad < 1) cantidad = 1;
            if (cantidad > producto.stock) {
                mostrarNotificacion(`Solo hay ${producto.stock} unidades disponibles`, 'warning');
                cantidad = producto.stock;
            }

            agregarAlCarrito(producto, cantidad);
        });
    });
}

// ============================================
// 2. AGREGAR AL CARRITO
// ============================================

function agregarAlCarrito(producto, cantidad) {
    carrito1.agregarItem(producto, cantidad);
    actualizarCarrito();
    actualizarDropdown();
    const mensaje = cantidad === 1 ?
        `${producto.nombre} agregado al carrito` :
        `${cantidad} unidades de ${producto.nombre} agregadas`;
    mostrarNotificacion(mensaje);
}

// ============================================
// 3. ACTUALIZAR CARRITO
// ============================================

function actualizarCarrito() {
    const cartCount = document.getElementById('cart-count-badge');
    if (cartCount) {
        const totalItems = carrito1.items.reduce((sum, item) => sum + item.cantidad, 0);
        cartCount.textContent = totalItems;
    }

    const tipoClienteBadge = document.getElementById('tipo-cliente-badge');
    if (tipoClienteBadge) {
        const tipo = clienteActual.obtenerTipo();
        tipoClienteBadge.textContent = tipo === 'ClientePorDocena' ? 'Por Docena' : 'Unitario';
        tipoClienteBadge.className = `badge ${tipo === 'ClientePorDocena' ? 'bg-success' : 'bg-info'} text-dark`;
    }

    actualizarDropdown();
}

// ============================================
// 4. ACTUALIZAR DROPDOWN
// ============================================

function actualizarDropdown() {
    const body = document.getElementById('cart-dropdown-body');
    const subtotalSpan = document.getElementById('dropdown-subtotal');
    const totalSpan = document.getElementById('dropdown-total');
    const descuentoSpan = document.getElementById('dropdown-descuento');

    // Verificar que todos los elementos existan
    if (!body || !subtotalSpan || !totalSpan) {
        console.warn('Elementos del dropdown no encontrados');
        return;
    }

    if (carrito1.estaVacio()) {
        body.innerHTML = `
            <div class="text-center text-muted py-4">
                <i class="fas fa-cart-plus fa-3x mb-2"></i>
                <p>El carrito está vacío</p>
                <small>Agrega productos para comenzar</small>
            </div>
        `;
        subtotalSpan.textContent = '0.00';
        totalSpan.textContent = '0.00';
        if (descuentoSpan) descuentoSpan.textContent = '0.00';
        return;
    }

    let html = '';
    carrito1.items.forEach(item => {
        const subtotal = (item.producto.precioUnitario * item.cantidad).toFixed(2);
        html += `
            <div class="cart-dropdown-item">
                <div class="item-info">
                    <div class="item-name">${item.producto.nombre} <span class="badge bg-secondary">x${item.cantidad}</span></div>
                    <div class="item-detail">${item.producto.marca} - ${item.producto.color || 'N/A'}</div>
                </div>
                <div class="d-flex align-items-center">
                    <span class="item-price">S/ ${subtotal}</span>
                    <button class="btn-remove" onclick="window.eliminarItem(${item.producto.id})">
                        <i class="fas fa-times-circle"></i>
                    </button>
                </div>
            </div>
        `;
    });
    body.innerHTML = html;

    const subtotal = carrito1.obtenerSubtotal();
    subtotalSpan.textContent = subtotal.toFixed(2);

    let total = subtotal;
    let descuento = 0;

    if (clienteActual.obtenerTipo() === "ClientePorDocena") {
        total = clienteActual.calcularPrecioConDescuento(subtotal);
        descuento = subtotal - total;
    } else {
        descuento1.calcularPorCantidad(carrito1.getcantidadItems());
        descuento1.calcularPorPago(carrito1.obtenerPago());
        total = descuento1.calcularTotal(subtotal);
        const detalles = descuento1.obtenerDetalles(subtotal);
        descuento = detalles.descCantidad + detalles.descPago;
    }

    totalSpan.textContent = total.toFixed(2);
    if (descuentoSpan) descuentoSpan.textContent = descuento.toFixed(2);
}

// ============================================
// 5. ELIMINAR ITEM
// ============================================

window.eliminarItem = function(id) {
    carrito1.eliminarItem(id);
    actualizarCarrito();
    actualizarDropdown();
    mostrarNotificacion('Producto eliminado del carrito');
};

// ============================================
// 6. TOGGLE CARRITO
// ============================================

document.getElementById('cart-toggle')?.addEventListener('click', function() {
    const dropdown = document.getElementById('cart-dropdown');
    if (dropdown) dropdown.classList.toggle('visible');
});

document.getElementById('cart-close')?.addEventListener('click', function() {
    const dropdown = document.getElementById('cart-dropdown');
    if (dropdown) dropdown.classList.remove('visible');
});

document.addEventListener('click', function(e) {
    const wrapper = document.querySelector('.cart-dropdown-wrapper');
    const dropdown = document.getElementById('cart-dropdown');
    if (wrapper && dropdown && !wrapper.contains(e.target)) {
        dropdown.classList.remove('visible');
    }
});

// ============================================
// 7. VACIAR CARRITO
// ============================================

document.getElementById('btn-vaciar-dropdown')?.addEventListener('click', function() {
    if (carrito1.estaVacio()) {
        mostrarNotificacion('El carrito ya está vacío', 'warning');
        return;
    }
    if (confirm('¿Seguro que deseas vaciar el carrito?')) {
        carrito1.vaciar();
        actualizarCarrito();
        actualizarDropdown();
        mostrarNotificacion('Carrito vaciado');
    }
});

// ============================================
// 8. CAMBIAR TIPO DE CLIENTE
// ============================================

document.getElementById('tipo-cliente-selector')?.addEventListener('change', function() {
    clienteActual = this.value === 'unitario' ? cliente1 : cliente2;
    compraActual = new compra(clienteActual, carrito1, descuento1, new Date(), "Pendiente");
    actualizarCarrito();
    actualizarDropdown();
    mostrarNotificacion(`Cliente cambiado a: ${clienteActual.obtenerTipo()}`, 'info');
});

// ============================================
// 9. CONFIRMAR COMPRA CON RECIBO
// ============================================

document.getElementById('btn-comprar-dropdown')?.addEventListener('click', function() {
    if (carrito1.estaVacio()) {
        mostrarNotificacion('El carrito está vacío', 'warning');
        return;
    }

    const metodoPago = document.getElementById('dropdown-metodo-pago')?.value || 'Efectivo';
    carrito1.cambiarPago(metodoPago);

    compraActual = new compra(clienteActual, carrito1, descuento1, new Date(), "Pendiente");
    const resultado = compraActual.confirmar();

    if (resultado.exitoso) {
        // Mostrar recibo en consola
        mostrarRecibo(compraActual);

        alert(`✅ ${resultado.mensaje}\nTotal: S/ ${resultado.total.toFixed(2)}\nCliente: ${resultado.cliente}\nTipo: ${resultado.tipoCliente}`);
        actualizarCarrito();
        actualizarDropdown();
        mostrarNotificacion('¡Compra realizada con éxito!', 'success');
        document.getElementById('cart-dropdown')?.classList.remove('visible');
    } else {
        mostrarNotificacion(resultado.mensaje, 'danger');
    }
});

// ============================================
// 10. RECIBO EN CONSOLA (CORREGIDO)
// ============================================

function mostrarRecibo(compra) {
    console.log('=' .repeat(60));
    console.log('🧾  COMPROBANTE DE COMPRA - SchoolSupply');
    console.log('=' .repeat(60));
    console.log(`N° COMPRA:    ${compra.obtenerNumero()}`);
    console.log(`FECHA:        ${compra.fecha.toLocaleString()}`);
    console.log(`CLIENTE:      ${compra.cliente.nombre}`);
    console.log(`TIPO CLIENTE: ${compra.cliente.obtenerTipo()}`);
    console.log(`MÉTODO PAGO:  ${compra.carrito.obtenerPago()}`);
    console.log('-'.repeat(60));
    console.log('PRODUCTOS:');
    console.log('-'.repeat(60));

    compra.carrito.items.forEach(item => {
        const subtotal = (item.producto.precioUnitario * item.cantidad).toFixed(2);
        console.log(`  ${item.cantidad}x ${item.producto.nombre}`);
        console.log(`     ${item.producto.marca} - ${item.producto.color || 'N/A'}`);
        console.log(`     S/ ${item.producto.precioUnitario} c/u → S/ ${subtotal}`);
    });

    console.log('-'.repeat(60));

    // 🔥 CALCULAR SUBTOTAL Y TOTAL DIRECTAMENTE
    const subtotal = compra.carrito.obtenerSubtotal();
    const total = compra.totalFinal !== undefined && compra.totalFinal !== null ? compra.totalFinal : subtotal;
    const descuento = subtotal - total;

    console.log(`SUBTOTAL:     S/ ${subtotal.toFixed(2)}`);
    if (descuento > 0) {
        console.log(`DESCUENTO:    -S/ ${descuento.toFixed(2)}`);
    } else {
        console.log(`DESCUENTO:    S/ 0.00`);
    }
    console.log('-'.repeat(60));
    console.log(`TOTAL:        S/ ${total.toFixed(2)}`);
    console.log('=' .repeat(60));
    console.log(`✅ ESTADO:     ${compra.estado}`);
    console.log('=' .repeat(60));
    console.log('¡Gracias por tu compra! 🎉');
}

// ============================================
// 11. BÚSQUEDA
// ============================================

document.getElementById('form-buscar')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const termino = document.getElementById('input-buscar')?.value || '';
    modoOfertas = false;
    renderizarProductos(termino);
});

document.getElementById('input-buscar')?.addEventListener('input', function() {
    renderizarProductos(this.value);
});

// ============================================
// 12. ENLACES
// ============================================

document.getElementById('link-inicio')?.addEventListener('click', function(e) {
    e.preventDefault();
    modoOfertas = false;
    const input = document.getElementById('input-buscar');
    if (input) input.value = '';
    renderizarProductos('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    mostrarNotificacion('Mostrando todos los productos', 'info');
});

document.getElementById('link-inicio-nav')?.addEventListener('click', function(e) {
    e.preventDefault();
    modoOfertas = false;
    const input = document.getElementById('input-buscar');
    if (input) input.value = '';
    renderizarProductos('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    mostrarNotificacion('Mostrando todos los productos', 'info');
});

document.getElementById('link-ofertas')?.addEventListener('click', function(e) {
    e.preventDefault();
    modoOfertas = true;
    const input = document.getElementById('input-buscar');
    if (input) input.value = '';
    renderizarProductos('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const ofertasCount = productos.filter(p => p.enOferta).length;
    mostrarNotificacion(`Mostrando ${ofertasCount} productos en oferta`, 'info');
});

document.getElementById('link-tiendas')?.addEventListener('click', function(e) {
    e.preventDefault();
    mostrarNotificacion('📍 Próximamente: Encuentra nuestras tiendas físicas', 'info');
});

// ============================================
// 13. NOTIFICACIONES
// ============================================

function mostrarNotificacion(mensaje, tipo = 'info') {
    const colors = {
        info: 'bg-primary',
        success: 'bg-success',
        warning: 'bg-warning text-dark',
        danger: 'bg-danger'
    };

    const toastDiv = document.createElement('div');
    toastDiv.className = `position-fixed bottom-0 end-0 p-3`;
    toastDiv.style.zIndex = '9999';
    toastDiv.innerHTML = `
        <div class="toast show align-items-center text-white ${colors[tipo] || colors.info}" role="alert">
            <div class="d-flex">
                <div class="toast-body">${mensaje}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    document.body.appendChild(toastDiv);

    setTimeout(() => toastDiv.remove(), 3000);
}

// ============================================
// 14. INICIALIZAR
// ============================================

console.log('✅ UI inicializada correctamente');
console.log(`Cliente actual: ${clienteActual.obtenerTipo()}`);
console.log(`Productos disponibles: ${productos.length}`);
console.log(`Productos en oferta: ${productos.filter(p => p.enOferta).length}`);

renderizarProductos();
actualizarCarrito();
actualizarDropdown();