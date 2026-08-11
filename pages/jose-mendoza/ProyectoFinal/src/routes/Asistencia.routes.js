import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validarMetodoQuery } from "../middlewares/query.middleware.js";

// modifciar
import { asistenciaController as controller } from "../controllers/Asistencia.controller.js";
// import { validarProductoCompleto } from "../middlewares/validacion.middleware.js";
import {
  AsistenciaConsultaDto,
  AsistenciaRequestDto,
} from "../dtos/AsistenciaDto.js";

import { validarId } from "../middlewares/id.middleware.js";

// para ultimo
// import {
//   validarAsistenciaCompleta,
//   validarAsistenciaParcial,
// } from "../middlewares/validacion.middleware.js";


const router = Router();


router.post(
  "/",
    //   validarAreaCompleto,
    asyncHandler((request, response) => {
    const asistenciaRequestDto = new AsistenciaRequestDto(request.body);
    return controller.crear(asistenciaRequestDto, response);
  }),
);

// BUSCAR

router.get(
  "/buscar",
  asyncHandler((request, response) => {
    const asistenciaConsultaDto = new AsistenciaConsultaDto(request.query);
    return controller.buscar(asistenciaConsultaDto, response);
  }),
);

// QUERY SEARCH
router.use(
  "/consulta",
  validarMetodoQuery,
  asyncHandler((request, response) => {
    const asistenciaConsultaDto = new AsistenciaConsultaDto(request.query);
    return controller.consultar(asistenciaConsultaDto, response);
  }),
);

router.get("/", asyncHandler((request, response) => controller.listar(response)));
router.get(
  "/:id",
  validarId,
  asyncHandler((request, response) =>
    controller.obtener(Number(request.params.id), response),
  ),
);


// REEMPAZR

router.put(
  "/:id",
  validarId,
  // validarAsistenciaCompleta,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const asistenciaRequestDto = new AsistenciaRequestDto(request.body);
    return controller.reemplazar(id, asistenciaRequestDto, response);
  }),
);

// ACTUALIZA 

router.patch(
  "/:id",
  validarId,
  // validarAsistenciaParcial,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const asistenciaRequestDto = new AsistenciaRequestDto(request.body);
    return controller.actualizar(id, asistenciaRequestDto, response);
  }),
);

export default router;
