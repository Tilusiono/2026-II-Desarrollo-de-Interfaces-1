import { Router } from "express";
import { CatalogoRepository } from "../repositories/CatalogoRepository.js";
import { CatalogosService } from "../services/catalogos.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();
const service = new CatalogosService(new CatalogoRepository());
router.get("/", asyncHandler(async (_request, response) => {
  response.json({ ok: true, ...(await service.obtener()) });
}));
export default router;
