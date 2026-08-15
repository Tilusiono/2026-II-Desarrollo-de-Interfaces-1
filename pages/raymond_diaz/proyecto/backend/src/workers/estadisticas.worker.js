import { parentPort, threadId } from "node:worker_threads";

parentPort.on("message", ({ productos, usuarios }) => {
  const activos = productos.filter((product) => product.activo);
  const resumen = activos.reduce((result, product) => {
    result.stockTotal += product.stock;
    result.valorInventario += product.precio * product.stock;
    if (product.stock <= 10) result.stockBajo += 1;
    return result;
  }, { stockTotal: 0, valorInventario: 0, stockBajo: 0 });

  const usuariosPorRol = usuarios.reduce((result, user) => {
    result[user.rol] = (result[user.rol] || 0) + 1;
    return result;
  }, {});

  parentPort.postMessage({
    hiloId: threadId,
    calculadoEnHiloSecundario: threadId > 0,
    productosActivos: activos.length,
    usuariosActivos: usuarios.filter((user) => user.activo).length,
    stockTotal: resumen.stockTotal,
    productosStockBajo: resumen.stockBajo,
    valorInventario: Number(resumen.valorInventario.toFixed(2)),
    usuariosPorRol,
  });
});
