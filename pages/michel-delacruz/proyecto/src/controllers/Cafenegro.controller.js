import { cafenegroService } from "../services/Cafenegro.services.js";

export class CafenegroController {
  constructor(CafenegroServiceActual = cafenegroService) {
    this.CafenegroService = CafenegroServiceActual;
  }

  async crear(CafenegroRequestDto, response) {
    const CafenegroResponseDto =
      await this.CafenegroService.crear(CafenegroRequestDto);

    response.status(201).json({
      mensaje: "Cafenegro creado",
      CafenegroResponseDto,
    });
  }
}

export const cafenegroController =
  new CafenegroController(cafenegroService);
  