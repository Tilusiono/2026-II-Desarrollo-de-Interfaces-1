export function loggerMiddleware(request, response, next) {
  const startedAt = performance.now();
  response.on("finish", () => {
    const duration = (performance.now() - startedAt).toFixed(1);
    console.info(`[HTTP] ${request.method} ${request.originalUrl} -> ${response.statusCode} (${duration} ms)`);
  });
  next();
}
