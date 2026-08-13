import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

import { AutomovilesRequestDto } from "../dtos/AutomovilesDto.js";
//import { validarAutomovilesCompleto as validacion } from "../middlewares/validacion.middleware.js";
import { automovilesController as controller } from "../controllers/automoviles.controller.js";

const router = Router();

router.post(
  "/",
  asyncHandler((request, response) => {
    const automovilRequestDto = new AutomovilesRequestDto(request.body);
    return controller.crear(automovilRequestDto, response);
  }),
);

export default router;
