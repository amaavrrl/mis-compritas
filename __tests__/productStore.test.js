import AsyncStorage from '@react-native-async-storage/async-storage';

import { useProductStore } from '../store/productStore';

describe('productStore', () => {

  beforeEach(() => {

    jest.clearAllMocks();

    useProductStore.setState({
      productos: [],
    });
  });

  it('agrega, actualiza y elimina productos', async () => {

    await useProductStore
      .getState()
      .agregarProducto({
        nombre: 'Leche',
        imagenUri: null,
        ubicacion: null,
      });

    expect(useProductStore.getState().productos).toHaveLength(1);
    expect(useProductStore.getState().productos[0].nombre).toBe('Leche');

    await useProductStore
      .getState()
      .actualizarProducto(
        0,
        {
          comprado: true,
        }
      );

    expect(useProductStore.getState().productos[0].comprado).toBe(true);

    await useProductStore
      .getState()
      .eliminarProducto(0);

    expect(useProductStore.getState().productos).toHaveLength(0);
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });
});
