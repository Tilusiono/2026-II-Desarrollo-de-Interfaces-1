import { Router } from "express";

import { categoriaController as controller } from "../controllers/Categoria.controller.js";
import { validarCategoriaCompleta } from "../middlewares/Categoria.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { CategoriaRequestDto } from "../dtos/Categoria.dto.js";

const router = Router();

router.post(
  "/",
  validarCategoriaCompleta,
  asyncHandler((request, response) => {
    const categoriaRequestDto = new CategoriaRequestDto(request.body);
    return controller.crear(categoriaRequestDto, response);
  })
);

export default router;