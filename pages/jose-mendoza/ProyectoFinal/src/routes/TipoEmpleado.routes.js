import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validarMetodoQuery } from "../middlewares/query.middleware.js";

// Importamos el controlador y el DTO correspondientes a Tipo de Empleado
import { tipoEmpleadoController as controller } from "../controllers/TipoEmpleado.controller.js";
// import { validarTipoEmpleadoCompleto } from "../middlewares/validacion.middleware.js";
import {
  TipoEmpleadoConsultaDto,
  TipoEmpleadoRequestDto,
} from "../dtos/TipoEmpleadoDto.js";

import { validarId } from "../middlewares/id.middleware.js";

// import {
//   validarTipoEmpleadoCompleto,
//   validarTipoEmpleadoParcial,
// } from "../middlewares/validacion.middleware.js";

const router = Router();



router.post(
  "/",
    //   validarTipoEmpleadoCompleto,
    asyncHandler((request, response) => {
    const tipoEmpleadoRequestDto = new TipoEmpleadoRequestDto(request.body);
    return controller.crear(tipoEmpleadoRequestDto, response);
  }),
);

// BUSCAR
router.get(
  "/buscar",
  asyncHandler((request, response) => {
    const tipoEmpleadoConsultaDto = new TipoEmpleadoConsultaDto(request.query);
    return controller.buscar(tipoEmpleadoConsultaDto, response);
  }),
);


// QUERY SEARCH
router.use(
  "/consulta",
  validarMetodoQuery,
  asyncHandler((request, response) => {
    const tipoEmpleadoConsultaDto = new TipoEmpleadoConsultaDto(request.query);
    return controller.consultar(tipoEmpleadoConsultaDto, response);
  }),
);

// GET
router.get("/", asyncHandler((request, response) => controller.listar(response)));
router.get(
  "/:id",
  validarId,
  asyncHandler((request, response) =>
    controller.obtener(Number(request.params.id), response),
  ),
);

// PÚT TODO 
router.put(
  "/:id",
  validarId,
  // validarTipoEmpleado,
    asyncHandler((request, response) => {
      const id = Number(request.params.id);
      const tipoEmpleadoRequestDto = new TipoEmpleadoRequestDto(request.body);
    
    return controller.reemplazar(id, tipoEmpleadoRequestDto, response);
  }),
);


// PATH ACTUALIZAR UNO
router.patch(
  "/:id",
  validarId,
  // validarTipoEmpleadoParcial,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const tipoEmpleadoRequestDto = new TipoEmpleadoRequestDto(request.body);
    return controller.actualizar(id, tipoEmpleadoRequestDto, response);
  }),
);

export default router;