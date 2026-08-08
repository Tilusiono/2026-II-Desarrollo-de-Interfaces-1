import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

import { CategoriaRequestDto} from "../dtos/CategoriaDto.js";
//import { validarCategoriaCompleto as validacion } from "../middlewares/validacion.middleware.js";
import { categoriasController as controller } from "../controllers/categorias.controller.js";

const router = Router();

router.post(
  "/",
  asyncHandler((request, response) => {
    const categoriaRequestDto = new CategoriaRequestDto(request.body);
    return controller.crear(categoriaRequestDto, response);
  }),
);

export default router;
