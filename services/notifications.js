import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { showPrettyAlert } from '../components/PrettyAlert';

Notifications.setNotificationHandler({

  handleNotification: async () => ({

    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,

  }),

});

export async function pedirPermisos() {

  if (Platform.OS === 'android') {

    await Notifications.setNotificationChannelAsync(
      'default',
      {
        name: 'Recordatorios',
        importance: Notifications.AndroidImportance.MAX,
      }
    );
  }

  const permisosActuales =
    await Notifications.getPermissionsAsync();

  let estadoFinal = permisosActuales.status;

  if (estadoFinal !== 'granted') {

    const nuevosPermisos =
      await Notifications.requestPermissionsAsync();

    estadoFinal = nuevosPermisos.status;
  }

  if (estadoFinal !== 'granted') {

    showPrettyAlert(
      'Permiso denegado',
      'Para ver los recordatorios tenes que permitir las notificaciones.'
    );

    return false;
  }

  return true;
}

export async function enviarNotificacion(nombreProducto) {

  try {

    const tienePermiso = await pedirPermisos();

    if (!tienePermiso) {
      return;
    }

    await Notifications.scheduleNotificationAsync({

      content: {
        title: 'Mis Compritas',
        body: `Recordatorio: no te olvides de comprar ${nombreProducto}.`,
      },

      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5,
        channelId: 'default',
      },

    });

    console.log('Notificacion programada');

  } catch (error) {

    console.log(error);

  }
}

