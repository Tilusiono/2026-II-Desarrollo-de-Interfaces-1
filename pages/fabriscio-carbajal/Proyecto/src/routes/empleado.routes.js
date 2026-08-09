import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

import { EmpleadoRequestDto } from "../dtos/EmpleadoDto.js";
import { empleadoController as controller } from "../controllers/empleado.controller.js";
import { validarId } from "../middlewares/id.middleware.js";

// import { validarEmpleadoCompleto, validarEmpleadoParcial,} from "../middlewares/validacion.middleware.js";



const router = Router();

router.post(
  "/",
  //validarEmpleadoCompleto,
  asyncHandler((request, response) => {
    const empleadoRequestDto = new EmpleadoRequestDto(request.body);
    return controller.crear(empleadoRequestDto, response);
  }),
);

router.get("/",               asyncHandler((request, response) => controller.listar(response)));
router.get("/:id", validarId, asyncHandler((request, response) => controller.obtener(Number(request.params.id), response),),);

router.put(
  "/:id",
  validarId,
  // validarEmpleadoCompleto
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const empleadoRequestDto = new EmpleadoRequestDto(request.body);
    return controller.modificarControlador(id, empleadoRequestDto, response);
  }),
);

router.patch(
  "/:id",
  validarId,
  // validarEmpleadoParcial,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const empleadoRequestDto = new EmpleadoRequestDto(request.body);
    return controller.modificarParcialControlador(id, empleadoRequestDto, response);
  }),
);



export default router;
