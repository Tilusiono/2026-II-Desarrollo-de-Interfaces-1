import { Router } from "express";
import { CategoriaController } from "../controllers/Categoria.controller.js";
import { validarId } from "../middlewares/id.middleware.js"; 
import asyncHandler from "../middlewares/asyncHandler.js";

const router = Router();
const controller = new CategoriaController();


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
  asyncHandler((request, response) => controller.crear(request, response)),
);

export default router;