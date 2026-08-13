import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";


import { CafenegroRequestDto } from "../dtos/CafenegroDto.js";
import { cafenegroController as controller } from "../controllers/Cafenegro.controller.js";


const router = Router();


router.post(
  "/",
  asyncHandler((request, response) => {
    const cafenegroRequestDto = new CafenegroRequestDto(request.body);
    return controller.crear(cafenegroRequestDto, response);
  }),
);


export default router;