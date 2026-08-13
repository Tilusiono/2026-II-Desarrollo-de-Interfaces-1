import { Router } from "express";
import { serviciosController as controller } from "../controllers/Servicios.controller.js";
import { validarServicioCompleto } from "../middlewares/Servicios.middleware.js";
import { validarId } from "../middlewares/id.middleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { ServicioRequestDto } from "../dtos/Servicios.dto.js";

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

export default router;