import { Router } from "express";
import { serviciosController as controller } from "../controllers/Servicios.controller.js";
import { validarId } from "../middlewares/id.middleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { ServicioRequestDto } from "../dtos/Servicios.dto.js";
import {
  validarServicioCompleto,
  validarServicioParcial,
} from "../middlewares/Servicios.middleware.js";


const router = Router();

router.post(
    "/",
    validarServicioCompleto,
    asyncHandler((req, res) => {
        const servicioRequestDto = new ServicioRequestDto(req.body);
        return controller.crear(servicioRequestDto, res);
    }),
);

router.get(
    "/",
    asyncHandler((req, res) => controller.listar(req, res))
);

router.get(
    "/:id",
    validarId,
    asyncHandler((req, res) => controller.obtener(req, res))
);

router.patch(
  "/:id",
  validarId,
  validarServicioParcial,
  asyncHandler((request, response) => {
    const id = Number(request.params.id); // O sin Number si tu ID es texto
    const servicioRequestDto = new ServicioRequestDto(request.body);
    return serviciosController.actualizar(id, servicioRequestDto, response);
  }),
  router.delete(
  "/:id",
  validarId,
  asyncHandler((request, response) =>
    serviciosController.eliminar(request.params.id, response),
  ),
)


)

export default router;