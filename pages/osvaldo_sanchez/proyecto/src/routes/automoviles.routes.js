import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

import { AutomovilesRequestDto } from "../dtos/AutomovilesDto.js";
//import { validarAutomovilesCompleto as validacion } from "../middlewares/validacion.middleware.js";
import { automovilesController as controller } from "../controllers/automoviles.controller.js";
import { validarId } from "../middlewares/id.middleware.js";


const router = Router();

router.post(
  "/",
  asyncHandler((request, response) => {
    const automovilRequestDto = new AutomovilesRequestDto(request.body);
    return controller.crear(automovilRequestDto, response);
  }),
);

router.get("/",             asyncHandler((request, response) => controller.listar(response)));
router.get("/:id",validarId,asyncHandler((request, response) =>controller.obtener(Number(request.params.id), response),),);

export default router;
