import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";


import { perifericosController as controller } from "../controllers/perifericos.controller.js";
//import { validarPerifericosCompleto as validacion } from "../middlewares/validacion.middleware.js";
import { PerifericosRequestDto } from "../dtos/PerifericosDto.js";

const router = Router();

router.post(
  "/",
  asyncHandler((request, response) => {
    const perifericosRequestDto = new PerifericosRequestDto(request.body);
    return controller.crear(perifericosRequestDto, response);
  }),
);

export default router;