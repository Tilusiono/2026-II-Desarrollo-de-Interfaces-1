import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";

import { ProcesadoresController } from "../src/controllers/procesadores.controller.js";
import { ProcesadorConsultaDto, ProcesadorRequestDto } from "../src/dtos/ProcesadorDto.js";
import ComponenteComputo from "../src/models/ComponenteComputo.js";
import Procesador from "../src/models/Procesador.js";
import { ProcesadorRepository } from "../src/repositories/ProcesadorRepository.js";
import { ProcesadoresService } from "../src/services/procesadores.service.js";
import { exigirPermisoEscritura } from "../src/middlewares/security.middleware.js";
import { validarProcesadorCompleto, validarProcesadorParcial } from "../src/validators/procesador.validator.js";

const repository = new ProcesadorRepository(":memory:");
const service = new ProcesadoresService(repository);

beforeEach(async () => {
  await repository.vaciar();
});

function crearRequestDto(cambios = {}) {
  return new ProcesadorRequestDto({
    codigo: "P-TEST-001",
    modelo: "AMD Ryzen 5 5600G",
    arquitectura: "X64",
    nucleos: 8,
    precio: 799.9,
    frecuenciaGhz: 3.9,
    descripcion: "Procesador de ejemplo",
    registro: true,
    fechaLanzamiento: "2024-01-15",
    horaRegistro: "10:30",
    fechaHoraRegistro: "2026-08-11T10:30",
    imagenBase64: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
    ...cambios,
  });
}

test("POO usa solo dos clases de dominio y Procesador hereda de ComponenteComputo", () => {
  const procesador = new Procesador(
    1, "P-001", "Ryzen", "X64", 8, 799.9, 3.9, "Verificación", true,
    "2024-01-15", "10:30", "2026-08-11T10:30", null, null,
  );
  assert.ok(procesador instanceof Procesador);
  assert.ok(procesador instanceof ComponenteComputo);
  assert.equal(procesador.id, 1);
  assert.equal(procesador.codigo, "P-001");
  assert.match(procesador.obtenerResumen(), /Ryzen/);
});

test("Repository y Service ejecutan operaciones con SQLite", async () => {
  const creado = await service.crear(crearRequestDto());
  assert.equal(creado.id, 1);
  assert.match(creado.imagenBase64, /^data:image\/gif;base64,/);

  const listado = await service.listar();
  assert.equal(listado.length, 1);

  const filtrados = await service.buscar(new ProcesadorConsultaDto({ arquitectura: "X64", registro: "true" }));
  assert.equal(filtrados.length, 1);

  const reemplazado = await service.reemplazar(creado.id, crearRequestDto({ modelo: "AMD Ryzen actualizado", imagenBase64: null }));
  assert.equal(reemplazado.modelo, "AMD Ryzen actualizado");

  const actualizado = await service.actualizar(creado.id, new ProcesadorRequestDto({ nucleos: 12, descripcion: null }));
  assert.equal(actualizado.nucleos, 12);

  const eliminado = await service.eliminar(creado.id);
  assert.equal(eliminado.id, creado.id);
  assert.equal((await service.listar()).length, 0);
});

test("Repository registra auditoría dentro de transacciones", async () => {
  const creado = await service.crear(crearRequestDto());
  await service.actualizar(creado.id, new ProcesadorRequestDto({ precio: 850 }));
  const historial = await service.historial(creado.id);
  assert.ok(historial.length >= 2);
  assert.equal(historial[0].accion, "UPDATE");
  assert.equal(historial.at(-1).accion, "INSERT");
});

test("Controller recibe DTO e id sin acoplarse al request de Express", async () => {
  const controller = new ProcesadoresController(service);
  const response = {
    statusCode: 200,
    body: null,
    status(codigo) { this.statusCode = codigo; return this; },
    json(body) { this.body = body; return this; },
  };

  await controller.crear(crearRequestDto(), response);
  assert.equal(response.statusCode, 201);
  assert.equal(response.body.procesadorResponseDto.codigo, "P-TEST-001");
  await controller.obtener(1, response);
  assert.equal(response.body.procesadorResponseDto.id, 1);
});

test("Validadores separan POST/PUT completo de PATCH parcial", () => {
  assert.deepEqual(validarProcesadorCompleto(crearRequestDto()), []);
  assert.deepEqual(validarProcesadorParcial({ registro: false }), []);
  assert.ok(validarProcesadorParcial({}).length > 0);
  assert.ok(validarProcesadorCompleto({}).length > 0);
});

test("Service evidencia callbacks y promesas", async () => {
  await service.crear(crearRequestDto());
  const porPromesa = await service.listarConPromesa();
  assert.equal(porPromesa.length, 1);

  const porCallback = await new Promise((resolve, reject) => {
    service.listarConCallback((error, datos) => error ? reject(error) : resolve(datos));
  });
  assert.equal(porCallback.length, 1);
});

test("Worker Thread calcula estadísticas fuera del hilo principal", async () => {
  await service.crear(crearRequestDto());
  await service.crear(crearRequestDto({ codigo: "P-TEST-002", nucleos: 16, precio: 1200, frecuenciaGhz: 4.2 }));
  const estadisticas = await service.estadisticas();
  assert.equal(estadisticas.total, 2);
  assert.equal(estadisticas.totalNucleos, 24);
  assert.equal(estadisticas.valorTotal, 1999.9);
});

test("Middleware de permisos bloquea escrituras sin x-api-key", () => {
  const request = { method: "POST", get: () => undefined };
  const response = {
    statusCode: 200,
    body: null,
    status(codigo) { this.statusCode = codigo; return this; },
    json(body) { this.body = body; return this; },
  };
  let continuo = false;
  exigirPermisoEscritura(request, response, () => { continuo = true; });
  assert.equal(continuo, false);
  assert.equal(response.statusCode, 403);
});
