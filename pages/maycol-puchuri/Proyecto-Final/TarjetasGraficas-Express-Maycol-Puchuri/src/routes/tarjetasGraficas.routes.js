import { Router } from "express";
import { tarjetasGraficasController as controller } from "../controllers/tarjetasGraficas.controller.js";
import {
  TarjetaGraficaConsultaDto,
  TarjetaGraficaRequestDto,
} from "../dtos/TarjetaGraficaDto.js";
import { validarId } from "../middlewares/id.middleware.js";
import { validarMetodoQuery } from "../middlewares/query.middleware.js";
import {
  validarTarjetaGraficaCompleto,
  validarTarjetaGraficaParcial,
} from "../middlewares/validacion.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get(
  "/",
  asyncHandler((request, response) => controller.listar(response)),
);

router.use(
  "/consulta",
  validarMetodoQuery,
  asyncHandler((request, response) => {
    const tarjetaGraficaConsultaDto = new TarjetaGraficaConsultaDto(request.query);
    return controller.consultar(tarjetaGraficaConsultaDto, response);
  }),
);

router.get(
  "/buscar",
  asyncHandler((request, response) => {
    const tarjetaGraficaConsultaDto = new TarjetaGraficaConsultaDto(request.query);
    return controller.buscar(tarjetaGraficaConsultaDto, response);
  }),
);

router.get(
  "/:id",
  validarId,
  asyncHandler((request, response) =>
    controller.obtener(Number(request.params.id), response),
  ),
);

router.post(
  "/",
  validarTarjetaGraficaCompleto,
  asyncHandler((request, response) => {
    const tarjetaGraficaRequestDto = new TarjetaGraficaRequestDto(request.body);
    return controller.crear(tarjetaGraficaRequestDto, response);
  }),
);

router.put(
  "/:id",
  validarId,
  validarTarjetaGraficaCompleto,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const tarjetaGraficaRequestDto = new TarjetaGraficaRequestDto(request.body);
    return controller.reemplazar(id, tarjetaGraficaRequestDto, response);
  }),
);

router.patch(
  "/:id",
  validarId,
  validarTarjetaGraficaParcial,
  asyncHandler((request, response) => {
    const tarjetaGraficaRequestDto = new TarjetaGraficaRequestDto(request.body);
    return controller.actualizar(
      Number(request.params.id),
      tarjetaGraficaRequestDto,
      response,
    );
  }),
);

router.delete(
  "/:id",
  validarId,
  asyncHandler((request, response) =>
    controller.eliminar(Number(request.params.id), response),
  ),
);

export default router;
