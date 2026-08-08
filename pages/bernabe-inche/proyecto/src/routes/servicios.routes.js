import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

import { ServicioRequestDto  } from "../dtos/ServicioDto.js";
//import { validarServicioCompleto as validacion } from "../middlewares/validacion.middleware.js";
import { serviciosController as controller } from "../controllers/servicios.controller.js";
import { validarId } from "../middlewares/id.middleware.js";

const router = Router();

router.post(
  "/",
  asyncHandler((request, response) => {
    const servicioRequestDto = new ServicioRequestDto(request.body);
    return controller.crear(servicioRequestDto, response);
  }),
);
router.get("/",             asyncHandler((request, response) => controller.listar(response)));
router.get("/:id",validarId,asyncHandler((request, response) => controller.obtener(Number(request.params.id), response),),);

router.put("/:id",validarId,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const servicioRequestDto = new ServicioRequestDto(request.body);
    return controller.modificarControlador(id, servicioRequestDto, response);
  }),
);

export default router;
