import { Router } from "express";
import { ProductoRepository } from "../repositories/ProductoRepository.js";
import { UsuarioRepository } from "../repositories/UsuarioRepository.js";
import { EstadisticasService } from "../services/estadisticas.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();
const service = new EstadisticasService(new ProductoRepository(), new UsuarioRepository());
router.get("/resumen", asyncHandler(async (_request, response) => {
  response.json({ ok: true, resumen: await service.obtenerResumen() });
}));
export default router;
