import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validarMetodoQuery } from "../middlewares/query.middleware.js";

// modifciar
import { permisosController as controller } from "../controllers/Permiso.controller.js";
// import { validarProductoCompleto } from "../middlewares/validacion.middleware.js";
import {
  PermisoConsultaDto,
  PermisoRequestDto,
} from "../dtos/PermisoDto.js";

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
    const permisoRequestDto = new PermisoRequestDto(request.body);
    return controller.crear(permisoRequestDto, response);
  }),
);

// BUSCAR

router.get(
  "/buscar",
  asyncHandler((request, response) => {
    const permisoConsultaDto = new PermisoConsultaDto(request.query);
    return controller.buscar(permisoConsultaDto, response);
  }),
);


// QUERY SEARCH
router.use(
  "/consulta",
  validarMetodoQuery,
  asyncHandler((request, response) => {
    const permisoConsultaDto = new PermisoConsultaDto(request.query);
    return controller.consultar(permisoConsultaDto, response);
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


// REEMPLAZAR
router.put(
  "/:id",
  validarId,
  // validarPermisoCompleto,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const permisoRequestDto = new PermisoRequestDto(request.body);
    return controller.reemplazar(id, permisoRequestDto, response);
  }),
);


router.patch(
    "/:id",
    validarId,
    asyncHandler((request, response) => {
        const id = Number(request.params.id);
        const permisoRequestDto = new PermisoRequestDto(request.body);
        return controller.actualizar(id, permisoRequestDto, response);
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
