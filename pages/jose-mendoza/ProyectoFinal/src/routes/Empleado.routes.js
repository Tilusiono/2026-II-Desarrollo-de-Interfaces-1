import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validarMetodoQuery } from "../middlewares/query.middleware.js";

// modifciar
import { empleadosController as controller } from "../controllers/Empleado.controller.js";
// import { validarProductoCompleto } from "../middlewares/validacion.middleware.js";
import {
  EmpleadoConsultaDto,
  EmpleadoRequestDto,
} from "../dtos/EmpleadoDto.js";

import { validarId } from "../middlewares/id.middleware.js";


// import {
//   validarEmpleadoCompleto,
//   validarEmpleadoParcial,
// } from "../middlewares/validacion.middleware.js";

const router = Router();


router.post(
  "/",
    //   validarAreaCompleto,
    asyncHandler((request, response) => {
    const empleadoRequestDto = new EmpleadoRequestDto(request.body);
    return controller.crear(empleadoRequestDto, response);
  }),
);

// BUSCAR 
router.get(
  "/buscar",
  asyncHandler((request, response) => {
    const empleadoConsultaDto = new EmpleadoConsultaDto(request.query);
    return controller.buscar(empleadoConsultaDto, response);
  }),
);


// QUERY SEARCH
router.use(
  "/consulta",
  validarMetodoQuery,
  asyncHandler((request, response) => {
    const empleadoConsultaDto = new EmpleadoConsultaDto(request.query);
    return controller.consultar(empleadoConsultaDto, response);
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
  // validarEmpleadoCompleto,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const empleadoRequestDto = new EmpleadoRequestDto(request.body);
    return controller.reemplazar(id, empleadoRequestDto, response);
  }),
);


router.patch(
  "/:id",
  validarId,
  // validarEmpleadoParcial,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const empleadoRequestDto = new EmpleadoRequestDto(request.body);
    return controller.actualizar(id, empleadoRequestDto, response);
  }),
);


export default router;
