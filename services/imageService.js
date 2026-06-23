import * as ImagePicker from 'expo-image-picker';

import { showPrettyAlert } from '../components/PrettyAlert';

const mostrarPermisoDenegado = (recurso) => {

  showPrettyAlert(
    'Permiso denegado',
    `Para usar ${recurso}, tenes que permitir el acceso desde los permisos de Expo Go.`
  );
};

const pedirPermisoCamara = async () => {

  const permisoActual =
    await ImagePicker.getCameraPermissionsAsync();

  if (permisoActual.status === 'granted') {
    return true;
  }

  if (permisoActual.status === 'denied' && !permisoActual.canAskAgain) {

    mostrarPermisoDenegado('la camara');
    return false;
  }

  const nuevoPermiso =
    await ImagePicker.requestCameraPermissionsAsync();

  if (nuevoPermiso.status !== 'granted') {

    mostrarPermisoDenegado('la camara');
    return false;
  }

  return true;
};

const pedirPermisoGaleria = async () => {

  const permisoActual =
    await ImagePicker.getMediaLibraryPermissionsAsync();

  if (permisoActual.status === 'granted' || permisoActual.status === 'limited') {
    return true;
  }

  if (permisoActual.status === 'denied' && !permisoActual.canAskAgain) {

    mostrarPermisoDenegado('la galeria');
    return false;
  }

  const nuevoPermiso =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (nuevoPermiso.status !== 'granted' && nuevoPermiso.status !== 'limited') {

    mostrarPermisoDenegado('la galeria');
    return false;
  }

  return true;
};

const obtenerUriImagen = (resultado) => {

  if (resultado.canceled) {
    return null;
  }

  return resultado.assets?.[0]?.uri || null;
};

export async function tomarFoto() {

  try {

    const tienePermiso = await pedirPermisoCamara();

    if (!tienePermiso) {
      return null;
    }

    const resultado =
      await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        cameraType: ImagePicker.CameraType.back,
        quality: 0.5,
      });

    return obtenerUriImagen(resultado);

  } catch (error) {

    console.log(error);

    showPrettyAlert(
      'Error',
      'No se pudo abrir la camara. Proba cerrar Expo Go y abrir la app nuevamente.'
    );

    return null;
  }
}

export async function elegirImagen() {

  const tienePermiso = await pedirPermisoGaleria();

  if (!tienePermiso) {
    return null;
  }

  const resultado =
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.7,
    });

  return obtenerUriImagen(resultado);
}

