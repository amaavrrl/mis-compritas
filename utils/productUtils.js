export function obtenerProductosPendientes(productos) {

  return productos.filter(
    producto => !producto.comprado
  );
}
