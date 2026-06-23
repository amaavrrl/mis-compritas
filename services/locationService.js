import * as Location from 'expo-location';

import { showPrettyAlert } from '../components/PrettyAlert';

const mostrarPermisoDenegado = () => {

  showPrettyAlert(
    'Permiso denegado',
    'Para guardar la ubicacion del comercio, tenes que permitir el acceso a la ubicacion desde Expo Go.'
  );
};

const pedirPermisoUbicacion = async () => {

  const permisoActual =
    await Location.getForegroundPermissionsAsync();

  if (permisoActual.status === 'granted') {
    return true;
  }

  if (permisoActual.status === 'denied' && !permisoActual.canAskAgain) {

    mostrarPermisoDenegado();
    return false;
  }

  const nuevoPermiso =
    await Location.requestForegroundPermissionsAsync();

  if (nuevoPermiso.status !== 'granted') {

    mostrarPermisoDenegado();
    return false;
  }

  return true;
};

export async function obtenerUbicacionActual() {

  try {

    const tienePermiso = await pedirPermisoUbicacion();

    if (!tienePermiso) {
      return null;
    }

    const ubicacionActual =
      await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

    return {
      tipo: 'actual',
      latitude: ubicacionActual.coords.latitude,
      longitude: ubicacionActual.coords.longitude,
      direccion: null,
    };

  } catch (error) {

    console.log(error);

    showPrettyAlert(
      'Error',
      'No se pudo obtener la ubicacion actual.'
    );

    return null;
  }
}

export async function buscarUbicacionPorTexto(direccion) {

  try {

    const resultados =
      await Location.geocodeAsync(direccion);

    if (resultados.length === 0) {

      return {
        tipo: 'manual',
        latitude: null,
        longitude: null,
        direccion,
      };
    }

    return {
      tipo: 'manual',
      latitude: resultados[0].latitude,
      longitude: resultados[0].longitude,
      direccion,
    };

  } catch (error) {

    console.log(error);

    return {
      tipo: 'manual',
      latitude: null,
      longitude: null,
      direccion,
    };
  }
}

