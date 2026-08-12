import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validarMetodoQuery } from "../middlewares/query.middleware.js";

// modifciar
import { cargosController as controller } from "../controllers/Cargo.controller.js";
// import { validarProductoCompleto } from "../middlewares/validacion.middleware.js";
import {
  CargoConsultaDto,
  CargoRequestDto,
} from "../dtos/CargoDto.js";

import { validarId } from "../middlewares/id.middleware.js";


// import {
//   validarCargoCompleto,
//   validarCargoParcial,
// } from "../middlewares/validacion.middleware.js";


const router = Router();


router.post(
  "/",
    //   validarAreaCompleto,
    asyncHandler((request, response) => {
    const cargoRequestDto = new CargoRequestDto(request.body);
    return controller.crear(cargoRequestDto, response);
  }),
);

// BUSCAR

router.get(
  "/buscar",
  asyncHandler((request, response) => {
    const cargoConsultaDto = new CargoConsultaDto(request.query);
    return controller.buscar(cargoConsultaDto, response);
  }),
);

// QUERY SEARCH
router.use(
  "/consulta",
  validarMetodoQuery,
  asyncHandler((request, response) => {
    const cargoConsultaDto = new CargoConsultaDto(request.query);
    return controller.consultar(cargoConsultaDto, response);
  }),
);

router.get("/", asyncHandler((request, response) => controller.listar(response)));
router.get(
  "/:id",
  validarId,
  asyncHandler((request, response) =>
    controller.obtener(Number(request.params.id), response),
  ),
);

// reemplazar
router.put(
  "/:id",
  validarId,
  // validarCargoCompleto,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const cargoRequestDto = new CargoRequestDto(request.body);
    return controller.reemplazar(id, cargoRequestDto, response);
  }),
);

router.patch(
  "/:id",
  validarId,
  // validarCargoParcial,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const cargoRequestDto = new CargoRequestDto(request.body);
    return controller.actualizar(id, cargoRequestDto, response);
  }),
);

// DELETE ELIMINAR
router.delete(
  "/:id",
  validarId,
  asyncHandler((request, response) =>
    controller.eliminar(Number(request.params.id), response),
  ),
);


export default router;
