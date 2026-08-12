import { Router } from "express";
import { procesadoresController as controller } from "../controllers/procesadores.controller.js";
import { ProcesadorConsultaDto, ProcesadorRequestDto } from "../dtos/ProcesadorDto.js";
import { validarId } from "../middlewares/id.middleware.js";
import { validarMetodoQuery } from "../middlewares/query.middleware.js";
import { exigirPermisoEscritura } from "../middlewares/security.middleware.js";
import { validarProcesadorCompleto, validarProcesadorParcial } from "../middlewares/validacion.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.use(exigirPermisoEscritura);

router.get("/", asyncHandler((request, response) => controller.listar(response)));
router.get("/modos/callback", (request, response, next) => controller.listarConCallback(response, next));
router.get("/modos/promesa", asyncHandler((request, response) => controller.listarConPromesa(response)));
router.get("/estadisticas", asyncHandler((request, response) => controller.estadisticas(response)));

router.use(
  "/consulta",
  validarMetodoQuery,
  asyncHandler((request, response) => {
    const procesadorConsultaDto = new ProcesadorConsultaDto(request.query);
    return controller.consultar(procesadorConsultaDto, response);
  }),
);

router.get(
  "/buscar",
  asyncHandler((request, response) => {
    const procesadorConsultaDto = new ProcesadorConsultaDto(request.query);
    return controller.buscar(procesadorConsultaDto, response);
  }),
);

router.get(
  "/:id/historial",
  validarId,
  asyncHandler((request, response) => controller.historial(Number(request.params.id), response)),
);

router.get(
  "/:id",
  validarId,
  asyncHandler((request, response) => controller.obtener(Number(request.params.id), response)),
);

router.post(
  "/",
  validarProcesadorCompleto,
  asyncHandler((request, response) => {
    const procesadorRequestDto = new ProcesadorRequestDto(request.body);
    return controller.crear(procesadorRequestDto, response);
  }),
);

router.put(
  "/:id",
  validarId,
  validarProcesadorCompleto,
  asyncHandler((request, response) => {
    const procesadorRequestDto = new ProcesadorRequestDto(request.body);
    return controller.reemplazar(Number(request.params.id), procesadorRequestDto, response);
  }),
);

router.patch(
  "/:id",
  validarId,
  validarProcesadorParcial,
  asyncHandler((request, response) => {
    const procesadorRequestDto = new ProcesadorRequestDto(request.body);
    return controller.actualizar(Number(request.params.id), procesadorRequestDto, response);
  }),
);

router.delete(
  "/:id",
  validarId,
  asyncHandler((request, response) => controller.eliminar(Number(request.params.id), response)),
);

export default router;
