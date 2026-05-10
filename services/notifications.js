import * as Notifications from 'expo-notifications';

// Configuración handler
Notifications.setNotificationHandler({

  handleNotification: async () => ({

    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,

  }),

});

// Pedir permisos
export async function pedirPermisos() {

  const { status } =
    await Notifications.requestPermissionsAsync();

  if (status !== 'granted') {

    alert('Permiso denegado');

  }
}

// Enviar notificación
export async function enviarNotificacion() {

  try {

    await Notifications.scheduleNotificationAsync({

      content: {
        title: '🛒 Mis Compritas',
        body: 'No te olvides de hacer tus compritas!',
      },

      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5,
      },

    });

    console.log('Notificación programada');

  } catch (error) {

    console.log(error);

  }
}