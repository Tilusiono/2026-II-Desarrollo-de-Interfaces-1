import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

import { EmpleadoRequestDto } from "../dtos/EmpleadoDto.js";
// import { validarEmpleadoCompleto } from "../middlewares/validacion.middleware.js";
import { empleadoController as controller } from "../controllers/empleado.controller.js";
import { validarId } from "../middlewares/id.middleware.js";


const router = Router();

router.post(
  "/",
  //validarEmpleadoCompleto,
  asyncHandler((request, response) => {
    const empleadoRequestDto = new EmpleadoRequestDto(request.body);
    return controller.crear(empleadoRequestDto, response);
  }),
);

router.get("/",               asyncHandler((request, response) => controller.listar(response)));
router.get("/:id", validarId, asyncHandler((request, response) => controller.obtener(Number(request.params.id), response),),);

export default router;
