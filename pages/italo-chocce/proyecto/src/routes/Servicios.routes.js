import { Router } from "express";
import { serviciosController as controller } from "../controllers/Servicios.controller.js";
import { validarServicioCompleto } from "../middlewares/Servicios.middleware.js";
import { validarId } from "../middlewares/id.middleware.js";
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
router.get("/", asyncHandler((request, response) => controller.listar(response)));
router.get(
  "/:id",
  validarId,
  asyncHandler((request, response) =>
    controller.obtener(Number(request.params.id), response),
  ),
);


export default router;