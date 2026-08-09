import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

import { ServicioRequestDto ,ServicioConsultaDto } from "../dtos/ServicioDto.js";
import { serviciosController as controller } from "../controllers/servicios.controller.js";
import { validarId } from "../middlewares/id.middleware.js";
import { validarMetodoQuery } from "../middlewares/query.middleware.js";

//import {
//  validarServicioCompleto,
//  validarServicioParcial,
//} from "../middlewares/validacion.middleware.js";


const router = Router();

router.post(
  "/",
  asyncHandler((request, response) => {
    const servicioRequestDto = new ServicioRequestDto(request.body);
    return controller.crear(servicioRequestDto, response);
  }),
);
router.get("/",             asyncHandler((request, response) => controller.listar(response)));


router.get("/buscar", asyncHandler((request, response) => {
    const servicioConsultaDto = new ServicioConsultaDto(request.query);
    return controller.buscar(servicioConsultaDto, response);
  })
);

router.use("/consulta",validarMetodoQuery,
  asyncHandler((request, response) => {
    const servicioConsultaDto = new ServicioConsultaDto(request.query);
    return controller.consultar(servicioConsultaDto, response);
  })
);


router.get("/:id",validarId,asyncHandler((request, response) => controller.obtener(Number(request.params.id), response),),);





router.put("/:id",validarId,//validarServicioCompleto,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const servicioRequestDto = new ServicioRequestDto(request.body);
    return controller.modificarControlador(id, servicioRequestDto, response);
  }),
);

router.patch("/:id",validarId,//validarServicioParcial,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const servicioRequestDto = new ServicioRequestDto(request.body);
    return controller.modificarParcialControlador(id, servicioRequestDto, response);
  }),
);


export default router;
