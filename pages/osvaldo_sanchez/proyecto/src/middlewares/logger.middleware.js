export function loggerMiddleware(request, response, next) {
  const inicio = Date.now();

  response.on("finish", () => {
    const duracion = Date.now() - inicio;
    console.log(
      `${request.method} ${request.originalUrl} ${response.statusCode} - ${duracion} ms`,
    );
  });

  next();
}
