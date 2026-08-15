import { api } from "./api.js";

const byId = (id) => document.getElementById(id);
const state = {
  productos: [],
  usuarios: [],
  categorias: [],
  proveedores: [],
  productoEnEdicion: null,
  usuarioEnEdicion: null,
};

const currency = new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" });
let productTimer;
let userTimer;

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
  })[character]);
}

function showMessage(message, type = "success", details = []) {
  const box = byId("app-message");
  const extra = details.length ? "<ul class=\"mb-0 mt-1\"><li>" + details.map(escapeHtml).join("</li><li>") + "</li></ul>" : "";
  box.className = "alert app-alert alert-" + type;
  box.innerHTML = "<strong>" + escapeHtml(message) + "</strong>" + extra;
  window.setTimeout(() => box.classList.add("d-none"), 6500);
}

function handleError(error) {
  console.error(error);
  showMessage(error.message || "No fue posible completar la operación", "danger", error.details || []);
}

function setConnection(ok, text) {
  const status = byId("connection-status");
  status.classList.toggle("online", ok);
  status.classList.toggle("offline", !ok);
  status.querySelector("span:last-child").textContent = text;
}

async function loadConnection() {
  try {
    const result = await api.estado();
    setConnection(true, result.baseDatos);
  } catch (error) {
    setConnection(false, "API sin conexión");
    throw error;
  }
}

async function loadCatalogs() {
  const result = await api.catalogos();
  state.categorias = result.categorias;
  state.proveedores = result.proveedores;
  const categoryOptions = state.categorias.map((category) =>
    '<option value="' + category.id + '">' + escapeHtml(category.nombre) + "</option>"
  ).join("");
  byId("product-category").innerHTML = '<option value="">Seleccione…</option>' + categoryOptions;
  byId("product-filter-category").innerHTML = '<option value="">Todas las categorías</option>' + categoryOptions;
  byId("product-supplier").innerHTML = '<option value="">Sin proveedor</option>' + state.proveedores.map((supplier) =>
    '<option value="' + supplier.id + '">' + escapeHtml(supplier.razonSocial) + "</option>"
  ).join("");
}

async function loadStats() {
  const { resumen } = await api.estadisticas();
  byId("metric-products").textContent = resumen.productosActivos;
  byId("metric-stock").textContent = resumen.stockTotal;
  byId("metric-low-stock").textContent = resumen.productosStockBajo;
  byId("metric-users").textContent = resumen.usuariosActivos;
}

function productStatus(product) {
  return product.activo
    ? '<span class="status-badge status-active"><i class="bi bi-check-circle"></i>Activo</span>'
    : '<span class="status-badge status-inactive"><i class="bi bi-pause-circle"></i>Inactivo</span>';
}

function renderProducts() {
  byId("products-count").textContent = state.productos.length + (state.productos.length === 1 ? " registro encontrado" : " registros encontrados");
  if (!state.productos.length) {
    byId("products-body").innerHTML = '<tr><td colspan="6" class="empty-state"><i class="bi bi-inbox"></i>No hay productos para mostrar.</td></tr>';
    return;
  }
  byId("products-body").innerHTML = state.productos.map((product) => [
    "<tr>",
    '<td><span class="item-title">', escapeHtml(product.nombre), '</span><span class="item-meta">', escapeHtml(product.codigo), " · ", escapeHtml(product.marca), "</span></td>",
    "<td>", escapeHtml(product.categoria), "</td>",
    '<td class="text-end fw-semibold">', currency.format(product.precio), "</td>",
    '<td class="text-center"><span class="stock-badge ', product.stock <= 10 ? "low" : "", '">', product.stock, "</span></td>",
    "<td>", productStatus(product), "</td>",
    '<td class="text-end"><div class="action-group">',
    '<button class="icon-button" data-product-action="stock-down" data-id="', product.id, '" type="button" title="Reducir stock" aria-label="Reducir stock de ', escapeHtml(product.nombre), '"><i class="bi bi-dash-lg"></i></button>',
    '<button class="icon-button" data-product-action="stock-up" data-id="', product.id, '" type="button" title="Aumentar stock" aria-label="Aumentar stock de ', escapeHtml(product.nombre), '"><i class="bi bi-plus-lg"></i></button>',
    '<button class="icon-button" data-product-action="toggle" data-id="', product.id, '" type="button" title="Cambiar estado" aria-label="Cambiar estado de ', escapeHtml(product.nombre), '"><i class="bi bi-power"></i></button>',
    '<button class="icon-button" data-product-action="edit" data-id="', product.id, '" type="button" title="Editar con PUT" aria-label="Editar ', escapeHtml(product.nombre), '"><i class="bi bi-pencil"></i></button>',
    '<button class="icon-button danger" data-product-action="delete" data-id="', product.id, '" type="button" title="Eliminar" aria-label="Eliminar ', escapeHtml(product.nombre), '"><i class="bi bi-trash3"></i></button>',
    "</div></td></tr>",
  ].join("")).join("");
}

