import { obtenerProductosPendientes } from '../utils/productUtils';

describe('obtenerProductosPendientes', () => {

  it('devuelve solo productos no comprados', () => {

    const productos = [
      { nombre: 'Leche', comprado: false },
      { nombre: 'Pan', comprado: true },
      { nombre: 'Huevos', comprado: false },
    ];

    expect(obtenerProductosPendientes(productos)).toEqual([
      { nombre: 'Leche', comprado: false },
      { nombre: 'Huevos', comprado: false },
    ]);
  });
});
