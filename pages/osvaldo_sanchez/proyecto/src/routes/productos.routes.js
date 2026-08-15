import { Router } from "express";
import { productosController as controller } from "../controllers/productos.controller.js";
//import { validarProductoCompleto } from "../middlewares/validacion.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ProductoRequestDto } from "../dtos/ProductoDto.js";
import { validarId } from "../middlewares/id.middleware.js";


const router = Router();

router.post(
  "/",//validarProductoCompleto,
  asyncHandler((request, response) => {
    const productoRequestDto = new ProductoRequestDto(request.body);
    return controller.crear(productoRequestDto, response);
  }),
);

router.get("/",             asyncHandler((request, response) => controller.listar(response)));
router.get("/:id",validarId,asyncHandler((request, response) => controller.obtener(Number(request.params.id), response),),);

export default router;
