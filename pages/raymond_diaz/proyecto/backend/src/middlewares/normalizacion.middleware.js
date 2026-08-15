function normalize(value) {
  if (typeof value === "string") return value.trim().replace(/\s+/g, " ");
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, normalize(nested)]));
  }
  return value;
}

export function normalizacionMiddleware(request, _response, next) {
  if (request.body && typeof request.body === "object") request.body = normalize(request.body);
  next();
}
