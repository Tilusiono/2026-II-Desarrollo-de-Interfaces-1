// ============================================
// ui-personal.js - LÓGICA PARA PERSONAL (ADMIN)
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

// ============================================
// RENDERIZAR PRODUCTOS (CON BOTONES ADMIN)
// ============================================

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
                    <div class="mt-2 d-flex gap-2">
                        <button class="btn btn-edit btn-sm w-50 btn-editar-producto" data-id="${p.id}"><i class="fas fa-edit"></i> Editar</button>
                        <button class="btn btn-delete btn-sm w-50 btn-eliminar-producto" data-id="${p.id}"><i class="fas fa-trash"></i> Eliminar</button>
                    </div>
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
    document.querySelectorAll('.btn-editar-producto').forEach(b => b.addEventListener('click', function() {
        const p = productos.find(x => x.id === parseInt(this.dataset.id));
        if (p) abrirModalEditarProducto(p);
    }));
    document.querySelectorAll('.btn-eliminar-producto').forEach(b => b.addEventListener('click', function() {
        if (confirm('¿Eliminar este producto?')) eliminarProducto(parseInt(this.dataset.id));
    }));
}

// ============================================
// RENDERIZAR SEDES (CON BOTONES ADMIN)
// ============================================

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
                    <div class="mt-2 d-flex gap-2">
                        <button class="btn btn-edit btn-sm w-50 btn-editar-sede" data-id="${s.id}"><i class="fas fa-edit"></i> Editar</button>
                        <button class="btn btn-delete btn-sm w-50 btn-eliminar-sede" data-id="${s.id}"><i class="fas fa-trash"></i> Eliminar</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
    document.querySelectorAll('.btn-editar-sede').forEach(b => b.addEventListener('click', function() {
        const s = sedes.find(x => x.id === parseInt(this.dataset.id));
        if (s) abrirModalEditarSede(s);
    }));
    document.querySelectorAll('.btn-eliminar-sede').forEach(b => b.addEventListener('click', function() {
        if (confirm('¿Eliminar esta sede?')) eliminarSede(parseInt(this.dataset.id));
    }));
}

// ============================================
// CRUD PRODUCTOS
// ============================================

