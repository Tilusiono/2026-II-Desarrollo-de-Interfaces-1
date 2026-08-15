async function request(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error?.mensaje || "Error HTTP " + response.status);
    error.details = payload.error?.detalles || [];
    error.status = response.status;
    throw error;
  }
  return payload;
}

function params(query = {}) {
  const search = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) search.set(key, value);
  });
  return search.size ? "?" + search : "";
}

export const api = {
  estado: () => request("/api"),
  catalogos: () => request("/api/catalogos"),
  estadisticas: () => request("/api/estadisticas/resumen"),
  productos: {
    listar: (query) => request("/api/productos" + params(query)),
    consultar: (query) => request("/api/productos/consulta" + params(query), { method: "QUERY" }),
    crear: (body) => request("/api/productos", { method: "POST", body: JSON.stringify(body) }),
    reemplazar: (id, body) => request("/api/productos/" + id, { method: "PUT", body: JSON.stringify(body) }),
    actualizar: (id, body) => request("/api/productos/" + id, { method: "PATCH", body: JSON.stringify(body) }),
    eliminar: (id) => request("/api/productos/" + id, { method: "DELETE" }),
  },
  usuarios: {
    listar: (query) => request("/api/usuarios" + params(query)),
    crear: (body) => request("/api/usuarios", { method: "POST", body: JSON.stringify(body) }),
    reemplazar: (id, body) => request("/api/usuarios/" + id, { method: "PUT", body: JSON.stringify(body) }),
    actualizar: (id, body) => request("/api/usuarios/" + id, { method: "PATCH", body: JSON.stringify(body) }),
    eliminar: (id) => request("/api/usuarios/" + id, { method: "DELETE" }),
  },
};
