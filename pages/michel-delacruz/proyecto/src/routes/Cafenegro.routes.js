import { Router } from "express";
import { cafenegroController as controller } from "../controllers/Cafenegro.controller.js";
import { validarId } from "../middlewares/id.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { CafenegroRequestDto } from "../dtos/CafenegroDto.js";

const router = Router();

router.get(
  "/",
  asyncHandler((request, response) =>
    controller.listar(response)
  ),
);

router.get(
  "/:id",
  validarId,
  asyncHandler((request, response) =>
    controller.obtener(Number(request.params.id), response)
  ),
);

router.post(
  "/",
  asyncHandler((request, response) => {
    const cafenegroRequestDto =
      new CafenegroRequestDto(request.body);

    return controller.crear(
      cafenegroRequestDto,
      response
    );
  }),
);

export default router;