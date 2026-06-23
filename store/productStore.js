import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

const STORAGE_KEY = 'productos';

const guardarProductos = async (productos) => {

  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(productos)
  );
};

export const useProductStore = create((set, get) => ({

  productos: [],

  cargarProductos: async () => {

    const productosGuardados =
      await AsyncStorage.getItem(STORAGE_KEY);

    const productos =
      productosGuardados !== null
        ? JSON.parse(productosGuardados)
        : [];

    set({ productos });
  },

  agregarProducto: async (datosProducto) => {

    const nombre =
      typeof datosProducto === 'string'
        ? datosProducto
        : datosProducto.nombre;

    const imagenUri =
      typeof datosProducto === 'string'
        ? null
        : datosProducto.imagenUri || null;

    const ubicacion =
      typeof datosProducto === 'string'
        ? null
        : datosProducto.ubicacion || null;

    const nuevoProducto = {
      id: Date.now().toString(),
      nombre,
      comprado: false,
      imagenUri,
      ubicacion,
    };

    const productosActualizados = [
      ...get().productos,
      nuevoProducto,
    ];

    set({ productos: productosActualizados });

    await guardarProductos(productosActualizados);
  },

  eliminarProducto: async (indexProducto) => {

    const productosActualizados =
      get().productos.filter(
        (item, index) => index !== indexProducto
      );

    set({ productos: productosActualizados });

    await guardarProductos(productosActualizados);
  },

  actualizarProducto: async (indexProducto, datosActualizados) => {

    const productosActualizados =
      get().productos.map((producto, index) => {

        if (index !== indexProducto) {
          return producto;
        }

        return {
          ...producto,
          ...datosActualizados,
        };
      });

    set({ productos: productosActualizados });

    await guardarProductos(productosActualizados);
  },

  toggleComprado: async (indexProducto) => {

    const productoActual = get().productos[indexProducto];

    if (!productoActual) {
      return;
    }

    await get().actualizarProducto(
      indexProducto,
      {
        comprado: !productoActual.comprado,
      }
    );
  },

}));
