import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

import { CategoriaRequestDto} from "../dtos/CategoriaDto.js";
//import { validarCategoriaCompleto as validacion } from "../middlewares/validacion.middleware.js";
import { categoriasController as controller } from "../controllers/categorias.controller.js";
import { validarId } from "../middlewares/id.middleware.js";


const router = Router();

router.post(
  "/",
  asyncHandler((request, response) => {
    const categoriaRequestDto = new CategoriaRequestDto(request.body);
    return controller.crear(categoriaRequestDto, response);
  }),
);

router.get("/", asyncHandler((request, response) => controller.listar(response)));
router.get("/:id", validarId, asyncHandler((request, response) => controller.obtener(Number(request.params.id), response),),);


router.put("/:id",validarId,//validarProductoCompleto,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const categoriaRequestDto = new CategoriaRequestDto(request.body);
    return controller.modificarControlador(id, categoriaRequestDto, response);
  }),
);


export default router;
