import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

import { categoriasController as controller } from "../controllers/categorias.controller.js";
import {CategoriaConsultaDto,CategoriaRequestDto,} from "../dtos/CategoriaDto.js";
import { validarId } from "../middlewares/id.middleware.js";
import { validarMetodoQuery } from "../middlewares/query.middleware.js";

//import {
//  validarCategoriaCompleto,
//  validarCategoriaParcial,
//} from "../middlewares/validacion.middleware.js";


const router = Router();

router.post(
  "/",
  asyncHandler((request, response) => {
    const categoriaRequestDto = new CategoriaRequestDto(request.body);
    return controller.crear(categoriaRequestDto, response);
  }),
);

router.get("/", asyncHandler((request, response) => controller.listar(response)));

router.get(
  "/buscar",
  asyncHandler((request, response) => {
    const categoriaConsultaDto = new CategoriaConsultaDto(request.query);
    return controller.buscar(categoriaConsultaDto, response);
  }),
);

router.use(
  "/consulta",
  validarMetodoQuery,
  asyncHandler((request, response) => {
    const categoriaConsultaDto = new CategoriaConsultaDto(request.query);
    return controller.consultar(categoriaConsultaDto, response);
  }),
);


router.get("/:id", validarId, asyncHandler((request, response) => controller.obtener(Number(request.params.id), response),),);


router.put("/:id",validarId,//validarCategoriaCompleto,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const categoriaRequestDto = new CategoriaRequestDto(request.body);
    return controller.modificarControlador(id, categoriaRequestDto, response);
  }),
);

router.patch("/:id",validarId,//validarCategoriaParcial,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const categoriaRequestDto = new CategoriaRequestDto(request.body);
    return controller.modificarParcialControlador(id, categoriaRequestDto, response);
  }),
);

export default router;
