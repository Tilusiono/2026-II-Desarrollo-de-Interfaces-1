import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validarMetodoQuery } from "../middlewares/query.middleware.js";

// modifciar
import { sedesController as controller } from "../controllers/Sede.controller.js";
// import { validarProductoCompleto } from "../middlewares/validacion.middleware.js";
import {
  SedeConsultaDto,
  SedeRequestDto,
} from "../dtos/SedeDto.js";

import { validarId } from "../middlewares/id.middleware.js";

// import {
//   validarSedeCompleta,
//   validarSedeParcial,
// } from "../middlewares/validacion.middleware.js";

const router = Router();


router.post(
  "/",
    //   validarAreaCompleto,
    asyncHandler((request, response) => {
    const sedeRequestDto = new SedeRequestDto(request.body);
    return controller.crear(sedeRequestDto, response);
  }),
);

// BUSCAR

router.get(
  "/buscar",
  asyncHandler((request, response) => {
    const sedeConsultaDto = new SedeConsultaDto(request.query);
    return controller.buscar(sedeConsultaDto, response);
  }),
);

// QUERY SEARCH

router.use(
  "/consulta",
  validarMetodoQuery,
  asyncHandler((request, response) => {
    const sedeConsultaDto = new SedeConsultaDto(request.query);
    return controller.consultar(sedeConsultaDto, response);
  }),
);

// GET
router.get("/", asyncHandler((request, response) => controller.listar(response)));
router.get(
  "/:id",
  validarId,
  asyncHandler((request, response) =>
    controller.obtener(Number(request.params.id), response),
  ),
);


// reemplzar

router.put(
  "/:id",
  validarId,
  // validarSedeCompleta,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const sedeRequestDto = new SedeRequestDto(request.body);
    return controller.reemplazar(id, sedeRequestDto, response);
  }),
);


router.patch(
  "/:id",
  validarId,
  // validarSedeParcial,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const sedeRequestDto = new SedeRequestDto(request.body);
    return controller.actualizar(id, sedeRequestDto, response);
  }),
);

export default router;