async function loadProducts() {
  const query = {
    texto: byId("product-search").value,
    categoriaId: byId("product-filter-category").value,
  };
  const result = await api.productos.listar(query);
  state.productos = result.productosResponseDto;
  renderProducts();
}

function productPayload() {
  const form = byId("product-form");
  return {
    codigo: form.elements.codigo.value,
    nombre: form.elements.nombre.value,
    marca: form.elements.marca.value,
    descripcion: form.elements.descripcion.value || null,
    precio: Number(form.elements.precio.value),
    stock: Number(form.elements.stock.value),
    categoriaId: Number(form.elements.categoriaId.value),
    proveedorId: form.elements.proveedorId.value ? Number(form.elements.proveedorId.value) : null,
    activo: form.elements.activo.checked,
  };
}

function resetProductForm(focus = false) {
  const form = byId("product-form");
  state.productoEnEdicion = null;
  form.reset();
  form.classList.remove("was-validated");
  form.elements.activo.checked = true;
  byId("product-method").textContent = "POST";
  byId("product-method").className = "method-badge method-post";
  byId("product-form-title").textContent = "Registrar producto";
  byId("save-product").innerHTML = '<i class="bi bi-database-add me-1"></i>Guardar con POST';
  byId("cancel-product").classList.add("d-none");
  if (focus) form.elements.codigo.focus();
}

function editProduct(product) {
  const form = byId("product-form");
  state.productoEnEdicion = product.id;
  form.elements.codigo.value = product.codigo;
  form.elements.nombre.value = product.nombre;
  form.elements.marca.value = product.marca;
  form.elements.descripcion.value = product.descripcion || "";
  form.elements.precio.value = product.precio;
  form.elements.stock.value = product.stock;
  form.elements.categoriaId.value = product.categoriaId;
  form.elements.proveedorId.value = product.proveedorId || "";
  form.elements.activo.checked = product.activo;
  byId("product-method").textContent = "PUT";
  byId("product-method").className = "method-badge method-put";
  byId("product-form-title").textContent = "Reemplazar producto";
  byId("save-product").innerHTML = '<i class="bi bi-arrow-repeat me-1"></i>Guardar con PUT';
  byId("cancel-product").classList.remove("d-none");
  form.scrollIntoView({ behavior: "smooth", block: "center" });
  form.elements.nombre.focus({ preventScroll: true });
}

async function submitProduct(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    showMessage("Revisa los campos obligatorios del producto", "warning");
    return;
  }
  const button = byId("save-product");
  button.disabled = true;
  try {
    const payload = productPayload();
    const result = state.productoEnEdicion
      ? await api.productos.reemplazar(state.productoEnEdicion, payload)
      : await api.productos.crear(payload);
    showMessage(result.mensaje);
    resetProductForm();
    await Promise.all([loadProducts(), loadStats()]);
  } catch (error) {
    handleError(error);
  } finally {
    button.disabled = false;
  }
}

function userStatus(user) {
  return user.activo
    ? '<span class="status-badge status-active"><i class="bi bi-check-circle"></i>Activo</span>'
    : '<span class="status-badge status-inactive"><i class="bi bi-pause-circle"></i>Inactivo</span>';
}

