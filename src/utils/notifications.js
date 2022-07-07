import notifee, { AndroidImportance } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

const createChannel = async () => {
  try {
    await notifee.createChannel({
      id: 'information',
      name: 'Information Channel',
      sound: 'default',
      importance: AndroidImportance.HIGH,
    });

    await notifee.createChannel({
      id: 'message',
      name: 'Message Channel',
      sound: 'default',
      importance: AndroidImportance.HIGH,
    });
  } catch (error) {
    return { error };
  }
};

export const getFCMToken = async () => {
  try {
    return await messaging().getToken();
  } catch (error) {
    return { error };
  }
};

export const deleteFCMToken = async () => {
  try {
    await messaging().deleteToken();

    return true;
  } catch (error) {
    return { error };
  }
};

export const handleNotification = async (notification) => {
  try {
    await createChannel();

    if (notification.type === 'information') {
      const notificationData = notification.id
        ? {
            id: notification.id,
            title: notification.title,
            body: notification.body,
            android: {
              channelId: 'information',
              pressAction: {
                id: 'default',
              },
            },
          }
        : {
            title: notification.title,
            body: notification.body,
            android: {
              channelId: 'information',
              pressAction: {
                id: 'default',
              },
            },
          };

      await notifee.displayNotification(notificationData);
      return true;
    }

    if (notification.type === 'message') {
      const notificationData = notification.id
        ? {
            id: notification.id,
            title: notification.title,
            body: notification.body,
            android: {
              channelId: 'message',
              pressAction: {
                id: 'default',
              },
            },
          }
        : {
            title: notification.title,
            body: notification.body,
            android: {
              channelId: 'message',
              pressAction: {
                id: 'default',
              },
            },
          };

      await notifee.displayNotification(notificationData);
      return true;
    }
  } catch (error) {
    return { error };
  }
};
