import { Router } from "express";
import { UsuariosController } from "../controllers/usuarios.controller.js";
import { UsuarioConsultaDto, UsuarioRequestDto } from "../dtos/UsuarioDto.js";
import { validarId } from "../middlewares/id.middleware.js";
import { validarBody } from "../middlewares/validacion.middleware.js";
import { UsuarioRepository } from "../repositories/UsuarioRepository.js";
import { UsuariosService } from "../services/usuarios.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validarUsuarioCompleto, validarUsuarioParcial } from "../validators/usuario.validator.js";

const router = Router();
const controller = new UsuariosController(new UsuariosService(new UsuarioRepository()));

router.get("/buscar", asyncHandler((request, response) =>
  controller.listar(new UsuarioConsultaDto(request.query), response)));
router.get("/", asyncHandler((request, response) =>
  controller.listar(new UsuarioConsultaDto(request.query), response)));
router.get("/:id", validarId, asyncHandler((request, response) =>
  controller.obtener(request.resourceId, response)));
router.post("/", validarBody(UsuarioRequestDto, validarUsuarioCompleto), asyncHandler((request, response) =>
  controller.crear(request.validatedBody, response)));
router.put("/:id", validarId, validarBody(UsuarioRequestDto, validarUsuarioCompleto), asyncHandler((request, response) =>
  controller.reemplazar(request.resourceId, request.validatedBody, response)));
router.patch("/:id", validarId, validarBody(UsuarioRequestDto, validarUsuarioParcial), asyncHandler((request, response) =>
  controller.actualizar(request.resourceId, request.validatedBody, response)));
router.delete("/:id", validarId, asyncHandler((request, response) =>
  controller.eliminar(request.resourceId, response)));

export default router;
