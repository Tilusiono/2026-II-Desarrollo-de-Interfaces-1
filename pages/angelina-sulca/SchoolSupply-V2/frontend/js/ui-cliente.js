// ============================================
// ui-cliente.js - LÓGICA PARA CLIENTE
// ============================================

console.log('🚀 ui-cliente.js cargado correctamente');

import { carrito1, descuento1, cliente1, cliente2 } from './main.js';
import { compra } from './models/compra.js';

let productos = [];
let sedes = [];
let clienteActual = cliente2;
let compraActual = new compra(clienteActual, carrito1, descuento1, new Date(), "Pendiente");
let modoOfertas = false;
let busquedaActual = '';

const CANTIDADES_RAPIDAS = [1, 6, 12, 24];

// ============================================
// CARGAR DATOS
// ============================================

async function cargarProductos() {
    try {
        const res = await fetch('/api/productos');
        const data = await res.json();
        if (data.success) {
            productos = data.data;
            console.log(`✅ ${productos.length} productos cargados`);
            renderizarProductos();
            actualizarCarrito();
        } else {
            console.error('❌ Error:', data.error);
        }
    } catch (error) {
        console.error('❌ Error de conexión:', error);
    }
}

async function cargarSedes() {
    try {
        const res = await fetch('/api/sedes');
        const data = await res.json();
        if (data.success) {
            sedes = data.data;
            console.log(`✅ ${sedes.length} sedes cargadas`);
            renderizarSedes();
        }
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

// ============================================
// RENDERIZAR PRODUCTOS (CORREGIDO)
// ============================================

function renderizarProductos(termino = '') {
    const container = document.getElementById('productos-container');
    if (!container) {
        console.error('❌ No se encontró el contenedor de productos');
        return;
    }

    const searchTerm = (termino || busquedaActual || '').toLowerCase().trim();
    
    let filtrados = [...productos];

    if (modoOfertas) {
        filtrados = filtrados.filter(p => p.en_oferta === 1);
    }

    if (searchTerm) {
        filtrados = filtrados.filter(p => {
            const nombre = (p.nombre || '').toLowerCase();
            const marca = (p.marca || '').toLowerCase();
            const categoria = (p.categoria || '').toLowerCase();
            const color = (p.color || '').toLowerCase();
            return nombre.includes(searchTerm) ||
                   marca.includes(searchTerm) ||
                   categoria.includes(searchTerm) ||
                   color.includes(searchTerm);
        });
    }

    document.getElementById('productos-count').textContent = `${filtrados.length} productos`;

    if (!filtrados.length) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4>No se encontraron productos</h4>
                <p class="text-muted">Intenta con otra búsqueda</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    filtrados.forEach(p => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 col-xl-3 mb-4';
        
        const precio = parseFloat(p.precio_unitario) || 0;
        const precioDocena = parseFloat(p.precio_docena) || precio * 12;
        
        col.innerHTML = `
            <div class="card product-card h-100">
                ${p.en_oferta ? '<span class="oferta-tag"><i class="fas fa-tag"></i> OFERTA</span>' : ''}
                <div class="card-body">
                    <p class="product-brand">${p.marca || 'Sin marca'}</p>
                    <h5 class="product-name">${p.nombre || 'Sin nombre'}</h5>
                    <p class="product-desc">${p.categoria || 'Sin categoría'}</p>
                    <p class="product-color"><i class="fas fa-palette"></i> ${p.color || 'N/A'}</p>
                    <p class="product-price">S/ ${precio.toFixed(2)}</p>
                    <p class="product-docena">Por docena: S/ ${precioDocena.toFixed(2)}</p>
                    <div class="cantidad-selector">
                        ${CANTIDADES_RAPIDAS.map(c => `
                            <button class="btn-cantidad" data-id="${p.id}" data-cantidad="${c}">
                                ${c === 1 ? '1' : c === 6 ? '½ Doc' : c === 12 ? '1 Doc' : '2 Doc'}
                            </button>
                        `).join('')}
                        <input type="number" class="cantidad-input" id="cant-input-${p.id}" value="1" min="1" />
                    </div>
                    <button class="btn btn-primary w-100 mt-2 btn-agregar" data-id="${p.id}">
                        <i class="fas fa-cart-plus me-1"></i> Agregar
                    </button>
                </div>
            </div>
        `;
        container.appendChild(col);
    });

    document.querySelectorAll('.btn-cantidad').forEach(b => {
        b.addEventListener('click', function() {
            const id = this.dataset.id;
            const input = document.getElementById(`cant-input-${id}`);
            if (input) input.value = this.dataset.cantidad;
        });
    });

    document.querySelectorAll('.btn-agregar').forEach(b => {
        b.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const p = productos.find(x => x.id === id);
            const input = document.getElementById(`cant-input-${id}`);
            const cant = parseInt(input ? input.value : 1) || 1;
            if (p) agregarAlCarrito(p, cant);
        });
    });
}

