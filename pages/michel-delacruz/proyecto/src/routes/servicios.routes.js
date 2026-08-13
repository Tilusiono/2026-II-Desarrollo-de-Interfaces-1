import { Router } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";

import { ServiciosRequestDto} from "../dtos/ServiciosDto.js";
//import { validarServiciostoCompleto as validacion } from "../middlewares/validacion.middleware.js";
import { serviciosController as controller } from "../controllers/productos.controller.js";


const router = Router();

router.post(
  "/",
  null,
  asyncHandler((request, response) => {
    const servicioRequestDto = new ServiciosRequestDto(request.body);
    return controller.crear(servicioRequestDto, response);
  }),
);

export default router;
