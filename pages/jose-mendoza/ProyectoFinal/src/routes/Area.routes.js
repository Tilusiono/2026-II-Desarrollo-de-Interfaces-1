import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validarMetodoQuery } from "../middlewares/query.middleware.js";

// modifciar
import { areaController as controller } from "../controllers/Area.controller.js";
// import { validarProductoCompleto } from "../middlewares/validacion.middleware.js";
import {AreaConsultaDto,AreaRequestDto}from "../dtos/AreaDto.js";
import { validarId } from "../middlewares/id.middleware.js";

// import {
//   validarAreaCompleta,
//   validarAreaParcial,
// } from "../middlewares/validacion.middleware.js";

const router = Router();




router.post(
  "/",
    //   validarAreaCompleto,
    asyncHandler((request, response) => {
    const areaRequestDto = new AreaRequestDto(request.body);
    return controller.crear(areaRequestDto, response);
  }),
);

// BUSCAR
router.get(
  "/buscar",
  asyncHandler((request, response) => {
    const areaConsultaDto = new AreaConsultaDto(request.query);
    return controller.buscar(areaConsultaDto, response);
  }),
);

// QUERY SEARCH

router.use(
  "/consulta",
  validarMetodoQuery,
  asyncHandler((request, response) => {
    const areaConsultaDto = new AreaConsultaDto(request.query);
    return controller.consultar(areaConsultaDto, response);
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


// REEMPLAZAR

router.put(
  "/:id",
  validarId,
  // validarAreaCompleta,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const areaRequestDto = new AreaRequestDto(request.body);
    return controller.reemplazar(id, areaRequestDto, response);
  }),
);

// ACTUALIZAR UNO
router.patch(
  "/:id",
  validarId,
  // validarAreaParcial,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const areaRequestDto = new AreaRequestDto(request.body);
    return controller.actualizar(id, areaRequestDto, response);
  }),
);


export default router;