// ============================================
// RENDERIZAR SEDES
// ============================================

function renderizarSedes() {
    const container = document.getElementById('sedes-container');
    if (!container) return;

    if (!sedes.length) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-store-alt-slash fa-3x text-muted mb-3"></i>
                <h4>No hay tiendas disponibles</h4>
                <p class="text-muted">Pronto abriremos nuevas sedes</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    sedes.forEach(s => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 mb-4';
        col.innerHTML = `
            <div class="card sede-card h-100">
                <div class="card-body">
                    <h5 class="card-title">${s.nombre}</h5>
                    <span class="badge bg-success">${s.codigo}</span>
                    <p class="card-text mt-2"><i class="fas fa-map-marker-alt me-1"></i> ${s.direccion}</p>
                    <p class="card-text"><i class="fas fa-city me-1"></i> ${s.distrito || 'N/A'}</p>
                    <p class="card-text"><i class="fas fa-phone me-1"></i> ${s.telefono || 'N/A'}</p>
                    <p class="card-text"><i class="fas fa-user me-1"></i> ${s.encargado || 'N/A'}</p>
                    <p class="card-text"><i class="fas fa-clock me-1"></i> ${s.horario_apertura || '08:00'} - ${s.horario_cierre || '18:00'}</p>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// ============================================
// CARRITO
// ============================================

function agregarAlCarrito(p, c) {
    carrito1.agregarItem(p, c);
    actualizarCarrito();
    mostrarNotificacion(`${p.nombre} agregado`, 'success');
}

function actualizarCarrito() {
    const badge = document.getElementById('cart-count-badge');
    if (badge) {
        badge.textContent = carrito1.items.reduce((s, i) => s + i.cantidad, 0);
    }

    const body = document.getElementById('cart-dropdown-body');
    if (!body) return;

    if (carrito1.estaVacio()) {
        body.innerHTML = `
            <div class="text-center text-muted py-4">
                <i class="fas fa-cart-plus fa-3x mb-2"></i>
                <p>El carrito está vacío</p>
                <small>Agrega productos para comenzar</small>
            </div>
        `;
        return;
    }

    let html = '';
    carrito1.items.forEach(item => {
        const subtotal = (item.producto.precio_unitario * item.cantidad).toFixed(2);
        html += `
            <div class="cart-dropdown-item">
                <div class="item-info">
                    <div class="item-name">${item.producto.nombre} x${item.cantidad}</div>
                    <div class="item-detail">${item.producto.marca || ''}</div>
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
    document.getElementById('dropdown-subtotal').textContent = subtotal.toFixed(2);

    let total = subtotal;
    if (clienteActual.obtenerTipo() === "ClientePorDocena") {
        total = clienteActual.calcularPrecioConDescuento(subtotal);
    }
    document.getElementById('dropdown-total').textContent = total.toFixed(2);
    document.getElementById('dropdown-descuento').textContent = (subtotal - total).toFixed(2);
}

window.eliminarItem = function(id) {
    carrito1.eliminarItem(id);
    actualizarCarrito();
    mostrarNotificacion('Producto eliminado', 'warning');
};

// ============================================
// EVENTOS DEL CARRITO
// ============================================

document.getElementById('cart-toggle')?.addEventListener('click', () => {
    const dropdown = document.getElementById('cart-dropdown');
    if (dropdown) dropdown.classList.toggle('visible');
});

document.getElementById('cart-close')?.addEventListener('click', () => {
    const dropdown = document.getElementById('cart-dropdown');
    if (dropdown) dropdown.classList.remove('visible');
});

document.addEventListener('click', (e) => {
    const wrapper = document.querySelector('.cart-dropdown-wrapper');
    const dropdown = document.getElementById('cart-dropdown');
    if (wrapper && dropdown && !wrapper.contains(e.target)) {
        dropdown.classList.remove('visible');
    }
});

// ============================================
// COMPRA (CORREGIDO)
// ============================================

document.getElementById('btn-comprar-dropdown')?.addEventListener('click', function() {
    if (carrito1.estaVacio()) {
        mostrarNotificacion('Carrito vacío', 'warning');
        return;
    }
    
    const metodo = document.getElementById('dropdown-metodo-pago').value;
    carrito1.cambiarPago(metodo);
    
    compraActual = new compra(clienteActual, carrito1, descuento1, new Date(), "Pendiente");
    const res = compraActual.confirmar();
    
    if (res.exitoso) {
        console.log('🧾 RECIBO DE COMPRA:');
        console.log('====================');
        console.log(`Cliente: ${clienteActual.nombre}`);
        console.log(`Tipo: ${clienteActual.obtenerTipo()}`);
        console.log('Productos:');
        carrito1.items.forEach(item => {
            console.log(`  ${item.cantidad}x ${item.producto.nombre} - S/ ${(item.producto.precio_unitario * item.cantidad).toFixed(2)}`);
        });
        console.log(`Total: S/ ${res.total.toFixed(2)}`);
        console.log('====================');
        
        alert(`✅ Compra confirmada\nTotal: S/ ${res.total.toFixed(2)}`);
        actualizarCarrito();
        document.getElementById('cart-dropdown').classList.remove('visible');
        mostrarNotificacion('🎉 Compra realizada con éxito', 'success');
    } else {
        mostrarNotificacion('❌ Error: ' + res.mensaje, 'danger');
    }
});

document.getElementById('btn-vaciar-dropdown')?.addEventListener('click', function() {
    if (confirm('¿Vaciar carrito?')) {
        carrito1.vaciar();
        actualizarCarrito();
        mostrarNotificacion('Carrito vaciado', 'warning');
    }
});

// ============================================
// SELECTOR DE CLIENTE
// ============================================

document.getElementById('tipo-cliente-selector')?.addEventListener('change', function() {
    clienteActual = this.value === 'unitario' ? cliente1 : cliente2;
    document.getElementById('tipo-cliente-badge').textContent = this.value === 'unitario' ? 'Unitario' : 'Por Docena';
    actualizarCarrito();
});

// ============================================
// BÚSQUEDA (CORREGIDO)
// ============================================

document.getElementById('form-buscar')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const termino = document.getElementById('input-buscar').value;
    busquedaActual = termino;
    modoOfertas = false;
    console.log('🔍 Buscando:', termino);
    renderizarProductos(termino);
});

