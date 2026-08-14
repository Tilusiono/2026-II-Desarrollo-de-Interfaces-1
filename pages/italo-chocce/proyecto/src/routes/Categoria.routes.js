import { Router } from "express";
import { CategoriaController } from "../controllers/Categoria.controller.js";
import { validarId } from "../middlewares/id.middleware.js"; 
import asyncHandler from "../middlewares/asyncHandler.js";

import {
  validarCategoriaCompleta,
  validarCategoriaParcial,
} from "../middlewares/Categoria.middleware.js";

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

router.patch(
  "/:id",
  validarId,
  validarCategoriaParcial,
  asyncHandler((request, response) => {
    const id = request.params.id; // Las categorías usan ID de texto (ej. CAT-001)
    const categoriaRequestDto = new CategoriaRequestDto(request.body);
    return categoriaController.actualizar(id, categoriaRequestDto, response);
  }),
);

router.delete(
  "/:id",
  validarId,
  asyncHandler((request, response) =>
    categoriaController.eliminar(request.params.id, response),
  ),
);

export default router;