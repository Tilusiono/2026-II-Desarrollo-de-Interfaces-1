import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validarMetodoQuery } from "../middlewares/query.middleware.js";

// modifciar
import { vacacionesController as controller } from "../controllers/Vacaciones.controller.js";
// import { validarProductoCompleto } from "../middlewares/validacion.middleware.js";
import {
  VacacionesConsultaDto,
  VacacionesRequestDto,
} from "../dtos/VacacionesDto.js";

import { validarId } from "../middlewares/id.middleware.js";

// import {
//   validarVacacionesCompleta,
//   validarVacacionesParcial,
// } from "../middlewares/validacion.middleware.js";

const router = Router();

// POST
router.post(
  "/",//   validarAreaCompleto,
    asyncHandler((request, response) => {
    const vacacionesRequestDto = new VacacionesRequestDto(request.body);
    return controller.crear(vacacionesRequestDto, response);
  }),
);


// BUSCAR

router.get(
  "/buscar",
  asyncHandler((request, response) => {
    const vacacionesConsultaDto = new VacacionesConsultaDto(request.query);
    return controller.buscar(vacacionesConsultaDto, response);
  }),
);

// QUERY SEARCH

router.use(
  "/consulta",
  validarMetodoQuery,
  asyncHandler((request, response) => {
    const vacacionesConsultaDto = new VacacionesConsultaDto(request.query);
    return controller.consultar(vacacionesConsultaDto, response);
  }),
);

// get
router.get("/", asyncHandler((request, response) => controller.listar(response)));
router.get("/:id",validarId,asyncHandler((request, response) => controller.obtener(Number(request.params.id), response),
  ),
);


// REEMPLAZAR

router.put(
  "/:id",
  validarId,
  // validarVacacionesCompletas,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const vacacionesRequestDto = new VacacionesRequestDto(request.body);
    return controller.reemplazar(id, vacacionesRequestDto, response);
  }),
);

// ACTUALIZA UNO
router.patch(
  "/:id",
  validarId,
  // validarVacacionesParcial,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const vacacionesRequestDto = new VacacionesRequestDto(request.body);
    return controller.actualizar(id, vacacionesRequestDto, response);
  }),
);


// DELETE ELIMINAR
router.delete(
  "/:id",
  validarId,
  asyncHandler((request, response) =>
    controller.eliminar(Number(request.params.id), response),
  ),
);


export default router;



