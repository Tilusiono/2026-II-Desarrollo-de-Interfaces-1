import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

import { EmpleadoRequestDto } from "../dtos/EmpleadoDto.js";
// import { validarEmpleadoCompleto } from "../middlewares/validacion.middleware.js";
import { empleadoController as controller } from "../controllers/empleado.controller.js";


const router = Router();

router.post(
  "/",
  //validarEmpleadoCompleto,
  asyncHandler((request, response) => {
    const empleadoRequestDto = new EmpleadoRequestDto(request.body);
    return controller.crear(empleadoRequestDto, response);
  }),
);

export default router;
