import { Router } from "express";
import { serviciosController as controller } from "../controllers/Servicios.controller.js";
import { validarServicioCompleto } from "../middlewares/Servicios.middleware.js";
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
router.post(
  "/",
  validarProductoCompleto,
  asyncHandler((request, response) => {
    const productoRequestDto = new ProductoRequestDto(request.body);
    return controller.crear(productoRequestDto, response);
  }),
);

export default router;