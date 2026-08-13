import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";

import { TarjetasGraficasController } from "../src/controllers/tarjetasGraficas.controller.js";
import {
  TarjetaGraficaConsultaDto,
  TarjetaGraficaRequestDto,
} from "../src/dtos/TarjetaGraficaDto.js";
import TarjetaGrafica from "../src/models/TarjetaGrafica.js";
import { TarjetaGraficaRepository } from "../src/repositories/TarjetaGraficaRepository.js";
import { TarjetasGraficasService } from "../src/services/tarjetasGraficas.service.js";
import {
  validarTarjetaGraficaCompleto,
  validarTarjetaGraficaParcial,
} from "../src/validators/tarjetaGrafica.validator.js";

const repository = new TarjetaGraficaRepository(":memory:");
const service = new TarjetasGraficasService(repository);

beforeEach(async () => {
  await repository.vaciar();
});

function crearRequestDto(cambios = {}) {
  return new TarjetaGraficaRequestDto({
    codigo: "GPU-001",
    modelo: "NVIDIA GeForce RTX 4060",
    fabricante: "NVD",
    memoriaGb: 8,
    precio: 1499.9,
    frecuenciaMhz: 2535,
    descripcion: "Tarjeta gráfica para desarrollo y diseño",
    registro: true,
    fechaLanzamiento: "2023-01-10",
    horaRegistro: "10:30",
    fechaHoraRegistro: "2026-08-03T10:30",
    imagenBase64:
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
    ...cambios,
  });
}

test("TarjetaGrafica mantiene al menos cinco variables privadas y cinco públicas", () => {
  const tarjetaGraficaModel = new TarjetaGrafica(
    1,
    "GPU-001",
    "NVIDIA GeForce RTX 4060",
    "NVD",
    8,
    1499.9,
    2535,
    null,
    true,
    "2023-01-10",
    "10:30",
    "2026-08-03T10:30",
    null,
    null,
  );

  assert.equal(tarjetaGraficaModel.id, 1);
  assert.equal(tarjetaGraficaModel.codigo, "GPU-001");
  assert.equal(tarjetaGraficaModel.modelo, "NVIDIA GeForce RTX 4060");
  assert.equal(tarjetaGraficaModel.fabricante, "NVD");
  assert.equal(tarjetaGraficaModel.memoriaGb, 8);
  assert.equal(tarjetaGraficaModel.precio, 1499.9);
  assert.equal(tarjetaGraficaModel.descripcion, null);
});

test("Repository y Service ejecutan CRUD con DTO y Model", async () => {
  const creado = await service.crear(crearRequestDto());
  assert.equal(creado.id, 1);
  assert.match(creado.imagenBase64, /^data:image\/gif;base64,/);

  const listado = await service.listar();
  assert.equal(listado.length, 1);

  const filtrados = await service.buscar(
    new TarjetaGraficaConsultaDto({ fabricante: "NVD", registro: "true" }),
  );
  assert.equal(filtrados.length, 1);

  const reemplazado = await service.reemplazar(
    creado.id,
    crearRequestDto({
      modelo: "NVIDIA GeForce RTX 4060 actualizado",
      imagenBase64: null,
    }),
  );
  assert.equal(reemplazado.modelo, "NVIDIA GeForce RTX 4060 actualizado");
  assert.equal(reemplazado.imagenBase64, null);

  const actualizado = await service.actualizar(
    creado.id,
    new TarjetaGraficaRequestDto({ memoriaGb: 12, descripcion: null }),
  );
  assert.equal(actualizado.memoriaGb, 12);
  assert.equal(actualizado.descripcion, null);

  const eliminado = await service.eliminar(creado.id);
  assert.equal(eliminado.id, creado.id);
  assert.equal((await service.listar()).length, 0);
});

test("Controller recibe DTO e id, no el request de Express", async () => {
  const controller = new TarjetasGraficasController(service);
  const response = {
    statusCode: 200,
    body: null,
    status(codigo) {
      this.statusCode = codigo;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };

  await controller.crear(crearRequestDto(), response);
  assert.equal(response.statusCode, 201);
  assert.equal(response.body.tarjetaGraficaResponseDto.codigo, "GPU-001");

  await controller.obtener(1, response);
  assert.equal(response.body.tarjetaGraficaResponseDto.id, 1);
});

test("Validadores separan POST/PUT completo de PATCH parcial", () => {
  assert.deepEqual(validarTarjetaGraficaCompleto(crearRequestDto()), []);
  assert.deepEqual(validarTarjetaGraficaParcial({ registro: false }), []);
  assert.ok(validarTarjetaGraficaParcial({}).length > 0);
  assert.ok(validarTarjetaGraficaCompleto({}).length > 0);
});
