// Recibe un callback async y captura automáticamente una promesa rechazada.
// Aquí se practican callbacks + promesas en una sola utilidad.
export const asyncHandler = (callback) => (request, response, next) => {
  Promise.resolve(callback(request, response, next)).catch(next);
};
