export function ejecutarConCallback(operacionSincrona, callback) {
  setImmediate(() => {
    try {
      callback(null, operacionSincrona());
    } catch (error) {
      callback(error);
    }
  });
}

export function callbackAPromesa(operacionSincrona) {
  return new Promise((resolve, reject) => {
    ejecutarConCallback(operacionSincrona, (error, resultado) => {
      if (error) return reject(error);
      resolve(resultado);
    });
  });
}
