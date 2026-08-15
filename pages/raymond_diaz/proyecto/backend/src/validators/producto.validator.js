import {
  esBooleano,
  esEnteroNoNegativo,
  esEnteroPositivo,
  esNumeroNoNegativo,
  esTexto,
} from "./common.validator.js";

const allowedFields = [
  "codigo", "nombre", "marca", "descripcion", "precio", "stock",
  "categoriaId", "proveedorId", "activo",
];

function validarCampo(field, value) {
  switch (field) {
    case "codigo":
      return esTexto(value, 3, 30) && /^[A-Z0-9][A-Z0-9-]+$/.test(value)
        ? null : "El código debe tener 3 a 30 caracteres: letras, números o guiones";
    case "nombre": return esTexto(value, 2, 100) ? null : "El nombre debe tener 2 a 100 caracteres";
    case "marca": return esTexto(value, 2, 60) ? null : "La marca debe tener 2 a 60 caracteres";
    case "descripcion":
      return value === null || esTexto(value, 1, 500) ? null : "La descripción admite hasta 500 caracteres";
    case "precio": return esNumeroNoNegativo(value) ? null : "El precio debe ser un número mayor o igual a cero";
    case "stock": return esEnteroNoNegativo(value) ? null : "El stock debe ser un entero mayor o igual a cero";
    case "categoriaId": return esEnteroPositivo(value) ? null : "La categoría es obligatoria";
    case "proveedorId":
      return value === null || esEnteroPositivo(value) ? null : "El proveedor debe ser un ID válido o nulo";
    case "activo": return esBooleano(value) ? null : "El estado activo debe ser verdadero o falso";
    default: return `El campo ${field} no está permitido`;
  }
}

export function validarProductoCompleto(dto) {
  const required = ["codigo", "nombre", "marca", "precio", "stock", "categoriaId", "activo"];
  const errors = [];
  for (const field of required) {
    if (!Object.hasOwn(dto, field)) errors.push(`El campo ${field} es obligatorio`);
  }
  for (const field of Object.keys(dto)) {
    if (!allowedFields.includes(field)) errors.push(`El campo ${field} no está permitido`);
    else {
      const error = validarCampo(field, dto[field]);
      if (error) errors.push(error);
    }
  }
  return [...new Set(errors)];
}

export function validarProductoParcial(dto) {
  const fields = Object.keys(dto);
  if (fields.length === 0) return ["PATCH requiere al menos un campo para actualizar"];
  return fields.map((field) => validarCampo(field, dto[field])).filter(Boolean);
}