function renderUsers() {
  byId("users-count").textContent = state.usuarios.length + (state.usuarios.length === 1 ? " registro encontrado" : " registros encontrados");
  if (!state.usuarios.length) {
    byId("users-body").innerHTML = '<tr><td colspan="6" class="empty-state"><i class="bi bi-people"></i>No hay usuarios para mostrar.</td></tr>';
    return;
  }
  byId("users-body").innerHTML = state.usuarios.map((user) => [
    "<tr>",
    '<td><span class="item-title">', escapeHtml(user.nombreCompleto), '</span><span class="item-meta">', escapeHtml(user.correo), "</span></td>",
    "<td>", escapeHtml(user.documento), "</td>",
    '<td><span class="item-title">', escapeHtml(user.telefono || "Sin teléfono"), '</span><span class="item-meta">', escapeHtml(user.direccion || "Sin dirección"), "</span></td>",
    '<td><span class="badge text-bg-light text-capitalize">', escapeHtml(user.rol), "</span></td>",
    "<td>", userStatus(user), "</td>",
    '<td class="text-end"><div class="action-group">',
    '<button class="icon-button" data-user-action="toggle" data-id="', user.id, '" type="button" title="Cambiar estado" aria-label="Cambiar estado de ', escapeHtml(user.nombreCompleto), '"><i class="bi bi-power"></i></button>',
    '<button class="icon-button" data-user-action="edit" data-id="', user.id, '" type="button" title="Editar con PUT" aria-label="Editar ', escapeHtml(user.nombreCompleto), '"><i class="bi bi-pencil"></i></button>',
    '<button class="icon-button danger" data-user-action="delete" data-id="', user.id, '" type="button" title="Eliminar" aria-label="Eliminar ', escapeHtml(user.nombreCompleto), '"><i class="bi bi-trash3"></i></button>',
    "</div></td></tr>",
  ].join("")).join("");
}

async function loadUsers() {
  const query = { texto: byId("user-search").value, rol: byId("user-filter-role").value };
  const result = await api.usuarios.listar(query);
  state.usuarios = result.usuariosResponseDto;
  renderUsers();
}

function userPayload() {
  const form = byId("user-form");
  return {
    documento: form.elements.documento.value,
    nombres: form.elements.nombres.value,
    apellidos: form.elements.apellidos.value,
    correo: form.elements.correo.value,
    telefono: form.elements.telefono.value || null,
    direccion: form.elements.direccion.value || null,
    rol: form.elements.rol.value,
    activo: form.elements.activo.checked,
  };
}

function resetUserForm(focus = false) {
  const form = byId("user-form");
  state.usuarioEnEdicion = null;
  form.reset();
  form.classList.remove("was-validated");
  form.elements.activo.checked = true;
  form.elements.rol.value = "cliente";
  byId("user-method").textContent = "POST";
  byId("user-method").className = "method-badge method-post";
  byId("user-form-title").textContent = "Registrar usuario";
  byId("save-user").innerHTML = '<i class="bi bi-database-add me-1"></i>Guardar con POST';
  byId("cancel-user").classList.add("d-none");
  if (focus) form.elements.documento.focus();
}

function editUser(user) {
  const form = byId("user-form");
  state.usuarioEnEdicion = user.id;
  form.elements.documento.value = user.documento;
  form.elements.nombres.value = user.nombres;
  form.elements.apellidos.value = user.apellidos;
  form.elements.correo.value = user.correo;
  form.elements.telefono.value = user.telefono || "";
  form.elements.direccion.value = user.direccion || "";
  form.elements.rol.value = user.rol;
  form.elements.activo.checked = user.activo;
  byId("user-method").textContent = "PUT";
  byId("user-method").className = "method-badge method-put";
  byId("user-form-title").textContent = "Reemplazar usuario";
  byId("save-user").innerHTML = '<i class="bi bi-arrow-repeat me-1"></i>Guardar con PUT';
  byId("cancel-user").classList.remove("d-none");
  form.scrollIntoView({ behavior: "smooth", block: "center" });
  form.elements.nombres.focus({ preventScroll: true });
}

async function submitUser(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    showMessage("Revisa los campos obligatorios del usuario", "warning");
    return;
  }
  const button = byId("save-user");
  button.disabled = true;
  try {
    const payload = userPayload();
    const result = state.usuarioEnEdicion
      ? await api.usuarios.reemplazar(state.usuarioEnEdicion, payload)
      : await api.usuarios.crear(payload);
    showMessage(result.mensaje);
    resetUserForm();
    await Promise.all([loadUsers(), loadStats()]);
  } catch (error) {
    handleError(error);
  } finally {
    button.disabled = false;
  }
}

