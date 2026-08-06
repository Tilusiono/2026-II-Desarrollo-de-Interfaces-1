import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

import { ServicioRequestDto  } from "../dtos/ServicioDto.js";
//import { validarServicioCompleto as validacion } from "../middlewares/validacion.middleware.js";
import { serviciosController as controller } from "../controllers/servicios.controller.js";


const router = Router();

router.post(
  "/",
  asyncHandler((request, response) => {
    const servicioRequestDto = new ServicioRequestDto(request.body);
    return controller.crear(servicioRequestDto, response);
  }),
);

export default router;
