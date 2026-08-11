// import {
//   esEnteroNoNegativo,
//   esFecha,
//   esHora,
//   esNumeroNoNegativo,
//   esTexto,
// } from "./comunes.validator.js";
      
// const CATEGORIAS = ["TEC", "HOG", "OFI", "ALI"];

// function esImagenBase64(valor) {
//   return /^data:image\/[a-zA-Z0-9.+-]+;base64,[a-zA-Z0-9+/=]+$/.test(
//     String(valor),
//   );
// }

// function validarCamposProducto(producto) {
//   const errores = []; 

//   if (
//     producto.codigo !== undefined &&
//     producto.codigo !== "" &&
//     !esTexto(producto.codigo)
//   )
//     errores.push("codigo debe ser texto");
//   if (
//     producto.nombre !== undefined &&
//     producto.nombre !== "" &&
//     !esTexto(producto.nombre)
//   )
//     errores.push("nombre debe ser texto");
//   if (
//     producto.categoria !== undefined &&
//     !CATEGORIAS.includes(producto.categoria)
//   )
//     errores.push("categoria no es válida");
//   if (producto.stock !== undefined && !esEnteroNoNegativo(producto.stock))
//     errores.push("stock debe ser un entero no negativo");
//   if (producto.precio !== undefined && !esNumeroNoNegativo(producto.precio))
//     errores.push("precio debe ser un número no negativo");
//   if (
//     producto.peso !== undefined &&
//     producto.peso !== null &&
//     !esNumeroNoNegativo(producto.peso)
//   )
//     errores.push("peso debe ser un número no negativo o null");
//   if (
//     producto.descripcion !== undefined &&
//     producto.descripcion !== null &&
//     typeof producto.descripcion !== "string"
//   )
//     errores.push("descripcion debe ser texto o null");
//   if (producto.activo !== undefined && typeof producto.activo !== "boolean")
//     errores.push("activo debe ser booleano");
//   if (
//     producto.fechaVencimiento !== undefined &&
//     producto.fechaVencimiento !== null &&
//     !esFecha(producto.fechaVencimiento)
//   )
//     errores.push("fechaVencimiento no es válida");
//   if (producto.horaRegistro !== undefined && !esHora(producto.horaRegistro))
//     errores.push("horaRegistro debe usar HH:mm");
//   if (
//     producto.fechaHoraRegistro !== undefined &&
//     !esFecha(producto.fechaHoraRegistro)
//   )
//     errores.push("fechaHoraRegistro no es válida");
//   if (
//     producto.imagenBase64 !== undefined &&
//     producto.imagenBase64 !== null &&
//     producto.imagenBase64 !== "" &&
//     !esImagenBase64(producto.imagenBase64)
//   )
//     errores.push("imagenBase64 debe ser una imagen Base64 válida o null");

//   return errores;
// }

// export function validarProductoCompleto(producto) {
//   const errores = validarCamposProducto(producto);

//   if (!esTexto(producto.codigo))                    errores.push("codigo es obligatorio");
//   if (!esTexto(producto.nombre))                    errores.push("nombre es obligatorio");
//   if (producto.categoria === undefined)             errores.push("categoria es obligatoria");
//   if (producto.stock === undefined)                 errores.push("stock es obligatorio");
//   if (producto.precio === undefined)                errores.push("precio es obligatorio");
//   if (producto.activo === undefined)                errores.push("activo es obligatorio");
//   if (producto.horaRegistro === undefined)          errores.push("horaRegistro es obligatorio");
//   if (producto.fechaHoraRegistro === undefined)     errores.push("fechaHoraRegistro es obligatoria");

//   return errores;
// }

// export function validarProductoParcial(producto) {
//   if (Object.keys(producto).length === 0)
//     return ["Debe enviar al menos un campo"];
//   return validarCamposProducto(producto);
// }