document.getElementById('input-buscar')?.addEventListener('input', function() {
    const termino = this.value;
    busquedaActual = termino;
    renderizarProductos(termino);
});

// ============================================
// ENLACES DE NAVEGACIÓN
// ============================================

document.getElementById('link-inicio')?.addEventListener('click', (e) => {
    e.preventDefault();
    busquedaActual = '';
    document.getElementById('input-buscar').value = '';
    modoOfertas = false;
    document.getElementById('seccion-productos').style.display = 'block';
    document.getElementById('seccion-sedes').style.display = 'none';
    renderizarProductos();
});

document.getElementById('link-inicio-nav')?.addEventListener('click', (e) => {
    e.preventDefault();
    busquedaActual = '';
    document.getElementById('input-buscar').value = '';
    modoOfertas = false;
    document.getElementById('seccion-productos').style.display = 'block';
    document.getElementById('seccion-sedes').style.display = 'none';
    renderizarProductos();
});

document.getElementById('link-ofertas')?.addEventListener('click', (e) => {
    e.preventDefault();
    modoOfertas = true;
    busquedaActual = '';
    document.getElementById('input-buscar').value = '';
    document.getElementById('seccion-productos').style.display = 'block';
    document.getElementById('seccion-sedes').style.display = 'none';
    renderizarProductos();
});

document.getElementById('link-tiendas')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('seccion-productos').style.display = 'none';
    document.getElementById('seccion-sedes').style.display = 'block';
    if (!sedes.length) cargarSedes();
});

// ============================================
// NOTIFICACIONES
// ============================================

function mostrarNotificacion(msg, tipo = 'info') {
    const colors = {
        info: 'bg-primary',
        success: 'bg-success',
        warning: 'bg-warning text-dark',
        danger: 'bg-danger'
    };
    const d = document.createElement('div');
    d.className = 'position-fixed bottom-0 end-0 p-3';
    d.style.zIndex = '9999';
    d.innerHTML = `
        <div class="toast show align-items-center text-white ${colors[tipo]}" role="alert">
            <div class="d-flex">
                <div class="toast-body">${msg}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 3000);
}

// ============================================
// INICIALIZAR (CON DEFER)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM cargado, iniciando ui-cliente.js');
    cargarProductos();
    document.getElementById('seccion-sedes').style.display = 'none';
});