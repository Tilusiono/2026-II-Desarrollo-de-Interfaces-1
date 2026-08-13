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
  async listar(response) {
    const cafenegrosResponseDto =
      await this.CafenegroService.listar();

    response.json({
      total: cafenegrosResponseDto.length,
      cafenegrosResponseDto,
    });
  }

  async obtener(id, response) {
    const cafenegroResponseDto =
      await this.CafenegroService.obtener(id);

    response.json({
      cafenegroResponseDto,
    });
  }
}

export const cafenegroController =
  new CafenegroController(cafenegroService);
  