import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

import { EmpleadoRequestDto, EmpleadoConsultaDto, } from "../dtos/EmpleadoDto.js";
import { empleadoController as controller } from "../controllers/empleado.controller.js";
import { validarId } from "../middlewares/id.middleware.js";
import { validarMetodoQuery } from "../middlewares/query.middleware.js";


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

router.get("/buscar", asyncHandler((request, response) => {
    const empleadoConsultaDto = new EmpleadoConsultaDto(request.query);
    return controller.buscar(empleadoConsultaDto, response);
  })
);

router.use("/consultar", validarMetodoQuery, asyncHandler((request, response) => {
    const empleadoConsultaDto = new EmpleadoConsultaDto(request.query);
    return controller.consultar(empleadoConsultaDto, response);
  })
);


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


router.delete("/:id", validarId, asyncHandler((request, response) =>
    controller.eliminar(Number(request.params.id), response),
  ),
);



export default router;
