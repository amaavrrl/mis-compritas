import * as Calendar from 'expo-calendar';

import { showPrettyAlert } from '../components/PrettyAlert';

const mostrarPermisoDenegado = () => {

  showPrettyAlert(
    'Permiso denegado',
    'Para crear el dia de compra semanal, tenes que permitir el acceso al calendario.'
  );
};

const pedirPermisoCalendario = async () => {

  const permisoActual =
    await Calendar.getCalendarPermissionsAsync();

  if (permisoActual.status === 'granted') {
    return true;
  }

  if (permisoActual.status === 'denied' && !permisoActual.canAskAgain) {

    mostrarPermisoDenegado();
    return false;
  }

  const nuevoPermiso =
    await Calendar.requestCalendarPermissionsAsync();

  if (nuevoPermiso.status !== 'granted') {

    mostrarPermisoDenegado();
    return false;
  }

  return true;
};

const obtenerCalendarioEditable = async () => {

  const calendarios =
    await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);

  return calendarios.find(
    calendario => calendario.allowsModifications
  );
};

export async function crearEventoCompraSemanal(inicioEvento) {

  try {

    const tienePermiso = await pedirPermisoCalendario();

    if (!tienePermiso) {
      return false;
    }

    const calendario =
      await obtenerCalendarioEditable();

    if (!calendario) {

      showPrettyAlert(
        'Error',
        'No se encontro un calendario disponible para crear el evento.'
      );

      return false;
    }

    const inicio = inicioEvento;
    const fin = new Date(inicio);
    fin.setHours(inicio.getHours() + 1);

    await Calendar.createEventAsync(
      calendario.id,
      {
        title: 'Dia de compra semanal',
        startDate: inicio,
        endDate: fin,
        notes: 'Recordatorio para organizar las compras de la semana.',
      }
    );

    return true;

  } catch (error) {

    console.log(error);

    showPrettyAlert(
      'Error',
      'No se pudo crear el evento en el calendario.'
    );

    return false;
  }
}

