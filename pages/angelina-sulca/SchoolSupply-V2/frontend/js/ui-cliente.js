// ============================================
// ui-cliente.js - LÓGICA PARA CLIENTE
// ============================================

import { carrito1, descuento1, cliente1, cliente2 } from './main.js';
import { compra } from './models/compra.js';

let productos = [];
let sedes = [];
let clienteActual = cliente2;
let compraActual = new compra(clienteActual, carrito1, descuento1, new Date(), "Pendiente");
let modoOfertas = false;

const CANTIDADES_RAPIDAS = [1, 6, 12, 24];

async function cargarProductos() {
    try {
        const res = await fetch('/api/productos');
        const data = await res.json();
        if (data.success) { productos = data.data; renderizarProductos(); actualizarCarrito(); }
    } catch (error) { console.error(error); }
}

async function cargarSedes() {
    try {
        const res = await fetch('/api/sedes');
        const data = await res.json();
        if (data.success) { sedes = data.data; renderizarSedes(); }
    } catch (error) { console.error(error); }
}

function renderizarProductos(termino = '') {
    const container = document.getElementById('productos-container');
    let filtrados = [...productos];
    if (modoOfertas) filtrados = filtrados.filter(p => p.en_oferta === 1);
    const term = termino.toLowerCase().trim();
    if (term) filtrados = filtrados.filter(p => p.nombre.toLowerCase().includes(term) || (p.marca && p.marca.toLowerCase().includes(term)));
    document.getElementById('productos-count').textContent = `${filtrados.length} productos`;
    if (!filtrados.length) { container.innerHTML = `<div class="col-12 text-center py-5"><h4>No hay productos</h4></div>`; return; }
    container.innerHTML = '';
    filtrados.forEach(p => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 col-xl-3 mb-4';
        col.innerHTML = `
            <div class="card product-card">
                ${p.en_oferta ? '<span class="oferta-tag"><i class="fas fa-tag"></i> OFERTA</span>' : ''}
                <div class="card-body">
                    <p class="product-brand">${p.marca}</p>
                    <h5 class="product-name">${p.nombre}</h5>
                    <p class="product-desc">${p.categoria || ''}</p>
                    <p class="product-price">S/ ${p.precio_unitario}</p>
                    <p class="product-docena">Por docena: S/ ${p.precio_docena || 'N/A'}</p>
                    <div class="cantidad-selector">
                        ${CANTIDADES_RAPIDAS.map(c => `<button class="btn-cantidad" data-id="${p.id}" data-cantidad="${c}">${c === 1 ? '1' : c === 6 ? '½ Doc' : c === 12 ? '1 Doc' : '2 Doc'}</button>`).join('')}
                        <input type="number" class="cantidad-input" id="cant-input-${p.id}" value="1" min="1" />
                    </div>
                    <button class="btn btn-primary w-100 mt-2 btn-agregar" data-id="${p.id}"><i class="fas fa-cart-plus"></i> Agregar</button>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
    document.querySelectorAll('.btn-cantidad').forEach(b => b.addEventListener('click', function() {
        document.getElementById(`cant-input-${this.dataset.id}`).value = this.dataset.cantidad;
    }));
    document.querySelectorAll('.btn-agregar').forEach(b => b.addEventListener('click', function() {
        const id = parseInt(this.dataset.id), p = productos.find(x => x.id === id);
        const cant = parseInt(document.getElementById(`cant-input-${id}`).value) || 1;
        if (p) agregarAlCarrito(p, cant);
    }));
}

function renderizarSedes() {
    const container = document.getElementById('sedes-container');
    if (!sedes.length) { container.innerHTML = `<div class="col-12 text-center py-5"><h4>No hay tiendas</h4></div>`; return; }
    container.innerHTML = '';
    sedes.forEach(s => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 mb-4';
        col.innerHTML = `
            <div class="card sede-card">
                <div class="card-body">
                    <h5>${s.nombre}</h5>
                    <p><i class="fas fa-map-marker-alt"></i> ${s.direccion}</p>
                    <p><i class="fas fa-phone"></i> ${s.telefono || 'N/A'}</p>
                    <p><i class="fas fa-clock"></i> ${s.horario_apertura || '08:00'} - ${s.horario_cierre || '18:00'}</p>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

function agregarAlCarrito(p, c) { carrito1.agregarItem(p, c); actualizarCarrito(); mostrarNotificacion(`${p.nombre} agregado`, 'success'); }

function actualizarCarrito() {
    document.getElementById('cart-count-badge').textContent = carrito1.items.reduce((s, i) => s + i.cantidad, 0);
    const body = document.getElementById('cart-dropdown-body');
    if (carrito1.estaVacio()) { body.innerHTML = `<div class="text-center text-muted py-4"><p>Carrito vacío</p></div>`; return; }
    let html = '';
    carrito1.items.forEach(item => {
        html += `<div class="cart-dropdown-item"><span>${item.producto.nombre} x${item.cantidad}</span><span class="item-price">S/ ${(item.producto.precio_unitario * item.cantidad).toFixed(2)}</span><button class="btn-remove" onclick="window.eliminarItem(${item.producto.id})"><i class="fas fa-times-circle"></i></button></div>`;
    });
    body.innerHTML = html;
    const subtotal = carrito1.obtenerSubtotal();
    document.getElementById('dropdown-subtotal').textContent = subtotal.toFixed(2);
    let total = subtotal;
    if (clienteActual.obtenerTipo() === "ClientePorDocena") total = clienteActual.calcularPrecioConDescuento(subtotal);
    document.getElementById('dropdown-total').textContent = total.toFixed(2);
}

window.eliminarItem = function(id) { carrito1.eliminarItem(id); actualizarCarrito(); };

document.getElementById('cart-toggle')?.addEventListener('click', () => document.getElementById('cart-dropdown').classList.toggle('visible'));
document.getElementById('cart-close')?.addEventListener('click', () => document.getElementById('cart-dropdown').classList.remove('visible'));

document.getElementById('btn-comprar-dropdown')?.addEventListener('click', function() {
    if (carrito1.estaVacio()) { mostrarNotificacion('Carrito vacío', 'warning'); return; }
    const metodo = document.getElementById('dropdown-metodo-pago').value;
    carrito1.cambiarPago(metodo);
    compraActual = new compra(clienteActual, carrito1, descuento1, new Date(), "Pendiente");
    const res = compraActual.confirmar();
    if (res.exitoso) { alert(`✅ Compra confirmada\nTotal: S/ ${res.total.toFixed(2)}`); actualizarCarrito(); document.getElementById('cart-dropdown').classList.remove('visible'); }
});

document.getElementById('btn-vaciar-dropdown')?.addEventListener('click', function() {
    if (confirm('¿Vaciar carrito?')) { carrito1.vaciar(); actualizarCarrito(); mostrarNotificacion('Carrito vaciado', 'warning'); }
});

document.getElementById('link-inicio')?.addEventListener('click', (e) => { e.preventDefault(); document.getElementById('seccion-productos').style.display = 'block'; document.getElementById('seccion-sedes').style.display = 'none'; });
document.getElementById('link-tiendas')?.addEventListener('click', (e) => { e.preventDefault(); document.getElementById('seccion-productos').style.display = 'none'; document.getElementById('seccion-sedes').style.display = 'block'; if (!sedes.length) cargarSedes(); });
document.getElementById('link-ofertas')?.addEventListener('click', (e) => { e.preventDefault(); modoOfertas = true; renderizarProductos(); });
document.getElementById('form-buscar')?.addEventListener('submit', (e) => { e.preventDefault(); modoOfertas = false; renderizarProductos(document.getElementById('input-buscar').value); });
document.getElementById('tipo-cliente-selector')?.addEventListener('change', function() {
    clienteActual = this.value === 'unitario' ? cliente1 : cliente2;
    document.getElementById('tipo-cliente-badge').textContent = this.value === 'unitario' ? 'Unitario' : 'Por Docena';
    actualizarCarrito();
});

function mostrarNotificacion(msg, tipo = 'info') {
    const colors = { info: 'bg-primary', success: 'bg-success', warning: 'bg-warning text-dark', danger: 'bg-danger' };
    const d = document.createElement('div');
    d.className = `position-fixed bottom-0 end-0 p-3`;
    d.innerHTML = `<div class="toast show align-items-center text-white ${colors[tipo]}" role="alert"><div class="toast-body">${msg}</div></div>`;
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 2500);
}

cargarProductos();
document.getElementById('seccion-sedes').style.display = 'none';