import { Router } from "express";
import { ProductosController } from "../controllers/productos.controller.js";
import { ProductoConsultaDto, ProductoRequestDto } from "../dtos/ProductoDto.js";
import { validarId } from "../middlewares/id.middleware.js";
import { validarMetodoQuery } from "../middlewares/query.middleware.js";
import { validarBody } from "../middlewares/validacion.middleware.js";
import { ProductoRepository } from "../repositories/ProductoRepository.js";
import { ProductosService } from "../services/productos.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validarProductoCompleto, validarProductoParcial } from "../validators/producto.validator.js";

const router = Router();
const controller = new ProductosController(new ProductosService(new ProductoRepository()));

router.use("/consulta", validarMetodoQuery, asyncHandler((request, response) =>
  controller.consultar(new ProductoConsultaDto(request.query), response)));
router.get("/buscar", asyncHandler((request, response) =>
  controller.listar(new ProductoConsultaDto(request.query), response)));
router.get("/", asyncHandler((request, response) =>
  controller.listar(new ProductoConsultaDto(request.query), response)));
router.get("/:id", validarId, asyncHandler((request, response) =>
  controller.obtener(request.resourceId, response)));
router.post("/", validarBody(ProductoRequestDto, validarProductoCompleto), asyncHandler((request, response) =>
  controller.crear(request.validatedBody, response)));
router.put("/:id", validarId, validarBody(ProductoRequestDto, validarProductoCompleto), asyncHandler((request, response) =>
  controller.reemplazar(request.resourceId, request.validatedBody, response)));
router.patch("/:id", validarId, validarBody(ProductoRequestDto, validarProductoParcial), asyncHandler((request, response) =>
  controller.actualizar(request.resourceId, request.validatedBody, response)));
router.delete("/:id", validarId, asyncHandler((request, response) =>
  controller.eliminar(request.resourceId, response)));

export default router;