async function crearProducto() {
    const data = {
        nombre: document.getElementById('prod-nombre').value,
        marca: document.getElementById('prod-marca').value,
        color: document.getElementById('prod-color').value || null,
        precio_unitario: parseFloat(document.getElementById('prod-precio').value),
        stock: parseInt(document.getElementById('prod-stock').value) || 0,
        categoria: document.getElementById('prod-categoria').value || null,
        en_oferta: document.getElementById('prod-oferta').checked ? 1 : 0
    };
    const res = await fetch('/api/productos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const result = await res.json();
    if (result.success) {
        mostrarNotificacion('✅ Producto creado', 'success');
        bootstrap.Modal.getInstance(document.getElementById('modal-producto')).hide();
        document.getElementById('form-producto').reset();
        cargarProductos();
    }
}

async function actualizarProducto() {
    const id = parseInt(document.getElementById('edit-prod-id').value);
    const data = {
        nombre: document.getElementById('edit-prod-nombre').value,
        marca: document.getElementById('edit-prod-marca').value,
        color: document.getElementById('edit-prod-color').value || null,
        precio_unitario: parseFloat(document.getElementById('edit-prod-precio').value),
        stock: parseInt(document.getElementById('edit-prod-stock').value) || 0,
        categoria: document.getElementById('edit-prod-categoria').value || null,
        en_oferta: document.getElementById('edit-prod-oferta').checked ? 1 : 0
    };
    const res = await fetch(`/api/productos/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const result = await res.json();
    if (result.success) {
        mostrarNotificacion('✅ Producto actualizado', 'success');
        bootstrap.Modal.getInstance(document.getElementById('modal-editar-producto')).hide();
        cargarProductos();
    }
}

async function eliminarProducto(id) {
    const res = await fetch(`/api/productos/${id}`, { method: 'DELETE' });
    const result = await res.json();
    if (result.success) { mostrarNotificacion('✅ Producto eliminado', 'success'); cargarProductos(); }
}

// ============================================
// CRUD SEDES
// ============================================

async function crearSede() {
    const data = {
        codigo: document.getElementById('sede-codigo').value,
        nombre: document.getElementById('sede-nombre').value,
        direccion: document.getElementById('sede-direccion').value,
        distrito: document.getElementById('sede-distrito').value || null,
        telefono: document.getElementById('sede-telefono').value || null,
        encargado: document.getElementById('sede-encargado').value || null,
        capacidad: parseInt(document.getElementById('sede-capacidad').value) || 0,
        horario_apertura: document.getElementById('sede-apertura').value || null,
        horario_cierre: document.getElementById('sede-cierre').value || null
    };
    const res = await fetch('/api/sedes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const result = await res.json();
    if (result.success) {
        mostrarNotificacion('✅ Sede creada', 'success');
        bootstrap.Modal.getInstance(document.getElementById('modal-sede')).hide();
        document.getElementById('form-sede').reset();
        cargarSedes();
    }
}

async function actualizarSede() {
    const id = parseInt(document.getElementById('edit-sede-id').value);
    const data = {
        codigo: document.getElementById('edit-sede-codigo').value,
        nombre: document.getElementById('edit-sede-nombre').value,
        direccion: document.getElementById('edit-sede-direccion').value,
        distrito: document.getElementById('edit-sede-distrito').value || null,
        telefono: document.getElementById('edit-sede-telefono').value || null,
        encargado: document.getElementById('edit-sede-encargado').value || null,
        capacidad: parseInt(document.getElementById('edit-sede-capacidad').value) || 0,
        horario_apertura: document.getElementById('edit-sede-apertura').value || null,
        horario_cierre: document.getElementById('edit-sede-cierre').value || null,
        activo: document.getElementById('edit-sede-activo').checked ? 1 : 0
    };
    const res = await fetch(`/api/sedes/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const result = await res.json();
    if (result.success) {
        mostrarNotificacion('✅ Sede actualizada', 'success');
        bootstrap.Modal.getInstance(document.getElementById('modal-editar-sede')).hide();
        cargarSedes();
    }
}

async function eliminarSede(id) {
    const res = await fetch(`/api/sedes/${id}`, { method: 'DELETE' });
    const result = await res.json();
    if (result.success) { mostrarNotificacion('✅ Sede eliminada', 'success'); cargarSedes(); }
}

// ============================================
// MODALES DE EDICIÓN
// ============================================

function abrirModalEditarProducto(p) {
    document.getElementById('edit-prod-id').value = p.id;
    document.getElementById('edit-prod-nombre').value = p.nombre;
    document.getElementById('edit-prod-marca').value = p.marca;
    document.getElementById('edit-prod-color').value = p.color || '';
    document.getElementById('edit-prod-precio').value = p.precio_unitario;
    document.getElementById('edit-prod-stock').value = p.stock || 0;
    document.getElementById('edit-prod-categoria').value = p.categoria || '';
    document.getElementById('edit-prod-oferta').checked = p.en_oferta === 1;
    new bootstrap.Modal(document.getElementById('modal-editar-producto')).show();
}

function abrirModalEditarSede(s) {
    document.getElementById('edit-sede-id').value = s.id;
    document.getElementById('edit-sede-codigo').value = s.codigo;
    document.getElementById('edit-sede-nombre').value = s.nombre;
    document.getElementById('edit-sede-direccion').value = s.direccion;
    document.getElementById('edit-sede-distrito').value = s.distrito || '';
    document.getElementById('edit-sede-telefono').value = s.telefono || '';
    document.getElementById('edit-sede-encargado').value = s.encargado || '';
    document.getElementById('edit-sede-capacidad').value = s.capacidad || 0;
    document.getElementById('edit-sede-apertura').value = s.horario_apertura || '08:00';
    document.getElementById('edit-sede-cierre').value = s.horario_cierre || '18:00';
    document.getElementById('edit-sede-activo').checked = s.activo === 1;
    new bootstrap.Modal(document.getElementById('modal-editar-sede')).show();
}

// ============================================
// CARRITO Y UTILIDADES
// ============================================

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

document.getElementById('link-agregar-producto')?.addEventListener('click', (e) => { e.preventDefault(); new bootstrap.Modal(document.getElementById('modal-producto')).show(); });
document.getElementById('link-agregar-sede')?.addEventListener('click', (e) => { e.preventDefault(); new bootstrap.Modal(document.getElementById('modal-sede')).show(); });
document.getElementById('btn-guardar-producto')?.addEventListener('click', crearProducto);
document.getElementById('btn-actualizar-producto')?.addEventListener('click', actualizarProducto);
document.getElementById('btn-guardar-sede')?.addEventListener('click', crearSede);
document.getElementById('btn-actualizar-sede')?.addEventListener('click', actualizarSede);

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