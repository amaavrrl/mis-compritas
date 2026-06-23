import * as Contacts from 'expo-contacts';

import { showPrettyAlert } from '../components/PrettyAlert';

const mostrarPermisoDenegado = () => {

  showPrettyAlert(
    'Permiso denegado',
    'Para compartir la lista, tenes que permitir el acceso a tus contactos.'
  );
};

const pedirPermisoContactos = async () => {

  const permisoActual =
    await Contacts.getPermissionsAsync();

  if (permisoActual.status === 'granted') {
    return true;
  }

  if (permisoActual.status === 'denied' && !permisoActual.canAskAgain) {

    mostrarPermisoDenegado();
    return false;
  }

  const nuevoPermiso =
    await Contacts.requestPermissionsAsync();

  if (nuevoPermiso.status !== 'granted') {

    mostrarPermisoDenegado();
    return false;
  }

  return true;
};

export async function seleccionarTelefonoContacto() {

  const tienePermiso = await pedirPermisoContactos();

  if (!tienePermiso) {
    return null;
  }

  const contacto =
    await Contacts.presentContactPickerAsync();

  if (!contacto) {
    return null;
  }

  const telefono =
    contacto.phoneNumbers?.[0]?.number;

  if (!telefono) {

    showPrettyAlert(
      'Sin telefono',
      'El contacto seleccionado no tiene un numero de telefono.'
    );

    return null;
  }

  return telefono;
}

