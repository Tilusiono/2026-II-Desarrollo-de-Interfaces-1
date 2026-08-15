import assert from "node:assert/strict";
import { existsSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, before, test } from "node:test";

const testDirectory = mkdtempSync(path.join(tmpdir(), "productos-ventana-"));
const testDatabase = path.join(testDirectory, "productos.sqlite");
process.env.SQLITE_PATH = testDatabase;

let server;
let baseUrl;

before(async () => {
  const { app } = await import("../app.js?test-ventana");
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  delete process.env.SQLITE_PATH;
});

test("la ventana y sus recursos visuales cargan correctamente", async () => {
  const pageResponse = await fetch(`${baseUrl}/`);
  assert.equal(pageResponse.status, 200);
  assert.match(await pageResponse.text(), /Configuración correcta/);

  for (const resource of [
    "/bootstrap/css/bootstrap.min.css",
    "/bootstrap/js/bootstrap.bundle.min.js",
    "/bootstrap-icons/font/bootstrap-icons.css",
    "/bootstrap-icons/font/fonts/bootstrap-icons.woff2",
  ]) {
    const response = await fetch(`${baseUrl}${resource}`);
    assert.equal(response.status, 200, `${resource} debe estar disponible`);
  }
});

test("la API permite listar y registrar un producto", async () => {
  const initialResponse = await fetch(`${baseUrl}/api/productos`);
  assert.equal(initialResponse.status, 200);
  assert.equal((await initialResponse.json()).total, 0);

  const createResponse = await fetch(`${baseUrl}/api/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      codigo: "TEC-TEST-01",
      nombre: "Producto de prueba",
      categoria: "TEC",
      stock: 5,
      precio: 149.9,
      peso: 1.2,
      descripcion: "Registro temporal creado por node:test",
      activo: true,
      fechaVencimiento: null,
      horaRegistro: "10:30",
      fechaHoraRegistro: "2026-08-15T10:30:00-05:00",
      imagenBase64: null,
    }),
  });
  assert.equal(createResponse.status, 201);

  const finalResponse = await fetch(`${baseUrl}/api/productos`);
  const result = await finalResponse.json();
  assert.equal(result.total, 1);
  assert.equal(result.productosResponseDto[0].codigo, "TEC-TEST-01");
  assert.equal(existsSync(testDatabase), true);
});
