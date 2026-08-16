import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";


import { perifericosController as controller } from "../controllers/perifericos.controller.js";
//import { validarPerifericosCompleto as validacion } from "../middlewares/validacion.middleware.js";
import { PerifericosRequestDto } from "../dtos/PerifericosDto.js";
import { validarId } from "../middlewares/id.middleware.js";

const router = Router();

router.post(
  "/",
  asyncHandler((request, response) => {
    const perifericosRequestDto = new PerifericosRequestDto(request.body);
    return controller.crear(perifericosRequestDto, response);
  }),
);

router.get("/",             asyncHandler((request, response) => controller.listar(response)));
router.get("/:id",validarId,asyncHandler((request, response) =>controller.obtener(Number(request.params.id), response),),);

router.put("/:id",validarId,//validarPerifericoCompleto,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const perifericosRequestDto = new PerifericosRequestDto(request.body);
    return controller.modificar(id, perifericosRequestDto, response);
  }),
);


export default router;