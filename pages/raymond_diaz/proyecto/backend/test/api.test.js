import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, before, test } from "node:test";
import { DatabaseSync } from "node:sqlite";

const testDirectory = mkdtempSync(path.join(tmpdir(), "tienda-computadoras-"));
process.env.DB_PATH = path.join(testDirectory, "test.sqlite");
process.env.DB_SEED = "false";

let server;
let baseUrl;
let database;
let closeDatabase;

before(async () => {
  const appModule = await import("../app.js?integration-test");
  const databaseModule = await import("../src/config/database.js");
  database = databaseModule.getDatabase();
  closeDatabase = databaseModule.closeDatabase;
  database.prepare("INSERT INTO categorias (id, nombre, descripcion) VALUES (1, 'Laptops', 'Equipos portátiles')").run();
  database.prepare("INSERT INTO proveedores (id, ruc, razon_social) VALUES (1, '20123456789', 'Proveedor de prueba')").run();
  server = appModule.app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = "http://127.0.0.1:" + server.address().port;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  closeDatabase();
});

async function request(method, resource, body, headers = {}) {
  const response = await fetch(baseUrl + resource, {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return {
    status: response.status,
    headers: response.headers,
    data: await response.json(),
  };
}

function product(overrides = {}) {
  return {
    codigo: "LAP-TEST-01",
    nombre: "Laptop de prueba",
    marca: "Lenovo",
    descripcion: "Equipo creado por la prueba automatizada",
    precio: 2500.9,
    stock: 8,
    categoriaId: 1,
    proveedorId: 1,
    activo: true,
    ...overrides,
  };
}

function user(overrides = {}) {
  return {
    documento: "76543210",
    nombres: "Lucía",
    apellidos: "Ramos Vega",
    correo: "lucia.ramos@example.com",
    telefono: "987654399",
    direccion: "Lima, Perú",
    rol: "cliente",
    activo: true,
    ...overrides,
  };
}

test("GET /api comprueba la conexión y aplica encabezados de seguridad", async () => {
  const response = await request("GET", "/api");
  assert.equal(response.status, 200);
  assert.equal(response.data.baseDatos, "SQLite conectada");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
});

test("middleware valida datos, IDs y el verbo QUERY", async () => {
  const invalidPost = await request("POST", "/api/productos", {});
  assert.equal(invalidPost.status, 400);
  assert.equal(invalidPost.data.error.codigo, "VALIDATION_ERROR");
  assert.ok(invalidPost.data.error.detalles.length >= 7);

  const invalidPatch = await request("PATCH", "/api/productos/1", {});
  assert.equal(invalidPatch.status, 400);
  assert.match(invalidPatch.data.error.detalles[0], /al menos un campo/);

  assert.equal((await request("GET", "/api/productos/no-es-id")).status, 400);
  assert.equal((await request("GET", "/api/productos/consulta")).status, 405);
});

test("CRUD de productos recorre POST, GET, PUT, PATCH, QUERY y DELETE", async () => {
  const created = await request("POST", "/api/productos", product());
  assert.equal(created.status, 201);
  assert.match(created.headers.get("location"), /^\/api\/productos\/\d+$/);
  const id = created.data.productoResponseDto.id;

  const listed = await request("GET", "/api/productos");
  assert.equal(listed.status, 200);
  assert.equal(listed.data.total, 1);

  const found = await request("GET", "/api/productos/" + id);
  assert.equal(found.data.productoResponseDto.codigo, "LAP-TEST-01");

  const searched = await request("GET", "/api/productos/buscar?texto=Lenovo&categoriaId=1");
  assert.equal(searched.data.total, 1);

  const queried = await request("QUERY", "/api/productos/consulta?precioMax=3000&activo=true");
  assert.equal(queried.status, 200);
  assert.equal(queried.data.metodo, "QUERY");
  assert.equal(queried.data.total, 1);

  const replaced = await request("PUT", "/api/productos/" + id, product({
    nombre: "Laptop reemplazada con PUT",
    precio: 2399.9,
    stock: 10,
  }));
  assert.equal(replaced.status, 200);
  assert.equal(replaced.data.productoResponseDto.nombre, "Laptop reemplazada con PUT");

  const patched = await request("PATCH", "/api/productos/" + id, { stock: 12, activo: false });
  assert.equal(patched.status, 200);
  assert.equal(patched.data.productoResponseDto.stock, 12);
  assert.equal(patched.data.productoResponseDto.activo, false);
  const movements = database.prepare("SELECT COUNT(*) AS total FROM movimientos_inventario WHERE producto_id = ?").get(id);
  assert.equal(movements.total, 3);

  const deleted = await request("DELETE", "/api/productos/" + id);
  assert.equal(deleted.status, 200);
  assert.equal((await request("GET", "/api/productos/" + id)).status, 404);
});

test("restricciones SQL evitan duplicados y referencias inexistentes", async () => {
  assert.equal((await request("POST", "/api/productos", product({ codigo: "UNIQUE-01" }))).status, 201);
  const duplicate = await request("POST", "/api/productos", product({ codigo: "UNIQUE-01" }));
  assert.equal(duplicate.status, 409);
  assert.equal(duplicate.data.error.codigo, "DUPLICATE");

  const foreignKey = await request("POST", "/api/productos", product({ codigo: "FOREIGN-01", categoriaId: 999 }));
  assert.equal(foreignKey.status, 400);
  assert.equal(foreignKey.data.error.codigo, "FOREIGN_KEY");
});

test("CRUD de usuarios recorre todos los métodos requeridos", async () => {
  const created = await request("POST", "/api/usuarios", user());
  assert.equal(created.status, 201);
  const id = created.data.usuarioResponseDto.id;

  assert.equal((await request("GET", "/api/usuarios")).data.total, 1);
  assert.equal((await request("GET", "/api/usuarios/" + id)).data.usuarioResponseDto.documento, "76543210");
  assert.equal((await request("GET", "/api/usuarios/buscar?texto=Luc%C3%ADa&rol=cliente")).data.total, 1);

  const replaced = await request("PUT", "/api/usuarios/" + id, user({ telefono: "999888777", rol: "vendedor" }));
  assert.equal(replaced.data.usuarioResponseDto.rol, "vendedor");

  const patched = await request("PATCH", "/api/usuarios/" + id, { activo: false });
  assert.equal(patched.data.usuarioResponseDto.activo, false);

  assert.equal((await request("DELETE", "/api/usuarios/" + id)).status, 200);
  assert.equal((await request("GET", "/api/usuarios/" + id)).status, 404);
});

test("las peticiones concurrentes se serializan sin perder registros", async () => {
  const responses = await Promise.all(
    Array.from({ length: 8 }, (_, index) =>
      request("POST", "/api/productos", product({
        codigo: "CONC-" + String(index + 1).padStart(2, "0"),
        nombre: "Producto concurrente " + (index + 1),
        stock: index + 1,
      }))
    ),
  );
  assert.ok(responses.every((response) => response.status === 201));
  const total = database.prepare("SELECT COUNT(*) AS total FROM productos WHERE codigo LIKE 'CONC-%'").get();
  assert.equal(total.total, 8);
});

test("las estadísticas se calculan en un Worker Thread", async () => {
  await request("POST", "/api/usuarios", user({
    documento: "70000001",
    correo: "worker@example.com",
    nombres: "Usuario",
    apellidos: "Worker",
  }));
  const response = await request("GET", "/api/estadisticas/resumen");
  assert.equal(response.status, 200);
  assert.equal(response.data.resumen.calculadoEnHiloSecundario, true);
  assert.ok(response.data.resumen.hiloId > 0);
  assert.ok(response.data.resumen.productosActivos >= 8);
});

test("SELECT parametrizado bloquea inyección SQL y conserva las tablas", async () => {
  const attack = encodeURIComponent("' OR 1=1 --");
  const response = await request("GET", "/api/productos/buscar?texto=" + attack);
  assert.equal(response.status, 200);
  assert.equal(response.data.total, 0);
  const table = database.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'productos'").get();
  assert.equal(table.name, "productos");
});

test("la API key opcional protege escrituras sin afectar las lecturas", async () => {
  process.env.API_KEY = "clave-de-prueba";
  const denied = await request("POST", "/api/usuarios", user({
    documento: "70000002",
    correo: "denied@example.com",
  }));
  assert.equal(denied.status, 401);

  const allowed = await request("POST", "/api/usuarios", user({
    documento: "70000003",
    correo: "allowed@example.com",
  }), { "x-api-key": "clave-de-prueba" });
  assert.equal(allowed.status, 201);
  assert.equal((await request("GET", "/api/usuarios")).status, 200);
  delete process.env.API_KEY;
});

test("los registros permanecen en el archivo SQLite", () => {
  const secondConnection = new DatabaseSync(process.env.DB_PATH, { readOnly: true });
  const result = secondConnection.prepare("SELECT COUNT(*) AS total FROM productos").get();
  secondConnection.close();
  assert.ok(result.total >= 9);
});
