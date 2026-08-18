import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {PerifericosConsultaDto,PerifericosRequestDto,} from "../dtos/PerifericosDto.js";


import { perifericosController as controller } from "../controllers/perifericos.controller.js";
//import { validarPerifericosCompleto as validacion } from "../middlewares/validacion.middleware.js";

import { validarId } from "../middlewares/id.middleware.js";
//import {validarProductoCompleto,validarProductoParcial,} from "../middlewares/validacion.middleware.js";


const router = Router();

router.post(
  "/",
  asyncHandler((request, response) => {
    const perifericosRequestDto = new PerifericosRequestDto(request.body);
    return controller.crear(perifericosRequestDto, response);
  }),
);

router.get("/buscar",asyncHandler((request, response) => {
    const perifericoConsultaDto = new PerifericosConsultaDto(request.query);
    return controller.buscar(perifericoConsultaDto, response);
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

router.patch("/:id",validarId,//validarProductoParcial,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const perifericosRequestDto = new PerifericosRequestDto(request.body);
    return controller.modificarParcialmente(id, perifericosRequestDto, response);
  }),
);


export default router;