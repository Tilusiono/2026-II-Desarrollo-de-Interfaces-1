import { esBooleano, esCorreo, esTexto } from "./common.validator.js";

const allowedFields = [
  "documento", "nombres", "apellidos", "correo", "telefono", "direccion", "rol", "activo",
];

function validarCampo(field, value) {
  switch (field) {
    case "documento":
      return typeof value === "string" && /^\d{8,12}$/.test(value)
        ? null : "El documento debe contener entre 8 y 12 dígitos";
    case "nombres": return esTexto(value, 2, 80) ? null : "Los nombres deben tener 2 a 80 caracteres";
    case "apellidos": return esTexto(value, 2, 100) ? null : "Los apellidos deben tener 2 a 100 caracteres";
    case "correo": return esCorreo(value) ? null : "Ingrese un correo electrónico válido";
    case "telefono":
      return value === null || /^\d{7,15}$/.test(value) ? null : "El teléfono debe contener entre 7 y 15 dígitos";
    case "direccion": return value === null || esTexto(value, 3, 200) ? null : "La dirección admite hasta 200 caracteres";
    case "rol":
      return ["cliente", "vendedor", "administrador"].includes(value) ? null : "El rol no es válido";
    case "activo": return esBooleano(value) ? null : "El estado activo debe ser verdadero o falso";
    default: return `El campo ${field} no está permitido`;
  }
}

export function validarUsuarioCompleto(dto) {
  const required = ["documento", "nombres", "apellidos", "correo", "rol", "activo"];
  const errors = [];
  for (const field of required) {
    if (!Object.hasOwn(dto, field)) errors.push(`El campo ${field} es obligatorio`);
  }
  for (const field of Object.keys(dto)) {
    const error = validarCampo(field, dto[field]);
    if (error) errors.push(error);
  }
  return [...new Set(errors)];
}

export function validarUsuarioParcial(dto) {
  const fields = Object.keys(dto);
  if (fields.length === 0) return ["PATCH requiere al menos un campo para actualizar"];
  return fields.map((field) => validarCampo(field, dto[field])).filter(Boolean);
}
