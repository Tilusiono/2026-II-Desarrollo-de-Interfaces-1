import { Router } from "express";
import { productosController as controller } from "../controllers/productos.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ProductoConsultaDto,ProductoRequestDto } from "../dtos/ProductoDto.js";
import { validarId } from "../middlewares/id.middleware.js";
import { validarMetodoQuery } from "../middlewares/query.middleware.js";

//import {
//  validarProductoCompleto,
//  validarProductoParcial,
//} from "../middlewares/validacion.middleware.js";


const router = Router();

router.post(
  "/",// validarProductoCompleto,
  asyncHandler((request, response) => {
    const productoRequestDto = new ProductoRequestDto(request.body);
    return controller.crear(productoRequestDto, response);
  }),
);

router.get("/",             asyncHandler((request, response) => controller.listar(response)));


router.get("/buscar", asyncHandler((request, response) => {
    const productoConsultaDto = new ProductoConsultaDto(request.query);
    return controller.buscar(productoConsultaDto, response);
  })
);
router.use("/consulta",validarMetodoQuery,
  asyncHandler((request, response) => {
    const productoConsultaDto = new ProductoConsultaDto(request.query);
    return controller.consultar(productoConsultaDto, response);
  })
);


router.get("/:id",validarId,asyncHandler((request, response) => controller.obtener(Number(request.params.id), response),),);



router.put("/:id",validarId,//validarProductoCompleto,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const productoRequestDto = new ProductoRequestDto(request.body);
    return controller.reemplazar(id, productoRequestDto, response);
  }),
);
router.patch(
  "/:id",
  validarId,
 //validarProductoParcial,
  asyncHandler((request, response) => {
    const id = Number(request.params.id);
    const productoRequestDto = new ProductoRequestDto(request.body);
    return controller.actualizar(id, productoRequestDto, response);
  }),
);

router.delete(
  "/:id",
  validarId,
  asyncHandler((request, response) =>
    controller.eliminar(Number(request.params.id), response),
  ),
);

export default router;
