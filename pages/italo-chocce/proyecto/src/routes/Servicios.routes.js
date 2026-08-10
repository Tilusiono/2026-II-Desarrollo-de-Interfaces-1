import { Router } from "express";
import { serviciosController as controller } from "../controllers/Servicios.controller.js";
import { validarServicioCompleto } from "../middlewares/Servicios.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ServicioRequestDto } from "../dtos/Servicios.dto.js";

const router = Router();

router.post(
  "/",
  validarServicioCompleto,
  asyncHandler((request, response) => {
    const servicioRequestDto = new ServicioRequestDto(request.body);
    return controller.crear(servicioRequestDto, response);
  }),
);

export default router;