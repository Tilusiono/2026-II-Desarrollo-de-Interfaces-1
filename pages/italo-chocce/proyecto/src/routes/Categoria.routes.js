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