function confirmDelete(message) {
  const dialog = byId("confirm-dialog");
  byId("confirm-message").textContent = message;
  return new Promise((resolve) => {
    dialog.addEventListener("close", () => resolve(dialog.returnValue === "confirm"), { once: true });
    dialog.showModal();
  });
}

async function handleProductAction(event) {
  const button = event.target.closest("[data-product-action]");
  if (!button) return;
  const product = state.productos.find((item) => item.id === Number(button.dataset.id));
  if (!product) return;
  try {
    if (button.dataset.productAction === "edit") return editProduct(product);
    if (button.dataset.productAction === "delete") {
      if (!await confirmDelete("Se dará de baja el producto “" + product.nombre + "”. La trazabilidad se conservará.")) return;
      const result = await api.productos.eliminar(product.id);
      showMessage(result.mensaje);
    } else if (button.dataset.productAction === "toggle") {
      await api.productos.actualizar(product.id, { activo: !product.activo });
      showMessage("Estado actualizado con PATCH");
    } else {
      const delta = button.dataset.productAction === "stock-up" ? 1 : -1;
      if (product.stock + delta < 0) return showMessage("El stock no puede ser negativo", "warning");
      await api.productos.actualizar(product.id, { stock: product.stock + delta });
      showMessage("Stock actualizado con PATCH");
    }
    await Promise.all([loadProducts(), loadStats()]);
  } catch (error) {
    handleError(error);
  }
}

async function handleUserAction(event) {
  const button = event.target.closest("[data-user-action]");
  if (!button) return;
  const user = state.usuarios.find((item) => item.id === Number(button.dataset.id));
  if (!user) return;
  try {
    if (button.dataset.userAction === "edit") return editUser(user);
    if (button.dataset.userAction === "delete") {
      if (!await confirmDelete("Se dará de baja al usuario “" + user.nombreCompleto + "”.")) return;
      const result = await api.usuarios.eliminar(user.id);
      showMessage(result.mensaje);
    } else {
      await api.usuarios.actualizar(user.id, { activo: !user.activo });
      showMessage("Estado del usuario actualizado con PATCH");
    }
    await Promise.all([loadUsers(), loadStats()]);
  } catch (error) {
    handleError(error);
  }
}

function switchPanel(button) {
  document.querySelectorAll(".section-tab").forEach((tab) => {
    const active = tab === button;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  document.querySelectorAll(".app-panel").forEach((panel) => panel.classList.toggle("d-none", panel.id !== button.dataset.panel));
  byId(button.dataset.panel).querySelector("h2")?.focus({ preventScroll: true });
}

async function runQuery() {
  const output = byId("query-output");
  output.textContent = "Consultando en la API…";
  try {
    const result = await api.productos.consultar({ activo: true, precioMax: 3000 });
    output.textContent = JSON.stringify(result, null, 2);
  } catch (error) {
    output.textContent = error.message;
    handleError(error);
  }
}

function bindEvents() {
  document.querySelectorAll(".section-tab").forEach((button) =>
    button.addEventListener("click", () => switchPanel(button)));
  byId("product-form").addEventListener("submit", submitProduct);
  byId("user-form").addEventListener("submit", submitUser);
  byId("new-product").addEventListener("click", () => resetProductForm(true));
  byId("cancel-product").addEventListener("click", () => resetProductForm(true));
  byId("new-user").addEventListener("click", () => resetUserForm(true));
  byId("cancel-user").addEventListener("click", () => resetUserForm(true));
  byId("products-body").addEventListener("click", handleProductAction);
  byId("users-body").addEventListener("click", handleUserAction);
  byId("product-search").addEventListener("input", () => {
    window.clearTimeout(productTimer);
    productTimer = window.setTimeout(() => loadProducts().catch(handleError), 280);
  });
  byId("product-filter-category").addEventListener("change", () => loadProducts().catch(handleError));
  byId("user-search").addEventListener("input", () => {
    window.clearTimeout(userTimer);
    userTimer = window.setTimeout(() => loadUsers().catch(handleError), 280);
  });
  byId("user-filter-role").addEventListener("change", () => loadUsers().catch(handleError));
  byId("run-query").addEventListener("click", runQuery);
}

async function initialize() {
  bindEvents();
  try {
    await Promise.all([loadConnection(), loadCatalogs()]);
    await Promise.all([loadProducts(), loadUsers(), loadStats()]);
  } catch (error) {
    handleError(error);
  }
}

initialize();
