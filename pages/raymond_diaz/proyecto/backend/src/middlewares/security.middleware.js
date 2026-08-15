import { timingSafeEqual } from "node:crypto";
import { AppError } from "../errors/AppError.js";

export function securityHeaders(_request, response, next) {
  response.set({
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "no-referrer",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Content-Security-Policy": "default-src 'self'; style-src 'self'; script-src 'self'; font-src 'self'; img-src 'self' data:; connect-src 'self'",
  });
  next();
}

export function protegerEscritura(request, _response, next) {
  const expected = process.env.API_KEY;
  if (!expected || ["GET", "HEAD", "OPTIONS", "QUERY"].includes(request.method)) return next();
  const received = String(request.get("x-api-key") || "");
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(received);
  const valid = expectedBuffer.length === receivedBuffer.length && timingSafeEqual(expectedBuffer, receivedBuffer);
  if (!valid) return next(new AppError("API key ausente o inválida", 401, null, "UNAUTHORIZED"));
  next();
}
