export function normalizarBody(request, response, next) {
  if (
    request.body &&
    typeof request.body === "object" &&
    !Array.isArray(request.body)
  ) {
    request.body = Object.fromEntries(
      Object.entries(request.body).map(([campo, valor]) => [
        campo,
        typeof valor === "string" ? valor.trim() : valor,
      ]),
    );
  }
  next();
}
